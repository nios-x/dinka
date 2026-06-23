"use client"
import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { json } from "zod";
import { toast } from "sonner";

const SocketContext = createContext<any>(null)

export function SocketProvider({ children }: any) {
  const router = useRouter();
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [remoteUser, setRemoteUser] = useState<string | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const { data: session }: any = useSession();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [peerConnection, setPeerConection] = useState<RTCPeerConnection | null>(null);
  const [socketMessages, setSocketMessages] = useState<Record<string, any[]>>({});
  // State to queue ICE candidates before remote description is set
  const [iceCandidatesQueue, setIceCandidatesQueue] = useState<RTCIceCandidate[]>([]);


  const send_message = (targetUserID: string, content: string, fromUserID: string) => {
    socket?.send(JSON.stringify({
      targetUserID: targetUserID,
      userID: fromUserID,
      content,
      type: "foreward_message"
    }))
  }
  useEffect(() => {
    console.log("remote user changed to: ", remoteUser);
  }, [remoteUser]);

  const remoteUserRef = useRef<string | null>(null);

  useEffect(() => {
    remoteUserRef.current = remoteUser;
  }, [remoteUser]);

  useEffect(() => {
    if (session?.user?.id) {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND}`);
      const pc = new RTCPeerConnection({
        iceServers: [
          // Google STUN
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          { urls: "stun:stun3.l.google.com:19302" },
          { urls: "stun:stun4.l.google.com:19302" },

          // Mozilla
          { urls: "stun:stun.services.mozilla.com" },


          // TURN (relay – required for mobile/symmetric NAT)
          {
            urls: "turn:relay.metered.ca:80",
            username: "openai",
            credential: "openai123",
          },
          {
            urls: "turn:relay.metered.ca:443",
            username: "openai",
            credential: "openai123",
          },
          {
            urls: "turn:relay1.expressturn.com:3478",
            username: "efh73s",
            credential: "dqwd9QMS8Ne8grmB",
          },
          {
            urls: "turn:relay.metered.ca:443?transport=tcp",
            username: "openai",
            credential: "openai123",
          },
        ],
      });

      setPeerConection(pc);
      ws.onopen = () => {
        ws.send(JSON.stringify({ type: "register", userID: session.user.id }));
        console.log("WebSocket connected");
      };

      pc.onicecandidate = (event) => {
        console.log("Ice Sent", remoteUserRef.current)
        if (event.candidate) {
          ws.send(
            JSON.stringify({
              type: "ice_candidate",
              candidate: event.candidate,
              targetUserID: remoteUserRef.current, // ✅ send correct target
              userID: session.user.id,
            })
          );
        }
      };

      pc.ontrack = (event) => {
        console.log("Remote track received");
        const [remoteStreamObj] = event.streams;
        setRemoteStream(remoteStreamObj);
      };

      ws.onmessage = async (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "forewarded_message") {
          const otherUserId = message.fromUserId;
          
          if (!otherUserId) {
            console.warn("Received message without fromUserId, ignoring.");
            return;
          }

          const newChatMessage = {
            id: Date.now().toString(),
            message: message.message,
            fromId: otherUserId,
            toId: session?.user?.id
          };

          setSocketMessages((prev: any) => ({
            ...prev,
            [otherUserId]: [...(prev[otherUserId] || []), newChatMessage]
          }));

          const urlParams = new URLSearchParams(window.location.search);
          const currentChatId = urlParams.get("id");
          if (window.location.pathname !== "/chat" || currentChatId !== otherUserId) {
            fetch("/api/v1/getuserdetails", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: otherUserId }),
            })
              .then(res => res.json())
              .then(data => {
                const name = data?.user?.name || otherUserId;
                toast(`${name}: ${message.message}`, {
                  action: {
                    label: "Open",
                    onClick: () => router.push(`/chat?id=${otherUserId}`)
                  }
                });
              })
              .catch(() => {
                toast(`${otherUserId}: ${message.message}`, {
                  action: {
                    label: "Open",
                    onClick: () => router.push(`/chat?id=${otherUserId}`)
                  }
                });
              });
          }
        }
        else if (message.type === "incoming_call") {
          setRemoteUser(message.fromUserID);
          console.log("Incoming call from:", message.fromUserID);
          const askuser = confirm(`Incoming call from ${message.fromUserID}. Accept?`);

          if (askuser && pc) {
            pc.setRemoteDescription(new RTCSessionDescription(message.offer));

            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);
            stream.getTracks().forEach(track => pc.addTrack(track, stream));

            pc.createAnswer().then(answer => {
              pc.setLocalDescription(answer);
              ws.send(
                JSON.stringify({
                  type: "answer",
                  targetUserID: message.fromUserID,
                  userID: session.user.id,
                  answer,
                })
              );
            }).catch(err => console.error(err));
          }
        } else if (message.type === "call_answered") {
          console.log("Call answered by:", message.fromUserID);
          pc?.setRemoteDescription(new RTCSessionDescription(message.answer));
        } else if (message.type === "ice_candidate") {
          console.log("Received ICE candidate from:", message.fromUserID, message);
          if (pc?.remoteDescription) {
            pc?.addIceCandidate(new RTCIceCandidate(message.candidate)).catch(err => console.error(err));
          } else {
            setIceCandidatesQueue(prevQueue => [...prevQueue, new RTCIceCandidate(message.candidate)]);
          }
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };
      setSocket(ws);

      return () => {
        ws.close();
        pc.close();
        setSocket(null);
        setPeerConection(null);
      };
    }
  }, [session?.user?.id]);

  // Process queued ICE candidates after the remote description is set
  useEffect(() => {
    if (peerConnection?.remoteDescription && iceCandidatesQueue.length > 0) {
      iceCandidatesQueue.forEach(candidate => {
        peerConnection.addIceCandidate(candidate).catch(err => console.error(err));
      });
      // Clear the queue after processing
      setIceCandidatesQueue([]);
    }
  }, [peerConnection?.remoteDescription, iceCandidatesQueue]);

  const createCall = async (targetUserID: string) => {
    console.log(targetUserID);
    if (targetUserID) {
      console.log(targetUserID);
      setRemoteUser(targetUserID);
    }

    if (!peerConnection) {
      console.error("PeerConnection is not established");
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "call", targetUserID, userID: session.user.id, offer }));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  if (localStream || remoteStream) {
    return (
      <div className="relative">
        {localStream && (
          <video
            className="rounded-lg absolute bottom-0 right-0 h-1/3 w-1/3"
            autoPlay
            muted
            playsInline
            ref={(videoEl) => {
              if (videoEl) videoEl.srcObject = localStream;
            }}
          />
        )}

        {remoteStream && (
          <video
            className="rounded-lg"
            autoPlay
            playsInline
            ref={(videoEl) => {
              if (videoEl) videoEl.srcObject = remoteStream;
            }}
          />
        )}
      </div>
    );
  }

  return (
    <SocketContext.Provider
      value={{
        createCall,
        socketMessages,
        setSocketMessages,
        send_message,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

// Custom hook
export function useSocket() {
  return useContext(SocketContext);
}

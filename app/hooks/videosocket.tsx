"use client";

import React, { useState, useEffect, useRef, useContext, createContext, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CallScreen, IncomingCall, type CallPeer } from "@/components/call/CallOverlay";

const SocketContext = createContext<any>(null);

const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" },
  { urls: "stun:stun3.l.google.com:19302" },
  { urls: "stun:stun4.l.google.com:19302" },
  { urls: "stun:stun.services.mozilla.com" },
  { urls: "turn:relay.metered.ca:80", username: "openai", credential: "openai123" },
  { urls: "turn:relay.metered.ca:443", username: "openai", credential: "openai123" },
  { urls: "turn:relay1.expressturn.com:3478", username: "efh73s", credential: "dqwd9QMS8Ne8grmB" },
  { urls: "turn:relay.metered.ca:443?transport=tcp", username: "openai", credential: "openai123" },
];

export function SocketProvider({ children }: any) {
  const router = useRouter();
  const { data: session }: any = useSession();

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [remoteUser, setRemoteUser] = useState<string | null>(null);
  const [socketMessages, setSocketMessages] = useState<Record<string, any[]>>({});
  const [iceCandidatesQueue, setIceCandidatesQueue] = useState<RTCIceCandidate[]>([]);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  // Drives the call timer: true from the moment media can actually flow.
  const [connected, setConnected] = useState(false);
  const [peer, setPeer] = useState<CallPeer>(null);
  const [incoming, setIncoming] = useState<{ fromUserID: string; offer: any } | null>(null);

  // Refs let the teardown path reach the live objects without re-running effects.
  const socketRef = useRef<WebSocket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteUserRef = useRef<string | null>(null);
  const teardownRef = useRef<() => void>(() => {});

  useEffect(() => {
    remoteUserRef.current = remoteUser;
  }, [remoteUser]);

  useEffect(() => {
    localStreamRef.current = localStream;
  }, [localStream]);

  /** Looks up who is on the other end so the call screen can name them. */
  const loadPeer = useCallback(async (id: string) => {
    setPeer({ id });
    try {
      const res = await fetch("/api/v1/getuserdetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data?.user) setPeer({ id, name: data.user.name, pic: data.user.pic ?? data.user.image });
    } catch {
      // The call still works without a name.
    }
  }, []);

  /**
   * Builds a peer connection and wires its handlers. Called once at start-up
   * and again after every hang-up, because a closed RTCPeerConnection cannot
   * be reused for the next call.
   */
  const buildPeer = useCallback(
    (ws: WebSocket, userId: string) => {
      const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

      pc.onicecandidate = (event) => {
        if (event.candidate && remoteUserRef.current) {
          ws.send(
            JSON.stringify({
              type: "ice_candidate",
              candidate: event.candidate,
              targetUserID: remoteUserRef.current,
              userID: userId,
            })
          );
        }
      };

      pc.ontrack = (event) => {
        const [stream] = event.streams;
        setRemoteStream(stream);
      };

      // If the other side vanishes without signalling, end the call anyway.
      // Reached through a ref because teardown rebuilds the peer in turn.
      // "disconnected" is not terminal — a network blip recovers on its own,
      // and only "failed" means it never will.
      pc.onconnectionstatechange = () => {
        setConnected(pc.connectionState === "connected");
        if (["failed", "closed"].includes(pc.connectionState)) {
          teardownRef.current();
        }
      };

      pcRef.current = pc;
      return pc;
    },
    []
  );

  /** Releases the camera, microphone and peer connection, and clears the UI. */
  const teardown = useCallback(() => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;

    const pc = pcRef.current;
    if (pc) {
      pc.getSenders().forEach((s) => {
        try {
          pc.removeTrack(s);
        } catch {
          /* already detached */
        }
      });
      pc.onconnectionstatechange = null;
      pc.close();
      pcRef.current = null;
    }

    setLocalStream(null);
    setRemoteStream(null);
    setRemoteUser(null);
    setPeer(null);
    setIncoming(null);
    setMicOn(true);
    setCamOn(true);
    setConnected(false);
    setIceCandidatesQueue([]);

    // A fresh connection so the next call can start immediately.
    if (socketRef.current && session?.user?.id) {
      buildPeer(socketRef.current, session.user.id);
    }
  }, [buildPeer, session?.user?.id]);

  useEffect(() => {
    teardownRef.current = teardown;
  }, [teardown]);

  /** Hangs up and tells the other side. */
  const endCall = useCallback(() => {
    const target = remoteUserRef.current;
    if (socketRef.current?.readyState === WebSocket.OPEN && target) {
      socketRef.current.send(
        JSON.stringify({ type: "end_call", targetUserID: target, userID: session?.user?.id })
      );
    }
    teardown();
  }, [teardown, session?.user?.id]);

  const toggleMic = useCallback(() => {
    const track = localStreamRef.current?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setMicOn(track.enabled);
  }, []);

  const toggleCam = useCallback(() => {
    const track = localStreamRef.current?.getVideoTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setCamOn(track.enabled);
  }, []);

  const send_message = (targetUserID: string, content: string, fromUserID: string) => {
    socketRef.current?.send(
      JSON.stringify({ targetUserID, userID: fromUserID, content, type: "foreward_message" })
    );
  };

  useEffect(() => {
    if (!session?.user?.id) return;

    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND}`);
    socketRef.current = ws;
    const userId = session.user.id;
    const pc = buildPeer(ws, userId);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "register", userID: userId }));
    };

    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "forewarded_message") {
        const otherUserId = message.fromUserId;
        if (!otherUserId) return;

        let text = message.message;
        let mediaUrl: string | null = null;
        try {
          const parsed = JSON.parse(message.message);
          if (parsed && typeof parsed === "object" && (parsed.text !== undefined || parsed.mediaUrl !== undefined)) {
            text = parsed.text;
            mediaUrl = parsed.mediaUrl ?? null;
          }
        } catch {
          /* a plain string message */
        }

        setSocketMessages((prev) => ({
          ...prev,
          [otherUserId]: [
            ...(prev[otherUserId] || []),
            {
              id: Date.now().toString(),
              message: text,
              mediaUrl,
              fromId: otherUserId,
              toId: userId,
              createdAt: new Date().toISOString(),
            },
          ],
        }));

        const params = new URLSearchParams(window.location.search);
        const openChat = params.get("id");
        if (window.location.pathname !== "/chat" || openChat !== otherUserId) {
          const body = text || (mediaUrl ? "Sent an attachment" : "");
          try {
            const res = await fetch("/api/v1/getuserdetails", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: otherUserId }),
            });
            const data = await res.json();
            toast(`${data?.user?.name ?? "New message"}: ${body}`, {
              action: { label: "Open", onClick: () => router.push(`/chat?id=${otherUserId}`) },
            });
          } catch {
            toast(`New message: ${body}`, {
              action: { label: "Open", onClick: () => router.push(`/chat?id=${otherUserId}`) },
            });
          }
        }
        return;
      }

      if (message.type === "incoming_call") {
        // A ringing sheet rather than a blocking confirm(), so the call can be
        // declined without freezing the page behind it.
        setRemoteUser(message.fromUserID);
        void loadPeer(message.fromUserID);
        setIncoming({ fromUserID: message.fromUserID, offer: message.offer });
        return;
      }

      if (message.type === "call_answered") {
        await pcRef.current?.setRemoteDescription(new RTCSessionDescription(message.answer));
        return;
      }

      if (message.type === "call_declined" || message.type === "end_call") {
        toast("Call ended");
        teardown();
        return;
      }

      if (message.type === "ice_candidate") {
        const candidate = new RTCIceCandidate(message.candidate);
        if (pcRef.current?.remoteDescription) {
          pcRef.current.addIceCandidate(candidate).catch(() => {});
        } else {
          setIceCandidatesQueue((q) => [...q, candidate]);
        }
      }
    };

    ws.onclose = () => {
      socketRef.current = null;
    };

    setSocket(ws);

    return () => {
      ws.close();
      pc.close();
      socketRef.current = null;
      pcRef.current = null;
      setSocket(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  // Candidates that arrived before the remote description was ready.
  useEffect(() => {
    const pc = pcRef.current;
    if (pc?.remoteDescription && iceCandidatesQueue.length > 0) {
      iceCandidatesQueue.forEach((c) => pc.addIceCandidate(c).catch(() => {}));
      setIceCandidatesQueue([]);
    }
  }, [iceCandidatesQueue, remoteStream]);

  const createCall = async (targetUserID: string) => {
    if (!targetUserID) return;

    const pc = pcRef.current;
    if (!pc) {
      toast.error("Call service isn’t ready yet");
      return;
    }
    if (socketRef.current?.readyState !== WebSocket.OPEN) {
      toast.error("You’re offline — can’t start a call");
      return;
    }

    setRemoteUser(targetUserID);
    void loadPeer(targetUserID);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localStreamRef.current = stream;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socketRef.current.send(
        JSON.stringify({ type: "call", targetUserID, userID: session.user.id, offer })
      );
    } catch {
      toast.error("Dinka needs camera and microphone access to call");
      teardown();
    }
  };

  const acceptCall = async () => {
    if (!incoming) return;
    const pc = pcRef.current;
    if (!pc) return;

    const { fromUserID, offer } = incoming;
    setIncoming(null);

    try {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localStreamRef.current = stream;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socketRef.current?.send(
        JSON.stringify({ type: "answer", targetUserID: fromUserID, userID: session.user.id, answer })
      );
    } catch {
      toast.error("Dinka needs camera and microphone access to answer");
      teardown();
    }
  };

  const declineCall = () => {
    if (incoming && socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "call_declined",
          targetUserID: incoming.fromUserID,
          userID: session?.user?.id,
        })
      );
    }
    teardown();
  };

  const inCall = !!localStream || !!remoteStream;

  return (
    <SocketContext.Provider
      value={{
        socket,
        createCall,
        endCall,
        toggleMic,
        toggleCam,
        micOn,
        camOn,
        inCall,
        socketMessages,
        setSocketMessages,
        send_message,
      }}
    >
      {/* The app stays mounted underneath; the call is an overlay, not a
          replacement, so hanging up returns you exactly where you were. */}
      {children}

      {inCall && (
        <CallScreen
          localStream={localStream}
          remoteStream={remoteStream}
          peer={peer}
          micOn={micOn}
          camOn={camOn}
          connected={connected}
          onToggleMic={toggleMic}
          onToggleCam={toggleCam}
          onEnd={endCall}
        />
      )}

      {incoming && !inCall && (
        <IncomingCall peer={peer} onAccept={acceptCall} onDecline={declineCall} />
      )}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}

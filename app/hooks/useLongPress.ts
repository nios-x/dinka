"use client";

import { useCallback, useRef, useState } from "react";

interface UseLongPressOptions {
    onLongPress: (event: React.MouseEvent | React.TouchEvent) => void;
    onClick?: (event: React.MouseEvent | React.TouchEvent) => void;
    shouldPreventDefault?: boolean;
    delay?: number;
}

export default function useLongPress({
    onLongPress,
    onClick,
    shouldPreventDefault = true,
    delay = 500,
}: UseLongPressOptions) {
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const longPressTriggeredRef = useRef(false);
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const target = useRef<EventTarget | null>(null);

    const preventDefault = useCallback((event: Event) => {
        if (!("touches" in event)) return;
        // Only prevent default if long press was actually triggered
        if (longPressTriggeredRef.current && (event as TouchEvent).touches.length < 2 && event.preventDefault) {
            event.preventDefault();
        }
    }, []);

    const start = useCallback(
        (event: React.MouseEvent | React.TouchEvent) => {
            longPressTriggeredRef.current = false;
            setLongPressTriggered(false);

            if (shouldPreventDefault && event.target) {
                (event.target as HTMLElement).addEventListener("touchend", preventDefault, {
                    passive: false,
                });
                target.current = event.target;
            }
            timeout.current = setTimeout(() => {
                onLongPress(event);
                setLongPressTriggered(true);
                longPressTriggeredRef.current = true;
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault, preventDefault]
    );

    const clear = useCallback(
        (event: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
            if (timeout.current) clearTimeout(timeout.current);

            if (shouldTriggerClick && !longPressTriggeredRef.current && onClick) {
                onClick(event);
            }

            if (shouldPreventDefault && target.current) {
                target.current.removeEventListener("touchend", preventDefault);
            }

            // Small delay to allow preventDefault to run on the current touchend cycle if needed
            setTimeout(() => {
                setLongPressTriggered(false);
                longPressTriggeredRef.current = false;
            }, 10);
        },
        [onClick, shouldPreventDefault, preventDefault]
    );

    return {
        onMouseDown: (e: React.MouseEvent) => start(e),
        onMouseUp: (e: React.MouseEvent) => clear(e),
        onMouseLeave: (e: React.MouseEvent) => clear(e, false),
        onTouchStart: (e: React.TouchEvent) => start(e),
        onTouchEnd: (e: React.TouchEvent) => clear(e),
    };
}

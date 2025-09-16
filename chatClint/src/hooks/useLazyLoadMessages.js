import { useState, useRef, useCallback, useEffect } from "react";

export function useLazyLoadMessages(messagesContainerRef) {
    const [page, setPage] = useState(1);
    const [hasMoreOlder, setHasMoreOlder] = useState(true);
    const [loadingOlder, setLoadingOlder] = useState(false);

    const topTriggerRef = useRef(null);
    const observerRef = useRef(null);
    const prevScrollHeight = useRef(0);

    const loadOlderMessages = useCallback(async () => {
        if (loadingOlder || !hasMoreOlder) return;
        setLoadingOlder(true);

        const container = messagesContainerRef.current;
        if (container) {
            prevScrollHeight.current = container.scrollHeight;
        }

        // Simulate API call delay
        const prevTop = container ? container.scrollTop : 0;
        setTimeout(() => {
            if (container) {
                const newScrollHeight = container.scrollHeight;
                const scrollDiff = newScrollHeight - prevScrollHeight.current;
                // Preserve viewport anchor when older items are prepended
                container.scrollTop = prevTop + scrollDiff;
            }
            setPage(prev => {
                const next = prev + 1;
                if (next > 3) setHasMoreOlder(false); // mock
                return next;
            });
            setLoadingOlder(false);
        }, 500);
    }, [loadingOlder, hasMoreOlder, page, messagesContainerRef]);

    const topObserverCallback = useCallback((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMoreOlder && !loadingOlder) {
            loadOlderMessages();
        }
    }, [loadOlderMessages, hasMoreOlder, loadingOlder]);

    useEffect(() => {
        const rootEl = messagesContainerRef?.current || null;
        const observer = new IntersectionObserver(topObserverCallback, {
            root: rootEl,
            rootMargin: "100px",
            threshold: 0.1,
        });

        if (topTriggerRef.current) {
            observer.observe(topTriggerRef.current);
        }

        observerRef.current = observer;

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [topObserverCallback, messagesContainerRef]);

    return { topTriggerRef, page, hasMoreOlder, loadingOlder };
}

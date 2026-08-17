import { useCallback, useEffect, useRef, useState } from "react";

type UseExpandableSectionOptions = {
  scrollOffset?: number;
  animationDuration?: number;
};

export const useExpandableSection = ({
  scrollOffset = 120,
  animationDuration = 350,
}: UseExpandableSectionOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const titleRef = useRef<HTMLDivElement | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  }, []);

  const scrollToTitle = useCallback(() => {
    const element = titleRef.current;

    if (!element) {
      return;
    }

    const top =
      element.getBoundingClientRect().top + window.scrollY - scrollOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }, [scrollOffset]);

  const open = useCallback(() => {
    clearTimers();

    setIsOpen(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });

    scrollToTitle();
  }, [clearTimers, scrollToTitle]);

  const close = useCallback(() => {
    clearTimers();

    setIsVisible(false);

    scrollToTitle();

    scrollTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);

      scrollTimeoutRef.current = null;
    }, animationDuration + 250);
  }, [animationDuration, clearTimers, scrollToTitle]);

  const toggleOpen = useCallback(() => {
    if (isOpen) {
      close();

      return;
    }

    open();
  }, [isOpen, open, close]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return {
    isOpen,
    isVisible,
    titleRef,
    toggleOpen,
    open,
    close,
  };
};

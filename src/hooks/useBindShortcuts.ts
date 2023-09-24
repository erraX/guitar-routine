import { useCallback, useEffect } from 'react';

export type ShortcutsHandler = () => void;

export type ShortcutsHandlers = Record<number | string, ShortcutsHandler>;

export const useBindShortcuts = (handlers: ShortcutsHandlers) => {
  // handle what happens on key press
  const handleKeyPress = useCallback((event: any) => {
    const keyCode = event.keyCode;
    handlers[keyCode]?.();
  }, [handlers]);

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};

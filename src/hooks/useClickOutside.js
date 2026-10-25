import { useEffect } from "react";

const useClickOutside = (ref, callback, enabled = true) => {
  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const element = ref.current;

      if (element && !element.contains(event.target)) {
        callback(event);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [callback, enabled, ref]);
};

export default useClickOutside;

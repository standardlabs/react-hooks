import React, { useEffect, useState } from "react";
import * as hooks from '../src'

export default {
  title: "Hooks"
};

export const useDebounced = () => {
  const [val, set] = hooks.useDebounced({}, 150);

  useEffect(() => {
    set({ height: window.innerHeight, width: window.innerWidth });

    const handler = e =>
      set({ height: e.target.innerHeight, width: e.target.innerWidth });

    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>useDebounced</h1>
      <pre>
        Window: {val.height}px by {val.width}px
      </pre>
      <p>Go ahead and resize the window a bit to see how it works.</p>
    </div>
  );
};

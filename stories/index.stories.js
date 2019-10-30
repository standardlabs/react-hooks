import React, { useEffect, useState } from "react";
import * as hooks from "../src";

const Story = props => (
  <div style={{ fontFamily: "sans-serif", textAlign: "center" }} {...props} />
);

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
    <Story>
      <h1>useDebounced</h1>
      <pre>
        Window: {val.height}px by {val.width}px
      </pre>
      <p>Go ahead and resize the window a bit to see how it works.</p>
    </Story>
  );
};

export const useDeferred = () => {
  const [val, set] = hooks.useDeferred({}, 1000);

  useEffect(() => {
    set({ height: window.innerHeight, width: window.innerWidth });

    const handler = e =>
      set({ height: e.target.innerHeight, width: e.target.innerWidth });

    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <Story>
      <h1>useDeferred</h1>
      <pre>
        Value: {val.value.height}px by {val.value.width}px
      </pre>
      <pre>
        Deferred: {val.deferred.height}px by {val.deferred.width}px
      </pre>
      <p>Go ahead and resize the window a bit to see how it works.</p>
    </Story>
  );
};

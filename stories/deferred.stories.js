import React, { useEffect } from "react";
import { Story } from "./story";
import { useDeferred } from "../src";

export default {
  title: "Hooks|useDeferred"
};

export const normal = () => {
  const [val, set] = useDeferred({}, 1000);

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
      <pre>const [value, setValue] = useDeferred({`{}`}, 1000)</pre>
      <p>
        Value: {val.value.height}px by {val.value.width}px
      </p>
      <p>
        Deferred: {val.deferred.height}px by {val.deferred.width}px
      </p>
      <p>Go ahead and resize the window a bit to see how it works.</p>
    </Story>
  );
};

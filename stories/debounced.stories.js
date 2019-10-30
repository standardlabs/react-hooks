import React, { useEffect } from "react";
import styled from "styled-components";
import { Story } from "./story";
import { useDebounced } from "../src";

export default {
  title: "Hooks|useDebounced"
};

export const normal = () => {
  const [val, set] = useDebounced({}, 150);

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
      <pre>const [value, setValue] = useDebounced({`{}`}, 150)</pre>
      <p>
        Window: {val.height}px by {val.width}px
      </p>
      <p>Go ahead and resize the window a bit to see how it works.</p>
    </Story>
  );
};

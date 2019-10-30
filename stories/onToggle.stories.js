import React from "react";
import { Story } from "./story";
import { useToggle, useDeferredToggle } from "../src";

export default {
  title: "Hooks|useToggle"
};

export const normal = () => {
  const [toggle, onClick] = useToggle(false);

  return (
    <Story>
      <h1>useToggle</h1>
      <pre>const [toggle, onClick] = useToggle(false)</pre>
      <button onClick={onClick}>{toggle ? "On" : "Off"}</button>
      <p>Go ahead and click.</p>
    </Story>
  );
};

export const deferred = () => {
  const [toggle, onClick] = useDeferredToggle(false, 500);

  return (
    <Story>
      <h1>useDeferredToggle</h1>
      <pre>const [toggle, onClick] = useDeferredToggle(false, 500)</pre>
      <p>
        <button onClick={onClick}>{toggle.value ? "On" : "Off"}</button>
      </p>
      <p>
        <button disabled>{toggle.deferred ? "On" : "Off"}</button>
      </p>
      <p>Go ahead and click.</p>
    </Story>
  );
};

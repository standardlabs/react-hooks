import React from "react";
import { Story } from "./story";
import { useOnChange, useDeferredOnChange } from "../src";

export default {
  title: "Hooks|useOnChange"
};

export const normal = () => {
  const [value, onChange] = useOnChange("");

  return (
    <Story>
      <h1>useOnChange</h1>
      <pre>const [value, onChange] = useOnChange("")</pre>
      <form>
        <p>
          <input
            placeholder="Enter some text"
            type="text"
            value={value}
            onChange={onChange}
          />
        </p>
      </form>
      <p>This is a very simple example of the onChange handler.</p>
    </Story>
  );
};

export const deferred = () => {
  const [value, onChange] = useDeferredOnChange("", 250);

  return (
    <Story>
      <h1>useDeferredOnChange</h1>
      <pre>const [value, onChange] = useDeferredOnChange("", 250)</pre>
      <form>
        <p>
          <input
            placeholder="Immediate value"
            type="text"
            value={value.value}
            onChange={onChange}
          />
        </p>
        <p>
          <input
            placeholder="Deferred value"
            type="text"
            disabled
            value={value.deferred}
          />
        </p>
      </form>
      <p>
        This is a bit more interesting. Try typing to see how the deferred input
        reacts.
      </p>
    </Story>
  );
};

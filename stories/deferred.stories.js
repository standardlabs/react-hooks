import React, { useEffect } from "react";
import { Code, Story, Table } from "./components";
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
      <Code>{`const [value, setValue] = useDeferred({}, 1000)`}</Code>
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Height</th>
            <th>Width</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Value</td>
            <td>{val.value.height}px</td>
            <td>{val.value.width}px</td>
          </tr>
          <tr>
            <td>Deferred</td>
            <td>{val.deferred.height}px</td>
            <td>{val.deferred.width}px</td>
          </tr>
        </tbody>
      </Table>
      <p>Go ahead and resize the window a bit to see how it works.</p>
    </Story>
  );
};

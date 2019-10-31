import React, { useEffect } from "react";
import styled from "styled-components";
import { Code, Story, Table } from "./components";
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
      <Code>{`
const [value, setValue] = useDebounced({}, 150);

useEffect(() => {
  set({ height: window.innerHeight, width: window.innerWidth });

  const handler = e =>
    set({ height: e.target.innerHeight, width: e.target.innerWidth });

  window.addEventListener("resize", handler);

  return () => window.removeEventListener("resize", handler);
}, []);
      `}</Code>
      <Table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Height</th>
            <th>Width</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <pre>value</pre>
            </td>
            <td>{val.height}px</td>
            <td>{val.width}px</td>
          </tr>
        </tbody>
      </Table>
      <p>Go ahead and resize the window a bit to see how it works.</p>
    </Story>
  );
};

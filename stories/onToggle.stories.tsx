import React from "react";
import { Code, Story, Table } from "./components";
import { useToggle, useDeferredToggle } from "../src";

export default {
  title: "Hooks|useToggle",
};

export const normal = () => {
  const [toggle, onToggle] = useToggle(false);

  return (
    <Story>
      <h1>useOnChange</h1>
      <Code>{`
const [toggle, onToggle] = useToggle(false);

return <button onClick={onToggle}>
  {toggle ? "Toggle Off" : "Toggle On"}
</button>
      `}</Code>
      <Table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <pre>toggle</pre>
            </td>
            <td>
              <button onClick={onToggle}>
                {toggle ? "Toggle Off" : "Toggle On"}
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Story>
  );
};

export const deferred = () => {
  const [toggle, onToggle] = useDeferredToggle(false, 250);

  return (
    <Story>
      <h1>useOnChange</h1>
      <Code>{`
const [toggle, onToggle] = useDeferredToggle(false, 250);

return <button onClick={onToggle}>
  {toggle ? "Toggle Off" : "Toggle On"}
</button>
      `}</Code>
      <Table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <pre>toggle.value</pre>
            </td>
            <td>
              <button onClick={onToggle}>
                {toggle.value ? "Toggle Off" : "Toggle On"}
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <pre>toggle.deferred</pre>
            </td>
            <td>
              <button disabled>
                {toggle.deferred ? "Toggle Off" : "Toggle On"}
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Story>
  );
};

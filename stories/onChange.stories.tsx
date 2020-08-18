import React from "react";
import { Code, Story, Table } from "./components";
import { useOnChange, useDeferredOnChange } from "../src";

export default {
  title: "Hooks|useOnChange",
};

export const normal = () => {
  const [value, onChange] = useOnChange("");

  return (
    <Story>
      <h1>useOnChange</h1>
      <Code>{`
const [value, onChange] = useOnChange("");

return <input type="text" value={value} onChange={onChange} />
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
              <pre>value</pre>
            </td>
            <td>
              <input
                placeholder="Enter some text"
                type="text"
                value={value}
                onChange={onChange}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <p>This is a very simple example of the onChange handler.</p>
    </Story>
  );
};

export const deferred = () => {
  const [val, onChange] = useDeferredOnChange("", 250);

  return (
    <Story>
      <h1>useDeferredOnChange</h1>
      <Code>{`
const [val, onChange] = useDeferredOnChange("", 250);

return <input type="text" value={val.value} onChange={onChange} />
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
              <pre>val.value</pre>
            </td>
            <td>
              <input
                placeholder="Enter some text"
                type="text"
                value={val.value}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <pre>val.deferred</pre>
            </td>
            <td>
              <input disabled type="text" value={val.deferred} />
            </td>
          </tr>
        </tbody>
      </Table>
      <p>
        This is a bit more interesting. Try typing to see how the deferred input
        reacts.
      </p>
    </Story>
  );
};

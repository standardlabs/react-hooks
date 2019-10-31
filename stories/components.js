import React from "react";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";
import jsx from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import styled from "styled-components";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";

SyntaxHighlighter.registerLanguage("javascript", jsx);

const CodeContainer = styled.div`
  margin: auto;
  text-align: left;
  width: 750px;
  & > pre {
    padding: 20px !important;
  }
`;

export const Code = ({ children }) => (
  <CodeContainer>
    <SyntaxHighlighter language="javascript" style={docco}>
      {children.trim()}
    </SyntaxHighlighter>
  </CodeContainer>
);

export const Table = styled.table`
  margin: auto;
  thead {
    border-bottom: 1px solid #ddd;
  }

  tr {
    th,
    td {
      padding: 5px;
      text-align: left;
    }
  }
`;

export const Story = styled.div`
  font-family: sans-serif;
  text-align: center;
  font-size: 16px;

  input {
    font-size: 16px;
    padding: 6px 12px;
  }

  button {
    font-size: 16px;
    padding: 10px 20px;
  }
`;


import React from 'react';

interface JsonViewerProps {
  data: object;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const formattedJson = JSON.stringify(data, null, 2);

  const syntaxHighlight = (json: string) => {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls = 'text-green-400'; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-indigo-300'; // key
        } else {
          cls = 'text-amber-300'; // string
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-purple-400'; // boolean
      } else if (/null/.test(match)) {
        cls = 'text-gray-500'; // null
      }
      return `<span class="${cls}">${match}</span>`;
    });
  };

  return (
    <pre className="p-4 text-sm font-mono overflow-x-auto">
      <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(formattedJson) }} />
    </pre>
  );
};

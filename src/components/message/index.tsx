import React, { useMemo } from "react";

interface Props {
  content: string;
  from: string;
  to?: string;
}

const Message = ({ content, from, to }: Props) => {
  const title = useMemo(() => {
    if (!to) return from;
    return `${from} to ${to}`;
  }, [from, to]);

  return (
    <article>
      {title} : {content}
    </article>
  );
};

export default Message;

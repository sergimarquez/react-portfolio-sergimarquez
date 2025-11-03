"use client";

import { useEffect, useState } from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = {
  source: MDXRemoteSerializeResult;
};

// Client-only MDX rendering to avoid React context issues during SSR
// Defer rendering until after mount to ensure hooks work correctly
export default function MdxContent({ source }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading content...</div>;
  }

  return <MDXRemote {...source} />;
}

"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = {
  source: MDXRemoteSerializeResult;
};

export default function MdxRenderer({ source }: Props) {
  return <MDXRemote {...source} />;
}

export default async function globalSetup() {
  if (typeof (globalThis as any).TransformStream === "undefined") {
    const { TransformStream } = await import("node:stream/web");
    (globalThis as any).TransformStream = TransformStream;
  }
}

import { convertTurboBufferToGrayscale } from "..";

const cache = new Map();

type MessageData = {
  buffer: ArrayBufferLike;
  width: number;
  height: number;
  cache?: boolean;
};

addEventListener("message", (event: MessageEvent<MessageData>) => {
  const options = {
    cache,
  };

  const t0 = Date.now();
  const outputBuffer = convertTurboBufferToGrayscale(
    event.data.buffer,
    undefined,
    options
  );
  const t1 = Date.now();
  const elapsedTimeMs = t1 - t0;

  console.log(`convertTurboBufferToGrayscale took ${elapsedTimeMs}ms.`);

  postMessage(
    {
      buffer: outputBuffer,
      width: event.data.width,
      height: event.data.height,
      elapsedTimeMs,
    },
    { transfer: [outputBuffer] }
  );
});

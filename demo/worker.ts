import {
  convertTurboBufferToGrayscale,
  convertGrayscaleBufferToTurbo,
} from "..";

const cache = new Map();

type Job = {
  id: number;
  source: "turbo" | "grayscale";
  target: "turbo" | "grayscale";
  buffer: ArrayBufferLike;
  width: number;
  height: number;
  cache?: boolean;
};

function toGrayscale(buffer, options) {
  const t0 = Date.now();
  const outputBuffer = convertTurboBufferToGrayscale(
    buffer,
    undefined,
    options
  );
  const t1 = Date.now();
  const elapsedTimeMs = t1 - t0;
  console.log(`convertTurboBufferToGrayscale took ${elapsedTimeMs}ms.`);
  return outputBuffer;
}

function toTurbo(buffer, options) {
  const t0 = Date.now();
  const outputBuffer = convertGrayscaleBufferToTurbo(buffer, undefined);
  const t1 = Date.now();
  const elapsedTimeMs = t1 - t0;
  console.log(`convertGrayscaleBufferToTurbo took ${elapsedTimeMs}ms.`);
  return outputBuffer;
}

addEventListener("message", (event: MessageEvent<Job>) => {
  const options = {
    cache,
  };

  const job = event.data;
  let outputBuffer;

  switch (job.target) {
    case "grayscale":
      outputBuffer = toGrayscale(job.buffer, options);
      break;
    case "turbo":
      outputBuffer = toTurbo(job.buffer, options);
      break;
  }

  postMessage(
    {
      id: job.id,
      source: job.source,
      target: job.target,
      buffer: outputBuffer,
      width: event.data.width,
      height: event.data.height,
    },
    { transfer: [outputBuffer] }
  );
});

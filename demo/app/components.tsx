"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { intensityToRGB, snapToTurbo } from "../..";
import ColorSlider from "../src/ColorSlider";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import styles from "./page.module.css";

export function ColorConvert() {
  const [value, setValue] = useState(165);
  const rgbColor = intensityToRGB(value);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          <ColorSlider
            scaleImage="/grayscale.png"
            value={value}
            onChange={setValue}
          />
          <dl className={styles.Values}>
            <dt>normalized:</dt>
            <dd>{(value / 255).toFixed(9)}</dd>
            <dt>rgb:</dt>
            <dd>
              rgb({value}, {value}, {value})
            </dd>
            <dt>hex:</dt>
            <dd>
              #{value.toString(16).padStart(2, "0")}
              {value.toString(16).padStart(2, "0")}
              {value.toString(16).padStart(2, "0")}
            </dd>
          </dl>
          <div
            style={{
              width: 160,
              height: 160,
              margin: 4,
              background: `rgb(${value}, ${value}, ${value})`,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ColorSlider
            scaleImage="/turbo.png"
            value={value}
            onChange={setValue}
          />
          <dl className={styles.Values}>
            <dt>normalized:</dt>
            <dd>{(value / 255).toFixed(9)}</dd>
            <dt>rgb:</dt>
            <dd>
              rgb({rgbColor[0]}, {rgbColor[1]}, {rgbColor[2]})
            </dd>
            <dt>hex:</dt>
            <dd>
              #{rgbColor[0].toString(16).padStart(2, "0")}
              {rgbColor[1].toString(16).padStart(2, "0")}
              {rgbColor[2].toString(16).padStart(2, "0")}
            </dd>
          </dl>
          <div
            style={{
              width: 160,
              height: 160,
              margin: 4,
              background: `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`,
            }}
          />
        </div>
      </div>
    </>
  );
}

export function Quantizer() {
  const [color, setColor] = useColor("#4fdd47");

  const quantizedColor = useMemo(() => {
    const [r, g, b] = [
      Math.round(color.rgb.r),
      Math.round(color.rgb.g),
      Math.round(color.rgb.b),
    ];
    return snapToTurbo([r, g, b]);
  }, [color]);

  return (
    <div className={styles.Quantizer}>
      <div className={styles.PickerContainer}>
        <ColorPicker color={color} onChange={setColor} hideAlpha />
      </div>
      <div className={styles.QuantizeOutput}>
        <div
          style={{
            width: 160,
            height: 160,
            background: color.hex,
          }}
        />

        <div
          style={{
            width: 160,
            height: 160,
            background: `rgb(${quantizedColor[0]}, ${quantizedColor[1]}, ${quantizedColor[2]})`,
          }}
        />
      </div>
    </div>
  );
}

type MessageData = {
  buffer: ArrayBufferLike;
  width: number;
  height: number;
};

export function ImageConvert() {
  const colorCanvasRef = useRef<HTMLCanvasElement>(null);
  const grayCanvasRef = useRef<HTMLCanvasElement>(null);

  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(new URL("../worker.ts", import.meta.url));

    workerRef.current.onmessage = (event: MessageEvent<MessageData>) => {
      const grayCanvas = grayCanvasRef.current!;
      const grayCtx = grayCanvas.getContext("2d", { alpha: false });
      const { buffer: outputBuffer, width, height } = event.data;
      const outputArray = new Uint8ClampedArray(outputBuffer);
      const imageData = new ImageData(outputArray, width, height);
      grayCtx.putImageData(imageData, 0, 0);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  useEffect(() => {
    const colorCanvas = colorCanvasRef.current!;
    const grayCanvas = grayCanvasRef.current!;
    // const colorCanvas = new OffscreenCanvas(400, 300);
    // const grayCanvas = new OffscreenCanvas(400, 300);
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      colorCanvas.width = width;
      colorCanvas.height = height;
      grayCanvas.width = width;
      grayCanvas.height = height;
      const colorCtx = colorCanvas.getContext("2d", { alpha: false });
      colorCtx.drawImage(img, 0, 0, width, height);
      const inputImageData = colorCtx.getImageData(0, 0, width, height);
      const inputBuffer = inputImageData.data.buffer;
      workerRef.current.postMessage(
        {
          buffer: inputBuffer,
          width,
          height,
        },
        { transfer: [inputBuffer] }
      );
    };
    img.src = "/cocktail.depth.jpg";
  }, []);

  return (
    <div className={styles.Canvases}>
      <canvas
        className={styles.Canvas}
        ref={colorCanvasRef}
        width={400}
        height={300}
        style={{ background: "gray" }}
      />
      <canvas
        className={styles.Canvas}
        ref={grayCanvasRef}
        width={400}
        height={300}
        style={{ background: "gray" }}
      />
    </div>
  );
}

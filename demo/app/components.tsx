"use client";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { ColorPicker, useColor } from "react-color-palette";
import { FaChevronDown } from "react-icons/fa";
import { PiSpinnerBold } from "react-icons/pi";
import { intensityToTurbo, snapColorToTurbo } from "../..";
import ColorSlider from "../src/ColorSlider";
import "react-color-palette/css";
import styles from "./page.module.css";

export function ColorConvert() {
  const [value, setValue] = useState(165);
  const rgbColor = intensityToTurbo(value);

  return (
    <>
      <div className={styles.ColorConvert}>
        <div className={styles.ColorSelect}>
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
            className={styles.Color}
            style={{
              background: `rgb(${value}, ${value}, ${value})`,
            }}
          />
        </div>
        <div className={styles.ColorSelect}>
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
            className={styles.Color}
            style={{
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
    return snapColorToTurbo([r, g, b]);
  }, [color]);

  return (
    <div className={styles.Quantizer}>
      <div className={styles.QuantizeOutput}>
        <div
          className={styles.QuantizeColor}
          style={{
            background: color.hex,
          }}
        />
        <div
          className={styles.QuantizeColor}
          style={{
            background: `rgb(${quantizedColor[0]}, ${quantizedColor[1]}, ${quantizedColor[2]})`,
          }}
        />
      </div>
      <div className={styles.PickerContainer}>
        <ColorPicker color={color} onChange={setColor} hideAlpha />
      </div>
    </div>
  );
}

type MessageData = {
  buffer: ArrayBufferLike;
  width: number;
  height: number;
};

function ImageUploader({
  defaultImageUrl,
  onImageReady,
  dropMessage,
  isLoading = false,
  imageData,
  enabled = true,
}: {
  defaultImageUrl?: string;
  onImageReady: (imageUrl: string, imageData: ImageData) => void;
  dropMessage: ReactNode;
  isLoading: boolean;
  imageData?: any;
  enabled?: boolean;
}) {
  const canvasRef = useRef<OffscreenCanvas>(null);
  const [inputImageUrl, setInputImageUrl] = useState(defaultImageUrl);
  const [outputImageUrl, setOutputImageUrl] = useState(null);
  const [mode, setMode] = useState("input");

  const onDrop = useCallback((acceptedFiles) => {
    const imageUrl = URL.createObjectURL(acceptedFiles[0]);
    setMode("input");
    setInputImageUrl(imageUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = new OffscreenCanvas(1, 1);
    }
    if (enabled && inputImageUrl) {
      const canvas = canvasRef.current;
      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", { alpha: false });
        ctx.drawImage(img, 0, 0, width, height);
        const inputImageData = ctx.getImageData(0, 0, width, height);
        onImageReady(inputImageUrl, inputImageData);
      };
      img.src = inputImageUrl;
    }
  }, [enabled, inputImageUrl, onImageReady]);

  useEffect(() => {
    if (inputImageUrl) {
      return () => {
        if (inputImageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(inputImageUrl);
        }
      };
    }
  }, [inputImageUrl]);

  useEffect(() => {
    if (imageData && enabled) {
      let cancelled = false;

      const handleJob = async () => {
        const canvas = canvasRef.current;
        const { buffer, width, height } = imageData;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", { alpha: false });
        const array = new Uint8ClampedArray(buffer);
        const canvasImage = new ImageData(array, width, height);
        ctx.putImageData(canvasImage, 0, 0);
        const blob = await canvas.convertToBlob();
        if (!cancelled) {
          const imageUrl = URL.createObjectURL(blob);
          setMode("output");
          setOutputImageUrl(imageUrl);
        }
      };

      handleJob();

      return () => {
        cancelled = true;
      };
    }
  }, [imageData, enabled]);

  useEffect(() => {
    if (outputImageUrl) {
      return () => {
        if (outputImageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(outputImageUrl);
        }
      };
    }
  }, [outputImageUrl]);

  const imageUrl = mode === "input" ? inputImageUrl : outputImageUrl;

  return (
    <div className={styles.ImageZone}>
      <div {...getRootProps()} className={styles.DropRoot}>
        <input {...getInputProps()} />
        {imageUrl ? <img className={styles.Canvas} src={imageUrl} /> : null}
      </div>
      <div
        className={styles.DropMessage}
        style={{ display: isDragActive ? "block" : "none" }}
      >
        {dropMessage}
      </div>
      <div
        className={styles.Loading}
        style={{
          display: isLoading && !isDragActive ? "block" : "none",
        }}
      >
        <PiSpinnerBold className={styles.Spinner} />
      </div>
    </div>
  );
}

export function ImageConvert() {
  const [enabled, setEnabled] = useState(false);
  const workerRef = useRef<Worker>();
  const [job, setJob] = useState(null);
  const [jobResult, setJobResult] = useState(null);

  const onTurboReady = useCallback((imageUrl: string, imageData: ImageData) => {
    setJob((prevJob) => ({
      id: prevJob ? prevJob.id + 1 : 1,
      source: "turbo",
      target: "grayscale",
      imageUrl,
      buffer: imageData.data.buffer,
      width: imageData.width,
      height: imageData.height,
    }));
  }, []);

  const onGrayReady = useCallback((imageUrl: string, imageData: ImageData) => {
    setJob((prevJob) => ({
      id: prevJob ? prevJob.id + 1 : 1,
      source: "grayscale",
      target: "turbo",
      imageUrl,
      buffer: imageData.data.buffer,
      width: imageData.width,
      height: imageData.height,
    }));
  }, []);

  useEffect(() => {
    if (job) {
      workerRef.current = new Worker(new URL("../worker.ts", import.meta.url));

      workerRef.current.onmessage = (event: MessageEvent<MessageData>) => {
        setJobResult(event.data);
      };

      workerRef.current?.postMessage(job);

      return () => {
        workerRef.current?.terminate();
      };
    }
  }, [job]);

  return (
    <div className={styles.Canvases}>
      <p className={styles.Tip}>
        tap or drag &amp; drop{" "}
        <span className={styles.ZoneName}>Turbo image</span>
        <FaChevronDown className={styles.DownArrow} />
      </p>
      <p className={styles.Tip}>
        tap or drag &amp; drop{" "}
        <span className={styles.ZoneName}>grayscale image</span>
        <FaChevronDown className={styles.DownArrow} />
      </p>
      <ImageUploader
        defaultImageUrl="/cocktail.depth.jpg"
        onImageReady={onTurboReady}
        dropMessage="drop to upload Turbo image"
        imageData={jobResult?.target === "turbo" ? jobResult : null}
        isLoading={job && job.target === "turbo" && jobResult?.id !== job.id}
        enabled={enabled}
      />
      <ImageUploader
        onImageReady={onGrayReady}
        dropMessage="drop to upload grayscale image"
        imageData={jobResult?.target === "grayscale" ? jobResult : null}
        isLoading={
          job && job.target === "grayscale" && jobResult?.id !== job.id
        }
        enabled={enabled}
      />
      {enabled ? null : (
        <div className={styles.Blocker}>
          <p>Demo conversion paused to save CPU.</p>
          <button
            className={styles.UnblockButton}
            onClick={() => {
              setEnabled(true);
            }}
          >
            Enable
          </button>
        </div>
      )}
    </div>
  );
}

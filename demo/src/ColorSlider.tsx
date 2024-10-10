import { useMemo, useState } from "react";
import { BsTriangleFill } from "react-icons/bs";
import styles from "./ColorSlider.module.css";

type Color = number[];

const toColorString = (color: Color) => {
  const [r, g, b] = color;
  return `rgb(${r}, ${g}, ${b})`;
};

const toGradientStops = (colorStops: Color[]) => {
  return colorStops.map(toColorString);
};

export default function ColorSlider({
  className,
  colorStops,
  scaleImage,
  value: valueFromProps,
  onChange,
}: {
  className?: string;
  colorStops?: Color[];
  scaleImage?: string;
  value?: number;
  onChange?: (value: number) => void;
}) {
  const [controlledValue, setControlledValue] = useState(127);
  const value = valueFromProps ?? controlledValue;

  const style = useMemo(() => {
    if (scaleImage) {
      return {
        "--color-gradient": `url("${scaleImage}")`,
      } as React.CSSProperties;
    } else {
      const colorString = toGradientStops(colorStops).join(", ");
      return {
        "--color-gradient": `linear-gradient(to right, ${colorString})`,
      } as React.CSSProperties;
    }
  }, [colorStops, scaleImage]);

  return (
    <div className={`${styles.Container} ${className ?? ""}`}>
      <input
        className={styles.ColorSlider}
        type="range"
        min={0}
        max={255}
        style={style}
        onChange={(event) => {
          const value = parseInt(event.target.value, 10);
          if (valueFromProps == null) {
            setControlledValue(value);
          }
          if (onChange) {
            onChange(value);
          }
        }}
      />
      <BsTriangleFill
        className={styles.Indicator}
        style={{
          left: value,
        }}
      />
    </div>
  );
}

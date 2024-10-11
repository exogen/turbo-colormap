import React, { useMemo, useState } from "react";
import { Range } from "react-range";
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
      <Range
        label="Select your value"
        step={1}
        min={0}
        max={255}
        values={[value]}
        onChange={([value]) => {
          if (valueFromProps == null) {
            setControlledValue(value);
          }
          if (onChange) {
            onChange(value);
          }
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{ ...props.style, ...style }}
            className={styles.RangeTrack}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} key={props.key} className={styles.Indicator}>
            <BsTriangleFill />
          </div>
        )}
      />
    </div>
  );
}

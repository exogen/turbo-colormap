import styles from "./page.module.css";
import { FaGithub } from "react-icons/fa";
import { ColorConvert, ImageConvert, Quantizer } from "./components";

const DemoPage = () => {
  return (
    <>
      <header>
        <h1>turbo-colormap </h1>
        <a href="https://github.com/exogen/turbo-colormap">
          <FaGithub className="icon" />
        </a>
      </header>
      <p>
        A TypeScript library for working with{" "}
        <a href="https://research.google/blog/turbo-an-improved-rainbow-colormap-for-visualization/">
          Turbo
        </a>
        , an improved rainbow colormap for visual&shy;ization, often used for
        depth maps. In addition to the library, you can also use this demo page
        to perform quick color and image conversions. Note: this library
        generates more faithful values than the d3 approx&shy;imation of Turbo
        found in{" "}
        <a href="https://github.com/d3/d3-scale-chromatic">
          d3-scale-chromatic
        </a>
        .
      </p>
      <div className={styles.Starter}>
        <p>
          See the{" "}
          <a href="https://github.com/exogen/turbo-colormap">
            README on GitHub
          </a>
          .
        </p>
        <p className={styles.CodeBlock}>
          <code>npm install turbo-colormap</code>
        </p>
      </div>
      <section>
        <h2>
          <em>color converter</em>
        </h2>
        <p className={styles.Description}>
          Two-way conversion between grayscale intensity and Turbo.
        </p>
        <ColorConvert />
      </section>
      <section>
        <h2>
          <em>nearest color</em>
        </h2>
        <p className={styles.Description}>
          Snap arbitrary RGB colors to the indexed Turbo palette. This is mostly
          useful for visual&shy;izations exported with an approx&shy;imation of
          Turbo or a lossy format (like JPEG).
        </p>
        <p className={styles.Description}>
          The nearest color is determined by simple Euclidian distance using a
          k-d tree.
        </p>
        <Quantizer />
      </section>
      <section>
        <h2>
          <em>image converter</em>
        </h2>
        <p className={styles.Description}>
          Some tools expect grayscale depth maps. Load images into the area
          below to convert between grayscale and Turbo images. Conversion is
          done client-side; all data stays in your browser.
        </p>
        <ImageConvert />
      </section>
    </>
  );
};

export default DemoPage;

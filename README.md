<div align="center">

# <img src="./demo/public/turbo.png" width="256" height="10" alt="" valign="middle"> <br> turbo-colormap <br> <img src="./demo/public/turbo.png" width="256" height="10" alt="" valign="middle">

</div>

A TypeScript library for working with Turbo, an improved rainbow colormap for
visualization, often used for depth maps. In addition to the library, you can
also use [the demo page](https://exogen.github.io/turbo-colormap/) to perform
quick color and image conversions.

Note: this library generates more faithful values than the d3 approximation of
Turbo found in [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic).

👉 **[Try the interactive demo page!](https://exogen.github.io/turbo-colormap/)**

## Install

```sh
npm install turbo-colormap
```

## Motivation

Some tools expect depth maps to be represented in grayscale. For example,
[displacement maps in Three.js](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.displacementMap):

> The displacement texture is an image where the value of each pixel (white
> being the highest) is mapped against, and repositions, the vertices of the
> mesh.

Using Turbo-colored depth maps with such tools requires converting from Turbo
to grayscale. Most helpers for working with Turbo (like [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic))
only go in one direction: they assume you have a normalized value (0-1) or
color intensity (0-255) and want to get the corresponding Turbo color. Going
backwards is harder.

Another challenge is Turbo-colored visualizations exported in a lossy format,
or generated with an approximation of the Turbo colormap. This complicates
performing a simple reverse lookup from the RGB value to a Turbo index or
intensity value. In order to get the intensity values back out of an image,
some type of nearest-color snapping needs to happen to find the best matching
Turbo color, akin to quantizing an image with the Turbo palette.

This library has helpers for performing these tasks and more.

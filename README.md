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

Some tools generate depth maps using the Turbo colormap, while others expect
depth maps to be represented in grayscale. For example, [displacement maps in Three.js](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.displacementMap):

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

## Performance

When performing conversions on a large number of pixels, a significant chunk of
time can be spent creating fresh arrays or objects to hold RGB triplets. Thus,
for performance purposes, this library minimizes object creation and copying as
much as possible.

When a Turbo RGB triplet is returned from the colormap, it will be the same
Uint8ClampedArray each time. That is, there are 256 Uint8ClampedArray
singletons, one for each color in the palette. An exception is the
`interpolateNormalizedToTurbo` function, which creates a new array each time
since it interpolates between Turbo colors.

It is important you don’t mutate the returned RGB values without copying them
into your own array first.

When snapping colors to the Turbo colormap, a pre-initialized k-d tree is used
to perform nearest-neighbor search. Color similarity it judged via simple
Euclidian distance in RGB space. Other methods may result in small visual
improvements, but are slower.

<!-- TSDOC_START -->

## :toolbox: Functions

- [intensityToTurbo](#gear-intensitytoturbo)
- [snapColorToTurbo](#gear-snapcolortoturbo)
- [snapColorToIntensity](#gear-snapcolortointensity)
- [snapNormalizedToTurbo](#gear-snapnormalizedtoturbo)
- [interpolateNormalizedToTurbo](#gear-interpolatenormalizedtoturbo)
- [grayscaleToTurbo](#gear-grayscaletoturbo)
- [convertTurboBufferToGrayscale](#gear-convertturbobuffertograyscale)
- [convertColorBufferToTurbo](#gear-convertcolorbuffertoturbo)
- [convertGrayscaleBufferToTurbo](#gear-convertgrayscalebuffertoturbo)

### :gear: intensityToTurbo

Convert an integer in the range 0-255 to a Turbo RGB triplet. This is a
simple lookup by array index.

| Function | Type |
| ---------- | ---------- |
| `intensityToTurbo` | `(value: number) => Color` |

### :gear: snapColorToTurbo

Accepts an arbitrary RGB triplet and returns the nearest color (by Euclidian
distance) in the Turbo colormap. There is no interpolation; one of the 256
colors in the exact Turbo palette is always returned.

For performance, this uses a pre-initialized k-d tree to perform
nearest-neighbor search.

| Function | Type |
| ---------- | ---------- |
| `snapColorToTurbo` | `(rgbColor: Color, cache?: Map<string, number> or undefined) => Uint8ClampedArray` |

### :gear: snapColorToIntensity

Accepts an arbitrary RGB triplet and returns the index (0-255) of the nearest
Turbo color. This index can also be used directly as a grayscale intensity
value.

| Function | Type |
| ---------- | ---------- |
| `snapColorToIntensity` | `(rgbColor: Color, cache?: Map<string, number> or undefined) => number` |

Parameters:

* `rgbColor`: An array-like RGB triplet.
* `cache`: A Map to use as a lookup cache, to avoid repeated nearest-neighbor
searches. If not provided, a temporary one will be used for each function
call.


### :gear: snapNormalizedToTurbo

Accepts a float in the range 0-1 and returns the nearest color in the
indexed Turbo palette.

| Function | Type |
| ---------- | ---------- |
| `snapNormalizedToTurbo` | `(value: number) => Color` |

Parameters:

* `value`: A number in the range 0-1.


### :gear: interpolateNormalizedToTurbo

Accepts a float in the range 0-1 and returns an interpolated Turbo color.
That is, if the value lies between two of the 256 indexed colors defined by
Turbo, a new in-between color is generated via simple Euclidian interpolation.

| Function | Type |
| ---------- | ---------- |
| `interpolateNormalizedToTurbo` | `(value: number) => Color` |

Parameters:

* `value`: A number in the range 0-1.


### :gear: grayscaleToTurbo

Convert a gray RGB triplet to a Turbo RGB triplet. If the color is not
perfectly gray (same value for R, G, B) then their intensities will be
averaged.

| Function | Type |
| ---------- | ---------- |
| `grayscaleToTurbo` | `(gray: Color) => Color` |

Parameters:

* `gray`: An array-like RGB triplet.


### :gear: convertTurboBufferToGrayscale

Given an ArrayBuffer-like `buffer` containing RGBA intensities, return a new
ArrayBuffer (or the provided `targetBuffer`) with the RGB pixel values
converted from Turbo to grayscale. The alpha channel is copied as-is.

| Function | Type |
| ---------- | ---------- |
| `convertTurboBufferToGrayscale` | `(buffer: ArrayBufferLike, targetBuffer?: ArrayBufferLike, options?: { cache: Map<string, number>; }) => ArrayBufferLike` |

Parameters:

* `buffer`: A buffer containing RGBA intensities, such as one backing
an ImageData instance.
* `targetBuffer`: A same-sized buffer to write converted RGBA intensities
to. If not provided, one will automatically be created. You can pass the
same buffer provided as input to convert in-place.
* `options.cache`: A Map to use as a lookup cache, to avoid repeated
nearest-neighbor searches. If not provided, a temporary one will be used
for each function call.


### :gear: convertColorBufferToTurbo

Given an ArrayBuffer-like `buffer` containing RGBA intensities, return a new
ArrayBuffer (or the provided `targetBuffer`) with the RGB pixel values
converted from arbitrary color to Turbo. The alpha channel is copied as-is.

| Function | Type |
| ---------- | ---------- |
| `convertColorBufferToTurbo` | `(buffer: ArrayBufferLike, targetBuffer?: ArrayBufferLike, options?: { cache: Map<string, number>; }) => ArrayBufferLike` |

Parameters:

* `buffer`: A buffer containing RGBA intensities, such as one backing
an ImageData instance.
* `targetBuffer`: A same-sized buffer to write converted RGBA intensities
to. If not provided, one will automatically be created. You can pass the
same buffer provided as input to convert in-place.
* `options.cache`: A Map to use as a lookup cache, to avoid repeated
nearest-neighbor searches. If not provided, a temporary one will be used
for each function call.


### :gear: convertGrayscaleBufferToTurbo

Given an ArrayBuffer-like `buffer` containing RGBA intensities, return a new
ArrayBuffer (or the provided `targetBuffer`) with the RGB pixel values
converted from grayscale to Turbo. The alpha channel is copied as-is.

| Function | Type |
| ---------- | ---------- |
| `convertGrayscaleBufferToTurbo` | `(buffer: ArrayBufferLike, targetBuffer?: ArrayBufferLike) => ArrayBufferLike` |

Parameters:

* `buffer`: A buffer containing RGBA intensities, such as one backing
an ImageData instance.
* `targetBuffer`: A same-sized buffer to write converted RGBA intensities
to. If not provided, one will automatically be created. You can pass the
same buffer provided as input to convert in-place.



## :wrench: Constants

- [colormap](#gear-colormap)
- [rgbColormap](#gear-rgbcolormap)

### :gear: colormap

The exact Turbo colormap [as defined by Google](https://gist.github.com/mikhailov-work/ee72ba4191942acecc03fe6da94fc73f),
represented as an array of Float32Arrays, all subarrays of a larger array and
thus backed by a single ArrayBuffer. Indexing into this array with an
intensity in the range 0-255 will return the corresponding normalized Turbo
value.

| Constant | Type |
| ---------- | ---------- |
| `colormap` | `Float32Array[]` |

### :gear: rgbColormap

The Turbo colormap represented as an array of Uint8ClampedArrays, all
subarrays of a larger array and thus backed by a single ArrayBuffer. Indexing
into this array with an intensity in the range 0-255 will return the
corresponding Turbo value as RGB intensities; the `intensityToTurbo`
helper does exactly that.

| Constant | Type |
| ---------- | ---------- |
| `rgbColormap` | `Uint8ClampedArray[]` |



<!-- TSDOC_END -->

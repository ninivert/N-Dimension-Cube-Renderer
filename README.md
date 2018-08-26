# nth Dimention Cube Renderer

## What is this ?

Rendering variations of the cube in multiple dimentions, using a custom high-perf vanilla-JS matrix library.

I tried my best to document the source code (src directory) as well a possible.

Link to the Daniel Shiffman's video that inspired me to do this: [The Coding Train - Coding Challenge #113: 4D Hypercube](https://www.youtube.com/watch?v=XE3YDVdQSPo).

[Live Demo here! (it runs in your browser)](https://ninivert.github.io/N-Dimension-Cube-Renderer/).

## Running this locally

Run this command in your desired folder (git required):

```
git clone https://github.com/ninivert/N-Dimension-Cube-Renderer.git
```

Or download it from the GitHub page directly.

Then open `docs\index.html` in a modern browser (tested on Firefox, Chrome and Chrome mobile).

Development with node.js:
- `npm install` to install the needed development dependencies.
- `npm run start` and visit `localhost:8080` in your browser.
- `npm run dev` to watch and compile changes you make automatically.

## About the 10 dimensions limitation

The live demo renders up to 10 dimensions because of performance limitations (things get laggy with 1024 vertices on a `CanvasRenderingContext2D`!), but there is no theoretical limitation to how far you can go. To render more than 10 dimensions, change the max clamp value in line 173 of `src\scripts\controls.js`!

## Optimizations

I could create an object pool for the matrices (JS memory heap graph is _very_ spikey) but that would make the code a lot less readable, and the framerate hits 60 fps consistently on all tested devices for dimensions less than 6, so I'm not really bothered by it.
# nth Dimention Cube Renderer

## What is this ?

Rendering variations of the cube in multiple dimentions, using a custom high-perf vanilla-JS matrix library.

I tried my best to document the source code (src directory) as well a possible. It currently renders up to the hypercube (4D cube), see todo list.

Link to the video that inspired me to do this: [The Coding Train - Coding Challenge #113: 4D Hypercube](https://www.youtube.com/watch?v=XE3YDVdQSPo).

[Live Demo](#).

## Todo

- Automatically generate the rotation matrices in any dimension to be able to render any dimention (currently renders up to 4)

## Optimizations

I could create an object pool for the matrices (JS memory heap graph is _very_ spikey) but that would make the code a lot less readable, and the framerate hits 60 fps consistently on all tested devices, so I'm not really bothered by it.
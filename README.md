# React Canvas SketchPad

A simple React component for creating sketches created with React, TypeScript and Vite.

Docs created using Storybook. See them live [here](https://jason-nordheim.github.io/sketchPad/)

## Features

- Draw a path
  - using your mouse
  - using touch
- Undo a path (remove it)
- Clear the board
- Download as PNG
- Download as Paths (as JSON)

## Install

This package is published to [npm](https://www.npmjs.com/package/react-canvas-sketchpad)

```sh
# in your project directory
npm install react-canvas-sketchpad
```

## Usage

```ts
import { SketchPad } from "react-canvas-sketchpad";

function App() {
  return <SketchPad />;
}
```

The `SketchPad` component supports the following props via the exported interface `SketchPadProps`:

```ts
interface SketchPadProps = {
  // size of the canvas element in pixels
  size?: number;
  styles: React.HTMLAttributes<HTMLCanvasElement>["style"];
  // canvas context scale
  scale?: [number, number];
  // hiding/showing UI elements
  showUndo?: boolean; // undo button
  showExportToPng?: boolean; // export to PNG
  showExportJson?: boolean; // export paths to JSON
};
```

The default to the following values:

```ts
{
  size: 400,
  styles: { backgroundColor: "white", boxShadow: "0px 0px 10px 2px black" },
  scale: [1, 1],
  showUndo: true,
  showExportToPng: true,
  showExportJson: true,
}
```

# Developing Locally:

See [.developing-locally.md](README.develop.md)

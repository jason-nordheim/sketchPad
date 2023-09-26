import { FC, TouchEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DrawPathOptions, drawPaths } from "../utils/draw";
import { downloadJson, downloadPng, getPosition } from "./SketchPad.utils";
import { Canvas } from "./Canvas";

interface SketchPadControlOptions {
  undo?: boolean;
  clear?: boolean;
  exportToPng?: boolean;
  exportJson?: boolean;
}

export interface SketchPadProps {
  size?: number;
  styles?: React.HTMLAttributes<HTMLCanvasElement>["style"];
  scale?: [number, number];
  controls?: SketchPadControlOptions;
}

const defaults: Required<SketchPadProps> = {
  size: 400,
  styles: { backgroundColor: "white", boxShadow: "0px 0px 10px 2px black" },
  scale: [1, 1],
  controls: { undo: true, exportJson: true, exportToPng: true, clear: true },
};

export const SketchPad: FC<SketchPadProps & DrawPathOptions> = (props) => {
  const { size, styles, scale, controls, color, lineCap, lineJoin, lineWidth } = {
    ...defaults,
    ...props,
    controls: {
      ...defaults.controls,
      ...props.controls,
    },
    styles: {
      ...defaults.styles,
      ...props.styles,
    },
  };
  const drawOpts = useMemo(() => ({ color, lineCap, lineJoin, lineWidth }), [color, lineCap, lineJoin, lineWidth]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paths, setPaths] = useState<number[][][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(true);

  const getContext = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) throw new Error("No context found");
    return ctx;
  }, [canvasRef]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = getContext();
      ctx.scale(scale[0], scale[1]);
    }
  }, [getContext, scale]);

  const draw = useCallback(() => {
    const ctx = getContext();
    ctx.clearRect(0, 0, size, size);
    if (paths.length > 0) {
      setUndoDisabled(false);
    } else {
      setUndoDisabled(true);
    }
    drawPaths(ctx, paths, drawOpts);
  }, [drawOpts, getContext, paths, size]);

  useEffect(() => {
    draw();
  }, [paths, draw]);

  const handleStartPath = (position: [number, number]) => {
    setPaths((existingPaths) => [...existingPaths, [position]]);
    setIsDrawing(true);
  };

  const handleDrawPath = (position: [number, number]) => {
    const lastPathIdx = paths.length - 1;
    setPaths((currentPaths) => {
      const lastPath = currentPaths[lastPathIdx];
      lastPath.push(position);
      currentPaths[lastPathIdx] = lastPath;
      return currentPaths;
    });
    draw();
  };

  const handleMouseDown = (evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const position = getPosition(evt, canvasRef.current!);
    handleStartPath(position);
  };

  const handleTouchStart = (evt: TouchEvent<HTMLCanvasElement>) => {
    const position = getPosition(evt, canvasRef.current!);
    handleStartPath(position);
  };

  const handleMouseMove = (evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isDrawing) {
      const position = getPosition(evt, canvasRef.current!);
      handleDrawPath(position);
    }
  };

  const handleTouchMove = (evt: TouchEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const position = getPosition(evt, canvasRef.current!);
      handleDrawPath(position);
    }
  };

  const handleDrawEnd = () => {
    setIsDrawing(false);
  };

  const handleUndo = () => {
    setPaths((currentPaths) => {
      currentPaths.pop();
      return currentPaths;
    });
  };

  const handleClear = () => {
    setPaths(() => []);
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("mouseup", handleDrawEnd);
      window.addEventListener("touchend", handleDrawEnd);
    }
    return () => {
      if (window) {
        window.removeEventListener("mouseup", handleDrawEnd);
        window.removeEventListener("touchend", handleDrawEnd);
      }
    };
  }, []);

  return (
    <div id="sketch-pad-wrapper">
      <Canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDrawEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleDrawEnd}
        size={size}
        styles={styles}
      />
      <div id="sketch-pad-controls">
        {controls?.undo && (
          <button onClick={handleUndo} disabled={undoDisabled}>
            Undo
          </button>
        )}
        {controls?.clear && (
          <button disabled={undoDisabled} onClick={handleClear}>
            Clear
          </button>
        )}
        {controls?.exportToPng && (
          <button disabled={undoDisabled} onClick={() => downloadPng(canvasRef.current!)}>
            Download PNG
          </button>
        )}
        {controls?.exportJson && (
          <button disabled={undoDisabled} onClick={() => downloadJson(paths, drawOpts, styles)}>
            Download Paths
          </button>
        )}
      </div>
    </div>
  );
};

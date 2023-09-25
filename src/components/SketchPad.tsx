import { FC, TouchEvent, useCallback, useEffect, useRef, useState } from "react";
import { drawPaths } from "../utils/draw";
import { getPosition } from "./SketchPad.utils";

export interface SketchPadProps {
  size?: number;
  styles?: React.HTMLAttributes<HTMLCanvasElement>["style"];
  scale?: [number, number];
  showUndo?: boolean;
  showExportToPng?: boolean;
  showExportJson?: boolean;
}

const defaults: Required<SketchPadProps> = {
  size: 400,
  styles: { backgroundColor: "white", boxShadow: "0px 0px 10px 2px black" },
  scale: [1, 1],
  showUndo: true,
  showExportToPng: true,
  showExportJson: true,
};

export const SketchPad: FC<SketchPadProps> = (props) => {
  const { size, styles, scale, showUndo, showExportToPng, showExportJson } = {
    ...props,
    ...defaults,
  };

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

  const draw = () => {
    const ctx = getContext();
    ctx.clearRect(0, 0, size, size);
    if (paths.length > 0) {
      setUndoDisabled(false);
    } else {
      setUndoDisabled(true);
    }
    drawPaths(ctx, paths);
  };

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
    draw();
  };

  const downloadPng = () => {
    if (document) {
      canvasRef.current?.toBlob(async (blob) => {
        if (blob) {
          const content = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.style.display = "none";
          anchor.download = "sketch.png";
          anchor.href = content;
          document.body.appendChild(anchor);
          anchor.click();
          window.URL.revokeObjectURL(content);
          document.body.removeChild(anchor);
        }
      }, "image/png");
    }
  };

  const downloadJson = () => {
    if (document && paths) {
      const data = JSON.stringify(paths);
      const content = `data:text/plan;charset=utf-8,${encodeURIComponent(data)}`;
      const anchor = document.createElement("a");
      anchor.style.display = "none";
      anchor.download = "paths.json";
      anchor.href = content;
      document.body.appendChild(anchor);
      anchor.click();
      window.URL.revokeObjectURL(content);
      document.body.removeChild(anchor);
    }
  };

  return (
    <div id="sketch-pad-wrapper">
      <canvas
        height={size}
        width={size}
        style={styles}
        ref={canvasRef}
        onMouseDown={(evt) => handleMouseDown(evt)}
        onTouchStart={(evt) => handleTouchStart(evt)}
        onMouseMove={(evt) => handleMouseMove(evt)}
        onTouchMove={(evt) => handleTouchMove(evt)}
        onMouseUp={() => handleDrawEnd()}
        onTouchEnd={() => handleDrawEnd()}
      />
      <div id="sketch-pad-controls">
        {showUndo && (
          <button onClick={handleUndo} disabled={undoDisabled}>
            Undo
          </button>
        )}
        {showExportToPng && (
          <button disabled={undoDisabled} onClick={() => downloadPng()}>
            Download PNG
          </button>
        )}
        {showExportJson && (
          <button disabled={undoDisabled} onClick={() => downloadJson()}>
            Download Paths
          </button>
        )}
      </div>
    </div>
  );
};

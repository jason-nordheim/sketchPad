export const getPosition = (
  evt: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>,
  canvasRef: HTMLCanvasElement
): [number, number] => {
  if (evt.type === "mousedown" || evt.type === "mousemove") {
    const { clientX, clientY } = evt as React.MouseEvent<HTMLCanvasElement, MouseEvent>;
    const x = Math.round(clientX);
    const y = Math.round(clientY);
    return [x, y];
  } else if (evt instanceof TouchEvent) {
    evt.preventDefault();
    const loc = evt.touches[0];
    const rect = canvasRef?.getBoundingClientRect();
    if (rect) {
      const x = Math.round(loc.clientX);
      const y = Math.round(loc.clientY - rect.top);
      return [x, y];
    }
  }
  throw new Error("Unsupported event provided");
};

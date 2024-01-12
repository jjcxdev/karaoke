"use client";

import { useEffect, useRef } from "react";

const AudioVisualizer = ({ analyserNode }: { analyserNode: AnalyserNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!analyserNode || !ctx || !canvas) {
      console.log("Canvas or context not available");
      return;
    }

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyserNode.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgb(24, 24, 24)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        // interpolate between two colors based on bar height
        const ratio = barHeight / 255;
        const r = Math.floor(255 * (1 - ratio) + 130 * ratio);
        const g = Math.floor(23 * (1 - ratio) + 51 * ratio);
        const b = Math.floor(202 * (1 - ratio) + 231 * ratio);

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }

      requestAnimationFrame(draw);
    };
    draw();
  }, [analyserNode]);

  return <canvas className="w-full h-4" ref={canvasRef} />;
};

export default AudioVisualizer;

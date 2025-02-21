import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import oneGraphStyles from './../../css/OneGraph.module.css';
import Draw from './Draw1';
import { CommonDataWithGetDataFnType, SpecificGraphType } from './OnePage';

export const OneGraph = ({ graphData }: OneGraphType) => {
  const { search } = useLocation();
  const isFullscreen =
    new URLSearchParams(search).get('fullscreen') === 'true' || false;
  const articleRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas_pointerRef = useRef<HTMLCanvasElement | null>(null);
  const loadPocasiAsync = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const canvas_pointer = canvas_pointerRef.current as HTMLCanvasElement;
    const newDraw = new Draw(canvas, canvas_pointer, graphData);
    const showGraph: showGraphType = (canvas, canvas_pointer) => {
      const clientWidth = document.documentElement.clientWidth;
      const graphWidth = clientWidth > 724 && !isFullscreen ? 724 : clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      const graphHeight = clientHeight / 2 - 25;
      if (articleRef.current) {
        articleRef.current.style.height = isFullscreen
          ? `${graphHeight}px`
          : '300px';
      }
      canvas.width = graphWidth;
      canvas.height = isFullscreen ? graphHeight : 300;
      canvas_pointer.width = graphWidth;
      canvas_pointer.height = isFullscreen ? graphHeight : 300;
      newDraw.graph();
    };

    if (canvas && canvas_pointer) {
      showGraph(canvas, canvas_pointer);
    }

    window.addEventListener(
      'resize',
      () => canvas && canvas_pointer && showGraph(canvas, canvas_pointer)
    );
  };
  useEffect(loadPocasiAsync, [graphData, isFullscreen]);
  return (
    <article ref={articleRef} className={oneGraphStyles.allGraphs}>
      <canvas ref={canvasRef} className={oneGraphStyles.canvas} />
      <canvas
        ref={canvas_pointerRef}
        className={oneGraphStyles.canvas_pointer}
      />
    </article>
  );
};

export type OneGraphDataWithGetDataFn = {
  common: CommonDataWithGetDataFnType;
  specific: SpecificGraphType;
};
type OneGraphType = {
  graphData: OneGraphDataWithGetDataFn;
};

export type showGraphType = (
  canvas: HTMLCanvasElement,
  canvas_pointer: HTMLCanvasElement
) => void;

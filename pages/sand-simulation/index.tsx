import { useEffect, useRef } from 'react';

import { SandSimulation } from '../../lib/sand-simulation';

export default function SandSimulationGame() {
  const windowRef = useRef(0);

  useEffect(() => {
    const ss = new SandSimulation('myCanvas');
    ss.addEventListeners();

    let prevTime = 0;
    const update = (t: number) => {
      const currTime = Math.floor(t / 50);
      // console.log(prevTime, currTime);
      if (prevTime !== currTime) {
        ss.step();
        ss.render();
        prevTime = currTime;
      }
      windowRef.current = requestAnimationFrame(update);
    };

    requestAnimationFrame(update);

    return () => {
      ss.removeEventListeners();
      cancelAnimationFrame(windowRef.current);
    };
  }, []);

  return (
    <div className="flex h-screen justify-center place-items-center bg-black">
      <canvas id="myCanvas" className="h-96 w-96" />
    </div>
  );
}
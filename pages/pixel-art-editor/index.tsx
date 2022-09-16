import { useEffect } from 'react';
import { PixelArtEditor } from '../../lib/pixel-art-editor';

function PixelArtEditorDemo() {
  useEffect(() => {
    const pixelEditor = new PixelArtEditor('myPixelEditorCanvas');

    window.addEventListener('mousemove', (e) => pixelEditor.onMouseMove(e));
  });

  return (
    <div className="bg-black flex justify-center h-screen place-items-center">
      <canvas
        id="myPixelEditorCanvas"
        width={600}
        height={600}
        className="border-4 bg-gray-200"
      />
    </div>
  );
}

export default PixelArtEditorDemo;

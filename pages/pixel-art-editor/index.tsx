import { useEffect } from 'react';
import { PixelArtEditor } from '../../lib/pixel-art-editor';

function PixelArtEditorDemo() {
  useEffect(() => {
    const pixelEditor = new PixelArtEditor('myPixelEditorCanvas');
  });

  return (
    <div className="bg-gray-100 flex justify-center h-screen place-items-center">
      <canvas
        id="myPixelEditorCanvas"
        width={600}
        height={600}
        className="border-4"
      />
    </div>
  );
}

export default PixelArtEditorDemo;

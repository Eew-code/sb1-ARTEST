import React from 'react';
import { ScanLine } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-4">
          <ScanLine className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold mb-4">AR Web Application</h1>
        <p className="text-gray-600 mb-6">
          To use this AR application, scan the Hiro marker below with your cameraa:
        </p>
        <div className="border-2 border-gray-200 rounded-lg p-4 mb-4">
          <img 
            src="../public/pattern_heart_marker_text.patt"
            alt="Hiro Marker"
            className="w-48 h-48 mx-auto"
          />
        </div>
        <p className="text-sm text-gray-500">
          Point your camera at this marker to see the AR content1
        </p>
      </div>
    </div>
  );
}

export default App;

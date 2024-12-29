// Camera stream management and utilities
export async function getCameraStream(constraints) {
  try {
    // Request permissions first
    const result = await navigator.permissions.query({ name: 'camera' });
    if (result.state === 'denied') {
      throw new Error('Camera permission denied');
    }

    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (error) {
    console.debug('Camera stream error:', error);
    throw error;
  }
}

export function getOptimalCameraConstraints(devices) {
  // Try to get back camera first
  const backCamera = devices.find(d => 
    d.label.toLowerCase().includes('back') || 
    d.label.toLowerCase().includes('rear')
  );

  const constraints = {
    video: {
      facingMode: 'environment',
      width: { ideal: 1280 },
      height: { ideal: 720 }
    }
  };

  // Only set deviceId if we found a back camera
  if (backCamera) {
    constraints.video.deviceId = { exact: backCamera.deviceId };
    delete constraints.video.facingMode;
  }

  return constraints;
}

export function isCameraAvailable() {
  return !!(navigator.mediaDevices && 
    navigator.mediaDevices.getUserMedia && 
    navigator.permissions);
}

export function getFallbackConstraints() {
  return {
    video: {
      facingMode: 'environment',
      width: { ideal: 640 },
      height: { ideal: 480 }
    }
  };
}
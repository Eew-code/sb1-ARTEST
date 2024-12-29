import { 
  getCameraStream, 
  getOptimalCameraConstraints, 
  isCameraAvailable,
  getFallbackConstraints 
} from './cameraUtils.js';

export async function checkCameraAvailability() {
    if (!isCameraAvailable()) {
        return { 
            hasCamera: false,
            error: new Error('Camera API not available')
        };
    }

    try {
        // Try to get permission status first
        const permissionStatus = await navigator.permissions.query({ name: 'camera' });
        if (permissionStatus.state === 'denied') {
            return {
                hasCamera: false,
                error: new Error('Camera permission denied')
            };
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        if (videoDevices.length === 0) {
            // Try a basic camera check before giving up
            try {
                const stream = await getCameraStream(getFallbackConstraints());
                stream.getTracks().forEach(track => track.stop());
                return { hasCamera: true, devices: [] };
            } catch (fallbackError) {
                return { 
                    hasCamera: false,
                    error: new Error('No camera devices found')
                };
            }
        }
        
        return { 
            hasCamera: true,
            devices: videoDevices
        };
    } catch (error) {
        console.debug('Camera enumeration error:', error);
        // Try basic camera access as last resort
        try {
            const stream = await getCameraStream(getFallbackConstraints());
            stream.getTracks().forEach(track => track.stop());
            return { hasCamera: true, devices: [] };
        } catch (fallbackError) {
            return { 
                hasCamera: false,
                error: fallbackError
            };
        }
    }
}

export function checkCompatibility(showError) {
    if (!isCameraAvailable()) {
        showError(
            'Browser Not Supported',
            'Your browser does not support camera access.',
            'Please use a modern browser like Chrome, Firefox, or Safari.'
        );
        return false;
    }

    if (!window.WebGLRenderingContext) {
        showError(
            'WebGL Not Supported',
            'Your device does not support WebGL, which is required for AR.',
            'Try updating your browser or graphics drivers.'
        );
        return false;
    }

    return true;
}

export async function initializeCamera(constraints = null) {
    try {
        // First check camera availability
        const { hasCamera, devices, error } = await checkCameraAvailability();
        if (!hasCamera) {
            throw error || new Error('Camera not available');
        }

        // Try with provided constraints first
        if (constraints) {
            try {
                const stream = await getCameraStream(constraints);
                return { success: true, stream };
            } catch (error) {
                console.debug('Failed with provided constraints, falling back...');
            }
        }

        // Try optimal constraints
        try {
            const optimalConstraints = getOptimalCameraConstraints(devices || []);
            const stream = await getCameraStream(optimalConstraints);
            return { success: true, stream };
        } catch (error) {
            console.debug('Failed with optimal constraints, trying fallback...');
        }

        // Final fallback
        const fallbackStream = await getCameraStream(getFallbackConstraints());
        return { success: true, stream: fallbackStream };
    } catch (error) {
        console.debug('Final camera initialization error:', error);
        return { 
            success: false, 
            error: error
        };
    }
}
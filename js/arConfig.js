// AR scene configuration and utilities
export const AR_CONFIG = {
    markerSettings: {
        type: 'pattern',
        preset: 'hiro',
        size: 1.0 // physical marker size in meters
    },
    
    videoSettings: {
        // Sample video from Google (Creative Commons)
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        width: 1.6,
        height: 0.9,
        position: { x: 0, y: 0.1, z: 0 }, // Slightly above the marker
        rotation: { x: -90, y: 0, z: 0 }, // Flat on marker
        scale: { x: 1, y: 1, z: 1 }
    }
};
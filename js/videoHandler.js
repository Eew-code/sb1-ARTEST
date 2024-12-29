// Video configuration and handling
export const VIDEO_CONFIG = {
    // Sintel trailer (Creative Commons)
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    width: 1.6,
    height: 0.9,
    position: { x: 0, y: 0.1, z: 0 },
    rotation: { x: -90, y: 0, z: 0 }
};

export function initVideoElement(video) {
    if (!video) return;
    
    // Force video settings for better compatibility
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.crossOrigin = 'anonymous';
    
    return new Promise((resolve, reject) => {
        video.addEventListener('loadedmetadata', () => resolve(video));
        video.addEventListener('error', (err) => reject(err));
        
        // Ensure video is loaded
        if (video.readyState >= 2) {
            resolve(video);
        }
    });
}

export function playVideo(video) {
    if (!video || !video.play) return;
    
    // Always mute before playing to ensure autoplay works
    video.muted = true;
    return video.play().catch(err => {
        console.warn('Video autoplay failed:', err);
        // Video will still work when marker is found and user interacts
    });
}
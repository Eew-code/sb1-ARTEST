export function showError(errorModal, errorTitle, errorMessage, errorDetails, scene, title, message, details = '') {
    console.error(`AR Error: ${title} - ${message}`);
    errorTitle.textContent = title;
    errorMessage.textContent = message;
    errorDetails.textContent = details;
    errorModal.classList.add('visible');
    scene.style.display = 'none';
}

export function updateStatus(statusIndicator, message) {
    console.log(`AR Status: ${message}`);
    statusIndicator.textContent = message;
}
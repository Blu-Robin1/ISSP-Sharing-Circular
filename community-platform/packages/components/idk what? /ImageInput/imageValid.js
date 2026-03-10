// Basic check using the filereader api to see whether we can create a displayable image
// If this fails then there is a problem with the file
export const imageValid = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject();
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.onload = () => {
                // Image loaded successfully
                img.remove();
                resolve();
            };
            img.onerror = () => {
                // Image failed to load (possibly corrupted)
                img.remove();
                reject();
            };
            img.src = e.target?.result;
        };
        reader.onerror = () => {
            // Error reading file. It might be corrupted.
            reject();
        };
        reader.readAsDataURL(file);
    });
};

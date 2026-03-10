export const setSrc = (file) => {
    if (!file)
        return '';
    const downloadFile = file;
    if (downloadFile.downloadUrl) {
        return downloadFile.downloadUrl;
    }
    const photoFile = file;
    if (photoFile.photoData) {
        return URL.createObjectURL(photoFile.photoData);
    }
    return '';
};

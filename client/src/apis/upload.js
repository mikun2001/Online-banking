import app from './index';

export const uploadService = app.service('/upload-test');

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('uri[]', file);
    formData.append('folderName', 'IMCA-Bank');
    return uploadService.create(formData);
};

export const ALLOW_N_FILE = 'Chỉ cho phép tải tối đa {imageCount} file.';

export const BROWSER_CANNOT_READ_FILE = 'Trình duyệt chưa nhận được file.';
export const INVALID_FILE = 'File không hợp lệ.';

export const getValidateMessage = (template, params) => {
    return template.replace(/{(\w+)}/g, (_, key) => params[key] ?? '');
}
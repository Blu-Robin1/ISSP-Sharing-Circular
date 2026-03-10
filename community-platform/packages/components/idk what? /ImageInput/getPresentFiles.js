/**
 * As input can be both array or single object and either uploaded or converted meta,
 * require extra function to separate out to handle preview of previously uploaded
 */
export const getPresentFiles = (value) => {
    if (!value)
        return [];
    const valArray = Array.isArray(value) ? value : [value];
    return valArray.filter((value) => {
        if (Object.hasOwn(value, 'downloadUrl')) {
            return value;
        }
        if (Object.hasOwn(value, 'objectUrl')) {
            return value;
        }
    });
};

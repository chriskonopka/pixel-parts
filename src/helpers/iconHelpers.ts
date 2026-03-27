export const getFileIconProps = (fileName: string) => {
    const type = fileName.split('.').pop()?.toUpperCase();
        
    switch (type) {
        case 'PDF':
            return { type, color: 'red' };
        case 'DOCX':
            return { type, color: 'blue' };
        case 'PPTX':
            return { type, color: 'gold' };
        case 'XLSX':
        case 'XLS':
            return { type, color: 'green' };
        case 'TXT':
            return { type, color: 'purple' };
        default:
            return { type, color: 'black' };
    }
}
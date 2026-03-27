export const mergeFileLists = (fileList1: FileList, fileList2: FileList): FileList => {
  const dataTransfer = new DataTransfer();

  for (let i = 0; i < fileList1.length; i++) {
    dataTransfer.items.add(fileList1[i]);
  }

  for (let i = 0; i < fileList2.length; i++) {
    dataTransfer.items.add(fileList2[i]);
  }

  return dataTransfer.files;
};

export const arrayToFileList = (fileArray): FileList => {
  const dataTransfer = new DataTransfer();
  fileArray.forEach(file => dataTransfer.items.add(file));
  return dataTransfer.files;
}

export const fileListToBlobArray = async (fileList: FileList): Promise<Blob[]> => {
  const blobArray: Blob[] = [];

  for (const file of fileList) {
    const buffer = await file.arrayBuffer();
    const blob = new Blob([buffer], { type: file.type });
    blobArray.push(blob);
  }

  return blobArray;
}

export const fileToBlob = async (file: File): Promise<Blob> => {
  const buffer = await file.arrayBuffer();
  const blob = new Blob([buffer], { type: file.type }); 
  return blob;
};

export const blobArrayToFileList = (blobArray, fileNames): FileList => {
  const fileList = new DataTransfer();

  blobArray.forEach((blob, index) => {
    const fileName = fileNames && fileNames[index] ? fileNames[index] : `file${index + 1}`;
    const file = new File([blob], fileName, { type: blob.type });
    fileList.items.add(file);
  });

  return fileList.files;
}

export const blobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: blob.type }); 
};

export const addFileToFileList = (file: File, fileList?: FileList | undefined): FileList => {
  const dataTransfer = new DataTransfer();

  if (fileList) {
    for (let i = 0; i < fileList.length; i++) {
      dataTransfer.items.add(fileList[i]);
    }
  }

  dataTransfer.items.add(file);
  return dataTransfer.files;
}

export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} bytes`;
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return `${sizeInKB.toFixed(2)} KB`;
  } else {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return `${sizeInMB.toFixed(2)} MB`;
  }
};

export const getFileNameWithoutExtension = (fullFileName): string => {
  if (typeof fullFileName !== 'string') return '';

  const lastDotIndex = fullFileName.lastIndexOf('.');
  if (lastDotIndex === -1) return fullFileName;

  return fullFileName.substring(0, lastDotIndex);
}

export const base64ToFile = (base64, fileName, mimeType = 'application/pdf'): File => {
  const byteString = atob(base64);
  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return new File([byteArray], fileName, { type: mimeType, lastModified: Date.now() });
}
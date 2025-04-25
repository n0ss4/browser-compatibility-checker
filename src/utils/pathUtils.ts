import path from 'path';

export function truncatePath(filePath: string, maxLength: number): string {
  if (filePath.length <= maxLength) return filePath;

  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath);

  if (fileName.length >= maxLength - 3) {
    return '...' + fileName.slice(-(maxLength - 3));
  }

  return dirName.slice(0, maxLength - fileName.length - 4) + '/.../' + fileName;
}

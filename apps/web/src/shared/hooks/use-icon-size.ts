export function useIconSize(width: number, height: number, size: number) {
  const aspectRatio = width / height
  const newWidth = size
  const newHeight = size / aspectRatio

  return [newWidth, newHeight]
}

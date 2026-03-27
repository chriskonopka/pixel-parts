export const getTextWidth = (
  text,
  fontSize = 16,
  fontFamily = "Segoe UI"
): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return 0;
  }

  context.font = `${fontSize}px ${fontFamily}`;

  const metrics = context.measureText(text);

  return metrics.width;
};

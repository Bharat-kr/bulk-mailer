export const cleanString = (text) => {
  // Remove unnecessary characters using regex
  const pattern = /[|_.?,/{}=-]/g;
  const cleanedText = text.replace(pattern, " ");

  return cleanedText.toUpperCase();
};

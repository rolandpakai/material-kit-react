export const containsKeyword = (content: string, keywords: string[]): boolean => {
  for (const word of keywords) {
    if (content.includes(word)) {
      return true;
    }
  }

  return false;
}
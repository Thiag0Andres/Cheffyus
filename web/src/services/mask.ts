export const removeSpecialChars = (specialChar: string) => {
  let newString = specialChar;
  newString = newString.replace(/[|&;$%@"<>()+,/]/g, '');
  newString = newString.replace(/_+/, '_');
  newString = newString.replace(/\s/g, '');
  newString = newString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  newString = newString.toLowerCase();
  return newString;
};

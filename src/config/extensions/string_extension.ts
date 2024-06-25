// * Formatea en Mayuscula la Primera letra
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1) ?? '';
};

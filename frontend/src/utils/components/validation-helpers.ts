export const lengthValidations = (
  value: string,
  minLength: number,
  maxLength: number,
  fieldName: string | null = null,
  message: string | null = null
) => {
  return value && value.length > minLength && value.length < maxLength
    ? null
    : message
    ? message
    : `${fieldName} must be between ${minLength} characters and ${maxLength} characters long`;
};

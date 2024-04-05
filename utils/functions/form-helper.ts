import { toUpper } from 'lodash';

/**
 * Updates the given form data object based on the input field type and provided value.
 * This function dynamically handles different types of form input such as numbers,
 * dates, and general text inputs.
 *
 * @template T - The type of the form data object.
 * @param {T} formData - The current state of the form data.
 * @param {keyof T} fieldName - The name of the field in the form data to update.
 * @param {string} value - The new value for the field, as a string.
 * @param {string} fieldType - The type of the field which influences how the value should be handled:
 *                             'number' for numeric inputs, 'date' for date inputs, and any other value
 *                             for generic text inputs.
 * @returns {T} - The updated form data object with the new value applied to the specified field.
 */
export const updateFormData = <T>(formData: T, fieldName: keyof T, value: string, fieldType: string): T => {
  switch (fieldType) {
    case 'number':
      return handleNumberInput(formData, fieldName, value);
    case 'date':
      return handleDateInput(formData, fieldName, value);
    default:
      return handleTextInput(formData, fieldName, value);
  }
};

const handleNumberInput = <T>(formData: T, fieldName: keyof T, value: string): T => {
  const numValue = Number(value);
  if (numValue < 1) {
    return { ...formData, [fieldName]: 1 } as T;
  }
  return { ...formData, [fieldName]: numValue } as T;
};

const handleDateInput = <T>(formData: T, fieldName: keyof T, value: string): T => {
  const date = new Date(value);
  let dateValue: string;

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    // getTime() returns NaN if the date is invalid
    dateValue = formData[fieldName] as unknown as string; // Preserves the current field value if invalid input is provided
  } else {
    dateValue = date.toISOString();
  }

  return { ...formData, [fieldName]: dateValue } as T;
};

const handleTextInput = <T>(formData: T, fieldName: keyof T, value: string): T => {
  if (fieldName === 'panNumber') {
    return { ...formData, [fieldName]: toUpper(value) } as T;
  }
  if (fieldName === 'mobileNumber') {
    const filteredValue = value.replace(/\D/g, '');
    return { ...formData, [fieldName]: filteredValue };
  }
  return { ...formData, [fieldName]: value } as T;
};

import { validatorType } from './interfaces';

export const validate = (validators: validatorType[], value: any, data: { [key: string]: string }) => {
  if (validators) {
    const currentErrors = validators.reduce((errors: string[] | null, validator: validatorType) => {
      const result = validator(value, data);
      if (result) {
        return errors ? [...errors, result] : [result];
      }
      return errors;
    }, null);
    return currentErrors;
  }
  return null;
};

export const required = (message: string) => (value: any) => {
  return value ? null : message;
};

export const minLength = (message: string, minLength: number) => (value: any) => {
  return value && value.length >= minLength ? null : message;
};

export const email = (message: string) => (value: any) => {
  return value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? null : message;
};

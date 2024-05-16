import { notificationsMethods } from './notifications';
import { localStorageMethods } from './localStorage';
import { lengthValidations } from './validation-helpers';

export const {
  successNotification,
  errorNotification,
  infoNotification,
  warningNotification,
} = notificationsMethods;

export const {
  getItemFromLocalStorage,
  setItemOnLocalStorage,
  removeItemFromLocalStorage,
} = localStorageMethods;

export const lengthValidator = lengthValidations;

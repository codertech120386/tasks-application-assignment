export const localStorageMethods = {
  getItemFromLocalStorage: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log('*********');
      console.log('key: ', key);
      console.log('*********');
      console.error('Error retrieving item from localStorage:', error);
      return null;
    }
  },
  setItemOnLocalStorage: (key: string, value: any) => {
    try {
      let serializedValue = value.toString();
      serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error setting item in localStorage:', error);
    }
  },
  removeItemFromLocalStorage: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
    }
  },
};

export default localStorageMethods;

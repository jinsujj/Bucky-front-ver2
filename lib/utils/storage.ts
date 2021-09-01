export type LocalStorageKey = 'buckyUSER' | 'prevPage';

export const setLocalstorageItem = (key: LocalStorageKey, value: string) => {
  localStorage.setItem(key, value);
};
export const getLocalStorageItem = (key: LocalStorageKey) => {
  return JSON.parse(localStorage.getItem(key) || 'null');
};
export const removeLocalstorageItem = (key: LocalStorageKey) => {
  localStorage.removeItem(key);
};
export const clearLocalstorageItem = () => {
  localStorage.clear();
};

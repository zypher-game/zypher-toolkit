import { DefaultValue } from "recoil";
export const localStorageEffect =
  (key: any) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      try {
        setSelf(JSON.parse(savedValue));
      } catch (error) {
        console.error("localStorageEffect:---", error);
      }
    }

    onSet((newValue: any) => {
      if (newValue instanceof DefaultValue || !newValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

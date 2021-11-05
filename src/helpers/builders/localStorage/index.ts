export type localStorageType = {
  user_id: string | null;
  merchant_id: string | null;
  token: string | null;
};
export type localStorageKeysType = keyof localStorageType;
export const arrayOfObjectsInLocalStorage: Array<localStorageKeysType> = [];

const rawLc = window.localStorage;
export function localStorageBuilder<storageType>() {
  type storageKeys = keyof storageType;

  return {
    get: function <T extends storageKeys>(key: T) {
      const item = rawLc.getItem(String(key));
      if (item) {
        return JSON.parse(item) as storageType[T];
      } else {
        return null;
      }
    },
    set: function <T extends storageKeys>(key: T, value: storageType[T]) {
      switch (typeof value) {
        case "string":
        case "number":
        case "boolean":
        case "object":
          rawLc.setItem(String(key), JSON.stringify(value));

          break;
        default:
          return;
      }
    },
    clearAll: function () {
      rawLc.clear();
    },
  };
}

const lcController = localStorageBuilder<{
  id: number;
  token: string;
  user: {
    name: string;
    id: number;
  };
}>();

const blob1 = lcController.get("token");

lcController.set("token", "");

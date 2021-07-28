import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 *
 * @param key
 * @param value : use JSON stringify for object
 * @returns
 */

export const storeData = async (
  key: string,
  value: string
): Promise<boolean> => {
  try {
    JSON.stringify;
    await AsyncStorage.setItem(key, value);

    return true;
  } catch (error) {
    return false;
  }
};

/**
 *
 * @param key :string
 * @returns : Use JSON parse for object
 */
export const getData = async (key: string): Promise<string | null> => {
  try {
    const value: string | null = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    return null;
  }
};

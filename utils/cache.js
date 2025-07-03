import AsyncStorage from '@react-native-async-storage/async-storage';
export async function setCache(key, data, ttl) {
  await AsyncStorage.setItem(key, JSON.stringify({ data, expiry: Date.now()+ttl*1000 }));
}
export async function getCache(key) {
  const json = await AsyncStorage.getItem(key);
  if (!json) return null;
  const { data, expiry } = JSON.parse(json);
  if (Date.now()>expiry) { await AsyncStorage.removeItem(key); return null; }
  return data;
}
import AsyncStorage from "@react-native-async-storage/async-storage";
const KEY = "WLISTS";
export async function getWatchlists() {
  const j = await AsyncStorage.getItem(KEY);
  return j ? JSON.parse(j) : [];
}
export async function getItems(w) {
  const j = await AsyncStorage.getItem("WL_" + w);
  return j ? JSON.parse(j) : [];
}
export async function addToWatchlist(w, s) {
  let L = await getWatchlists();
  if (!L.includes(w)) {
    L.push(w);
    await AsyncStorage.setItem(KEY, JSON.stringify(L));
  }
  let I = await getItems(w);
  if (!I.includes(s)) {
    I.push(s);
    await AsyncStorage.setItem("WL_" + w, JSON.stringify(I));
  }
}
export async function removeFromWatchlist(w, s) {
  let I = await getItems(w);
  I = I.filter((x) => x !== s);
  await AsyncStorage.setItem("WL_" + w, JSON.stringify(I));
}
export async function isInAnyWatchlist(s) {
  let L = await getWatchlists();
  for (let w of L) {
    if ((await getItems(w)).includes(s)) return true;
  }
  return false;
}


import axios from "axios";
import { getCache, setCache } from "../utils/cache";
import Constants from "expo-constants";

const API_KEY = Constants.expoConfig.extra.API_KEY;
const BASE = "https://www.alphavantage.co/query";
const client = axios.create({ baseURL: BASE });
client.interceptors.request.use(async (cfg) => {
  const k = cfg.url + JSON.stringify(cfg.params);
  const c = await getCache(k);
  if (c) return Promise.reject({ __cache: 1, data: c });
  return cfg;
});
client.interceptors.response.use(
  async (res) => {
    const k = res.config.url + JSON.stringify(res.config.params);
    await setCache(k, res.data, 30000);
    return res;
  }, 
  (err) => {
    if (err.__cache) return { data: err.data };
    return Promise.reject(err);
  }
);
export const fetchOverview = (s) =>
  client
    .get("", { params: { function: "OVERVIEW", symbol: s, apikey: API_KEY } })
    .then((r) => r.data);
export const fetchMovers = () =>
  client
    .get("", { params: { function: "TOP_GAINERS_LOSERS", apikey: API_KEY } })
    .then((r) => r.data);
export const fetchIntraday = (s, interval = "5min", size = "compact") =>
  client
    .get("", {
      params: {
        function: "TIME_SERIES_INTRADAY",
        symbol: s,
        interval,
        outputsize: size,
        apikey: API_KEY,
      },
    })
    .then((r) => r.data);

    export const fetchQuote = (s) =>
  client
    .get("", { params: { function: "GLOBAL_QUOTE", symbol: s, apikey: API_KEY } })
    .then((r) => {
      const q = r.data["Global Quote"] || {};
      const price = parseFloat(q["05. price"] || "0");
      const changePct = q["10. change percent"] || "0%";
      const change = changePct;

      return { price, changePct, change };
    });

  

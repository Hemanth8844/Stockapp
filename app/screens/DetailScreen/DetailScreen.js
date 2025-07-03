import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import PriceChart from '../../../components/Chart/PriceChart';
import SaveModal from '../../../components/SaveModel/SaveModal';
import { isInAnyWatchlist } from '../../../store/watchlist';
import { fetchOverview, fetchIntraday, fetchMovers } from '../../../api/alphavantage';
import s from './DetailScreenStyle';
const POINTER_SIZE = 10;
class ApiLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ApiLimitError';
  }
}

export default function DetailScreen({ route, navigation }) {
  const { symbol } = route.params;

  const [overview, setOverview] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [tickerData, setTickerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedRange, setSelectedRange] = useState('1D');
  const [barWidth, setBarWidth] = useState(0);
  const [logoBg] = useState(() =>
    `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')}`
  );
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
     
        const ov = await fetchOverview(symbol);
        if (!ov) throw new Error('No overview');
        if (ov.Note || ov.Information) {
          throw new ApiLimitError(ov.Note || ov.Information);
        }
        const intraday = await fetchIntraday(symbol);
        if (!intraday) throw new Error('No intraday');
        if (intraday.Note || intraday.Information) {
          throw new ApiLimitError(intraday.Note || intraday.Information);
        }
        const raw = intraday['Time Series (5min)'] || {};
        const dataPoints = Object.entries(raw)
          .map(([time, v]) => ({ x: time, y: parseFloat(v['4. close']) }))
          .filter(p => Number.isFinite(p.y))
          .reverse();
        let mvData = {};
        try {
          const mv = await fetchMovers();
          if (mv.Note || mv.Information) {
            console.warn('Movers API limit:', mv.Note || mv.Information);
          } else {
            const all = [
              ...(mv.top_gainers || []),
              ...(mv.top_losers || []),
            ].map(i => ({
              ticker: i.ticker.replace(/[+=-]/g, ''),
              price: parseFloat(i.price),
              change: i.change_percentage,
            }));
            mvData = all.find(i => i.ticker === symbol) || {};
          }
        } catch (e) {
          console.warn('Movers fetch failed', e);
        }

        // Check saved state
        const saved = await isInAnyWatchlist(symbol);

        // Populate state
        setOverview(ov);
        setChartData(dataPoints);
        setTickerData(mvData);
        setIsSaved(saved);
      } catch (e) {
        console.warn(e);
        if (e instanceof ApiLimitError) {
          setError('API limit hit – please try again later.');
        } else {
          setError('Error loading data');
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [symbol]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

if (error || !overview) {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={[ s.header, { alignSelf: 'stretch' } ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Detail Screen</Text>
        <TouchableOpacity >
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: '#ea3943', fontSize: 16, textAlign: 'center' }}>
          {error || 'No data'}
        </Text>
      </View>
    </View>
  );
}


  const currentPrice = tickerData.price?.toFixed(2) || '--';
  const changePct = tickerData.change || '--';
  const low = parseFloat(overview['52WeekLow']);
  const high = parseFloat(overview['52WeekHigh']);
  const price = parseFloat(currentPrice) || low;
  const ratio = high > low ? (price - low) / (high - low) : 0;

  return (
    <ScrollView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Detail Screen</Text>
        <TouchableOpacity onPress={() => setSaveModalVisible(true)}>
          <MaterialIcons
            name={isSaved ? 'bookmark' : 'bookmark-border'}
            size={24}
            color={isSaved ? '#0a84ff' : '#888'}
          />
        </TouchableOpacity>
      </View>
      <View style={s.card}>
        <View style={s.stockOverview}>
          <View style={[s.logoCircle, { backgroundColor: logoBg }]}>
            {overview.ImageUrl ? (
              <Image source={{ uri: overview.ImageUrl }} style={s.logo} />
            ) : (
              <View style={s.logoPlaceholder} />
            )}
          </View>
          <View style={s.stockText}>
            <Text style={s.companyName}>{overview.Name.toUpperCase()}</Text>
            <Text style={s.symbolText}>
              {symbol}, {overview.AssetType}
            </Text>
            <Text style={s.exchangeText}>{overview.Exchange}</Text>
          </View>
          <View style={s.priceBlock}>
            <Text style={s.price}>${currentPrice}</Text>
            <Text style={[s.changePct, changePct.startsWith('-') ? s.neg : s.pos]}>
              {changePct}
            </Text>
          </View>
        </View>
      </View>
      <View style={s.chartCard}>
        <PriceChart data={chartData} style={{ height: 200 }} />
        <View style={s.rangeButtons}>
          {['1D', '1W', '1M', '3M', '6M', '1Y'].map(r => (
            <TouchableOpacity
              key={r}
              onPress={() => setSelectedRange(r)}
              style={[s.rangeBtn, r === selectedRange && s.rangeActive]}
            >
              <Text style={[s.rangeText, r === selectedRange && s.rangeActiveText]}>
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={s.card1}>
        <View style={s.card}>
          <Text style={s.sectionTitle}>{overview.Name.toUpperCase()}</Text>
          <Text style={s.description}>{overview.Description}</Text>
          <View style={s.tagsRow}>
            <View style={s.tag}>
              <Text style={s.tagText}>Industry: {overview.Industry}</Text>
            </View>
            <View style={s.tag}>
              <Text style={s.tagText}>Sector: {overview.Sector}</Text>
            </View>
          </View>
        </View>
        <View style={s.card}>
          {/* Slider Labels */}
          <View style={s.sliderHeader}>
            <Text style={s.sliderHeaderText}>52 Week Low</Text>
            <Text style={s.sliderHeaderText}>52 Week High</Text>
          </View>

          <View style={s.sliderContainer}>
            <Text style={s.sliderLabel}>${overview['52WeekLow']}</Text>
            <View
              style={s.sliderBar}
              onLayout={e => setBarWidth(e.nativeEvent.layout.width)}
            >
              <View
                style={[
                  s.sliderPointer,
                  {
                    left: Math.min(
                      Math.max(ratio * barWidth - POINTER_SIZE / 2, -POINTER_SIZE / 2),
                      barWidth - POINTER_SIZE / 2
                    ),
                  },
                ]}
              />
            </View>
            <Text style={s.sliderLabel}>${overview['52WeekHigh']}</Text>
          </View>
          <Text style={s.currentPriceLabel}>Current price: ${currentPrice}</Text>

          <View style={s.statsRow}>
            <View style={s.statItem}>
              <Text style={s.statLabel}>Market Cap</Text>
              <Text style={s.statValue}>${overview.MarketCapitalization}</Text>
            </View>
            <View style={s.statItem}>
              <Text style={s.statLabel}>P/E Ratio</Text>
              <Text style={s.statValue}>{overview.PERatio}</Text>
            </View>
            <View style={s.statItem}>
              <Text style={s.statLabel}>Beta</Text>
              <Text style={s.statValue}>{overview.Beta}</Text>
            </View>
            <View style={s.statItem}>
              <Text style={s.statLabel}>Dividend Yield</Text>
              <Text style={s.statValue}>{overview.DividendYield}</Text>
            </View>
            <View style={s.statItem}>
              <Text style={s.statLabel}>Profit Margin</Text>
              <Text style={s.statValue}>{overview.ProfitMargin}</Text>
            </View>
          </View>
        </View>
      </View>

      <SaveModal
        visible={saveModalVisible}
        symbol={symbol}
        onClose={() => setSaveModalVisible(false)}
      />
    </ScrollView>
  );
}



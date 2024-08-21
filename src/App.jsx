import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import CoinSelector from './components/CoinSelector/CoinSelector';
import PeriodSelector from './components/PeriodSelector/PeriodSelector';
import GraphComponent from './components/GraphComponent/GraphComponent';
import './styles/App.css';
import mainApi from './utils/MainApi';

function App() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [period, setPeriod] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchHourlyExchangeVolume() {
    try {
      setIsLoading(true);
      const response = await mainApi.getHourlyExchangeVolume(
        selectedCoin,
        period
      );
      setData(response.Data);
    } catch (error) {
      console.error(
        'Ошибка при получении информации об изменении объема обменов:',
        error
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Загружаем список монет при монтировании компонента
    const fetchCoins = async () => {
      try {
        const response = await mainApi.getCoinList();
        setCoins(Object.keys(response.Data));
      } catch (error) {
        console.error('Ошибка при получении списка монет:', error);
      }
    };

    fetchCoins();
  }, []);

  useEffect(() => {
    if (selectedCoin && period) {
      fetchHourlyExchangeVolume();
    }
  }, [selectedCoin, period]);

  function handleRefresh() {
    // Обновляем данные при нажатии на кнопку Refresh
    if (selectedCoin && period) {
      fetchHourlyExchangeVolume();
    }
  }

  return (
    <div className="body">
      <div className="page">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <header className="header">
                  <PeriodSelector
                    onSelectPeriod={setPeriod}
                    selectedPeriod={period}
                  />
                  <button className="header__refresh" onClick={handleRefresh}>
                    Refresh
                  </button>
                  <CoinSelector
                    coins={coins}
                    onSelectCoin={setSelectedCoin}
                    selectedCoin={selectedCoin}
                  />
                </header>
                <main className="main">
                  <GraphComponent data={data} isLoading={isLoading} />
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

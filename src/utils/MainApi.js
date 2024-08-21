export class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(response) {
    return response.ok
      ? response.json()
      : response.json().then((errData) => Promise.reject(errData));
  }

  // Метод для получения списка монет
  getCoinList() {
    return fetch(`${this._url}/blockchain/list`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Метод для получения почасового объема обменов
  getHourlyExchangeVolume(coin, period) {
    const limit = period * 24;
    const aggregate = period;
    const aggregatePredictableTimePeriods = true;

    return fetch(
      `${this._url}/exchange/histohour?tsym=${coin}&limit=${limit}&aggregate=${aggregate}&aggregatePredictableTimePeriods=${aggregatePredictableTimePeriods}`,
      {
        headers: this._headers,
      }
    ).then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  url: 'https://min-api.cryptocompare.com/data',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Apikey 561b85a8211cd214edd2d2ce038875bab6086bba889862ca516540c246220e27',
  },
});

export default mainApi;

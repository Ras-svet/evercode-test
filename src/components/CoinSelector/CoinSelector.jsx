import React, { useRef } from 'react';
import './CoinSelector.css';
import useSelectWidth from '../../hooks/useSelectWidth';

function CoinSelector({ coins, onSelectCoin, selectedCoin }) {
  const selectRef = useRef(null);
  const selectWidth = useSelectWidth(selectRef, selectedCoin);

  const handleChange = (e) => {
    onSelectCoin(e.target.value);
  };

  return (
    <select
      ref={selectRef}
      className="coins"
      style={{ width: selectWidth }}
      onChange={handleChange}
      value={selectedCoin}
    >
      {coins.map((coin) => (
        <option className="coin" key={coin} value={coin}>
          {coin}
        </option>
      ))}
    </select>
  );
}

export default CoinSelector;

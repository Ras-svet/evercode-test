import React from 'react';
import './PeriodSelector.css';

const periods = [
  { value: 1, label: 'Day' },
  { value: 3, label: '3 Days' },
  { value: 7, label: 'Week' },
  { value: 30, label: 'Month' },
];

function PeriodSelector({ onSelectPeriod, selectedPeriod }) {
  return (
    <div className="period">
      {periods.map((period) => (
        <button
          key={period.value}
          className={`period__button ${selectedPeriod === period.value ? 'period__button_active' : ''}`}
          onClick={() => onSelectPeriod(period.value)}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}

export default PeriodSelector;

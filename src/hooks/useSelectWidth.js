import { useState, useEffect } from 'react';

// Хук для вычисления ширины select
const useSelectWidth = (selectRef, selectedCoin) => {
  const [selectWidth, setSelectWidth] = useState('auto');

  useEffect(() => {
    const updateSelectWidth = () => {
      if (selectRef.current) {
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.style.position = 'absolute';
        tempSpan.style.top = '-9999px';

        const selectedOption = selectRef.current.querySelector(
          `option[value="${selectedCoin}"]`
        );
        tempSpan.textContent = selectedOption
          ? selectedOption.textContent
          : 'Chooose';

        document.body.appendChild(tempSpan);
        setSelectWidth(`${tempSpan.offsetWidth + 50}px`);
        document.body.removeChild(tempSpan);
      }
    };

    updateSelectWidth();

    const handleChange = () => updateSelectWidth();
    const currentSelect = selectRef.current;
    currentSelect?.addEventListener('change', handleChange);

    return () => {
      currentSelect?.removeEventListener('change', handleChange);
    };
  }, [selectRef, selectedCoin]);

  return selectWidth;
};

export default useSelectWidth;

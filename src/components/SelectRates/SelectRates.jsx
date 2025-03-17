import Select from 'react-select';

import symbols from './symbols.json';

import styles from './SelectRates.module.css';

import './ReactSelect.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBaseCurrency } from '../../redux/currency/slice';

const SelectRates = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(selectBaseCurrency);
  // const [baseCurrency, setBaseCurrency] = useState();
  const onChange = e => {
    dispatch();
  };
  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        onChange={onChange}
        className={styles.select}
        classNamePrefix="react-select"
        value={{
          label: baseCurrency,
          value: baseCurrency,
        }}
        options={symbols}
        isSearchable
      />
    </div>
  );
};

export default SelectRates;

import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import { MdCurrencyExchange } from 'react-icons/md';

import styles from './Header.module.css';
import { useSelector } from 'react-redux';
import { selectBaseCurrency } from '../../redux/currency/slice';
import SelectRates from '../SelectRates/SelectRates';

const Header = ({ children }) => {
  const baseCurrency = useSelector(selectBaseCurrency);
  const addActive = ({ isActive }) => (isActive ? styles.active : styles.link);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <MdCurrencyExchange className={styles.logo} />

          <nav>
            <ul className={styles.nav}>
              <li>
                <NavLink to="/" className={addActive}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/rates" className={addActive}>
                  Rates
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        {baseCurrency && <SelectRates baseCurrency={baseCurrency} />}
        <span>{baseCurrency}</span>
      </header>
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
};

export default Header;

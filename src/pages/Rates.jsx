import { Wave } from 'react-animated-text';

import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import RatesList from '../components/RatesList/RatesList';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRates,
  selectBaseCurrency,
  selectRates,
} from '../redux/currency/slice';
import { useEffect } from 'react';

const Rates = () => {
  const isError = false;
  const ratesF = useSelector(selectRates);
  const baseCurrency = useSelector(selectBaseCurrency);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRates(baseCurrency));
  }, []);

  const rates = ratesF
    .filter(([key]) => key !== baseCurrency)
    .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {rates.length > 0 && <RatesList rates={rates} />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;

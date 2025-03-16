import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { getExchangeInfo } from '../../redux/currency/slice';

const pattern = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;

const ExchangeForm = () => {

  const dispath = useDispatch();

  const handleSubmit =(e) => {
    e.preventDefault();
    const value = e.target.req.value.trim();
    const isValid= pattern.test(value);
    if(!isValid) return;
    const [amount, from, , to] = value.split(' ');
    
    const reqData = {amount, from, to};

    dispath(getExchangeInfo(reqData));
    
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input title="Request format 15 USD in UAH" className={styles.input} name='req'/>
    </form>
  );
};

export default ExchangeForm;

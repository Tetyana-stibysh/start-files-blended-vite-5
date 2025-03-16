import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserCurrency } from '../../service/opencagedataApi';

export const getBaseCurrency = createAsyncThunk(
  'currency/getBaseCurrency',
  async (crd, { rejectWithValue }) => {
    try {
      const currency = await getUserCurrency(crd);
      return currency;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

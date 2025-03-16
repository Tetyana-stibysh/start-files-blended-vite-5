import { exchangeCurrency, getUserCurrency } from '../../service';
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
  baseCurrency: '',
  exchangeInfo: null,
  isLoading: false,
  error: null,
};

export const currencySlice = createAppSlice({
  name: 'currency',
  initialState,
  selectors: {
    selectBaseCurrency: state => state.baseCurrency,
    selectExchangeInfo: state => state.exchangeInfo,
  },
  //   extraReducers: builder => {
  //     builder.addCase(getBaseCurrency.fulfilled, (state, { payload }) => {
  //       state.baseCurrency = payload;
  //     });
  //   },
  reducers: create => ({
    getBaseCurrency: create.asyncThunk(
      async (crd, { rejectWithValue, getState }) => {
        try {
          const { baseCurrency } = getState().currency;

          if (baseCurrency) return rejectWithValue(null);

          const currency = await getUserCurrency(crd);
          return currency;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      },
      {
        fulfilled: (state, action) => {
          state.baseCurrency = action.payload;
        },
      },
    ),
    getExchangeInfo: create.asyncThunk(
      async (reqData, { rejectWithValue}) => {
        try {
          
          const data = await exchangeCurrency(reqData);

          return data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      },
      {
        fulfilled: (state, action) => {
          state.exchangeInfo = action.payload;
          state.isLoading = false;
          
        },
        pending: (state) => {
          state.isLoading= true;
          state.error = null;
        },
        rejected: (state, action) => {
          state.error = action.payload;
        }
      },
    ),
  }),
});

export const { selectBaseCurrency, selectExchangeInfo } = currencySlice.selectors;
export const { getBaseCurrency, getExchangeInfo } = currencySlice.actions;

import { getUserCurrency } from '../../service';
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
  baseCurrency: '',
};

export const currencySlice = createAppSlice({
  name: 'currency',
  initialState,
  selectors: {
    selectBaseCurrency: state => state.baseCurrency,
  },
  //   extraReducers: builder => {
  //     builder.addCase(getBaseCurrency.fulfilled, (state, { payload }) => {
  //       state.baseCurrency = payload;
  //     });
  //   },
  reducers: create => ({
    getBaseCurrency: create.asyncThunk(
      async (crd, { rejectWithValue }) => {
        try {
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
  }),
});

export const { selectBaseCurrency } = currencySlice.selectors;
export const { getBaseCurrency } = currencySlice.actions;

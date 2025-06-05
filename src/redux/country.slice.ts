import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rechargeService } from '@/services/recharge.service';
import type { Country, CreateCountryRequest, Operator, CreateOperatorRequest, UpdateOperatorRequest } from '@/services/recharge.service';

// Async thunks
export const fetchCountries = createAsyncThunk(
  'country/fetchCountries',
  async () => {
    const response = await rechargeService.getCountries();
    return response;
  }
);

export const createCountry = createAsyncThunk(
  'country/createCountry',
  async (data: CreateCountryRequest) => {
    const response = await rechargeService.createCountry(data);
    return response;
  }
);

export const deleteCountry = createAsyncThunk(
  'country/deleteCountry',
  async (code: string) => {
    await rechargeService.deleteCountry(code);
    return code;
  }
);
export const deleteOperator = createAsyncThunk(
  'country/deleteOperator',
  async (id: string) => {
    await rechargeService.deleteOperator(id);
    return id;
  }
);

export const updateCountry = createAsyncThunk(
  'country/updateCountry',
  async ({ code, active }: { code: string; active: boolean }) => {
    const response = await rechargeService.updateCountryActive(code, active);
    return response;
  }
);
export const getAllCountries = createAsyncThunk(
  'country/getAllCountries',
  async () => {
    const response = await rechargeService.getAllCountries();
    return response;
  }
);
interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch countries
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action: any) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch countries';
      })
      // Create country
      .addCase(createCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.countries.push(action.payload);
      })
      .addCase(createCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create country';
      })
      // Delete country
      .addCase(deleteCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = state.countries.filter(country => country.code !== action.payload);
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete country';
      })
      // Delete operator
      .addCase(deleteOperator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOperator.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = state.countries.map(country => ({
          ...country,
          operators: country.operators?.filter(op => op.id !== action.payload) || []
        }));
      })
      .addCase(deleteOperator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete operator';
      })
  },
});

export default countrySlice.reducer; 
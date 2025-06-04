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

export const createOperator = createAsyncThunk(
  'country/createOperator',
  async (data: CreateOperatorRequest) => {
    const response = await rechargeService.createOperator(data);
    return response;
  }
);

export const deleteOperator = createAsyncThunk(
  'country/deleteOperator',
  async (id: string) => {
    await rechargeService.deleteOperator(id);
    return id;
  }
);

export const updateOperator = createAsyncThunk(
  'country/updateOperator',
  async ({ id, data }: { id: string; data: UpdateOperatorRequest }) => {
    const response = await rechargeService.updateOperator(id, data);
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
      .addCase(fetchCountries.fulfilled, (state, action : any) => {
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
      // Create operator
      .addCase(createOperator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOperator.fulfilled, (state, action) => {
        state.loading = false;
        const country = state.countries.find(c => c.code === action.payload.countryCode);
        if (country) {
          if (!country.operators) {
            country.operators = [];
          }
          country.operators.push(action.payload);
        }
      })
      .addCase(createOperator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create operator';
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
      // Update operator
      .addCase(updateOperator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOperator.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = state.countries.map(country => ({
          ...country,
          operators: country.operators?.map(op => 
            op.id === action.payload.id ? action.payload : op
          ) || []
        }));
      })
      .addCase(updateOperator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update operator';
      });
  },
});

export default countrySlice.reducer; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rechargeService } from '@/services/recharge.service';

export interface PaymentSettings {
  stripe: {
    enabled: boolean;
    publicKey: string;
    secretKey: string;
    webhookSecret: string;
  };
  paypal: {
    enabled: boolean;
    clientId: string;
    clientSecret: string;
    mode: 'sandbox' | 'live';
  };
  reloadly: {
    enabled: boolean;
    apiKey: string;
    apiSecret: string;
    mode: 'sandbox' | 'live';
  };
}

interface PaymentSettingsState {
  settings: PaymentSettings;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentSettingsState = {
  settings: {
    stripe: {
      enabled: false,
      publicKey: '',
      secretKey: '',
      webhookSecret: '',
    },
    paypal: {
      enabled: false,
      clientId: '',
      clientSecret: '',
      mode: 'sandbox',
    },
    reloadly: {
      enabled: false,
      apiKey: '',
      apiSecret: '',
      mode: 'sandbox',
    },
  },
  loading: false,
  error: null,
};

export const fetchPaymentSettings = createAsyncThunk(
  'paymentSettings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await rechargeService.getPaymentSettings();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch payment settings');
    }
  }
);

export const updatePaymentSettings = createAsyncThunk(
  'paymentSettings/updateSettings',
  async (settings: PaymentSettings, { rejectWithValue }) => {
    try {
      const response = await rechargeService.updatePaymentSettings(settings);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update payment settings');
    }
  }
);

const paymentSettingsSlice = createSlice({
  name: 'paymentSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch settings
      .addCase(fetchPaymentSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentSettings.fulfilled, (state, action: any) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchPaymentSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update settings
      .addCase(updatePaymentSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentSettings.fulfilled, (state, action: any) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(updatePaymentSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default paymentSettingsSlice.reducer; 
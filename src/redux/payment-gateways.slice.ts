import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rechargeService, PaymentGateway, CreatePaymentGatewayRequest } from '@/services/recharge.service';

interface PaymentGatewaysState {
  gateways: PaymentGateway[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentGatewaysState = {
  gateways: [],
  loading: false,
  error: null,
};

export const fetchPaymentGateways = createAsyncThunk(
  'paymentGateways/fetchGateways',
  async (_, { rejectWithValue }) => {
    try {
      const response = await rechargeService.getPaymentGateways();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch payment gateways');
    }
  }
);

export const createPaymentGateway = createAsyncThunk(
  'paymentGateways/createGateway',
  async (data: CreatePaymentGatewayRequest, { rejectWithValue }) => {
    try {
      const response = await rechargeService.createPaymentGateway(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create payment gateway');
    }
  }
);

export const updatePaymentGateway = createAsyncThunk(
  'paymentGateways/updateGateway',
  async ({ id, data }: { id: string; data: Partial<CreatePaymentGatewayRequest> }, { rejectWithValue }) => {
    try {
      const response = await rechargeService.updatePaymentGateway(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update payment gateway');
    }
  }
);

export const deletePaymentGateway = createAsyncThunk(
  'paymentGateways/deleteGateway',
  async (id: string, { rejectWithValue }) => {
    try {
      await rechargeService.deletePaymentGateway(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete payment gateway');
    }
  }
);

const paymentGatewaysSlice = createSlice({
  name: 'paymentGateways',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch gateways
      .addCase(fetchPaymentGateways.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentGateways.fulfilled, (state, action) => {
        state.loading = false;
        state.gateways = action.payload;
      })
      .addCase(fetchPaymentGateways.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create gateway
      .addCase(createPaymentGateway.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentGateway.fulfilled, (state, action) => {
        state.loading = false;
        state.gateways.push(action.payload);
      })
      .addCase(createPaymentGateway.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update gateway
      .addCase(updatePaymentGateway.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentGateway.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.gateways.findIndex(g => g.id === action.payload.id);
        if (index !== -1) {
          state.gateways[index] = action.payload;
        }
      })
      .addCase(updatePaymentGateway.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete gateway
      .addCase(deletePaymentGateway.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePaymentGateway.fulfilled, (state, action) => {
        state.loading = false;
        state.gateways = state.gateways.filter(g => g.id !== action.payload);
      })
      .addCase(deletePaymentGateway.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default paymentGatewaysSlice.reducer; 
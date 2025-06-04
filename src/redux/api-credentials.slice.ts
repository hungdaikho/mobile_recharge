import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rechargeService, ApiCredential, CreateApiCredentialRequest, UpdateApiCredentialRequest } from '@/services/recharge.service';

interface ApiCredentialsState {
  credentials: ApiCredential[];
  loading: boolean;
  error: string | null;
}

const initialState: ApiCredentialsState = {
  credentials: [],
  loading: false,
  error: null,
};

export const fetchApiCredentials = createAsyncThunk(
  'apiCredentials/fetchCredentials',
  async (type?: 'PAYMENT' | 'TOPUP', { rejectWithValue }) => {
    try {
      const response = await rechargeService.getApiCredentials(type);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch API credentials');
    }
  }
);

export const createApiCredential = createAsyncThunk(
  'apiCredentials/createCredential',
  async (data: CreateApiCredentialRequest, { rejectWithValue }) => {
    try {
      const response = await rechargeService.createApiCredential(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create API credential');
    }
  }
);

export const updateApiCredential = createAsyncThunk(
  'apiCredentials/updateCredential',
  async ({ id, data }: { id: string; data: UpdateApiCredentialRequest }, { rejectWithValue }) => {
    try {
      const response = await rechargeService.updateApiCredential(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update API credential');
    }
  }
);

export const deleteApiCredential = createAsyncThunk(
  'apiCredentials/deleteCredential',
  async (id: string, { rejectWithValue }) => {
    try {
      await rechargeService.deleteApiCredential(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete API credential');
    }
  }
);

const apiCredentialsSlice = createSlice({
  name: 'apiCredentials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch credentials
      .addCase(fetchApiCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiCredentials.fulfilled, (state, action) => {
        state.loading = false;
        state.credentials = action.payload;
      })
      .addCase(fetchApiCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create credential
      .addCase(createApiCredential.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApiCredential.fulfilled, (state, action) => {
        state.loading = false;
        state.credentials.push(action.payload);
      })
      .addCase(createApiCredential.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update credential
      .addCase(updateApiCredential.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApiCredential.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.credentials.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.credentials[index] = action.payload;
        }
      })
      .addCase(updateApiCredential.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete credential
      .addCase(deleteApiCredential.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteApiCredential.fulfilled, (state, action) => {
        state.loading = false;
        state.credentials = state.credentials.filter(c => c.id !== action.payload);
      })
      .addCase(deleteApiCredential.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default apiCredentialsSlice.reducer; 
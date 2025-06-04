import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './exampleSlice';
import chargeReducer from './charge.slice';
import authReducer from './auth.slice';
import infoReducer from './info.slice';
import countryReducer from './country.slice';
import operatorReducer from './operator.slice';
import statisticsReducer from './statistics.slice';
import paymentSettingsReducer from './payment-settings.slice';
import paymentGatewaysReducer from './payment-gateways.slice';
import apiCredentialsReducer from './api-credentials.slice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    charge: chargeReducer,
    auth: authReducer,
    info: infoReducer,
    country: countryReducer,
    operator: operatorReducer,
    statistics: statisticsReducer,
    paymentSettings: paymentSettingsReducer,
    paymentGateways: paymentGatewaysReducer,
    apiCredentials: apiCredentialsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
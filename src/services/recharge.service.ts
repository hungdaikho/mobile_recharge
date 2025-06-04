import { ServiceBase } from './base.service';

// ==== INTERFACES ====
export interface CreateTransactionRequest {
  phoneNumber: string;
  operator: string;
  amount: number;
  country?: string;
  // Thêm các trường khác nếu có
}

export interface TransactionResponse {
  id: string;
  phoneNumber: string;
  operator: string;
  amount: number;
  status: string;
  createdAt: string;
  // Thêm các trường khác nếu có
}

export interface GetTransactionsParams {
  date?: string;
  country?: string;
  status?: string;
  operator?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface TransactionsListResponse {
  data: TransactionResponse[];
  total: number;
  page: number;
  limit: number;
}

// ==== AUTH ====
export interface LoginRequest {
  username: string;
  passwordHash: string;
}

export interface LoginResponse {
  token: string;
}

// ==== ADMIN ====
export interface CreateAdminRequest {
  username: string;
  passwordHash: string;
  role: string;
}

export interface CreateAdminResponse {
  id: string;
  username: string;
  role: string;
}

// ==== NEWS ====
export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnailUrl: string;
  isPublished: boolean;
  createdAt: string;
}

export interface CreateNewsRequest {
  title: string;
  slug: string;
  content: string;
  thumbnailUrl: string;
  isPublished: boolean;
}

export interface UpdateNewsRequest {
  title?: string;
  slug?: string;
  content?: string;
  thumbnailUrl?: string;
  isPublished?: boolean;
}

export interface NewsListResponse {
  data: NewsItem[];
}

// ==== STATISTICS ====
export interface StatisticsParams {
  startDate: string;
  endDate: string;
  country?: string;
  operator?: string;
  groupBy?: 'day' | 'month' | 'year';
}

export interface StatisticsSummaryResponse {
  totalTransactions: number;
  totalAmount: number;
  successRate: number;
  averageAmount: number;
}

export interface OperatorStatisticsResponse {
  operatorId: string;
  operatorName: string;
  countryCode: string;
  totalTransactions: number;
  totalAmount: number;
  successRate: number;
}

export interface ExportStatisticsRequest {
  startDate: string;
  endDate: string;
  country?: string;
  operator?: string;
  format: 'pdf' | 'excel';
}

// ==== ACTIVITY LOGS ====
export interface ActivityLogParams {
  phoneNumber?: string;
  date?: string;
  page?: number;
  limit?: number;
}

export interface ActivityLogItem {
  id: string;
  phoneNumber: string;
  action: string;
  createdAt: string;
}

export interface ActivityLogListResponse {
  data: ActivityLogItem[];
  total: number;
  page: number;
  limit: number;
}

// ==== OPERATOR ====
export interface Operator {
  id: string;
  name: string;
  logoUrl: string;
  apiCode: string;
  countryCode: string;
  description?: string;
  color?: string;
}

export interface OperatorListResponse {
  data: Operator[];
}

export interface CreateOperatorRequest {
  name: string;
  logoUrl: string;
  apiCode: string;
  countryCode: string;
  description?: string;
  color?: string;
}

export interface UpdateOperatorRequest {
  name?: string;
  logoUrl?: string;
  apiCode?: string;
  countryCode?: string;
  description?: string;
  color?: string;
}

// ==== COUNTRY ====
export interface Country {
  code: string;
  name: string;
  currency: string;
  flagUrl: string;
  operators?: Operator[];
}

export interface CountryListResponse {
  data: Country[];
}

export interface CreateCountryRequest {
  code: string;
  name: string;
  currency: string;
  flagUrl: string;
}

export interface UpdateCountryRequest {
  name?: string;
  currency?: string;
  flagUrl?: string;
}

// ==== PAYMENT SETTINGS ====
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
}

// ==== PAYMENT GATEWAY ====
export interface PaymentGateway {
  id: string;
  name: string;
  type: 'card' | 'bank' | 'crypto' | 'mobile';
  status: 'active' | 'inactive';
  config: Record<string, any>;
}

export interface CreatePaymentGatewayRequest {
  name: string;
  type: 'card' | 'bank' | 'crypto' | 'mobile';
  config: Record<string, any>;
}

// ==== API CREDENTIALS ====
export interface ApiCredential {
  id: string;
  name: string;
  type: 'PAYMENT' | 'TOPUP';
  apiKey: string;
  apiSecret: string;
  baseUrl?: string;
  metadata?: {
    mode?: 'sandbox' | 'live';
    provider?: 'stripe' | 'paypal' | 'reloadly';
    [key: string]: any;
  };
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateApiCredentialRequest {
  name: string;
  type: 'PAYMENT' | 'TOPUP';
  apiKey: string;
  apiSecret: string;
  baseUrl?: string;
  metadata?: {
    mode?: 'sandbox' | 'live';
    provider?: 'stripe' | 'paypal' | 'reloadly';
    [key: string]: any;
  };
}

export interface UpdateApiCredentialRequest {
  name?: string;
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  metadata?: {
    mode?: 'sandbox' | 'live';
    provider?: 'stripe' | 'paypal' | 'reloadly';
    [key: string]: any;
  };
  status?: 'active' | 'inactive';
}

export interface CreatePaymentRequest {
  topups: {
    phoneNumber: string;
    amount: number;
  }[];
  country: string;
  operator: string;
  currency: string;
  email: string;
}

class RechargeService extends ServiceBase {
  constructor() {
    super('https://ninhmet5.com');
    // super('http://localhost:3000'); // Thay đổi URL theo API thực tế
  }

  // ==== AUTH ====
  login = async (data: LoginRequest): Promise<LoginResponse> => {
    return this.post<LoginResponse>('/auth/login', data);
  }
  info = async (): Promise<any> => {
    return this.get<any>('/admin/me');
  }
  // ==== ADMIN ====
  createAdmin = async (data: CreateAdminRequest): Promise<CreateAdminResponse> => {
    return this.post<CreateAdminResponse>('/admin/create', data);
  }

  // ==== NEWS ====
  getNewsList = async (isPublished?: boolean): Promise<NewsListResponse> => {
    return this.get<NewsListResponse>('/news', { params: isPublished !== undefined ? { isPublished } : {} });
  }

  getNewsDetail = async (slug: string): Promise<NewsItem> => {
    return this.get<NewsItem>(`/news/${slug}`);
  }

  createNews = async (data: CreateNewsRequest): Promise<NewsItem> => {
    return this.post<NewsItem>('/news', data);
  }

  updateNews = async (id: string, data: UpdateNewsRequest): Promise<NewsItem> => {
    return this.put<NewsItem>(`/news/${id}`, data);
  }

  deleteNews = async (id: string): Promise<void> => {
    return this.delete<void>(`/news/${id}`);
  }

  // ==== TRANSACTIONS ====
  createTransaction = async (data: CreateTransactionRequest): Promise<TransactionResponse> => {
    return this.post<TransactionResponse>('/transactions', data);
  }
  updateTransaction = async (data: { id: string, status: string }) => {
    return this.put(`/transactions/${data.id}`, { status: data.status })
  }
  createPayment = async (data: CreatePaymentRequest) => {
    return this.post('/transactions/stripe/create-payment', data);
  }
  getTransactions = async (params: GetTransactionsParams): Promise<TransactionsListResponse> => {
    return this.get<TransactionsListResponse>('/transactions', { params });
  }

  // ==== STATISTICS ====
  getStatisticsSummary = async (params: StatisticsParams): Promise<StatisticsSummaryResponse> => {
    return this.get<StatisticsSummaryResponse>('/statistics/summary', { params });
  }

  getOperatorStatistics = async (params: StatisticsParams): Promise<OperatorStatisticsResponse[]> => {
    return this.get<OperatorStatisticsResponse[]>('/statistics/operators', { params });
  }

  exportStatistics = async (data: ExportStatisticsRequest): Promise<Blob> => {
    return this.post<Blob>('/statistics/export', data, {
      responseType: 'blob'
    });
  }

  // ==== ACTIVITY LOGS ====
  getActivityLogs = async (params: ActivityLogParams): Promise<ActivityLogListResponse> => {
    return this.get<ActivityLogListResponse>('/activity-logs', { params });
  }

  // ==== OPERATOR ====
  getOperators = async (): Promise<OperatorListResponse> => {
    return this.get<OperatorListResponse>('/operators');
  }

  getOperatorDetail = async (id: string): Promise<Operator> => {
    return this.get<Operator>(`/operators/${id}`);
  }

  createOperator = async (data: CreateOperatorRequest): Promise<Operator> => {
    return this.post<Operator>('/operators', data);
  }

  updateOperator = async (id: string, data: UpdateOperatorRequest): Promise<Operator> => {
    return this.put<Operator>(`/operators/${id}`, data);
  }

  deleteOperator = async (id: string): Promise<void> => {
    return this.delete<void>(`/operators/${id}`);
  }

  // ==== COUNTRY ====
  getCountries = async (): Promise<CountryListResponse> => {
    return this.get<CountryListResponse>('/countries');
  }

  getCountryDetail = async (code: string): Promise<Country> => {
    return this.get<Country>(`/countries/${code}`);
  }

  createCountry = async (data: CreateCountryRequest): Promise<Country> => {
    return this.post<Country>('/countries', data);
  }

  updateCountry = async (code: string, data: UpdateCountryRequest): Promise<Country> => {
    return this.put<Country>(`/countries/${code}`, data);
  }

  deleteCountry = async (code: string): Promise<void> => {
    return this.delete<void>(`/countries/${code}`);
  }

  async getPaymentSettings(): Promise<PaymentSettings> {
    const response = await this.get('/api-credentials?type=PAYMENT');
    return response as PaymentSettings;
  }

  async updatePaymentSettings(settings: PaymentSettings): Promise<PaymentSettings> {
    const response = await this.put('/api-credentials/payment', settings);
    return response as PaymentSettings;
  }

  // ==== PAYMENT GATEWAY ====
  getPaymentGateways = async (): Promise<PaymentGateway[]> => {
    return this.get<PaymentGateway[]>('/payment-gateways');
  }

  createPaymentGateway = async (data: CreatePaymentGatewayRequest): Promise<PaymentGateway> => {
    return this.post<PaymentGateway>('/payment-gateways', data);
  }

  updatePaymentGateway = async (id: string, data: Partial<CreatePaymentGatewayRequest>): Promise<PaymentGateway> => {
    return this.put<PaymentGateway>(`/payment-gateways/${id}`, data);
  }

  deletePaymentGateway = async (id: string): Promise<void> => {
    return this.delete<void>(`/payment-gateways/${id}`);
  }

  // ==== API CREDENTIALS ====
  getApiCredentials = async (type?: 'PAYMENT' | 'TOPUP'): Promise<ApiCredential[]> => {
    return this.get<ApiCredential[]>('/api-credentials', { params: type ? { type } : {} });
  }

  createApiCredential = async (data: CreateApiCredentialRequest): Promise<ApiCredential> => {
    return this.post<ApiCredential>('/api-credentials', data);
  }

  updateApiCredential = async (id: string, data: UpdateApiCredentialRequest): Promise<ApiCredential> => {
    return this.put<ApiCredential>(`/api-credentials/${id}`, data);
  }

  deleteApiCredential = async (id: string): Promise<void> => {
    return this.delete<void>(`/api-credentials/${id}`);
  }
}

export const rechargeService = new RechargeService();

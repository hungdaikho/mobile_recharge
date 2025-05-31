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
  date?: string;
  country?: string;
}

export interface StatisticsResponse {
  // Định nghĩa tuỳ theo backend trả về
  [key: string]: any;
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

class RechargeService extends ServiceBase {
    constructor() {
        super('http://localhost:3000');
    }

    // ==== AUTH ====
    login = async (data: LoginRequest): Promise<LoginResponse> => {
      return this.post<LoginResponse>('/auth/login', data);
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

    getTransactions = async (params: GetTransactionsParams): Promise<TransactionsListResponse> => {
        return this.get<TransactionsListResponse>('/transactions', { params });
    }

    // ==== STATISTICS ====
    getStatistics = async (params: StatisticsParams): Promise<StatisticsResponse> => {
      return this.get<StatisticsResponse>('/statistics', { params });
    }

    generateStatistics = async (): Promise<void> => {
      return this.post<void>('/statistics/generate');
    }

    // ==== ACTIVITY LOGS ====
    getActivityLogs = async (params: ActivityLogParams): Promise<ActivityLogListResponse> => {
      return this.get<ActivityLogListResponse>('/activity-logs', { params });
    }
}

export const rechargeService = new RechargeService();

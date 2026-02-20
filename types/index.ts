export type Role = 'OWNER' | 'ADMIN' | 'ANALYST' | 'VIEWER';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface Tenant {
  id: string;
  name: string;
  plan: 'FREE' | 'PRO' | 'ENTERPRISE';
  createdAt: string; // ISO date
}

export interface User {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  lastActiveAt: string; // ISO date
  avatarUrl?: string;
}

export interface AuditEvent {
  id: string;
  tenantId: string;
  actor: {
    userId: string;
    email: string;
  };
  action: string;
  target: string; // e.g., "User: john@doe.com"
  details?: Record<string, any>;
  createdAt: string; // ISO date
}

export interface Metrics {
  activeUsers: number;
  activeUsersDelta: number; // percentage change
  errorRate: number;
  errorRateDelta: number;
  apiLatencyP95: number;
  events24h: number;
  data: { date: string; value: number }[]; // for charts
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

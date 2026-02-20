import { Tenant, User, AuditEvent } from "../types";

export const MOCK_TENANTS: Tenant[] = [
  { id: "demo", name: "Acme Corp", plan: "ENTERPRISE", createdAt: "2023-01-01T00:00:00Z" },
  { id: "startup", name: "Rocket Inc", plan: "PRO", createdAt: "2023-06-15T00:00:00Z" },
  { id: "indie", name: "Solo Dev", plan: "FREE", createdAt: "2023-09-01T00:00:00Z" },
];

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    tenantId: "demo",
    name: "Alice Admin",
    email: "alice@acme.com",
    role: "OWNER",
    status: "ACTIVE",
    lastActiveAt: new Date().toISOString(),
    avatarUrl: "https://ui-avatars.com/api/?name=Alice+Admin&background=0D8ABC&color=fff",
  },
  {
    id: "u2",
    tenantId: "demo",
    name: "Bob Dev",
    email: "bob@acme.com",
    role: "ADMIN",
    status: "ACTIVE",
    lastActiveAt: new Date(Date.now() - 86400000).toISOString(),
    avatarUrl: "https://ui-avatars.com/api/?name=Bob+Dev&background=random",
  },
  {
    id: "u3",
    tenantId: "demo",
    name: "Charlie Analyst",
    email: "charlie@acme.com",
    role: "ANALYST",
    status: "ACTIVE",
    lastActiveAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "u4",
    tenantId: "demo",
    name: "Dave Viewer",
    email: "dave@acme.com",
    role: "VIEWER",
    status: "INACTIVE",
    lastActiveAt: new Date(Date.now() - 604800000).toISOString(),
  },
  {
    id: "u5",
    tenantId: "startup",
    name: "Eve Founder",
    email: "eve@rocket.com",
    role: "OWNER",
    status: "ACTIVE",
    lastActiveAt: new Date().toISOString(),
  },
];

export const MOCK_AUDIT_LOGS: AuditEvent[] = [
  {
    id: "evt1",
    tenantId: "demo",
    actor: { userId: "u1", email: "alice@acme.com" },
    action: "USER_INVITED",
    target: "bob@acme.com",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "evt2",
    tenantId: "demo",
    actor: { userId: "u1", email: "alice@acme.com" },
    action: "SETTINGS_UPDATED",
    target: "Billing Settings",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "evt3",
    tenantId: "demo",
    actor: { userId: "u2", email: "bob@acme.com" },
    action: "API_KEY_CREATED",
    target: "Production Key",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Tenant, Role } from '@/types';
import { MOCK_USERS, MOCK_TENANTS } from '@/data/mock';

interface SessionContextType {
  currentUser: User | null;
  currentTenant: Tenant | null;
  setCurrentUser: (user: User) => void;
  isLoading: boolean;
  availableUsers: User[]; // For dev switcher
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children, tenantId }: { children: React.ReactNode; tenantId: string }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load tenant info
  useEffect(() => {
    const tenant = MOCK_TENANTS.find((t) => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
    }
  }, [tenantId]);

  // Simulate logging into the tenant
  useEffect(() => {
    const loadSession = () => {
      const storedUserId = localStorage.getItem(`pulseops_user_${tenantId}`);
      const availableUsersStart = MOCK_USERS.filter(u => u.tenantId === tenantId);
      
      // Default to first user if no session
      const foundUser = availableUsersStart.find(u => u.id === storedUserId) || availableUsersStart[0];
      
      if (foundUser) {
        setCurrentUser(foundUser);
      }
      setIsLoading(false);
    };

    loadSession();
  }, [tenantId]);

  // Updates session
  const switchUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem(`pulseops_user_${tenantId}`, user.id);
  };

  const availableUsers = MOCK_USERS.filter(u => u.tenantId === tenantId);

  return (
    <SessionContext.Provider value={{ currentUser, currentTenant, setCurrentUser: switchUser, isLoading, availableUsers }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

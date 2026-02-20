'use client';

import { useSession } from "../auth/SessionContext";
import { MOCK_TENANTS } from "@/data/mock";
import { useRouter } from "next/navigation";

export function TopNav() {
  const { currentTenant, currentUser, availableUsers, setCurrentUser } = useSession();
  const router = useRouter();

  if (!currentTenant) return null;

  const handleTenantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTenantId = e.target.value;
    router.push(`/t/${newTenantId}/dashboard`);
  };

  return (
    <header className="p-3 mb-3 border-bottom bg-white sticky-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* Tenant Switcher */}
        <div className="d-flex align-items-center">
            <label className="me-2 text-muted fw-bold small">TENANT:</label>
            <select 
                className="form-select form-select-sm" 
                style={{ width: "auto" }}
                value={currentTenant.id}
                onChange={handleTenantChange}
            >
                {MOCK_TENANTS.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                ))}
            </select>
        </div>

        {/* Dev Tools: Quick Role Switcher */}
        <div className="d-flex align-items-center alert alert-warning py-1 px-2 m-0 mb-0 border-warning">
            <i className="bi bi-cone-striped me-2"></i>
            <small className="me-2 fw-bold text-uppercase">Dev Session:</small>
            <select 
                className="form-select form-select-sm border-warning bg-warning-subtle" 
                style={{ width: "auto", fontSize: "0.8rem" }}
                value={currentUser?.id}
                onChange={(e) => {
                    const u = availableUsers.find(user => user.id === e.target.value);
                    if (u) setCurrentUser(u);
                }}
            >
                {availableUsers.map(u => (
                    <option key={u.id} value={u.id}>
                        {u.name} ({u.role})
                    </option>
                ))}
            </select>
        </div>

      </div>
    </header>
  );
}

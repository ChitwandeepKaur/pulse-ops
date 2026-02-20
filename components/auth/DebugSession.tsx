'use client';

import { useSession } from "./SessionContext";
import { fetchJson } from "@/lib/api-client";
import { useState } from "react";

export function DebugSession() {
  const { currentUser, currentTenant, isLoading, availableUsers, setCurrentUser } = useSession();
  const [apiResult, setApiResult] = useState<string>("");

  if (isLoading) return <div className="p-3 alert alert-info">Loading Session...</div>;

  const testApi = async () => {
    setApiResult("Fetching...");
    // Simulate a fetch
    await new Promise(r => setTimeout(r, 500)); 
    setApiResult("Success! API Client is working.");
  };

  return (
    <div className="card mt-4 border-warning">
      <div className="card-header bg-warning text-dark fw-bold">
        Step 2 Test Harness (Debug Session)
      </div>
      <div className="card-body">
        <h5>Current Context:</h5>
        <ul>
          <li><strong>Tenant:</strong> {currentTenant?.name} ({currentTenant?.plan})</li>
          <li><strong>User:</strong> {currentUser?.name}</li>
          <li><strong>Role:</strong> <span className="badge bg-secondary">{currentUser?.role}</span></li>
        </ul>

        <div className="mb-3">
            <label className="form-label">Switch User (Test RBAC):</label>
            <select 
                className="form-select" 
                value={currentUser?.id} 
                onChange={(e) => {
                    const u = availableUsers.find(u => u.id === e.target.value);
                    if (u) setCurrentUser(u);
                }}
            >
                {availableUsers.map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                ))}
            </select>
        </div>

        <hr />
        
        <h5>API Client Test:</h5>
        <button onClick={testApi} className="btn btn-sm btn-outline-dark">
            Test fetchJson()
        </button>
        {apiResult && <div className="mt-2 text-success fw-bold">{apiResult}</div>}
      </div>
    </div>
  );
}

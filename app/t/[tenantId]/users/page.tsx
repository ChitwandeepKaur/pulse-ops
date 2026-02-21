'use client';

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { User } from "@/types";
import { MOCK_USERS } from "@/data/mock";
import { ColumnDef } from "@tanstack/react-table";

// Helper to simulate API call
async function fetchUsers(tenantId: string): Promise<User[]> {
    await new Promise(r => setTimeout(r, 600)); // Simulate latency
    return MOCK_USERS.filter(u => u.tenantId === tenantId);
}

export default function UsersPage() {
    // In next.js 13+ client components, we usually get tenantId from useParams or props, 
    // but for simplicity in this mock we'll just grab the current tenant from the path or hardcode 'demo' temporarily
    const tenantId = "demo"; 
    
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetchUsers(tenantId).then(users => {
            setData(users);
            setIsLoading(false);
        });
    }, [tenantId]);

    // Define table columns
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3" style={{width: 36, height: 36}}>
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <div className="fw-bold">{user.name}</div>
                            <div className="small text-muted">{user.email}</div>
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ getValue }) => {
                const role = getValue() as string;
                const colors: Record<string, string> = {
                    OWNER: "primary",
                    ADMIN: "success",
                    ANALYST: "info",
                    VIEWER: "secondary"
                };
                return <span className={`badge bg-${colors[role] || 'secondary'}`}>{role}</span>;
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ getValue }) => {
                const status = getValue() as string;
                return (
                    <span className={`text-${status === 'ACTIVE' ? 'success' : 'muted'} fw-semibold small`}>
                        <i className={`bi bi-circle-fill me-1`} style={{fontSize: '0.5rem'}}></i>
                        {status}
                    </span>
                );
            }
        },
        {
            accessorKey: "lastActiveAt",
            header: "Last Active",
            cell: ({ getValue }) => {
                const date = new Date(getValue() as string);
                return <span className="text-muted">{date.toLocaleDateString()}</span>;
            }
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="d-flex justify-content-end">
                        <div className="dropdown">
                            <button className="btn btn-sm btn-link text-muted text-decoration-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={() => alert(`Editing ${user.name}`)}>
                                        <i className="bi bi-pencil me-2 text-muted"></i> Edit Profile
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={() => alert(`Reset password for ${user.email}`)}>
                                        <i className="bi bi-key me-2 text-muted"></i> Reset Password
                                    </button>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button 
                                        className={`dropdown-item d-flex align-items-center ${user.status === 'ACTIVE' ? 'text-danger' : 'text-success'}`}
                                        onClick={() => handleToggleStatus(user.id, user.status)}
                                    >
                                        <i className={`bi ${user.status === 'ACTIVE' ? 'bi-person-x' : 'bi-person-check'} me-2`}></i> 
                                        {user.status === 'ACTIVE' ? 'Deactivate User' : 'Activate User'}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            },
        }
    ];

    // Simulated optimistic update for row actions
    const handleToggleStatus = (userId: string, currentStatus: string) => {
        setData(prev => prev.map(u => {
            if (u.id === userId) {
                return { ...u, status: currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } as User;
            }
            return u;
        }));
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Users</h2>
                    <p className="text-muted mb-0">Manage access and roles for your team.</p>
                </div>
                <div>
                    <button className="btn btn-primary btn-sm">
                        <i className="bi bi-person-plus me-2"></i>Add User
                    </button>
                </div>
            </div>

            {/* Toolbar (Search & Filters) */}
            <div className="card shadow-sm border-0 mb-4 bg-white">
                <div className="card-body p-3 d-flex gap-3 align-items-center flex-wrap">
                    <div className="input-group" style={{ maxWidth: "300px" }}>
                        <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-search text-muted"></i>
                        </span>
                        <input 
                            type="text" 
                            className="form-control bg-light border-start-0 ps-0" 
                            placeholder="Search users..." 
                            value={globalFilter ?? ""}
                            onChange={e => setGlobalFilter(e.target.value)}
                        />
                    </div>
                    {/* Role Filter */}
                    <select 
                        className="form-select form-select-sm" 
                        style={{ maxWidth: "150px" }}
                        onChange={(e) => {
                            // Basic client side filtering for demo
                            const role = e.target.value;
                            if (role === "") {
                                // reset
                                fetchUsers(tenantId).then(setData);
                            } else {
                                fetchUsers(tenantId).then(users => {
                                    setData(users.filter(u => u.role === role));
                                });
                            }
                        }}
                    >
                        <option value="">All Roles</option>
                        <option value="OWNER">Owner</option>
                        <option value="ADMIN">Admin</option>
                        <option value="ANALYST">Analyst</option>
                        <option value="VIEWER">Viewer</option>
                    </select>
                </div>
            </div>

            {/* Data Table */}
            <DataTable 
                columns={columns} 
                data={data} 
                isLoading={isLoading}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
        </div>
    );
}

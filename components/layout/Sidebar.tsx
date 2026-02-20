'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "../auth/SessionContext";
import { Role } from "@/types";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "bi-speedometer2", roles: ["OWNER", "ADMIN", "ANALYST", "VIEWER"] },
  { label: "Users", href: "/users", icon: "bi-people", roles: ["OWNER", "ADMIN", "ANALYST"] },
  { label: "Audit Log", href: "/audit", icon: "bi-journal-text", roles: ["OWNER", "ADMIN"] },
  { label: "Settings", href: "/settings", icon: "bi-gear", roles: ["OWNER"] },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentUser, currentTenant } = useSession();

  if (!currentUser || !currentTenant) return null;

  const tenantBase = `/t/${currentTenant.id}`;

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light border-end" style={{ width: "280px", minHeight: "100vh" }}>
      <a href={`/t/${currentTenant.id}/dashboard`} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <i className="bi bi-activity fs-2 me-2 text-primary"></i>
        <span className="fs-4 fw-bold">PulseOps</span>
      </a>
      <hr />
      <div className="mb-3 px-2">
        <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "0.75rem" }}>
          {currentTenant.name}
        </small>
        <br />
        <span className="badge bg-secondary">{currentTenant.plan}</span>
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        {NAV_ITEMS.map((item) => {
          const isAllowed = item.roles.includes(currentUser.role as string);
          if (!isAllowed) return null;

          const fullPath = `${tenantBase}${item.href}`;
          const isActive = pathname?.startsWith(fullPath);

          return (
            <li key={item.href} className="nav-item">
              <Link 
                href={fullPath} 
                className={`nav-link ${isActive ? "active" : "link-dark"}`}
                aria-current={isActive ? "page" : undefined}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
          <div 
            className="rounded-circle me-2 bg-primary text-white d-flex align-items-center justify-content-center"
            style={{ width: 32, height: 32 }}
          >
            {currentUser.name.charAt(0)}
          </div>
          <strong>{currentUser.name}</strong>
        </a>
        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><span className="dropdown-item-text text-muted">{currentUser.role}</span></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  );
}

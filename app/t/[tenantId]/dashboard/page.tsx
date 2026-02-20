import { notFound } from "next/navigation";
import { KPICard } from "@/components/dashboard/KPICard";
import { MetricChart } from "@/components/dashboard/MetricChart";

// Simulate fetching data
async function getMetrics(tenantId: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return {
    activeUsers: 1240,
    activeUsersDelta: 12,
    errorRate: 0.05,
    errorRateDelta: -2.1,
    apiLatency: 145,
    apiLatencyDelta: 5.4,
    revenue: 45200,
    revenueDelta: 8.5,
    chartData: [
        { date: 'Mon', value: 400 },
        { date: 'Tue', value: 300 },
        { date: 'Wed', value: 550 },
        { date: 'Thu', value: 450 },
        { date: 'Fri', value: 600 },
        { date: 'Sat', value: 200 },
        { date: 'Sun', value: 150 },
    ]
  };
}

interface PageProps {
  params: Promise<{ tenantId: string }>;
}

export default async function DashboardPage({ params }: PageProps) {
  const { tenantId } = await params;
  if (!tenantId) return notFound();

  // In a real app, this would be a fetchJson call
  const metrics = await getMetrics(tenantId);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 className="fw-bold mb-1">Dashboard</h2>
            <p className="text-muted mb-0">Overview for {tenantId}</p>
        </div>
        <div>
            <button className="btn btn-outline-secondary btn-sm me-2">
                <i className="bi bi-calendar3 me-2"></i>Last 7 Days
            </button>
            <button className="btn btn-primary btn-sm">
                <i className="bi bi-download me-2"></i>Export
            </button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
            <KPICard title="Total Users" value={metrics.activeUsers} delta={metrics.activeUsersDelta} icon="bi-people" />
        </div>
        <div className="col-md-3">
            <KPICard title="Error Rate" value={`${metrics.errorRate}%`} delta={metrics.errorRateDelta} icon="bi-x-circle" />
        </div>
        <div className="col-md-3">
            <KPICard title="Avg Latency" value={`${metrics.apiLatency}ms`} delta={metrics.apiLatencyDelta} icon="bi-activity" />
        </div>
        <div className="col-md-3">
            <KPICard title="Revenue" value={`$${metrics.revenue}`} delta={metrics.revenueDelta} icon="bi-currency-dollar" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
            <MetricChart data={metrics.chartData} />
        </div>
        <div className="col-lg-4 mb-4">
            {/* Placeholder for Recent Activity */}
            <div className="card h-100 shadow-sm border-0">
                <div className="card-header bg-white border-0 py-3">
                    <h5 className="card-title fw-bold mb-0">Recent Alerts</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item px-4 py-3 border-0 d-flex align-items-center">
                        <i className="bi bi-exclamation-triangle-fill text-warning me-3 fs-5"></i>
                        <div>
                            <div className="fw-bold">High Latency Detected</div>
                            <small className="text-muted">2 mins ago • API Gateway</small>
                        </div>
                    </li>
                    <li className="list-group-item px-4 py-3 border-0 d-flex align-items-center">
                        <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                        <div>
                            <div className="fw-bold">Backup Completed</div>
                            <small className="text-muted">1 hour ago • Database</small>
                        </div>
                    </li>
                    <li className="list-group-item px-4 py-3 border-0 d-flex align-items-center">
                        <i className="bi bi-person-plus-fill text-primary me-3 fs-5"></i>
                        <div>
                            <div className="fw-bold">New User Signup</div>
                            <small className="text-muted">3 hours ago • Alice Admin</small>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
}

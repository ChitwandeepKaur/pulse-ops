
import { KPICard } from "@/components/dashboard/KPICard";
import { MetricChart } from "@/components/dashboard/MetricChart";

export default function Loading() {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <div className="placeholder-glow mb-1">
                <span className="placeholder col-6 fs-2 rounded"></span>
            </div>
            <div className="placeholder-glow">
                <span className="placeholder col-4 text-muted rounded"></span>
            </div>
        </div>
        <div>
            <button className="btn btn-outline-secondary btn-sm me-2 disabled placeholder col-2"></button>
            <button className="btn btn-primary btn-sm disabled placeholder col-2"></button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {[1, 2, 3, 4].map((i) => (
            <div className="col-md-3" key={i}>
                <KPICard title="Loading..." value={0} isLoading={true} />
            </div>
        ))}
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
            <MetricChart data={[]} isLoading={true} />
        </div>
        <div className="col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
                <div className="card-header bg-white border-0 py-3">
                     <span className="placeholder col-6 rounded"></span>
                </div>
                <div className="card-body">
                    <p className="placeholder-glow">
                        <span className="placeholder col-7 me-1 rounded"></span>
                        <span className="placeholder col-4 rounded"></span>
                        <span className="placeholder col-4 me-1 rounded"></span>
                        <span className="placeholder col-6 rounded"></span>
                        <span className="placeholder col-8 rounded"></span>
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

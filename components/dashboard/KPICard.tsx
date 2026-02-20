interface KPICardProps {
  title: string;
  value: string | number;
  delta?: number;
  icon?: string;
  isLoading?: boolean;
}

export function KPICard({ title, value, delta, icon, isLoading }: KPICardProps) {
  if (isLoading) {
    return (
      <div className="card h-100 shadow-sm border-0">
        <div className="card-body">
          <div className="placeholder-glow">
            <span className="placeholder col-6"></span>
          </div>
          <h2 className="mt-2 placeholder-glow">
            <span className="placeholder col-4"></span>
          </h2>
        </div>
      </div>
    );
  }

  const isPositive = (delta || 0) >= 0;
  const deltaColor = isPositive ? "text-success" : "text-danger";
  const deltaIcon = isPositive ? "bi-arrow-up" : "bi-arrow-down";

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="card-subtitle text-muted text-uppercase small fw-bold">
                {title}
            </h6>
            {icon && <i className={`bi ${icon} text-secondary fs-5`}></i>}
        </div>
        <div className="d-flex align-items-baseline">
            <h2 className="card-title fw-bold mb-0 me-3">{value}</h2>
            {delta !== undefined && (
                <small className={`${deltaColor} fw-semibold`}>
                    <i className={`bi ${deltaIcon} me-1`}></i>
                    {Math.abs(delta)}%
                </small>
            )}
        </div>
      </div>
    </div>
  );
}

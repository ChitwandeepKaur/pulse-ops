
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ tenantId: string }>;
}

export default async function DashboardPage({ params }: PageProps) {
  const { tenantId } = await params;

  if (!tenantId) return notFound();

  return (
    <div className="container py-5">
      <div className="p-5 mb-4 bg-light rounded-3 border">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">PulseOps Dashboard</h1>
          <p className="col-md-8 fs-4">
            You are currently viewing the dashboard for tenant: <strong>{tenantId}</strong>
          </p>
          <hr className="my-4" />
          <p>
            This page demonstrates that:
          </p>
          <ul>
            <li>Next.js routing is working correctly (<code>/t/[tenantId]/dashboard</code>)</li>
            <li>Bootstrap 5 styles are loaded (Container, Buttons, Typography)</li>
            <li>TypeScript is configured correctly</li>
          </ul>
          <button className="btn btn-primary btn-lg mt-3" type="button">
            <i className="bi bi-check-circle-fill me-2"></i>
            Bootstrap Button
          </button>
        </div>
      </div>
    </div>
  );
}

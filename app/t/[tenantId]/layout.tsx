import { SessionProvider } from "@/components/auth/SessionContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ tenantId: string }>;
}

export default async function TenantLayout({ children, params }: LayoutProps) {
  const { tenantId } = await params;

  return (
    <SessionProvider tenantId={tenantId}>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column" style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <TopNav />
            <main className="p-4 flex-grow-1 bg-light">
                {children}
            </main>
        </div>
      </div>
    </SessionProvider>
  );
}

import { SessionProvider } from "@/components/auth/SessionContext";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ tenantId: string }>;
}

export default async function TenantLayout({ children, params }: LayoutProps) {
  const { tenantId } = await params;

  return (
    <SessionProvider tenantId={tenantId}>
      {children}
    </SessionProvider>
  );
}

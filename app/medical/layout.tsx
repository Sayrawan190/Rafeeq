import { DashboardShell } from "@/components/shells";

export default function Layout({ children }: { children: React.ReactNode }) { return <DashboardShell type="medical">{children}</DashboardShell>; }

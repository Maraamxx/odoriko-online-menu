import { LoginBrandPanel } from "@/components/admin/LoginBrandPanel";
import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--ink)" }}>
      <LoginBrandPanel />
      <LoginForm />
    </div>
  );
}

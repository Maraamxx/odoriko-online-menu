/**
 * AdminLoginPage — split layout: branded panel (left) + login form (right).
 */
import { LoginBrandPanel } from "@/components/admin/LoginBrandPanel";
import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="grid overflow-hidden lg:grid-cols-2" style={{ height: "calc(100vh - 64px)" }}>
      <LoginBrandPanel />
      <LoginForm />
    </div>
  );
}

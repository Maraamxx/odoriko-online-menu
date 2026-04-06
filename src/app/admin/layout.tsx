export default function AdminLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* AdminSidebar goes here in Phase 9 */}
      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
    </div>
  );
}

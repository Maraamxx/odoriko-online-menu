import { LandingNav } from "./LandingNav";
import { LandingFooter } from "./LandingFooter";

interface MarketingShellProps {
  readonly children: React.ReactNode;
}

export function MarketingShell({ children }: MarketingShellProps) {
  return (
    <>
      <LandingNav />
      {children}
      <LandingFooter />
    </>
  );
}

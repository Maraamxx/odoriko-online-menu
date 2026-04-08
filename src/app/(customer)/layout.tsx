import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { PageTransition } from "@/components/layout/PageTransition";

export default function CustomerLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <LandingNav />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <LandingFooter />
    </>
  );
}

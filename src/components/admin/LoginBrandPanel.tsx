/**
 * LoginBrandPanel — dramatic left panel with food photography for the admin login.
 * Fields: brand.name, brand.tagline, login.atmosphere, logo image.
 */
import Image from "next/image";
import { COPY } from "@/constants/copy";

export function LoginBrandPanel() {
  return (
    <div className="relative hidden overflow-hidden lg:block">
      {/* Background image — use a moody dish photo */}
      <Image
        src="/brand/login-photo.jpg"
        alt=""
        fill
        sizes="50vw"
        className="object-cover"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.65)" }} />

      {/* Accent top edge */}
      <span
        aria-hidden
        className="absolute left-0 top-0 z-10 h-1 w-full"
        style={{ background: "var(--accent)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-12">
        <Image
          src="/brand/logo-full.webp"
          alt={COPY.brand.name}
          width={200}
          height={64}
          className="brightness-0 invert"
          style={{ width: "auto", height: 48 }}
          priority
        />
        <p className="font-serif text-xl tracking-widest" style={{ color: "rgba(255,255,255,0.6)" }}>
          {COPY.brand.tagline}
        </p>
        <div className="mt-4 h-px w-12" style={{ background: "var(--accent)" }} />
        <p
          className="max-w-[260px] text-center text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {COPY.login.atmosphere}
        </p>
      </div>
    </div>
  );
}

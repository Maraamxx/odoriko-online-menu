import Image from "next/image";
import { COPY } from "@/constants/copy";

export function FullBleedImage() {
  const S = COPY.story;
  return (
    <div className="group relative h-[50vh] overflow-hidden lg:h-[70vh]">
      <Image
        src="/brand/story/story-kitchen.webp"
        alt="The restaurant kitchen"
        fill sizes="100vw"
        className="object-cover transition-transform duration-[8s] ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 px-6 pb-10 pt-20 sm:flex-row sm:items-end sm:justify-between sm:px-16 sm:pb-12" style={{ background: "linear-gradient(to top, rgba(26,20,16,.8), transparent)" }}>
        <div>
          <small className="mb-2 block font-serif text-[13px] font-light tracking-[0.18em]" style={{ color: "rgba(255,255,255,.5)" }}>{S.bleedCaptionJp}</small>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,64px)", lineHeight: .92, letterSpacing: ".04em", color: "var(--white)" }}>
            {S.bleedCaptionTitle}
          </div>
        </div>
        <p className="max-w-[340px] text-sm leading-[1.75] sm:text-right" style={{ color: "rgba(255,255,255,.6)" }}>{S.bleedCaptionBody}</p>
      </div>
    </div>
  );
}

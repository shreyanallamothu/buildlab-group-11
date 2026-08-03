import type { Member } from "@/lib/members";
import Image from "next/image";
import Link from "next/link";

export default function MemberCard({
  member,
  compact = false,
}: {
  member: Member;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/members/${member.id}`}
      className={`group overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-[0_8px_30px_rgb(7_59_49/0.05)] hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_18px_40px_rgb(7_59_49/0.12)] ${
        compact ? "flex items-center p-3" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-gray-100 ${
          compact
            ? "h-24 w-24 shrink-0 rounded-2xl sm:h-28 sm:w-28"
            : "aspect-[4/3]"
        }`}
      >
        <Image
          src={member.image}
          alt={`${member.name}, ${member.career}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`${compact ? "object-contain" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`}
        />
        <span
          className={`absolute rounded-full bg-brand-lime font-bold text-brand-forest shadow-sm ${
            compact
              ? "bottom-2 left-2 px-2 py-0.5 text-[0.6rem]"
              : "left-4 top-4 px-3 py-1 text-xs"
          }`}
        >
          KWK ’{String(member.year).slice(-2)}
        </span>
      </div>
      <div className={compact ? "min-w-0 p-3" : "p-5"}>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">
          {member.program}
        </p>
        <h3
          className={`${compact ? "mt-1.5 text-lg" : "mt-2 text-xl"} font-bold tracking-tight text-gray-900 group-hover:text-blue-600`}
        >
          {member.name}
        </h3>
        <p
          className={`${compact ? "line-clamp-2" : ""} mt-1 text-sm text-gray-600`}
        >
          {member.career}
        </p>
        {!compact && (
          <span className="mt-5 inline-flex text-sm font-bold text-blue-600">
            View profile{" "}
            <span className="ml-2 group-hover:translate-x-1">→</span>
          </span>
        )}
      </div>
    </Link>
  );
}

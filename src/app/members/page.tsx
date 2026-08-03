import MemberCard from "@/components/MemberCard";
import { MEMBERS } from "@/lib/members";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members",
  description: "Meet the Kode With Klossy community building what’s next.",
};

export default function MembersPage() {
  return (
    <div>
      <section className="mb-10 rounded-[2rem] bg-brand-forest px-7 py-10 text-white shadow-[0_24px_60px_rgb(7_59_49/0.14)] sm:px-10 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-lime">
          The people behind the ideas
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-[-0.05em] sm:text-6xl">
          Meet the Kircuit.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
          Discover KWK scholars and alumni, what they learned, and where their
          curiosity has taken them.
        </p>
      </section>

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            Member directory
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
            Find your people
          </h2>
        </div>
        <span className="text-sm font-medium text-gray-500">
          {MEMBERS.length} members
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MEMBERS.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

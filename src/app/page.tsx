import { db } from "@/db";
import { communities } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import NewCommunityForm from "@/components/NewCommunityForm";
import MemberCard from "@/components/MemberCard";
import { MEMBERS } from "@/lib/members";

export default async function HomePage() {
  const allCommunities = await db.select().from(communities);

  return (
    <div>
      <section className="relative mb-10 overflow-hidden rounded-[2rem] bg-brand-forest px-7 py-8 text-white shadow-[0_24px_60px_rgb(7_59_49/0.18)] sm:px-10 sm:py-10">
        <div
          className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[36px] border-brand-lime/10"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-28 right-32 h-56 w-56 rounded-full bg-brand-lavender/10 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-brand-lime">
              Your people are here
            </span>
            <h1 className="text-4xl font-bold leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl">
              Your KWK community
              <br />
              <span className="text-brand-lime">for coding what’s next.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/72 sm:text-base">
              The Kircuit is where curious people gather, share useful things,
              and turn common interests into real momentum.
            </p>
            <div className="mt-5 inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-1.5 pr-4 shadow-sm backdrop-blur">
              <Image
                src="/brand/kode-with-klossy.png"
                alt="Kode With Klossy"
                width={760}
                height={440}
                className="h-10 w-auto rounded-lg"
                priority
              />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/50">
                  Made for
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white">
                  the KWK community
                </p>
              </div>
            </div>
          </div>
          <NewCommunityForm />
        </div>
      </section>

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            Explore the network
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Find your next circle
          </h2>
        </div>
        <span className="hidden text-sm font-medium text-gray-500 sm:block">
          {allCommunities.length} communities
        </span>
      </div>

      <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {allCommunities.map((community) => (
          <Link
            key={community.id}
            href={`/${community.slug}`}
            className="group relative overflow-hidden rounded-[1.5rem] border border-gray-200/80 bg-white/90 p-7 shadow-[0_8px_30px_rgb(7_59_49/0.05)] backdrop-blur transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_18px_40px_rgb(7_59_49/0.12)]"
          >
            <div className="mb-10 grid h-11 w-11 place-items-center rounded-2xl bg-brand-lavender text-lg font-black text-brand-forest">
              {community.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600">
              {community.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
              {community.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
              Enter the circle{" "}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              Member directory
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Meet the people in the Kircuit
            </h2>
          </div>
          <Link
            href="/members"
            className="shrink-0 text-sm font-bold text-blue-600 hover:translate-x-1"
          >
            View all members →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MEMBERS.slice(0, 3).map((member) => (
            <MemberCard key={member.id} member={member} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

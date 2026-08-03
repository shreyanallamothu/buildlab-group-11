import { getMember, MEMBERS } from "@/lib/members";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type MemberPageProps = {
  params: Promise<{ memberId: string }>;
};

export function generateStaticParams() {
  return MEMBERS.map((member) => ({ memberId: member.id }));
}

export async function generateMetadata({
  params,
}: MemberPageProps): Promise<Metadata> {
  const { memberId } = await params;
  const member = getMember(memberId);

  if (!member) return {};

  return {
    title: member.name,
    description: `${member.name} is a ${member.program} alum and ${member.career}.`,
  };
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { memberId } = await params;
  const member = getMember(memberId);

  if (!member) notFound();

  return (
    <div>
      <Link
        href="/members"
        className="mb-6 inline-flex text-sm font-bold text-blue-600 hover:-translate-x-1"
      >
        ← Back to members
      </Link>

      <article className="overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white shadow-[0_18px_50px_rgb(7_59_49/0.09)]">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[24rem] bg-gray-100 lg:min-h-[38rem]">
            <Image
              src={member.image}
              alt={member.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <span className="w-fit rounded-full bg-brand-lime px-3 py-1 text-xs font-bold text-brand-forest">
              KWK class of {member.year}
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-[-0.05em] text-gray-900 sm:text-6xl">
              {member.name}
            </h1>
            <p className="mt-3 text-lg font-semibold text-blue-600">
              {member.career}
            </p>
            <p className="mt-1 text-sm text-gray-500">{member.location}</p>

            <div className="mt-8 grid gap-4 rounded-2xl bg-gray-50 p-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
                  KWK program
                </p>
                <p className="mt-1 font-bold text-gray-900">{member.program}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
                  Year
                </p>
                <p className="mt-1 font-bold text-gray-900">{member.year}</p>
              </div>
            </div>

            <p className="mt-8 text-base leading-8 text-gray-700">
              {member.bio}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${member.email}`}
                className="rounded-full bg-brand-forest px-5 py-2.5 text-sm font-bold text-white hover:-translate-y-0.5"
              >
                Email
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-900 hover:-translate-y-0.5 hover:border-blue-500"
              >
                LinkedIn
              </a>
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-900 hover:-translate-y-0.5 hover:border-blue-500"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

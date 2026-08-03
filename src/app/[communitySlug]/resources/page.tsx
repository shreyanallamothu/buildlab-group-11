import CommunityNav from "@/components/CommunityNav";
import NewResourceForm from "@/components/NewResourceForm";
import ResourceSearch from "@/components/ResourceSearch";
import { db } from "@/db";
import { communities, resources } from "@/db/schema";
import type { CommunityPageProps } from "@/types";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function ResourcesPage({ params }: CommunityPageProps) {
  const { communitySlug } = await params;

  const community = await db
    .select()
    .from(communities)
    .where(eq(communities.slug, communitySlug))
    .then((rows) => rows[0]);

  if (!community) {
    notFound();
  }

  const communityResources = await db
    .select()
    .from(resources)
    .where(eq(resources.communityId, community.id));

  return (
    <div>
      <div className="mb-8 flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-gray-200/70 bg-white/75 p-7 shadow-[0_12px_40px_rgb(7_59_49/0.06)] backdrop-blur sm:flex-row sm:p-10">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            Community knowledge
          </p>
          <h1 className="page-title">{community.name} Resources</h1>
          <p className="mt-4 max-w-2xl text-gray-600">
            Explore tools, guides, and links shared by {community.name}.
          </p>
        </div>
        <NewResourceForm communityId={community.id} />
      </div>

      <CommunityNav slug={community.slug} activeTab="resources" />

      <ResourceSearch resources={communityResources} />
    </div>
  );
}

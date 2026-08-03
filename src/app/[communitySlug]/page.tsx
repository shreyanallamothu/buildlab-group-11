import { db } from "@/db";
import { communities, posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommunityNav from "@/components/CommunityNav";
import type { CommunityPageProps } from "@/types";

// ============================================================
// COMMUNITY HOMEPAGE
// ============================================================
// This is the main page for a specific community.
// Right now it just shows the community name and description.
//
// YOUR TICKETS WILL ADD:
// - Ticket #1 (Person A): Display a list of posts here
// - Ticket #3 (Person C): Display a list of resources here
// - Ticket #4 (Person A): Add a "New Post" button and form
// - Ticket #6 (Person C): Add an "Add Resource" button and form
// - Ticket #10 (Person B): Improve the layout and styling
// ============================================================

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { communitySlug } = await params;

  const community = await db
    .select()
    .from(communities)
    .where(eq(communities.slug, communitySlug))
    .then((rows) => rows[0]);

  if (!community) {
    notFound();
  }

  const communityPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.communityId, community.id));

  return (
    <div>
      <div className="mb-8 rounded-[2rem] border border-gray-200/70 bg-white/75 p-7 shadow-[0_12px_40px_rgb(7_59_49/0.06)] backdrop-blur sm:p-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
          Community on The Kircuit
        </p>
        <h1 className="page-title">{community.name}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
          {community.description}
        </p>
      </div>

      <CommunityNav slug={community.slug} activeTab="home" />

      <section>
        <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-900">
          Latest conversations
        </h2>

        {communityPosts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white/70 p-10 text-center">
            <p className="text-gray-500">No posts yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {communityPosts.map((post) => (
              <Link
                key={post.id}
                href={`/${community.slug}/posts/${post.id}`}
                className="group block rounded-3xl border border-gray-200/80 bg-white p-7 shadow-sm hover:-translate-y-0.5 hover:border-blue-500/30 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                  {post.content}
                </p>
                <p className="mt-4 text-xs text-gray-500">
                  {post.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

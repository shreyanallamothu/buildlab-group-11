import { db } from "@/db";
import { communities, posts } from "@/db/schema";
import { communities, posts, resources } from "@/db/schema";
import { communities, posts, events,} from "@/db/schema";
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

  const communityResources = await db
    .select()
    .from(resources)
    .where(eq(resources.communityId, community.id));

  return (
    <div>
      <div className="mb-8">
        <h1 className="page-title">{community.name}</h1>
        <p className="mt-2 text-gray-600">{community.description}</p>
      </div>

      <CommunityNav slug={community.slug} activeTab="home" />

      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Posts</h2>

        {communityPosts.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">No posts yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {communityPosts.map((post) => (
              <Link
                key={post.id}
                href={`/${community.slug}/posts/${post.id}`}
                className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">
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

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Resources</h2>

        {communityResources.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">No resources yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {communityResources.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {resource.description}
                </p>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

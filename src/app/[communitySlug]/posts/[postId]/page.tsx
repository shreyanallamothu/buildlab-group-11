import { db } from "@/db";
import { comments, posts, users, communities } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { PostPageProps } from "@/types";
import CommentForm from "@/components/CommentForm";

export default async function PostDetailPage({ params }: PostPageProps) {
  const { communitySlug, postId } = await params;

  // First, verify the community exists
  const community = await db
    .select()
    .from(communities)
    .where(eq(communities.slug, communitySlug))
    .then((rows) => rows[0]);

  if (!community) {
    notFound();
  }

  // Then fetch the post, ensuring it belongs to this community
  const post = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      createdAt: posts.createdAt,
      authorName: users.name,
      authorImage: users.image,
    })
    .from(posts)
    .innerJoin(users, eq(posts.authorId, users.id))
    .where(and(eq(posts.id, postId), eq(posts.communityId, community.id)))
    .then((rows) => rows[0]);

  if (!post) {
    notFound();
  }

  const postComments = await db
    .select({
      id: comments.id,
      text: comments.text,
      createdAt: comments.createdAt,
      authorName: users.name,
      authorImage: users.image,
    })
    .from(comments)
    .innerJoin(users, eq(comments.authorId, users.id))
    .where(eq(comments.postId, post.id))
    .orderBy(asc(comments.createdAt));

  return (
    <div>
      <Link
        href={`/${communitySlug}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:-translate-x-1"
      >
        ← Back to community
      </Link>

      <article className="rounded-[2rem] border border-gray-200/80 bg-white p-7 shadow-[0_12px_40px_rgb(7_59_49/0.06)] sm:p-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
          Conversation
        </p>
        <h1 className="text-3xl font-bold tracking-[-0.04em] text-gray-900 sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-5 flex items-center gap-3 border-b border-gray-200 pb-6">
          {post.authorImage && (
            <img
              src={post.authorImage}
              alt={post.authorName ?? "Author"}
              className="h-9 w-9 rounded-full ring-2 ring-gray-100"
            />
          )}
          <span className="text-sm text-gray-500">
            {post.authorName} ·{" "}
            {post.createdAt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <p className="mt-8 whitespace-pre-wrap text-base leading-8 text-gray-700">
          {post.content}
        </p>
      </article>

      <section className="mt-8 rounded-[2rem] border border-gray-200/80 bg-white p-6 shadow-[0_12px_40px_rgb(7_59_49/0.05)] sm:p-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              Join the discussion
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
              Comments
            </h2>
          </div>
          <span className="rounded-full bg-brand-lavender px-3 py-1 text-xs font-bold text-brand-forest">
            {postComments.length}{" "}
            {postComments.length === 1 ? "reply" : "replies"}
          </span>
        </div>

        <CommentForm postId={post.id} />

        {postComments.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 px-6 py-10 text-center">
            <p className="font-bold text-gray-900">Start the conversation</p>
            <p className="mt-1 text-sm text-gray-500">
              Be the first person to share a thought or question.
            </p>
          </div>
        ) : (
          <ol className="mt-8 divide-y divide-gray-200">
            {postComments.map((comment) => (
              <li
                key={comment.id}
                className="flex gap-4 py-6 first:pt-0 last:pb-0"
              >
                {comment.authorImage ? (
                  <img
                    src={comment.authorImage}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full ring-2 ring-gray-100"
                  />
                ) : (
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-lavender text-sm font-bold text-brand-forest">
                    {comment.authorName.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      {comment.authorName}
                    </h3>
                    <time
                      className="text-xs text-gray-500"
                      dateTime={comment.createdAt.toISOString()}
                    >
                      {comment.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                    {comment.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

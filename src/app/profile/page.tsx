import { db } from "@/db";
import { communities, posts, users } from "@/db/schema";
import { DEV_AUTH_COOKIE_NAME } from "@/lib/auth-session";
import { desc, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(DEV_AUTH_COOKIE_NAME)?.value;

  if (!userId) {
    redirect("/");
  }

  const user = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
    })
    .from(users)
    .where(eq(users.id, userId))
    .then((rows) => rows[0]);

  if (!user) {
    redirect("/");
  }

  const authoredPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      createdAt: posts.createdAt,
      communityName: communities.name,
      communitySlug: communities.slug,
    })
    .from(posts)
    .innerJoin(communities, eq(posts.communityId, communities.id))
    .where(eq(posts.authorId, user.id))
    .orderBy(desc(posts.createdAt));

  return (
    <div>
      <h1 className="page-title mb-6">Your Profile</h1>

      <section className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {user.image ? (
          <img
            src={user.image}
            alt={`${user.name}'s profile picture`}
            className="h-20 w-20 rounded-full"
          />
        ) : (
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-2xl font-semibold text-gray-500"
            aria-hidden="true"
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="mt-1 text-gray-600">{user.email}</p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Your Posts</h2>

        {authoredPosts.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">You have not written any posts yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {authoredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/${post.communitySlug}/posts/${post.id}`}
                className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {post.title}
                  </h3>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {post.communityName}
                  </span>
                </div>
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

import { db } from "@/db";
import { comments, posts, users } from "@/db/schema";
import { getAuthUserId } from "@/lib/auth-session";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const MAX_COMMENT_LENGTH = 1000;

export async function POST(request: Request) {
  const authorId = getAuthUserId(request);

  if (!authorId) {
    return NextResponse.json(
      { error: "Log in to join the conversation." },
      { status: 401 }
    );
  }

  let body: { postId?: unknown; text?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const postId = typeof body.postId === "string" ? body.postId.trim() : "";
  const text = typeof body.text === "string" ? body.text.trim() : "";

  if (!postId || !text) {
    return NextResponse.json(
      { error: "Comment text is required." },
      { status: 400 }
    );
  }

  if (text.length > MAX_COMMENT_LENGTH) {
    return NextResponse.json(
      { error: `Comments must be ${MAX_COMMENT_LENGTH} characters or fewer.` },
      { status: 400 }
    );
  }

  const [post, author] = await Promise.all([
    db
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.id, postId))
      .then((rows) => rows[0]),
    db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, authorId))
      .then((rows) => rows[0]),
  ]);

  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  if (!author) {
    return NextResponse.json(
      { error: "Your account could not be found." },
      { status: 401 }
    );
  }

  try {
    const [comment] = await db
      .insert(comments)
      .values({
        id: crypto.randomUUID(),
        text,
        postId,
        authorId,
      })
      .returning();

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Failed to create comment:", error);
    return NextResponse.json(
      { error: "Unable to publish your comment. Please try again." },
      { status: 500 }
    );
  }
}

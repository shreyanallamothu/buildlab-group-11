import { NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";

function getDatabaseErrorCode(error: unknown) {
  if (typeof error === "object" && error !== null && "code" in error) {
    const { code } = error as { code?: unknown };
    return typeof code === "string" ? code : null;
  }

  return null;
}

export async function POST(request: Request) {
  let body: {
    title?: string;
    content?: string;
    authorId?: string;
    communityId?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const { title, content, authorId, communityId } = body;

  if (!title || !content || !authorId || !communityId) {
    return NextResponse.json(
      { error: "title, content, authorId, and communityId are required." },
      { status: 400 },
    );
  }

  try {
    const [post] = await db
      .insert(posts)
      .values({
        id: crypto.randomUUID(),
        title,
        content,
        authorId,
        communityId,
      })
      .returning();

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);

    if (getDatabaseErrorCode(error) === "23503") {
      return NextResponse.json(
        { error: "authorId or communityId does not match an existing record." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Unable to create post." },
      { status: 500 },
    );
  }
}

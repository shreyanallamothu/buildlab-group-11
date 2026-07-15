import { db } from "@/db";
import { communities, resources } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { title, description, url, communityId } = body as Record<
    string,
    unknown
  >;

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof url !== "string" ||
    typeof communityId !== "string" ||
    !title.trim() ||
    !description.trim() ||
    !url.trim() ||
    !communityId.trim()
  ) {
    return Response.json(
      { error: "Title, description, URL, and community are required." },
      { status: 400 }
    );
  }

  try {
    const parsedUrl = new URL(url.trim());

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error("Unsupported URL protocol");
    }
  } catch {
    return Response.json(
      { error: "Enter a valid HTTP or HTTPS URL." },
      { status: 400 }
    );
  }

  const community = await db
    .select({ id: communities.id })
    .from(communities)
    .where(eq(communities.id, communityId))
    .then((rows) => rows[0]);

  if (!community) {
    return Response.json({ error: "Community not found." }, { status: 404 });
  }

  const [resource] = await db
    .insert(resources)
    .values({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      url: url.trim(),
      communityId,
    })
    .returning();

  return Response.json(resource, { status: 201 });
}

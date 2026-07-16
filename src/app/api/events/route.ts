import { NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema";

function getDatabaseErrorCode(error: unknown) {
  if (typeof error === "object" && error !== null && "code" in error) {
    const { code } = error as { code?: unknown };
    return typeof code === "string" ? code : null;
  }

  return null;
}

export async function POST(request: Request) {
  let body: {
    name?: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    communityId?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const { name, description, startTime, endTime, location, communityId } = body;

  if (
    !name ||
    !description ||
    !startTime ||
    !endTime ||
    !location ||
    !communityId
  ) {
    return NextResponse.json(
      {
        error:
          "name, description, startTime, endTime, location, and communityId are required.",
      },
      { status: 400 }
    );
  }

  const parsedStartTime = new Date(startTime);
  const parsedEndTime = new Date(endTime);

  if (
    Number.isNaN(parsedStartTime.getTime()) ||
    Number.isNaN(parsedEndTime.getTime())
  ) {
    return NextResponse.json(
      { error: "startTime and endTime must be valid dates." },
      { status: 400 }
    );
  }

  if (parsedEndTime <= parsedStartTime) {
    return NextResponse.json(
      { error: "endTime must be after startTime." },
      { status: 400 }
    );
  }

  try {
    const [event] = await db
      .insert(events)
      .values({
        id: crypto.randomUUID(),
        name,
        description,
        startTime: parsedStartTime,
        endTime: parsedEndTime,
        location,
        communityId,
      })
      .returning();

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Failed to create event:", error);

    if (getDatabaseErrorCode(error) === "23503") {
      return NextResponse.json(
        { error: "communityId does not match an existing community." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Unable to create event." },
      { status: 500 }
    );
  }
}

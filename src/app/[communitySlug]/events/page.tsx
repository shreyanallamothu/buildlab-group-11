import { db } from "@/db";
import { communities, events } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import CommunityNav from "@/components/CommunityNav";
import type { CommunityPageProps } from "@/types";

// ============================================================
// EVENTS PAGE
// ============================================================
// This page will display all events for a community.
//
// YOUR TICKETS WILL ADD:
// - Ticket #2 (Person B): Fetch and display the list of events
// - Ticket #5 (Person B): Add a "New Event" button and form
// - Ticket #9 (Person B): Add RSVP functionality to each event
// ============================================================

export default async function EventsPage({ params }: CommunityPageProps) {
  const { communitySlug } = await params;

  const community = await db
    .select()
    .from(communities)
    .where(eq(communities.slug, communitySlug))
    .then((rows) => rows[0]);

  if (!community) {
    notFound();
  }

  const communityEvents = await db
    .select()
    .from(events)
    .where(eq(events.communityId, community.id))
    .orderBy(asc(events.startTime));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {community.name} - Events
        </h1>
        <p className="mt-2 text-gray-600">
          Upcoming events for {community.name}.
        </p>
      </div>

      <CommunityNav slug={community.slug} activeTab="events" />

      {communityEvents.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="text-lg font-medium text-gray-700">
            No events have been added yet.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Check back later for upcoming events in {community.name}.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {communityEvents.map((event) => (
            <article
              key={event.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {event.name}
              </h2>
              <p className="mt-2 text-gray-700">{event.description}</p>
              <div className="mt-4 space-y-1 text-sm text-gray-500">
                <p>
                  <span className="font-medium text-gray-700">Starts:</span>{" "}
                  {event.startTime.toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Ends:</span>{" "}
                  {event.endTime.toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

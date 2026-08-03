import Link from "next/link";

type CommunityNavProps = {
  slug: string;
  activeTab: "home" | "events" | "resources";
};

export default function CommunityNav({ slug, activeTab }: CommunityNavProps) {
  return (
    <nav className="mb-10 inline-flex rounded-full border border-gray-200 bg-white/80 p-1.5 shadow-sm backdrop-blur">
      <Link
        href={`/${slug}`}
        className={`rounded-full px-5 py-2 text-sm font-bold ${
          activeTab === "home"
            ? "bg-brand-forest text-white shadow-sm"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        Home
      </Link>
      <Link
        href={`/${slug}/events`}
        className={`rounded-full px-5 py-2 text-sm font-bold ${
          activeTab === "events"
            ? "bg-brand-forest text-white shadow-sm"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        Events
      </Link>
      <Link
        href={`/${slug}/resources`}
        className={`rounded-full px-5 py-2 text-sm font-bold ${
          activeTab === "resources"
            ? "bg-brand-forest text-white shadow-sm"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        Resources
      </Link>
    </nav>
  );
}

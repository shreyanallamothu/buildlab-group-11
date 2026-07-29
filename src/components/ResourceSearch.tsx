"use client";

import { useState } from "react";

type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
};

type ResourceSearchProps = {
  resources: Resource[];
};

export default function ResourceSearch({ resources }: ResourceSearchProps) {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredResources = resources.filter((resource) =>
    `${resource.title} ${resource.description}`
      .toLowerCase()
      .includes(normalizedQuery),
  );

  if (resources.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-500">No resources yet.</p>
      </div>
    );
  }

  return (
    <div>
      <label
        htmlFor="resource-search"
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        Search resources
      </label>
      <input
        id="resource-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by title or description"
        className="mb-4 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {filteredResources.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-500">No resources match your search.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResources.map((resource) => (
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
    </div>
  );
}

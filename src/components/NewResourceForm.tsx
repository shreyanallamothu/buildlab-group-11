"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

type NewResourceFormProps = {
  communityId: string;
};

export default function NewResourceForm({ communityId }: NewResourceFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  function closeDialog() {
    if (pending) return;
    setError(null);
    setOpen(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, url, communityId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to add the resource.");
        return;
      }

      setTitle("");
      setDescription("");
      setUrl("");
      setOpen(false);
      router.refresh();
    } catch {
      setError("Unable to add the resource. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Button label="Add Resource" onClick={() => setOpen(true)} />

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-resource-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <h2
              id="new-resource-title"
              className="mb-4 text-xl font-semibold text-gray-900"
            >
              Add a resource
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="resource-title"
                  className="block text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  id="resource-title"
                  name="title"
                  type="text"
                  required
                  autoFocus
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Enter a title"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="resource-description"
                  className="block text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  id="resource-description"
                  name="description"
                  required
                  rows={4}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe this resource"
                  className="mt-1 w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="resource-url"
                  className="block text-sm font-medium text-gray-900"
                >
                  URL
                </label>
                <input
                  id="resource-url"
                  name="url"
                  type="url"
                  required
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://example.com"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  label="Cancel"
                  variant="secondary"
                  onClick={closeDialog}
                  disabled={pending}
                />
                <Button
                  label={pending ? "Adding..." : "Add Resource"}
                  type="submit"
                  disabled={pending}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MAX_COMMENT_LENGTH = 1000;

export default function CommentForm({ postId }: { postId: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const commentText = text.trim();
    if (!commentText || pending) return;

    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, text: commentText }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to publish your comment.");
        return;
      }

      setText("");
      router.refresh();
    } catch {
      setError("Unable to publish your comment. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/80 px-5 py-4 text-sm text-gray-600">
        <span className="font-bold text-gray-900">Want to join in?</span> Log in
        from the header to add a comment.
      </div>
    );
  }

  const charactersRemaining = MAX_COMMENT_LENGTH - text.length;

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-gray-50 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        {user.image ? (
          <img
            src={user.image}
            alt=""
            className="h-9 w-9 rounded-full ring-2 ring-white"
          />
        ) : (
          <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-lavender text-sm font-bold text-brand-forest">
            {user.name.charAt(0)}
          </div>
        )}
        <label
          htmlFor="comment-text"
          className="text-sm font-bold text-gray-900"
        >
          Reply as {user.name}
        </label>
      </div>

      <textarea
        id="comment-text"
        name="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        maxLength={MAX_COMMENT_LENGTH}
        rows={4}
        required
        placeholder="Add to the conversation…"
        className="mt-4 w-full resize-y rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm leading-6 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />

      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between gap-4">
        <span className="text-xs text-gray-500">
          {charactersRemaining} characters remaining
        </span>
        <button
          type="submit"
          disabled={pending || !text.trim()}
          className="rounded-full bg-brand-forest px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {pending ? "Publishing…" : "Publish comment"}
        </button>
      </div>
    </form>
  );
}

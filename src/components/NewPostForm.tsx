"use client";

import { useState } from "react";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <form className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label
          htmlFor="post-title"
          className="block text-sm font-medium text-gray-900"
        >
          Post title
        </label>
        <input
          id="post-title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Give your post a clear title"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="post-content"
          className="block text-sm font-medium text-gray-900"
        >
          Content
        </label>
        <textarea
          id="post-content"
          name="content"
          required
          rows={6}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your post..."
          className="mt-1 w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Post
        </button>
      </div>
    </form>
  );
}

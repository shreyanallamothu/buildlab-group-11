import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CommentForm from "@/components/CommentForm";

const refresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

jest.mock("@/lib/auth", () => ({
  useAuth: () => ({
    user: {
      id: "user-1",
      name: "Alex Rivera",
      email: "alex@example.com",
      image: "https://example.com/alex.png",
    },
  }),
}));

describe("CommentForm", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    refresh.mockClear();
  });

  it("publishes a trimmed comment and refreshes the post", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "comment-1" }),
    });
    Object.defineProperty(global, "fetch", {
      configurable: true,
      writable: true,
      value: fetchMock,
    });

    render(<CommentForm postId="post-1" />);

    fireEvent.change(screen.getByLabelText("Reply as Alex Rivera"), {
      target: { value: "  Love this idea!  " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Publish comment" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/comments",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ postId: "post-1", text: "Love this idea!" }),
      })
    );
    await waitFor(() => expect(refresh).toHaveBeenCalled());
    expect(screen.getByLabelText("Reply as Alex Rivera")).toHaveValue("");
  });
});

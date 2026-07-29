import { fireEvent, render, screen } from "@testing-library/react";
import ResourceSearch from "@/components/ResourceSearch";

const resources = [
  {
    id: "resource-1",
    title: "React Guide",
    description: "Learn how to build interfaces.",
    url: "https://react.dev",
  },
  {
    id: "resource-2",
    title: "Database Notes",
    description: "An introduction to PostgreSQL.",
    url: "https://www.postgresql.org/docs/",
  },
];

describe("ResourceSearch", () => {
  it("filters resources by title or description", () => {
    render(<ResourceSearch resources={resources} />);

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "postgresql" },
    });

    expect(screen.getByText("Database Notes")).toBeInTheDocument();
    expect(screen.queryByText("React Guide")).not.toBeInTheDocument();
  });
});

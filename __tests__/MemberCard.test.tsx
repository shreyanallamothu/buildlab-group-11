import { render, screen } from "@testing-library/react";
import MemberCard from "@/components/MemberCard";
import { MEMBERS } from "@/lib/members";

describe("MemberCard", () => {
  it("links to the member profile and shows their KWK experience", () => {
    const elena = MEMBERS[0];
    render(<MemberCard member={elena} />);

    expect(
      screen.getByRole("link", { name: /Elena Morales/i })
    ).toHaveAttribute("href", "/members/elena-morales");
    expect(screen.getByText("Mobile App Development Camp")).toBeInTheDocument();
    expect(
      screen.getByText("Game Developer @ Lantern Studio")
    ).toBeInTheDocument();
  });
});

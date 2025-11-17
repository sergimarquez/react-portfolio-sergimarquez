import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogIndexClient from "../BlogIndexClient";

describe("BlogIndexClient", () => {
  const posts = [
    {
      slug: "design-systems",
      title: "Design Systems",
      date: "2025-03-10",
      summary: "Design systems that scale.",
      tags: ["design", "architecture"],
    },
    {
      slug: "performance-notes",
      title: "Performance Notes",
      date: "2024-07-01",
      summary: "Keeping apps fast.",
      tags: ["performance"],
    },
  ];

  it("filters posts by tag", async () => {
    const user = userEvent.setup();
    render(<BlogIndexClient initialPosts={posts} />);

    expect(screen.getByText(/Design Systems/)).toBeInTheDocument();
    expect(screen.getByText(/Performance Notes/)).toBeInTheDocument();

    const designBadges = screen.getAllByText("design");
    await user.click(designBadges[0]);

    expect(screen.getByText(/Design Systems/)).toBeInTheDocument();
    expect(screen.queryByText(/Performance Notes/)).not.toBeInTheDocument();
  });

  it("filters posts by year", async () => {
    const user = userEvent.setup();
    render(<BlogIndexClient initialPosts={posts} />);

    await user.click(screen.getByRole("button", { name: "2024" }));

    expect(screen.getByText(/Performance Notes/)).toBeInTheDocument();
    expect(screen.queryByText(/Design Systems/)).not.toBeInTheDocument();
  });
});

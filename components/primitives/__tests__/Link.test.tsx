import { render, screen } from "@testing-library/react";
import Link from "@/components/primitives/Link";

jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  MockLink.displayName = "NextLinkMock";
  return MockLink;
});

describe("Link", () => {
  it("renders internal link", () => {
    render(<Link href="/blog">Blog</Link>);
    const anchor = screen.getByRole("link", { name: /blog/i });
    expect(anchor).toHaveAttribute("href", "/blog");
    expect(anchor).not.toHaveAttribute("target", "_blank");
  });

  it("renders external link with target and rel", () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );
    const anchor = screen.getByRole("link", { name: /external/i });
    expect(anchor).toHaveAttribute("href", "https://example.com");
    expect(anchor).toHaveAttribute("target", "_blank");
    expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});

import { useState, useEffect } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const DocTableOfContents = () => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all headings in the main content
    const extractHeadings = () => {
      const main = document.querySelector("main");
      if (!main) return;

      const headingElements = main.querySelectorAll("h2, h3");
      const items: TocItem[] = [];

      headingElements.forEach((heading) => {
        // Generate an ID if the heading doesn't have one
        if (!heading.id) {
          heading.id = heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") || "";
        }

        if (heading.id && heading.textContent) {
          items.push({
            id: heading.id,
            text: heading.textContent,
            level: heading.tagName === "H2" ? 2 : 3,
          });
        }
      });

      setHeadings(items);
    };

    // Delay extraction to ensure DOM is ready
    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-64 shrink-0">
      <div className="sticky top-24 overflow-y-auto max-h-[calc(100vh-120px)]">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
            <List className="w-4 h-4" />
            <span>On this page</span>
          </div>
          <nav className="space-y-1">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  "block w-full text-left text-sm py-1.5 transition-colors duration-200 hover:text-primary",
                  heading.level === 3 ? "pl-4" : "pl-0",
                  activeId === heading.id
                    ? "text-primary font-medium border-l-2 border-primary -ml-px pl-3"
                    : "text-muted-foreground"
                )}
              >
                <span className="line-clamp-2">{heading.text}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default DocTableOfContents;

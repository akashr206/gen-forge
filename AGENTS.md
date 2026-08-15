<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Resume Builder Architecture & Conventions

## Design Aesthetics
- **Core Style**: Minimalist, technical elegance. Clean typography, generous whitespace.
- **Links**: Hyperlinks (both in headers and markdown descriptions) MUST be styled as simple text (`text-blue-700` or `text-blue-600`), without underlines or hover effects. This ensures a clean, professional look that reads well in PDF form.
- **Separators**: Use em dashes (`—`) or pipes (`|`) to separate inline metadata (e.g., email — phone — location, or Location | Date | Link 1 | Link 2) instead of bullet points.

## Component Architecture
- **ResumeViewer (`ResumeViewer.jsx`)**: The core engine for rendering the resume. It renders a hidden continuous block first, measures elements, and then splits them across physical A4 pages (210mm x 297mm).
- **PageBreakable (`PageBreakable.jsx`)**: A wrapper that uses `VisibilityContext` to hide/show elements per page. 
  - *Crucial Pagination Rule*: Section headings MUST NOT be wrapped in their own standalone `PageBreakable` wrapper. To prevent orphaned headings, the heading must be grouped *inside* the `PageBreakable` block of the **first item** in that section.
- **BaseTemplate (`BaseTemplate.jsx`)**: The shell that applies global padding. Its vertical padding is locked to `py-[6.5cqw]` (approx. 6.5% of the container width).
- **Editors**: We use Shadcn UI components (`Input`, `Textarea`, `Label`, `Button`) with `lucide-react` icons. All array data (like custom `links`) must be dynamically editable (add/remove features).

## Core Technical Solutions & Gotchas
- **PDF Clickable Links**: `transform: translateY` breaks the PDF export coordinate mapping in browsers (links become unclickable). To shift content up on subsequent pages, we MUST apply the shift using negative `marginTop` instead.
- **Pagination Math**: We use `getBoundingClientRect()` over `offsetTop` for bulletproof calculations. The offset from the top of the container is exactly `rect.top - containerRect.top`.
- **Pagination Margins**: Because `BaseTemplate` uses `py-[6.5cqw]`, `ResumeViewer` uses `width * 0.065` to calculate `verticalMargin`. This precise value is used to calculate `maxBottomCoordinate` and to set the `shiftY` for subsequent pages, ensuring perfectly identical top padding across all printed pages.
- **Printing**: Ensure `print-color-adjust: exact` is used in `globals.css` to preserve colors (like the blue links) during PDF export via `window.print()`. Ensure `.print-no-scale` prevents unwanted transforms.

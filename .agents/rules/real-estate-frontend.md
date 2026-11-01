
---
trigger: always_on
---

# Real Estate Frontend Development Rules

## 1. Project Overview

Build premium, modern, production-quality real estate website templates.

The project is frontend-only. Do not introduce backend services or database dependencies.

Prioritize:
- Premium visual design.
- Excellent user experience.
- Responsive layouts.
- Reusable components.
- Clean architecture.
- Smooth animations and interactions.
- Maintainable and scalable code.

## 2. Technology Stack

Use the following technologies:

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Zustand
- Lucide React
- Framer Motion where appropriate

Rules:
- Use TypeScript throughout the project.
- Prefer Server Components by default.
- Use Client Components only when interactivity or browser APIs require them.
- Never introduce unnecessary dependencies.
- Use existing installed packages whenever possible.
- Do not use any backend or database.

## 3. Typography and Fonts

Use Google Fonts:

- Space Grotesk: Primary font.
- Oswald: Headings and section titles.
- Bebas Neue: Large display headings and decorative typography.
- Orbitron: Specialized labels and futuristic accents.

Use the following font definitions:

```css
.space-grotesk {
  font-family: "Space Grotesk", sans-serif;
}

.oswald {
  font-family: "Oswald", sans-serif;
}

.bebas-neue {
  font-family: "Bebas Neue", sans-serif;
}

.orbitron {
  font-family: "Orbitron", sans-serif;
}
```

Font implementation:
- Prefer next/font/google for optimized font loading.
- Configure fonts centrally.
- Define font variables in the root layout.
- Avoid loading the same font multiple times.
- Use Space Grotesk as the default body font.
- Maintain consistent typography hierarchy.

## 4. Folder Structure

Maintain a clean, feature-oriented folder structure.

Recommended structure:

src/
├── app/
│   ├── (website)/
│   │   ├── page.tsx
│   │   ├── properties/
│   │   ├── agents/
│   │   ├── about/
│   │   └── contact/
│   ├── layout.tsx
│   ├── globals.css
│   └── not-found.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── common/
│   ├── navigation/
│   └── sections/
│
├── features/
│   ├── properties/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── data/
│   │   └── types/
│   ├── agents/
│   ├── contact/
│   └── search/
│
├── store/
├── hooks/
├── lib/
├── constants/
├── data/
├── types/
└── utils/

Rules:
- Keep components inside their appropriate feature folders.
- Shared components belong in components/.
- Zustand stores belong in store/.
- Validation schemas belong in feature-specific schemas/.
- Static mock data belongs in data/ or feature-specific data/.
- Never inline or hardcode static datasets, mock arrays, or fixture lists inside component or page files. Always place static mock data in dedicated files inside `data/` or feature-specific `data/` and import them.
- **Dynamic Rendering Rule**: Never hardcode repetitive static options, select items, dropdown choices, radio items, or fixture cards directly in JSX markup. Always define them as structured array/object response datasets in separate files under `data/` (or feature-specific `data/`), import them, and dynamically map (`.map(...)`) over them inside components and pages.
- Keep utility functions inside utils/ or lib/.
- Avoid unnecessary folder nesting.
- Never create multiple files for trivial functionality.

## 5. Component Architecture

Reusability is mandatory.

- Build small, reusable components.
- Separate layout, sections and UI components.
- Avoid oversized components.
- Extract repeated UI patterns.
- Use composition instead of excessive prop drilling.
- Keep components focused on one responsibility.
- Use consistent component naming (PascalCase).
- Keep business-specific UI inside its feature folder.

Examples:

PropertyCard
PropertyGrid
PropertyGallery
PropertyFilters
PropertySearch
PropertyDetails
AgentCard
AgentProfile
PriceBadge
LocationBadge
SectionHeading
SectionContainer
Navbar
Footer

Never duplicate components when an existing reusable component can be extended.

## 6. Tailwind CSS Rules

- Use Tailwind CSS for all primary styling.
- Avoid unnecessary custom CSS.
- Avoid inline styles unless dynamically required.
- Use consistent spacing, typography and color scales.
- Create reusable design tokens.
- Maintain responsive layouts using Tailwind breakpoints.
- Use CSS variables for theme colors.
- Avoid excessive arbitrary values.
- Avoid conflicting utility classes.
- Use consistent hover, focus and active states.
- Ensure light and dark theme consistency if both are implemented.

Do not use styled-components or CSS-in-JS libraries.

## 7. Forms and Validation

Use React Hook Form with Zod.

Requirements:
- Define Zod schemas separately.
- Use zodResolver.
- Use TypeScript inferred types from schemas.
- Provide clear validation messages.
- Display field-level errors.
- Handle submission and loading states.
- Keep form components reusable.

Example:

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

Never implement manual validation when an existing Zod schema can handle it.

## 8. State Management

Use Zustand for shared client-side state.

Suitable use cases:
- Saved / favourite properties.
- Property comparison.
- Search preferences.
- Shared UI state.
- Mobile navigation state.
- Theme preferences.

Rules:
- Create separate stores based on responsibilities.
- Keep stores small and focused.
- Use selectors to prevent unnecessary re-renders.
- Avoid putting all application state in one store.
- Do not use Zustand for simple local component state.
- Use URL search parameters for shareable filters and pagination.
- Persist only necessary state using Zustand persist.

## 9. UI Component and Animation Resources

Approved component inspiration and resources:

- https://animmasterlib.dev/
- https://skiper-ui.com/
- https://www.vengenceui.com/

Rules:
- Explore these resources before implementing complex UI patterns.
- Reuse suitable components when they fit the design.
- Check installation instructions and package compatibility.
- Follow their respective licensing requirements.
- Do not blindly copy entire layouts.
- Customize components to match the template's design system.
- Prefer lightweight and performant animations.
- Avoid excessive animation and unnecessary visual effects.
- Respect prefers-reduced-motion.
- Maintain consistent animation timing and easing.
- Never use unstyled native browser controls (such as raw unstyled `<select>`, raw `<input type="checkbox">`, or default browser controls). Always create and use custom-designed UI components (e.g. `Select`, `AsyncSelect`, `Checkbox`, `RadioGroup`, `Switch`) inspired by approved resources (animmasterlib, skiper-ui, vengenceui), customized to the template's design system and dual light/dark theme.

## 10. Real Estate Design Guidelines

The website must feel like a premium real estate brand.

Prioritize:
- Large, high-quality property imagery.
- Elegant typography.
- Strong visual hierarchy.
- Spacious layouts.
- Sophisticated color palettes.
- Clean property cards.
- Attractive property galleries.
- Well-designed search and filter interfaces.
- Clear calls to action.

Property-related UI should support:
- Property type.
- Sale / rent status.
- Price.
- Location.
- Bedrooms and bathrooms.
- Property area.
- Property images.
- Amenities.
- Agent information.

Use realistic mock property data.

Avoid generic dashboard-like layouts for public-facing real estate websites.

## 11. Responsive Design

Every component must work across:

- Mobile.
- Tablet.
- Laptop.
- Desktop.
- Large desktop screens.

Rules:
- Mobile-first implementation.
- No horizontal overflow.
- Responsive typography.
- Responsive navigation.
- Proper image sizing.
- Touch-friendly controls.
- Responsive grids and layouts.
- Test common screen widths.

Never consider a component complete if only its desktop layout works.

## 12. Performance Optimization

- Use Next.js Image for optimized images.
- Prevent layout shifts.
- Lazy-load below-the-fold media where appropriate.
- Avoid unnecessary Client Components.
- Avoid unnecessary useEffect.
- Prevent unnecessary re-renders.
- Dynamically load heavy components when beneficial.
- Avoid excessive animation libraries.
- Keep dependencies lightweight.
- Optimize font loading.
- Use semantic HTML.

Do not sacrifice performance for decorative effects.

## 13. Accessibility

- Use semantic HTML.
- Provide meaningful image alt text.
- Ensure keyboard navigation.
- Use accessible form labels.
- Maintain sufficient color contrast.
- Provide visible focus indicators.
- Use accessible dialog and dropdown patterns.
- Avoid relying only on color to communicate status.

## 14. SEO Requirements

- Use Next.js metadata API.
- Provide unique page titles and descriptions.
- Use semantic heading hierarchy.
- Add Open Graph metadata.
- Optimize image alt attributes.
- Use descriptive URLs.
- Avoid duplicate metadata.
- Use appropriate structured data when applicable.

## 15. Code Quality

- Follow consistent naming conventions.
- Avoid any types.
- Avoid duplicate code.
- Keep static mock data strictly separated from component and page files into dedicated files in data/.
- Ensure all option lists, dropdown items, filter tags, and repeated cards are dynamically mapped from structured data models rather than hardcoded in JSX markup.
- Avoid unnecessary abstractions.
- Keep functions small and readable.
- Use proper TypeScript interfaces and types.
- Handle empty states and error states.
- Remove unused imports and variables.
- Never leave unnecessary console logs.
- Do not modify unrelated files.

## 16. Development Workflow

Before implementing any feature:

1. Understand the requirements.
2. Inspect existing project structure.
3. Identify reusable components.
4. Plan affected files.
5. Implement incrementally.
6. Verify responsiveness.
7. Check interactions.
8. Run lint and TypeScript checks.
9. Run production build when appropriate.

Before modifying existing functionality:
- Inspect the current implementation.
- Understand dependencies.
- Preserve working functionality.
- Explain significant architectural changes.

Never consider a task complete without verification.

## 17. Final Quality Standard

Every deliverable must meet these standards:

- Premium visual quality.
- Production-quality frontend code.
- Reusable component architecture.
- Responsive across devices.
- Consistent design language.
- Accessible interactions.
- Optimized performance.
- Clean and understandable source code.

Always prioritize quality over implementation speed.

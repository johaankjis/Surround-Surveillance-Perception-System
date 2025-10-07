# Contributing to Surround Surveillance Perception System

Thank you for your interest in contributing to the Surround Surveillance Perception System! This document provides guidelines and instructions for contributing to this project.

## 🤝 How to Contribute

We welcome contributions from the community! Whether you're fixing bugs, adding new features, improving documentation, or suggesting enhancements, your help is appreciated.

### Ways to Contribute

- 🐛 **Report bugs** - Submit detailed bug reports
- 💡 **Suggest features** - Share ideas for new features or improvements
- 📝 **Improve documentation** - Help make our docs better
- 🔧 **Fix issues** - Pick up open issues and submit fixes
- ✨ **Add features** - Implement new functionality
- 🧪 **Write tests** - Improve test coverage
- 🎨 **Improve UI/UX** - Enhance the user interface and experience

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher (20.x recommended)
- **pnpm**: Version 8.x or higher (recommended) or npm/yarn
- **Git**: For version control
- **Code Editor**: VS Code recommended with TypeScript and ESLint extensions

### Setting Up Your Development Environment

1. **Fork the repository**
   
   Click the "Fork" button at the top right of the repository page to create your own fork.

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Surround-Surveillance-Perception-System.git
   cd Surround-Surveillance-Perception-System
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/johaankjis/Surround-Surveillance-Perception-System.git
   ```

4. **Install dependencies**
   ```bash
   pnpm install
   ```
   or
   ```bash
   npm install
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```
   or
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Keeping Your Fork Updated

Before starting new work, sync your fork with the upstream repository:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

## 📋 Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-new-detection-algorithm`
- `fix/camera-feed-rendering-issue`
- `docs/update-installation-guide`
- `refactor/improve-detection-engine`

### 2. Make Your Changes

- Write clean, readable code
- Follow the project's code style (see below)
- Add comments where necessary
- Update documentation if needed
- Test your changes thoroughly

### 3. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add new object detection class for trucks"
```

Follow the commit message convention:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 4. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 5. Create a Pull Request

1. Go to your fork on GitHub
2. Click "Pull Request" button
3. Select your feature branch
4. Fill in the PR template with:
   - Clear title describing the change
   - Detailed description of what changed and why
   - Screenshots/videos for UI changes
   - Any breaking changes
   - Related issue numbers (e.g., "Fixes #123")

### 6. Code Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged
- Your contribution will be credited in the repository

## 💻 Code Style Guidelines

### TypeScript

- **Use interfaces** for object types instead of type aliases
- **Add explicit types** for function parameters and return values
- **Avoid `any`** type - use proper typing
- **Use optional chaining** (`?.`) and nullish coalescing (`??`) where appropriate

```typescript
// Good
interface Detection {
  id: string
  class: ObjectClass
  confidence: number
}

function processDetection(detection: Detection): void {
  // implementation
}

// Avoid
type Detection = {
  id: string
  class: any // Don't use any!
  confidence: number
}
```

### React Components

- **Use functional components** with hooks
- **Name components in PascalCase** (e.g., `CameraFeed`, `AlertCard`)
- **Use descriptive prop names**
- **Extract complex logic** into custom hooks
- **Keep components focused** on a single responsibility

```typescript
// Good
export function CameraFeed({ camera, detections }: CameraFeedProps) {
  const [isActive, setIsActive] = useState(false)
  
  return (
    <div className="camera-feed">
      {/* component content */}
    </div>
  )
}

// Export props interface
export interface CameraFeedProps {
  camera: CameraView
  detections: Detection[]
}
```

### CSS and Styling

- **Use Tailwind CSS** utility classes
- **Follow responsive design** principles
- **Use existing design tokens** (colors, spacing, etc.)
- **Avoid inline styles** unless absolutely necessary

```tsx
// Good
<div className="flex items-center justify-between gap-4 rounded-lg bg-zinc-900 p-4">
  <h2 className="text-xl font-bold text-white">Title</h2>
</div>

// Avoid
<div style={{ display: 'flex', backgroundColor: '#18181b' }}>
  <h2 style={{ color: 'white' }}>Title</h2>
</div>
```

### File Organization

- **Components** go in `/components`
- **UI primitives** go in `/components/ui`
- **Pages** go in `/app`
- **Utilities** go in `/lib`
- **Custom hooks** go in `/hooks`
- **Types** should be defined close to where they're used

### Naming Conventions

- **Components**: PascalCase (e.g., `CameraFeed.tsx`, `AlertCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useDetectionEngine.ts`)
- **Utilities**: camelCase (e.g., `generateMetrics()`, `formatTimestamp()`)
- **Types/Interfaces**: PascalCase (e.g., `Detection`, `TrackedObject`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_DETECTIONS`, `DEFAULT_FPS`)

## 🏗️ Project Structure

Understanding the project structure will help you navigate the codebase:

```
Surround-Surveillance-Perception-System/
├── app/                          # Next.js App Router pages
│   ├── alerts/                   # Alert management page
│   ├── zones/                    # Zone configuration page
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Home page (Live Feed)
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ui/                       # Reusable UI components (50+ components)
│   ├── alert-card.tsx            # Alert display card
│   ├── camera-feed.tsx           # Camera feed display
│   ├── metric-card.tsx           # System metric card
│   ├── sidebar-nav.tsx           # Navigation sidebar
│   ├── system-status.tsx         # System status dashboard
│   ├── tracked-objects-list.tsx  # Object tracking list
│   └── zone-editor.tsx           # Zone configuration editor
│
├── lib/                          # Core logic and utilities
│   ├── detection-engine.ts       # Detection engine hook
│   ├── mock-data.ts              # Mock data generators
│   └── utils.ts                  # Utility functions
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts             # Mobile detection hook
│   └── use-toast.ts              # Toast notification hook
│
├── public/                       # Static assets
├── styles/                       # Additional styles
└── Configuration files
```

## ✨ Adding New Features

### Adding a New Component

1. Create the component file in the appropriate directory
   ```typescript
   // components/feature-name.tsx
   "use client"
   
   import { useState } from "react"
   
   export interface FeatureNameProps {
     // props
   }
   
   export function FeatureName({ }: FeatureNameProps) {
     return (
       <div>
         {/* component content */}
       </div>
     )
   }
   ```

2. Export types if needed
3. Add to appropriate page in `/app`
4. Update navigation if necessary

### Adding a New Page

1. Create a new directory in `/app`
   ```bash
   mkdir app/feature-name
   ```

2. Create `page.tsx` in the new directory
   ```typescript
   // app/feature-name/page.tsx
   "use client"
   
   export default function FeatureNamePage() {
     return (
       <div className="min-h-screen bg-black p-6">
         {/* page content */}
       </div>
     )
   }
   ```

3. Add navigation link in `components/sidebar-nav.tsx`
4. Update documentation

### Adding New Data Types

Add type definitions to `lib/mock-data.ts`:

```typescript
export interface NewType {
  id: string
  // properties
}

export function generateNewType(): NewType {
  return {
    id: Math.random().toString(36).substring(7),
    // generated data
  }
}
```

### Modifying the Detection Engine

The detection engine is located in `lib/detection-engine.ts`. When modifying:

1. Understand the current implementation
2. Add your changes incrementally
3. Test thoroughly with the UI
4. Update type definitions if needed
5. Document any new behavior

## 🧪 Testing

Currently, the project uses manual testing. When adding features:

1. **Test manually** in the browser
2. **Test all affected pages** and components
3. **Test responsive design** on different screen sizes
4. **Test different browsers** (Chrome, Firefox, Safari)
5. **Test edge cases** and error conditions

### Future Testing Infrastructure

We plan to add:
- Unit tests with Jest
- Integration tests
- E2E tests with Playwright or Cypress

Contributions to set up testing infrastructure are welcome!

## 🔍 Code Review Checklist

Before submitting your PR, ensure:

- [ ] Code follows the style guidelines
- [ ] TypeScript types are properly defined
- [ ] Components are properly named and organized
- [ ] No console.log statements (unless intentional)
- [ ] No commented-out code
- [ ] Documentation is updated if needed
- [ ] Code is well-commented where necessary
- [ ] Changes are tested manually
- [ ] No breaking changes (or clearly documented)
- [ ] Commit messages are descriptive
- [ ] Branch is up to date with main

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Clear title** describing the issue
2. **Description** of what happened vs. what you expected
3. **Steps to reproduce** the issue
4. **Environment details**:
   - Node.js version
   - Browser and version
   - Operating system
5. **Screenshots or videos** if applicable
6. **Error messages** or console logs
7. **Any relevant code snippets**

Use the bug report template on GitHub Issues.

## 💡 Suggesting Features

When suggesting features:

1. **Search existing issues** to avoid duplicates
2. **Describe the problem** you're trying to solve
3. **Propose a solution** with as much detail as possible
4. **Consider alternatives** you've thought about
5. **Add mockups or examples** if applicable

## 📖 Documentation

Good documentation is crucial! When contributing:

- Update README.md for major features
- Update this CONTRIBUTING.md if you change the development process
- Add inline comments for complex logic
- Create or update type definitions
- Add JSDoc comments for public APIs

### Documentation Style

- Use clear, concise language
- Include code examples
- Add links to relevant resources
- Use proper markdown formatting
- Keep it up to date with code changes

## 🎨 UI/UX Guidelines

When working on UI:

- **Follow the dark theme** design system
- **Use consistent spacing** (Tailwind's spacing scale)
- **Maintain accessibility** standards
- **Test responsive design** on mobile and desktop
- **Use existing components** from `components/ui/`
- **Follow the severity color scheme**:
  - Critical: Red (#ef4444)
  - High: Orange (#f97316)
  - Medium: Yellow (#eab308)
  - Low: Blue (#3b82f6)

## 🔐 Security

- **Never commit secrets** or API keys
- **Don't expose sensitive data** in logs or UI
- **Follow security best practices** for web applications
- **Report security issues** privately to the maintainer

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project (educational and demonstration purposes).

## 🙋 Getting Help

If you need help:

- **Check the README.md** for basic information
- **Search existing issues** and discussions
- **Open a new issue** with the "question" label
- **Contact the maintainer** through GitHub

## 🎉 Recognition

Contributors will be:
- Listed in the repository
- Mentioned in release notes
- Credited in the AUTHORS section

Thank you for contributing to the Surround Surveillance Perception System! 🚀

---

**Questions?** Feel free to open an issue or reach out to the maintainer.

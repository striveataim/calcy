# Calcy Next.js App - Getting Started

## What's Included

Your Calcy calculator has been converted from a single HTML file into a modern Next.js application with:

- ✅ Full Next.js 15+ setup with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Responsive design (mobile-first)
- ✅ Component-based architecture
- ✅ 6 fully functional calculator pages:
  - CGPA → Percentage
  - Percentage → CGPA
  - SGPA → Percentage
  - Division/Class Finder
  - VTU Calculator (example of university-specific calculator)
  - Stub pages for remaining calculators

## Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Project Structure

```
calcy/
├── app/                    # Next.js app directory (App Router)
│   ├── layout.tsx          # Root layout wrapper
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles & CSS variables
│   └── [calculator]/page.tsx # Individual calculator routes
├── components/             # Reusable React components
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── Topbar.tsx          # Mobile topbar
│   ├── InputField.tsx      # Input & select field components
│   ├── Button.tsx          # Button components
│   ├── ResultBox.tsx       # Result display component
│   ├── FormulaBox.tsx      # Formula display component
│   └── StubPage.tsx        # Placeholder template
├── lib/                    # Utilities
│   └── utils.ts            # Calculation functions & helpers
├── public/                 # Static assets
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind CSS config
├── next.config.ts          # Next.js config
└── postcss.config.mjs      # PostCSS/Tailwind config
```

## Next Steps

### 1. Complete Remaining Calculators
The following calculator pages are currently stubs and need implementation:
- Semester SGPA Calculator
- Overall CGPA Calculator (Credit-Weighted)
- Marks → Grade Converter
- SGPA → CGPA
- GPA 4.0 Converter
- University-specific calculators (SPPU, Anna University, etc.)

Follow the pattern from existing calculators (e.g., `/app/cgpa-percentage/page.tsx`) to implement these.

### 2. Customize Styling
- Modify colors in `app/globals.css` CSS variables (`:root`)
- Update Tailwind config in `tailwind.config.ts` for theme customization
- Add custom fonts from Google Fonts as needed

### 3. Add Features
- PDF export functionality
- Result history/saved calculations
- Dark mode toggle
- PWA support for offline use
- More universities/grading systems

### 4. Deploy

#### Option A: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Option B: Docker
```bash
docker build -t calcy .
docker run -p 3000:3000 calcy
```

#### Option C: Traditional Hosting
```bash
npm run build
# Deploy the `.next` directory to your server
```

## File Mappings: HTML to Next.js

| Original HTML Panel | Next.js Route |
|-------------------|---------------|
| p-home | / |
| p-cgpa-pct | /cgpa-percentage |
| p-pct-cgpa | /percentage-cgpa |
| p-sgpa-pct | /sgpa-percentage |
| p-sgpa-cgpa | /sgpa-cgpa |
| p-gpa4 | /gpa-4 |
| p-semester | /semester |
| p-overall | /overall |
| p-marks-grade | /marks-grade |
| p-division | /division |
| p-vtu | /vtu |
| p-sppu | /sppu |
| p-anna | /anna |
| p-mumbai | /mumbai |
| p-du | /delhi-university |
| p-cu | /chandigarh |
| p-manipal | /manipal |
| p-hec | /hec |
| p-cbse | /cbse |

## Key Changes from Original

1. **HTML → React Components**: Split monolithic HTML into reusable components
2. **Vanilla JS → TypeScript/React**: Modern state management with hooks
3. **Inline Styles → Tailwind CSS**: Utility-first CSS framework
4. **Single Page → File-based Routing**: Each calculator is its own page/route
5. **DOM Manipulation → React State**: Declarative UI updates
6. **Responsive CSS → Mobile-First Tailwind**: Better mobile experience

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

- All calculations run client-side (instant results)
- CSS is tree-shaken by Tailwind (minimal bundle)
- Images are optimized with next/image
- Code splitting happens automatically per route

## Customization Examples

### Add a New Calculator
1. Create `app/my-calculator/page.tsx`
2. Follow the pattern of existing pages
3. Update `components/Sidebar.tsx` to add navigation link

### Change Color Scheme
Edit `app/globals.css`:
```css
:root {
  --blue: #your-color;
  --green: #your-color;
  /* etc... */
}
```

### Add a Footer
Edit `app/layout.tsx` and add footer component

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001  # Use different port
```

**Styles not loading?**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

**TypeScript errors?**
```bash
npx tsc --noEmit  # Check for TS errors
```

## Support

- 📚 [Next.js Docs](https://nextjs.org/docs)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com/docs)
- 🔍 [React Docs](https://react.dev)

---

Happy coding! 🚀

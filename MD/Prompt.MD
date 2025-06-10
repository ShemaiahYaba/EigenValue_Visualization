Create a responsive, modern React landing page using Tailwind CSS for an educational web app called "EigenLab" that helps users—especially young learners—understand eigenvalues and eigenvectors through visual, interactive learning.

🖼️ Design Aesthetic:
Black and white color palette

Graph paper-style background (use either CSS pattern or embed an SVG)

Use the following custom fonts (assume they're already configured in Tailwind theme):

"Aquatico" for large headings

"Satoshi" or "Poppins" for general UI text

"Montez" for playful, handwritten-style accents

Modern, clean, engaging design appealing to high school and early university students

Style only with Tailwind CSS utility classes (no external libraries)

✨ Page Structure:

1. Hero Section
   Title: "EigenLab – Visualize EV-EV (EigenValues & EigenVectors)"

Subtitle: "From First Principles Thinking to PCA Mastery"

CTA Button: "Launch EigenLab"

Add one visual asset or illustration dynamically from a selection such as:
["hero-graph.svg", "student-thinking.svg", "eigenvectors-illustration.png"]
These can be placed under /assets/ and selected by the AI where they best fit the mood and context.

Add a semi-transparent graph-paper style background

2. Features Section
   Use the following list to generate 3 feature cards in a responsive grid:

js
Copy
Edit
const features = [
{
name: "EV-EV Made Easy",
description: "Understand EigenValues & EigenVectors through First Principles Thinking",
href: "/features/made-easy",
icon: BsBook,
},
{
name: "EV-EV Properties & Concepts",
description: "View some insightful visualizations",
href: "/features/concepts",
icon: FaCompressArrowsAlt,
},
{
name: "Matrix Playground",
description: "Visualize your own matrix and gain insights",
href: "/features/matrix-playground",
icon: TbMatrix,
},
];
Icons should be conditionally rendered using react-icons

Add illustrations alongside or behind the cards, selectively chosen from visual assets like "matrix-grid.png", "arrow-fields.svg", etc.

3. Advanced Tools Section
   Use this additional set of tools to render an "Advanced Features" section:

js
Copy
Edit
const advancedTools = [
{
name: "PCA",
description: "Understand PCA concepts",
href: "/features/pca",
icon: BiAnalyse,
},
{
name: "Numerical Methods",
description: "Visual Convergence of Numerical Computations of EigenValues",
href: "/features/numerical-methods",
icon: CiCalculator1,
},
];
Display this section with a slightly different visual treatment (e.g., boxed layout, grayscale tone, or dashed border to represent it as “advanced”)

4. FPT (First Principles Thinking) Section
   Add a dedicated section that introduces and explains how First Principles Thinking helps users break down complex linear algebra concepts like eigenvectors.

Add a quote-style layout with "Montez" font for headings like: “Start from scratch. Understand everything.”

Add visual asset placeholders like: "lightbulb-idea.svg" or "question-solution.png"

5. Illustration Picker (Optional)
   Assume a backend will allow visual assets to be uploaded.

Design a section or modal placeholder UI where users can:

Preview uploaded visualizations

Select them for display on their personal version of the homepage

Allow drag-and-drop or “Upload your own asset” button (placeholder only)

6. Footer
   Simple layout with links: About, Contact, GitHub

Use "Satoshi" or "Poppins" font

🔧 Technical Requirements:
React functional components only

Use Tailwind utility classes throughout

Images should reference static assets like /assets/filename.svg

Icons should use react-icons as shown

Add clear JSX comments where assets or illustrations should be placed

No full app logic required — only the landing page layout

🔁 Optional:
If helpful, structure components as separate reusable components (e.g. <FeatureCard />, <Hero />, <Footer />)

Ensure everything is responsive and looks great on mobile, tablet, and desktop

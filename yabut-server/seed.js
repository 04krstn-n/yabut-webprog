require("dotenv").config();
const mongoose = require("mongoose");
const Article = require("./models/Article");

const articles = [
  {
    id: 1,
    slug: "building-clean-layouts",
    title: "Building Clean Layouts for Better User Experience",
    preview:
      "Learn how spacing, grouping, and alignment can turn a basic page into a cleaner and more readable experience.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    paragraphs: [
      "A clean layout helps users understand a webpage faster. When sections are properly spaced and content is grouped clearly, the interface becomes easier to scan and more comfortable to use.",
      "In Draft & Drift, the layout was designed to show how a simple wireframe can be improved through better alignment, stronger hierarchy, and balanced spacing. These small design decisions make the page feel more professional.",
      "Good layout design is not only about appearance. It also affects usability, readability, and how users move from one section to another. Clear layouts create smoother digital experiences.",
    ],
    status: "enabled",
  },
  {
    id: 2,
    slug: "importance-of-navigation",
    title: "The Importance of Navigation in Modern Web Design",
    preview:
      "See why navigation is one of the strongest foundations of a smooth and user-friendly website experience.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    paragraphs: [
      "Navigation is one of the most important parts of a website because it helps users move through pages easily. A clear menu prevents confusion and improves the overall experience.",
      "For this project, the navigation bar was styled with a dark palette and clean links to match the overall branding of Draft & Drift. The active page is highlighted so users always know where they are.",
      "Well-designed navigation adds both function and style. It organizes the website and strengthens the impression of a polished, complete interface.",
    ],
    status: "enabled",
  },
  {
    id: 3,
    slug: "visual-hierarchy-in-design",
    title: "Using Visual Hierarchy to Guide Attention",
    preview:
      "Explore how headings, contrast, and spacing help users focus on the most important content first.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    paragraphs: [
      "Visual hierarchy is the arrangement of elements in a way that tells users what to look at first. Bigger headings, stronger contrast, and proper spacing all help guide attention.",
      "In Draft & Drift, large hero text, section labels, and content blocks were used to create a smoother flow across the pages. These choices make important information more noticeable and easier to understand.",
      "A strong hierarchy improves communication because users can quickly identify titles, supporting text, and calls to action without feeling overwhelmed.",
    ],
    status: "enabled",
  },
  {
    id: 4,
    slug: "power-of-consistent-branding",
    title: "The Power of Consistent Branding in a Website",
    preview:
      "Understand how a unified color palette, logo, and typography can make a website feel more memorable.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    paragraphs: [
      "Branding is more than just a logo. It includes the color palette, typography, spacing, and overall tone of the design. Consistency makes a website feel more trustworthy and memorable.",
      "This project uses a black, white, and zinc-based palette to create a modern and minimal look. The same visual style is repeated in the navbar, sections, cards, and footer to make the pages feel unified.",
      "When branding is consistent, the user experience becomes stronger because every page feels connected to the same idea and visual identity.",
    ],
    status: "enabled",
  },
  {
    id: 5,
    slug: "from-wireframe-to-polished-page",
    title: "From Wireframe to Polished Page",
    preview:
      "Follow the transformation from a simple layout draft into a more complete and polished presentation.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    paragraphs: [
      "A wireframe is a basic structure that shows where content and interface elements will be placed. It is useful for planning, but it becomes more effective when improved with styling and real content.",
      "Draft & Drift demonstrates this transformation by starting from a simple wireframe-inspired layout and turning it into a more refined website using images, stronger typography, and modern section design.",
      "This process shows that even simple concepts can become engaging when structure, presentation, and content are developed carefully.",
    ],
    status: "enabled",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clear existing articles
    await Article.deleteMany({});
    console.log("Cleared existing articles");

    // Insert new articles
    const result = await Article.insertMany(articles);
    console.log(`${result.length} articles seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

import Button from '../components/Button';

const articles = [
  {
    title: 'Why Wireframing Still Matters in Modern Web Design',
    description:
      'Wireframing creates a foundation for structure, hierarchy, and flow before visual polish is added to the interface.',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'How Clean Navigation Improves the User Journey',
    description:
      'Good navigation reduces friction, improves orientation, and helps users understand where to go next.',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Building Strong Content Hierarchy Through Layout',
    description:
      'Spacing, typography, and section order all work together to create clarity and improve page readability.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Turning Minimal Interfaces into Better Presentations',
    description:
      'Even simple pages can feel polished when supported by thoughtful visuals, concise writing, and consistent design language.',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  },
];

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col bg-zinc-50 text-zinc-900">
      <section className="border-b border-zinc-200 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h1 className="max-w-5xl text-4xl font-bold leading-[0.95] sm:text-5xl lg:text-7xl">
            Design writeups focused on clarity, structure, and stronger digital presentation.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-600 sm:text-lg">
            This page gathers article-style content around wireframing, navigation,
            layout thinking, and visual hierarchy. Each writeup highlights how small
            design decisions can improve the experience of a page and make it more
            effective for users.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/" variant="primary">
              Back Home
            </Button>
            <Button to="/about">View About</Button>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
              Featured Reading
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl text-white">
              Explore ideas that help shape cleaner interfaces.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {articles.map((article) => (
              <article
                key={article.title}
                className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-sm"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold leading-tight">{article.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">
                    {article.description}
                  </p>
                  <Button className="mt-5">Read More</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Insight
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Better design starts with better decisions at the content level.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-600">
              A well-designed page is not only about appearance. It is also about how
              information is introduced, how sections support one another, and how the
              overall experience feels from start to finish.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-3 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80"
              alt="Creative desktop setup"
              className="h-[280px] w-full rounded-[1.5rem] object-cover sm:h-[360px] lg:h-[420px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
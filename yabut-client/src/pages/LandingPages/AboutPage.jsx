import Button from '../../components/Button';

const principles = [
  {
    title: 'Design Consistency',
    description:
      'A shared visual system helps every page feel connected, intentional, and easier to maintain.',
  },
  {
    title: 'Content Clarity',
    description:
      'Well-grouped information improves readability and makes each message easier to understand.',
  },
  {
    title: 'Modern Presentation',
    description:
      'Images, spacing, and stronger typography turn simple wireframes into more complete web experiences.',
  },
];

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col bg-zinc-50 text-zinc-900">
      <section className="border-b border-zinc-200 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-3 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
              alt="Creative team collaboration"
              className="h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[420px] lg:h-[520px]"
            />
          </div>

          <div>
            <h1 className="max-w-4xl text-4xl font-bold leading-[0.95] sm:text-5xl lg:text-7xl">
              A project shaped by better structure, stronger content, and cleaner presentation.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
              Draft & Drift was created to show how a simple wireframe can evolve into a
              more refined and engaging interface. The project focuses on layout
              improvement, stronger content flow, and reusable components that support a
              more professional visual outcome.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
              Mission
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl text-white">
              Turning minimal wireframes into clearer and more presentable digital pages.
            </h2>
            <p className="mt-4 text-base leading-8 text-white">
              The goal is not to overwhelm the page with effects, but to improve the
              experience through thoughtful layout decisions, organized sections, and a
              consistent visual language that feels modern and easy to explore.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Process
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Starting from structure, then refining through detail.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-zinc-600">
                We begin with a basic wireframe, identify the most important content,
                and improve the page using clearer hierarchy, stronger spacing,
                supporting imagery, and reusable UI blocks. This helps transform a rough
                concept into a more polished visual composition.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-3 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
                alt="Design process on screen"
                className="h-[280px] w-full rounded-[1.5rem] object-cover sm:h-[360px] lg:h-[420px]"
              />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:[&>*:first-child]:order-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Impact</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Showing how presentation can strengthen even the simplest concept.</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-zinc-600">
                This project proves that minimal layouts can still feel engaging when
                content is well-written, sections are visually balanced, and the design
                remains consistent from page to page.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-3 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
                alt="Creative workspace planning"
                className="h-[280px] w-full rounded-[1.5rem] object-cover sm:h-[360px] lg:h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
import Button from '../components/Button';
import modernLayout from '../assets/images/modernlayout.png'
import readable  from '../assets/images/readable.png'
import reusable from '../assets/images/reusable.png'

const HomePage = () => {
  return (
    <div className="flex w-full flex-col bg-zinc-50">
      <section className="border-b border-zinc-200 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 className="max-w-4xl text-4xl font-bold leading-[0.95] sm:text-5xl lg:text-7xl">
              Designing simple layouts with clarity, structure, and purpose.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
              Draft & Drift is a design-focused web project that turns basic wireframes
              into polished digital experiences. Through better hierarchy, strong
              spacing, image-led sections, and thoughtful presentation, simple layouts
              become more engaging and easier to understand.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-3 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80"
              alt="Modern workspace"
              className="h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[420px] lg:h-[520px]"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            Quick overview blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['12', 'Projects'],
            ['08', 'Sections'],
            ['24', 'Screens'],
            ['04', 'Layouts'],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-zinc-700 bg-white p-5 shadow-sm"
            >
              <p className="text-3xl font-bold text-zinc-900">{value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-900">
            Simple wireframe cards
        </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Modern Layout',
              text: 'A clean structure makes the website easier to scan and understand for users.',
              image:modernLayout,
            },
            {
              title: 'Readable Content',
              text: 'Proper spacing and clear sections help present information more effectively.',
              image:readable,
                
            },
            {
              title: 'Reusable Design',
              text: 'Cards and sections can be reused on multiple pages for consistency.',
                image:reusable,
            },
          ].map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-zinc-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{item.text}</p>
                <Button className="mt-4" variant="primary">
                  View More
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-zinc-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">
            Build better pages through simple, thoughtful design.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-600">
            Strong layouts do not need to be complicated. With the right structure,
            clearer content, and consistent styling, even a basic wireframe can feel
            polished and modern.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button to="/about" variant="primary">
              View About
            </Button>
            <Button to="/articles">Read Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
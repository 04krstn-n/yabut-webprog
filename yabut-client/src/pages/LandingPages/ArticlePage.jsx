import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Button from "../../components/Button.jsx";

import { fetchArticles } from "../../services/ArticleService";

function ArticlePage() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await fetchArticles();

        const articles = data.articles || data || [];

        console.log("Fetched articles:", articles);

        console.log("Looking for slug:", slug);

        const foundArticle = articles.find(
          (a) => a.slug === slug && (a.status || "enabled") === "enabled",
        );

        setArticle(foundArticle || null);
      } catch (err) {
        console.error("Error fetching article:", err);

        setError(err.message);

        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-white">Loading article...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl rounded-[2rem] border border-zinc-700 bg-zinc-800 p-10 text-center shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
            API Error
          </p>

          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Failed to Load Article
          </h1>

          <p className="mt-4 text-base leading-7 text-zinc-400">{error}</p>

          <div className="mt-8 flex justify-center gap-3">
            <Button to="/articles" variant="primary">
              Browse Articles
            </Button>

            <Button to="/">Back Home</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl rounded-[2rem] border border-zinc-700 bg-zinc-800 p-10 text-center shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
            Article Error
          </p>

          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Article Not Found
          </h1>

          <p className="mt-4 text-base leading-7 text-zinc-400">
            The article you are trying to access does not exist or may have been
            removed.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Button to="/articles" variant="primary">
              Browse Articles
            </Button>

            <Button to="/">Back Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col bg-zinc-50 text-zinc-900">
      {/* HEADER */}
      <section className="border-b border-zinc-200 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <Button to="/articles">← Back to Articles</Button>
          </div>

          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Article
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-[0.95] sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600">
            {article.preview}
          </p>
        </div>
      </section>

      {/* IMAGE */}
      <section className="border-t border-zinc-800 bg-zinc-900 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] border border-zinc-700 bg-zinc-800 p-3 shadow-sm">
            <img
              src={article.image}
              alt={article.title}
              className="h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[420px] lg:h-[520px]"
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="border-t border-zinc-200 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-6">
            {(article.paragraphs || []).map((paragraph, index) => (
              <p
                key={index}
                className="whitespace-pre-wrap text-base leading-8 text-zinc-700"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 border-t border-zinc-200 pt-6">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;

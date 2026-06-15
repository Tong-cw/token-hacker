import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, Locale } from '@/lib/i18n';

type BlogArticle = {
  title: string;
  desc: string;
  date: string;
  content: string;
};

export default function BlogArticlePage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const slug = params.slug;
  const t = getTranslations(locale).blog;
  const articles = t.articles as Record<string, BlogArticle>;
  const article = articles[slug];

  if (!article) notFound();

  return (
    <article className="blog-article">
      <div className="container blog-article-container">
        <Link href={`/${locale}/blog`} className="back-link">← {locale === 'zh' ? '返回博客' : 'Back to Blog'}</Link>
        <div className="blog-article-meta">
          <time className="blog-article-date">{article.date}</time>
        </div>
        <h1 className="blog-article-title">{article.title}</h1>
        <div
          className="blog-article-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </article>
  );
}

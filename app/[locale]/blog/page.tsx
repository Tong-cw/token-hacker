import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';

export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).blog;

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">{t.subtitle}</p>
        <div className="blog-grid">
          {(Object.entries(t.articles) as [string, { title: string; desc: string; date: string }][]).map(([slug, article]) => (
            <Link href={`/${locale}/blog/${slug}`} key={slug} className="blog-card">
              <div className="blog-card-date">{article.date}</div>
              <h3>{article.title}</h3>
              <p>{article.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

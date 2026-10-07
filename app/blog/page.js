import ContentPage from "./../../components/ContentPage";

export const metadata = {
  title: "Blog",
  description:
    "Tutorials, updates and news from the DocFix team. Learn how to get the most out of your image tools.",
};

const posts = [
  {
    title: "How to batch convert images without uploading",
    date: "2026-09-28",
    description:
      "Learn how DocFix keeps your files private while still offering powerful batch conversion.",
  },
  {
    title: "WebP vs PNG: when to use which format",
    date: "2026-09-15",
    description:
      "A quick guide to choosing the right image format for the web, with benchmarks from real-world datasets.",
  },
  {
    title: "Why browser-only tools are the future",
    date: "2026-08-30",
    description:
      "Serverless image processing delivers better privacy, lower costs and faster iteration.",
  },
  {
    title: "5 shortcuts to speed up your image workflow",
    date: "2026-08-12",
    description:
      "Keyboard shortcuts, presets and batch modes that cut editing time in half.",
  },
];

export default function BlogPage() {
  return (
    <ContentPage
      title="DocFix Blog"
      description="Tutorials, updates and stories from the team."
      eyebrow="Blog"
    >
      <div className="blog-list">
        {posts.map((post) => (
          <article key={post.title} className="blog-post">
            <time dateTime={post.date} className="blog-date">
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h3 className="blog-title">{post.title}</h3>
            <p className="blog-desc">{post.description}</p>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}

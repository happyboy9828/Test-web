import PageCard from "../components/PageCard";
import { getPages } from "../lib/pages";

export default function Home() {
  const pages = getPages();

  return (
    <div className="tool-shell">
      <header className="tool-head">
        <h1>Tools</h1>
        <p>
          {pages.length} page{pages.length === 1 ? "" : "s"} found in the app
          directory. Open one to start.
        </p>
      </header>

      {pages.length === 0 ? (
        <p className="tool-muted">
          No pages yet. Add a folder under <code>app/</code> containing a{" "}
          <code>page.js</code> file and it will show up here.
        </p>
      ) : (
        <ul className="tool-cards">
          {pages.map((page) => (
            <li key={page.href}>
              <PageCard href={page.href} title={page.title} description={page.description} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
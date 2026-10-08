import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="empty-state">
      <h1>Nie ma takiej strony</h1>
      <p>Ten adres nie prowadzi ani do importu, ani do drzewa.</p>
      <Link to="/" className="button button-primary">
        Wróć na start
      </Link>
    </section>
  );
}

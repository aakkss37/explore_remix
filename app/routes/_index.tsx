import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import "../styles/home.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keeping track of your note</h1>
      <p>Try our early beta and never loose track of your notes again!</p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}

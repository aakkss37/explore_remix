import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { getStoredNotes, Note } from "~/data/notes";
import "../styles/noteDetails.css";

export const loader: LoaderFunction = async ({ params }) => {
  const notes = await getStoredNotes();
  const note = notes.find((note) => note.id === params.noteId);
  if (!note) {
    throw new Response("Note not found", { status: 404 });
  }
  return json(note);
};

export default function NoteDetailsPage() {
  const note = useLoaderData<Note>();
  // const { noteId } = useParams();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

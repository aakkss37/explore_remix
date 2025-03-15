import { ActionFunction, redirect } from "@remix-run/node";
import NewNotes from "../components/newNotes";
import { getStoredNotes, Note, storeNotes } from "../data/notes";
import NoteList from "../components/noteList";
import { useLoaderData } from "@remix-run/react";

export const action: ActionFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const formData = await request.formData();
  //   formData  = Object.fromEntries(formData);
  const newNote: Note = {
    id: new Date().toString(),
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  // !Form validation here
  if (!newNote.title || newNote.title.length < 3) {
    return {
      status: 400,
      fieldName: "title",
      title: "Bad Request",
      message: "Title must be at least 3 characters",
    };
  } else if (!newNote.content || newNote.content.length < 10) {
    return {
      status: 400,
      fieldName: "content",
      title: "Bad Request",
      message: "Content must be at least 10 characters",
    };
  }

  const existingNote: Note[] = await getStoredNotes();

  existingNote.push(newNote);

  await storeNotes(existingNote);

  return redirect("/notes");
};

export const loader = async () => {
  const notes = await getStoredNotes();
  return notes;
};

export default function NotesPage() {
  const notes: Note[] = useLoaderData();
  return (
    <main>
      <NewNotes />
      <NoteList notes={notes} />
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main>
      <NewNotes />
      <h1>Application Error</h1>
      <pre>{error.message}</pre>
    </main>
  );
}

export function CatchBoundary() {
  return (
    <main>
      <h1>Something went wrong</h1>
    </main>
  );
}

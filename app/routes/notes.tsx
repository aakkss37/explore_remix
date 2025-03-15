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

  console.log("newNote", newNote);
  // Form validation here

  const existingNote: Note[] = await getStoredNotes();

  existingNote.push(newNote);

  await storeNotes(existingNote);
  // await storeNotes(existingNote);

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

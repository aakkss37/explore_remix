import { ActionFunction, redirect } from "@remix-run/node";
import NewNotes from "../components/newNotes";
import { getStoredNotes, Note, storeNotes } from "../data/notes";

export default function NotesPage() {
  return (
    <main>
      <NewNotes />
    </main>
  );
}

export const action: ActionFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const formData = await request.formData();
  //   formData  = Object.fromEntries(formData);
  const newNote: Note = {
    id: Math.random().toString(),
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

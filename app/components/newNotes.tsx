import { Form, useActionData, useNavigation } from "@remix-run/react";
import "./newNotes.css";

export type TActionError = {
  status: number;
  fieldName: string;
  title: string;
  message: string;
};

function NewNotes() {
  const navigation = useNavigation();
  const actionData = useActionData<TActionError>();
  return (
    <Form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
        {actionData?.fieldName === "title" && (
          <span className="error">{actionData.message}</span>
        )}
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
        {actionData?.fieldName === "content" && (
          <p className="error">{actionData.message}</p>
        )}
      </p>
      <div className="form-actions mt-4">
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export default NewNotes;

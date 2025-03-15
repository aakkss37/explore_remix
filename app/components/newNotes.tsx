import "./newNotes.css";

function NewNotes() {
  return (
    <form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions mt-4">
        <button>Add Note</button>
      </div>
    </form>
  );
}

export default NewNotes;

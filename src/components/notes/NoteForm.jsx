import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  updateNote,
} from "../../features/notes/notesSlice";

function NoteForm({ editingNote, onCancelEdit }) {
  const dispatch = useDispatch();

  const tags = useSelector((state) => state.notes.tags);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setBody(editingNote.body);
      setSelectedTags(editingNote.tags);
    }
  }, [editingNote]);

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      return;
    }

    const note = {
      id: editingNote ? editingNote.id : crypto.randomUUID(),
      title: title.trim(),
      body: body.trim(),
      tags: selectedTags,
    };

    if (editingNote) {
      dispatch(updateNote(note));
      onCancelEdit();
    } else {
      dispatch(addNote(note));
    }

    setTitle("");
    setBody("");
    setSelectedTags([]);
  };

return (
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">
          {editingNote ? "Edit note" : "Create note"}
        </h2>

        {editingNote && (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            Editing
          </span>
        )}
      </div>

      <p className="mt-1 text-sm text-slate-500">
        {editingNote
          ? "Update your note and save the changes."
          : "Write something worth remembering."}
      </p>
    </div>

    {/* Title */}
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Title
      </label>

      <input
        type="text"
        placeholder="e.g. Internship tasks"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
      />
    </div>

    {/* Body */}
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Content
      </label>

      <textarea
        placeholder="Start writing your note..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={7}
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
      />
    </div>

    {/* Tags */}
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">
          Tags
        </label>

        <span className="text-xs text-slate-400">
          {selectedTags.length} selected
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const selected = selectedTags.includes(tag);

          return (
            <label
              key={tag}
              className={`cursor-pointer rounded-lg border px-3 py-2 text-xs font-medium transition ${
                selected
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => handleTagChange(tag)}
                className="sr-only"
              />

              {tag}
            </label>
          );
        })}
      </div>
    </div>

    {/* Actions */}
    <div className="flex gap-2 pt-1">
      <button
        type="submit"
        className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
      >
        {editingNote ? "Update note" : "Save note"}
      </button>

      {editingNote && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      )}
    </div>
  </form>
);
}

export default NoteForm;
import { useDispatch, useSelector } from "react-redux";
import { FileText } from "lucide-react";
import { deleteNote } from "../../features/notes/notesSlice";

function NoteList({ onEdit, selectedTags }) {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.notes);

  const filteredNotes =
    selectedTags.length === 0
      ? notes
      : notes.filter((note) =>
          selectedTags.every((tag) => note.tags.includes(tag))
        );

return (
  <div>
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">
          {filteredNotes.length === 0
            ? "No notes"
            : `${filteredNotes.length} ${
                filteredNotes.length === 1 ? "note" : "notes"
              }`}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Stored securely in your browser
        </p>
      </div>
    </div>

    {filteredNotes.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
          <FileText className="text-slate-400" size={22} />
        </div>

        <h3 className="font-semibold text-slate-700">
          No notes found
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Create a note or change your filters.
        </p>
      </div>
    ) : (
      <div className="grid gap-4 md:grid-cols-2">
        {filteredNotes.map((note) => (
          <article
            key={note.id}
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="line-clamp-2 font-semibold text-slate-900">
                {note.title}
              </h3>

              <span className="shrink-0 text-xs text-slate-300">
                Note
              </span>
            </div>

            <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-slate-500">
              {note.body}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => onEdit(note)}
                className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => dispatch(deleteNote(note.id))}
                className="rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    )}
  </div>
);
}

export default NoteList;
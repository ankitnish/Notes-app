import { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  
} from "lucide-react";

import NoteForm from "./components/notes/NoteForm";
import NoteList from "./components/notes/NoteList";
import TagFilter from "./components/notes/TagFilter";

function App() {
  const [editingNote, setEditingNote] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <BookOpen size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                NoteFlow
              </h1>

              <p className="text-xs text-slate-500">
                Your thoughts, organized.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              <CheckCircle2 size={16} />
              Auto-saved
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Hero */}
        <section className="mb-8">
          <div className="flex items-end justify-between gap-4">
            <div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Capture your ideas.
              </h2>

              <p className="mt-2 max-w-xl text-slate-500">
                Create, organize and filter your notes with simple tags.
              </p>
            </div>
          </div>
        </section>

        {/* Workspace */}
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit lg:sticky lg:top-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <NoteForm
                editingNote={editingNote}
                onCancelEdit={() => setEditingNote(null)}
              />
            </div>
          </aside>

          {/* Notes Area */}
          <section className="min-w-0">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Filter */}
              <div className="border-b border-slate-200 p-5 sm:p-6">
                <TagFilter
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
              </div>

              {/* Notes */}
              <div className="p-5 sm:p-6">
                <NoteList
                  onEdit={setEditingNote}
                  selectedTags={selectedTags}
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-400">
        <div className="flex items-center justify-center gap-2">
          <FileText size={14} />
          NoteFlow • Built with React & Redux Toolkit
        </div>
      </footer>
    </div>
  );
}

export default App;
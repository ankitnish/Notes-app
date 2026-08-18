import { useSelector } from "react-redux";

function TagFilter({ selectedTags, setSelectedTags }) {
  const tags = useSelector((state) => state.notes.tags);

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

return (
  <div>
    <div className="mb-4">
      <h2 className="text-lg font-bold text-slate-900">
        Your notes
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Filter your notes by one or more tags.
      </p>
    </div>

    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => setSelectedTags([])}
        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
          selectedTags.length === 0
            ? "bg-slate-900 text-white shadow-sm"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        All
      </button>

      {tags.map((tag) => {
        const selected = selectedTags.includes(tag);

        return (
          <label
            key={tag}
            className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition ${
              selected
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
);
}

export default TagFilter;
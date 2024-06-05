export default function AskBox() {
  return (
    <div className="flex flex-col rounded-lg border-2 border-slate-600 bg-white p-2">
      <textarea
        id="OrderNotes"
        className="m-1 h-full resize-none rounded p-1 align-top focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
        placeholder="偷偷跟我說..."
        rows={6}
      ></textarea>
      <button className="mt-2 rounded-md bg-black px-8 py-2 text-sm font-semibold text-white hover:bg-black/[0.8] hover:shadow-lg">
        SEND
      </button>
    </div>
  );
}

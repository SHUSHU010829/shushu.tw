export default function PeopleList() {
  return (
    <div className="h-full w-96">
      <label htmlFor="OrderNotes" className="block font-medium text-gray-700">
        抽選對象
      </label>
      <textarea
        id="OrderNotes"
        className="mt-2 h-full w-full resize-none rounded-lg border-2  border-secondary p-2 align-top shadow-sm focus:border-primary focus:outline-primary focus:ring-primary sm:text-sm"
        placeholder="換行分隔每個抽選對象"
      ></textarea>
    </div>
  );
}

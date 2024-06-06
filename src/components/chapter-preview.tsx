type ChapterPreviewProps = {
  id: number;
  title: string;
  description: string;
  search: string;
  onClick?: () => void;
};

export function ChapterPreview({
  id,
  title,
  description,
  search,
  onClick,
}: ChapterPreviewProps) {
  const descriptionWithSearch = `<p>${description}</p>`.replace(
    new RegExp(search, "gi"),
    (match) => (search ? `<mark>${match}</mark>` : match)
  );

  return (
    <button
      onClick={onClick}
      className="text-left flex flex-col gap-2 border p-2 rounded-lg border-border hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
    >
      <strong className="text-lg">{title}</strong>
      <div>
        <div dangerouslySetInnerHTML={{ __html: descriptionWithSearch }} />
      </div>
    </button>
  );
}

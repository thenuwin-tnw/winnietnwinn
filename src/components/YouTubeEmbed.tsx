type YouTubeEmbedProps = {
  id: string;
  title: string;
};

export default function YouTubeEmbed({ id, title }: YouTubeEmbedProps) {
  return (
    <div className="aspect-video border-4 border-ink shadow-brutal">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  );
}

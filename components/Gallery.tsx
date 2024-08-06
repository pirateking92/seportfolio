import Image from "next/image";

interface MediaItem {
  id: string;
  mediaItemUrl: string;
  caption: string;
}

interface GalleryProps {
  mediaItems: MediaItem[];
}

const Gallery: React.FC<GalleryProps> = ({ mediaItems }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-slate-300 font-bold mb-4 text-center">
        Gallery
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaItems.map((item) => (
          <div key={item.id} className="rounded overflow-hidden shadow-lg">
            <Image
              src={item.mediaItemUrl}
              alt={item.caption}
              className="w-full"
              layout="responsive"
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

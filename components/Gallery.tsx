import Image from "next/image";
import parse from "html-react-parser";

interface MediaItem {
  sourceUrl: string;
  caption: string;
}

interface GalleryProps {
  mediaItems: MediaItem[];
}

const Gallery: React.FC<GalleryProps> = ({ mediaItems }) => (
  <div className="container mx-auto">
    <h1 className="text-4xl text-slate-300 font-bold mb-4 text-center">
      Gallery
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mediaItems.map((item, index) => {
        if (!item.sourceUrl) {
          return null; // Skip this item if sourceUrl is null or undefined
        }

        return (
          <div key={index} className="rounded overflow-hidden shadow-lg">
            <Image
              src={item.sourceUrl}
              alt={item.caption || "Gallery image"}
              className="w-full rounded"
              width={500}
              height={500}
            />
            {item.caption && (
              <div className="px-6 py-4 text-white">{parse(item.caption)}</div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default Gallery;

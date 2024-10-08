import { Carousel } from "flowbite-react";
import "flowbite/dist/flowbite.css";
import Image from "next/legacy/image";
import parse from "html-react-parser";
import { useState } from "react";

interface MediaItem {
  sourceUrl: string;
  caption: string;
}

interface GalleryProps {
  mediaItems: MediaItem[];
}

const Gallery: React.FC<GalleryProps> = ({ mediaItems }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="container mx-auto">
      <h1 className="font-bodyFont text-4xl text-slate-300 font-bold mb-4 text-center">
        Productions
      </h1>
      <Carousel
        slideInterval={5000}
        onSlideChange={handleSlideChange}
        indicators={false}
      >
        {mediaItems.map((item, index) => {
          if (!item.sourceUrl) {
            return null; // Skip this item if sourceUrl is null or undefined
          }
          return (
            <div key={index} className="relative h-[500px]">
              <Image
                src={item.sourceUrl}
                alt={item.caption || "Gallery image"}
                height={500}
                width={500}
                className="w-full rounded-xl"
              />
            </div>
          );
        })}
      </Carousel>
      {mediaItems[activeIndex].caption && (
        <div className="font-bodyFont text-xl mt-4 bg-opacity-50 px-6 py-4 text-white text-center">
          {parse(mediaItems[activeIndex].caption)}
        </div>
      )}
    </div>
  );
};

export default Gallery;

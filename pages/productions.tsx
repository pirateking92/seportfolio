// pages/gallery.tsx

import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import parse from "html-react-parser";
import { useState } from "react";
import client from "../apollo-client";
import { GET_MEDIA_ITEMS } from "../lib/queries";
import Navbar from "../components/Navbar";

interface MediaItem {
  sourceUrl: string;
  caption: string;
}

interface GalleryPageProps {
  mediaItems: MediaItem[];
}

const GalleryPage: NextPage<GalleryPageProps> = ({ mediaItems }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <Head>
        <title>Gallery</title>
        <meta name="description" content="Gallery of productions" />
      </Head>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container mx-auto pt-16 md:pt-20">
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
                return null;
              }
              return (
                <div key={index} className="relative h-[500px]">
                  <Image
                    src={item.sourceUrl}
                    alt={item.caption || "Gallery image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
              );
            })}
          </Carousel>
          {mediaItems[activeIndex]?.caption && (
            <div className="font-bodyFont text-xl mt-4 bg-opacity-50 px-6 py-4 text-white text-center">
              {parse(mediaItems[activeIndex].caption)}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch all media items
  let allMediaItems: MediaItem[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  while (hasNextPage) {
    const { data: mediaData } = await client.query({
      query: GET_MEDIA_ITEMS,
      variables: { first: 10, after: endCursor },
    });

    if (mediaData && mediaData.mediaItems) {
      const fetchedMediaItems =
        mediaData.mediaItems.nodes?.map((node: any) => ({
          sourceUrl: node.sourceUrl,
          caption: node.caption,
        })) || []; // Default to empty array if undefined

      allMediaItems = [...allMediaItems, ...fetchedMediaItems];

      hasNextPage = mediaData.mediaItems.pageInfo.hasNextPage;
      endCursor = mediaData.mediaItems.pageInfo.endCursor;
    } else {
      console.error("No media data found");
      hasNextPage = false; // Stop the loop if there's an issue
    }
  }

  return {
    props: {
      mediaItems: allMediaItems.filter((item) => item.caption), // Filter to include only items with captions
    },
  };
};

export default GalleryPage;

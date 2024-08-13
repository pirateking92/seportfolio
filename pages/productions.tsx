import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/legacy/image";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
import client from "../apollo-client";
import { GET_MEDIA_ITEMS } from "../lib/queries";
import Navbar from "../components/Navbar";
import Link from "next/link";

interface MediaItem {
  sourceUrl: string;
  caption: string;
  slug: string;
}

interface GalleryPageProps {
  mediaItems: MediaItem[];
}

const GalleryPage: NextPage<GalleryPageProps> = ({ mediaItems }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // console.log("Media Items:", mediaItems);
  }, []);

  return (
    <>
      <Head>
        <title>Gallery</title>
        <meta name="description" content="Gallery of productions" />
      </Head>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main>
          <h1 className="font-bodyFont text-4xl text-slate-300 font-bold mb-4 text-center my-10">
            Productions
          </h1>
          {mediaItems.map((item, index) => (
            <Link
              href={`/productions/${item.slug}`}
              key={item.slug}
              className=""
            >
              <div className="block relative h-[500px] flex-shrink-0 w-[calc(100%_-_1rem)] group my-8 cursor-pointer">
                <Image
                  src={item.sourceUrl}
                  alt={item.caption || "Gallery image"}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 group-hover:opacity-60"
                />
                {item.caption && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-bodyFont text-white text-xl text-center px-4 py-2">
                      {isClient ? parse(item.caption) : item.caption}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </main>
      </div>
    </>
  );
};

function createSlug(caption: string): string {
  if (!caption) {
    console.error("Received empty caption");
    return "";
  }
  // Remove HTML tags
  const strippedCaption = caption.replace(/<[^>]+>/g, "");
  // Convert to lowercase, replace spaces with hyphens, remove non-alphanumeric characters
  const slug = strippedCaption
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return slug;
}

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
        mediaData.mediaItems.nodes?.map((node: any) => {
          if (!node.caption) {
            console.error("Received node without caption:", node);
          }
          return {
            sourceUrl: node.sourceUrl,
            caption: node.caption || "",
            slug: createSlug(node.caption || ""),
          };
        }) || []; // Default to empty array if undefined

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

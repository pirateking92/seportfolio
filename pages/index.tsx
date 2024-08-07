import { GetStaticProps } from "next";
import client from "../apollo-client";
import {
  GET_SITE_SETTINGS,
  GET_ABOUT_PAGE,
  GET_MEDIA_ITEMS,
} from "../lib/queries";
import About from "../components/AboutSection";
import Name from "../components/Name";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Gallery from "../components/Gallery";

interface HomePageProps {
  siteTitle: string;
  siteDescription: string;
  title: string;
  content: string;
  profilePicture: {
    sourceUrl: string;
    altText: string;
    id: string;
  };
  mediaItems: MediaItem[];
}

interface MediaItem {
  sourceUrl: string;
  caption: string;
}

const HomePage: React.FC<HomePageProps> = ({
  siteTitle,
  siteDescription,
  title,
  content,
  profilePicture,
  mediaItems,
}) => {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="pt-16 md:pt-20">
          <Name siteTitle={siteTitle} siteDescription={siteDescription} />
          <main className="container mt-24 mx-auto px-12 py-4">
            <About
              profilePicture={profilePicture.sourceUrl}
              title={title}
              content={content}
            />
            <Gallery mediaItems={mediaItems} />
          </main>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: siteData } = await client.query({ query: GET_SITE_SETTINGS });
  const { data: aboutData } = await client.query({ query: GET_ABOUT_PAGE });

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

  const profilePicture = aboutData.page.profilePicture?.profilePicture
    ?.node || {
    sourceUrl: "",
    altText: "",
    id: "",
  };

  return {
    props: {
      siteTitle: siteData.generalSettings.title,
      siteDescription: siteData.generalSettings.description,
      title: aboutData.page.title,
      content: aboutData.page.content,
      profilePicture,
      mediaItems: allMediaItems.filter((item) => item.caption), // Filter to include only items with captions
    },
  };
};

export default HomePage;

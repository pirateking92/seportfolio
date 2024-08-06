import { GetStaticProps } from "next";
import client from "../apollo-client";
import {
  GET_SITE_SETTINGS,
  GET_ABOUT_PAGE,
  GET_CV_PAGE,
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
  featuredImage: string;
  profilePicture: {
    sourceUrl: string;
    altText: string;
    id: string;
  };
  mediaItems: MediaItem[];
}

interface MediaItem {
  id: string;
  mediaItemUrl: string;
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
  const { data: mediaData } = await client.query({ query: GET_MEDIA_ITEMS });

  console.log("GraphQL Data:", { mediaData, siteData, aboutData });

  const profilePicture = aboutData.page.profilePicture?.profilePicture
    ?.node || {
    sourceUrl: "",
    altText: "",
    id: "",
  };

  const mediaItems =
    mediaData?.mediaItems?.edges?.map((edge: any) => ({
      id: edge.node.id,
      mediaItemUrl: edge.node.mediaItemUrl,
      caption: edge.node.caption,
    })) || [];

  return {
    props: {
      siteTitle: siteData.generalSettings.title,
      siteDescription: siteData.generalSettings.description,
      title: aboutData.page.title,
      content: aboutData.page.content,
      profilePicture,
      mediaItems,
    },
  };
};

export default HomePage;

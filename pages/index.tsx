import { GetStaticProps } from "next";
import client from "../apollo-client";
import { GET_SITE_SETTINGS } from "../queries";
import About from "../components/AboutSection";
import Name from "../components/Name";
import Navbar from "../components/Navbar";

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
}

const HomePage: React.FC<HomePageProps> = ({
  siteTitle,
  siteDescription,
  title,
  content,
  featuredImage,
  profilePicture,
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="pt-16 md:pt-20">
        {" "}
        {/* Add top padding here */}
        <Name siteTitle={siteTitle} siteDescription={siteDescription} />
        <main className="container mt-24 mx-auto px-12 py-4">
          <About
            profilePicture={profilePicture.sourceUrl}
            title={title}
            content={content}
          />
        </main>
      </div>
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: GET_SITE_SETTINGS,
  });

  // here just to check if there are any errors with what we're pulling from graphql
  console.log("GraphQL Data:", data);

  const profilePicture = data.page.profilePicture?.profilePicture?.node || {
    sourceUrl: "",
    altText: "",
    id: "",
  };

  return {
    props: {
      siteTitle: data.generalSettings.title,
      siteDescription: data.generalSettings.description,
      title: data.page.title,
      content: data.page.content,
      featuredImage: data.page.featuredImage?.node?.sourceUrl || "",
      profilePicture,
    },
  };
};

export default HomePage;

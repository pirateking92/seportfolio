import { GetStaticProps } from "next";
import client from "../apollo-client";
import { GET_SITE_SETTINGS, GET_ABOUT_PAGE, GET_CV_PAGE } from "../lib/queries";
import About from "../components/AboutSection";
import Name from "../components/Name";
import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";

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
  cvUpload: {
    mediaItemUrl: string;
  };
}

const HomePage: React.FC<HomePageProps> = ({
  siteTitle,
  siteDescription,
  title,
  content,
  featuredImage,
  profilePicture,
  cvUpload,
}) => {
  return (
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
          {/* Example of using the cvUpload data
          <div className="mt-8">
            <a
              href={cvUpload.mediaItemUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                View CV
              </button>
            </a>
          </div> */}
          <ContactForm />
        </main>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: siteData } = await client.query({
    query: GET_SITE_SETTINGS,
  });

  const { data: aboutData } = await client.query({
    query: GET_ABOUT_PAGE,
  });

  const { data: cvData } = await client.query({
    query: GET_CV_PAGE,
  });

  console.log("GraphQL Data:", { siteData, aboutData, cvData });

  const profilePicture = aboutData.page.profilePicture?.profilePicture
    ?.node || {
    sourceUrl: "",
    altText: "",
    id: "",
  };

  const cvUpload = cvData.page.cvUpload || {
    mediaItemUrl: "",
  };

  return {
    props: {
      siteTitle: siteData.generalSettings.title,
      siteDescription: siteData.generalSettings.description,
      title: aboutData.page.title,
      content: aboutData.page.content,
      featuredImage: aboutData.page.featuredImage?.node?.sourceUrl || "",
      profilePicture,
      cvUpload,
    },
  };
};

export default HomePage;

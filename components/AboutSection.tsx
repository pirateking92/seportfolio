import { GetStaticProps } from "next";
import Head from "next/head";
import client from "../apollo-client";
import { GET_ABOUT_PAGE } from "../lib/queries";
import Image from "next/image";

// Define the props for the About page
interface AboutPageProps {
  title: string;
  content: string;
  profilePicture: string;
}

const About: React.FC<AboutPageProps> = ({
  title,
  content,
  profilePicture,
}) => (
  <div className="container mx-auto p-4">
    <div className="flex flex-col lg:flex-row lg:items-start">
      {/* Text content */}
      <div className="flex-1 lg:mr-8">
        <h1 className="font-bodyFont text-4xl text-slate-300 font-bold mb-4 text-center lg:text-left">
          {title}
        </h1>
        <div
          className="font-bodyFont prose-lg  text-slate-300"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Profile Picture */}
      {profilePicture && (
        <div className="flex-shrink-0 mt-8 hidden lg:mt-0 lg:block md:mt-0">
          <Image
            src={profilePicture}
            alt="Profile Picture"
            width={300}
            height={300}
            className="rounded-full mx-auto lg:mx-0 "
          />
        </div>
      )}
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: GET_ABOUT_PAGE,
  });

  return {
    props: {
      title: data.page.title,
      content: data.page.content,
      profilePicture:
        data.page.profilePicture?.profilePicture?.node?.sourceUrl || "",
    },
  };
};

export default About;

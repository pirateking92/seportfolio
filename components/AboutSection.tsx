// pages/about.tsx
import { GetStaticProps } from "next";
import Head from "next/head";
import client from "../apollo-client";
import { GET_SITE_SETTINGS } from "../queries";
import Image from "next/image";

// read up more on this
interface AboutPageProps {
  title: string;
  content: string;
  profilePicture: string;
}

const About: React.FC<AboutPageProps> = ({
  title,
  content,
  profilePicture,
}) => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>{title}</title>
        <meta name="description" content="About Sepy Baghaei" />
      </Head>
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-1">
          <h1 className="text-4xl text-slate-300 font-bold mb-4 text-center">
            {title}
          </h1>{" "}
          // About
        </div>
        {profilePicture && (
          <div className="flex-shrink-0 ml-0 lg:ml-8 mt-8 lg:mt-0 p-5 ">
            <Image
              src={profilePicture}
              alt="Profile Picture"
              width={300}
              height={300}
              className="rounded ring"
            />
          </div>
        )}
      </div>
      <div
        className=" prose text-slate-300"
        dangerouslySetInnerHTML={{ __html: content }}
      />{" "}
      // edit here for the about text
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: GET_SITE_SETTINGS,
  });

  return {
    props: {
      title: data.page.title,
      content: data.page.content,
      featuredImage: data.page.featuredImage?.node?.sourceUrl || "",
      profilePicture:
        data.page.profilePicture?.profilePicture?.node?.sourceUrl || "",
    },
  };
};

export default About;

import { GetStaticProps } from "next";
import Head from "next/head";
import client from "../apollo-client";
import { GET_CV_PAGE } from "../lib/queries";
import Navbar from "../components/Navbar";

interface CVPageProps {
  cvUrl: string;
}

const CVPage: React.FC<CVPageProps> = ({ cvUrl }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Head>
        <title>My CV</title>
        <meta name="description" content="Curriculum Vitae" />
      </Head>
      <div className="flex flex-col items-center pt-16 md:pt-20">
        <h1 className="py-5 text-4xl text-slate-300 font-bold mb-4 text-center">
          My CV
        </h1>
        {cvUrl ? (
          <iframe
            src={`${cvUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            width="800"
            height="1131"
            className="rounded ring"
            style={{ border: "none" }}
          />
        ) : (
          <p className="text-slate-300">CV not available.</p>
        )}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: GET_CV_PAGE,
  });

  const cvUrl = data.page.cvUpload?.cvUpload?.node?.mediaItemUrl || "";

  return {
    props: {
      cvUrl,
    },
  };
};

export default CVPage;

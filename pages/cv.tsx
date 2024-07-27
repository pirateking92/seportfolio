import { GetStaticProps } from "next";
import Head from "next/head";
import client from "../apollo-client";
import { GET_SITE_SETTINGS } from "../queries";

interface CVPageProps {
  cvUrl: string;
}

const CVPage: React.FC<CVPageProps> = ({ cvUrl }) => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>My CV</title>
        <meta name="description" content="Curriculum Vitae" />
      </Head>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-slate-300 font-bold mb-4 text-center">
          My CV
        </h1>
        {cvUrl ? (
          <embed
            src={cvUrl}
            type="application/pdf"
            width="800"
            height="1131"
            className="rounded ring"
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
    query: GET_SITE_SETTINGS,
  });

  const cvUrl = data.page.cvUpload?.mediaItemUrl || "";

  return {
    props: {
      cvUrl,
    },
  };
};

export default CVPage;

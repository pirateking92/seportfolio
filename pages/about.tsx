// pages/about.tsx
import { GetStaticProps } from 'next';
import Head from 'next/head';
import client from '../apollo-client';
import { GET_ABOUT_PAGE } from '../queries';
import Image from 'next/image';

interface AboutPageProps {
  title: string;
  content: string;
  featuredImage: string;
}

const About: React.FC<AboutPageProps> = ({ title, content, featuredImage }) => {
  return (
    <div className="container mx-auto p-4 ">
      <Head>
        <title>{title}</title>
        <meta name="description" content="About Sepy Baghaei" />
      </Head>
      <h1 className="text-4xl text-justify font-bold mb-4 text-slate-300">{title}</h1>
      {featuredImage && (
        <div className="mb-4">
          <Image
            src={featuredImage}
            alt={title}
            width={600}
            height={400}
            className="rounded"
          />
        </div>
      )}
      <div className="prose text-slate-300" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: GET_ABOUT_PAGE,
  });

  return {
    props: {
      title: data.page.title,
      content: data.page.content,
      featuredImage: data.page.featuredImage?.node?.sourceUrl || '',
    },
  };
};

export default About;

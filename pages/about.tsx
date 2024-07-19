// pages/about.tsx
import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
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
    <div>
      <h1>{title}</h1>
      {featuredImage && (
        <Image
          src={featuredImage}
          alt={title}
          width={600}
          height={400}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
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

import { GetStaticProps } from "next";
import client from '../apollo-client';
import { GET_ABOUT_PAGE } from "../queries";
import About from "../components/AboutSection";

interface HomePageProps {
    title: string;
    content: string;
    featuredImage: string;
    profilePicture: string;
  }
  
  const HomePage: React.FC<HomePageProps> = ({ title, content, featuredImage, profilePicture }) => {
    return (
      <About
        title={title}
        content={content}
        featuredImage={featuredImage}
        profilePicture={profilePicture}
      />
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
        profilePicture: data.page.profilePicture?.profilePicture?.node?.sourceUrl || '',
      },
    };
  };
  
  export default HomePage;
import { GetStaticProps } from "next";
import client from "../../apollo-client";
import { GET_PAGE_CONTENT } from "../../lib/queries";
import PageContent from "../../components/PageContent";
import Navbar from "../../components/Navbar";

interface PageContentProps {
  id: string;
  uri: string;
  pageContent: string;
  pageTitle: string;
}

const HabibtiDriverPage: React.FC<PageContentProps> = (props) => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <div className="pt-16 md:pt-20">
      <PageContent {...props} />
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: GET_PAGE_CONTENT,
    variables: { id: "/habibti-driver/" },
  });

  if (!data || !data.page) {
    return { notFound: true };
  }

  return {
    props: {
      id: data.page.id,
      pageContent: data.page.content,
      pageTitle: data.page.title,
      uri: data.page.uri,
    },
  };
};
export default HabibtiDriverPage;

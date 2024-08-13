import { GetStaticProps } from "next";
import client from "../../apollo-client";
import { GET_PAGE_CONTENT } from "../../lib/queries";
import PageContent from "../../components/PageContent";

interface PageContentProps {
  id: string;
  uri: string;
  pageContent: string;
  pageTitle: string;
}

const HabibtiDriverPage: React.FC<PageContentProps> = (props) => (
  <PageContent {...props} />
);

export const getStaticProps: GetStaticProps = async () => {
  try {
    console.log("Attempting to fetch data...");
    const result = await client
      .query({
        query: GET_PAGE_CONTENT,
        variables: { id: "habibti-driver" },
      })
      .catch((error) => {
        console.error("Error during query execution:", error);
        return null;
      });

    console.log("GraphQL result:", JSON.stringify(result, null, 2));

    if (!result || !result.data || !result.data.page) {
      console.error("No data returned from query:", result);
      return { notFound: true };
    }

    return {
      props: {
        id: result.data.page.id,
        uri: result.data.page.uri,
        pageContent: result.data.page.content,
        pageTitle: result.data.page.title,
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { notFound: true };
  }
};

export default HabibtiDriverPage;

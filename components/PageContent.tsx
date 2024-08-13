import { GetStaticProps } from "next";
import client from "../apollo-client";
import { GET_PAGE_CONTENT } from "../lib/queries";

interface PageContentProps {
  uri: string;
  pageContent: string;
  pageTitle: string;
}

const PageContent: React.FC<PageContentProps> = ({
  uri,
  pageContent,
  pageTitle,
}) => (
  <div className="container mx-auto p-4">
    <div className="flex flex-col lg:flex-row lg:items-start">
      {/* Text content */}
      <div className="flex-1 lg:mr-8">
        <h1 className="font-bodyFont text-4xl text-slate-300 font-bold mb-4 text-center lg:text-left">
          {pageTitle}
        </h1>
        <div
          className="font-bodyFont prose-lg  text-slate-300"
          dangerouslySetInnerHTML={{ __html: pageContent }}
        />
      </div>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: GET_PAGE_CONTENT,
  });

  return {
    props: {
      uri: data.page.uri,
      content: data.page.content,
      title: data.page.title,
    },
  };
};

export default PageContent;

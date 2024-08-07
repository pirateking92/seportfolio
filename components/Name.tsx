// components/Name.tsx
import Head from "next/head";
import parse from "html-react-parser";

interface NameProps {
  siteTitle: string;
  siteDescription: string;
}

const Name: React.FC<NameProps> = ({ siteTitle, siteDescription }) => (
  <div>
    <Head>
      <title>{parse(siteTitle)}</title>
    </Head>
    <div>
      <h1 className="font-headingFont py-5 text-4xl text-slate-300 font-bold mb-4 text-center">
        {siteTitle}
      </h1>
      <p className="font-headingFont text-center text-2xl text-slate-400">
        {parse(siteDescription)}
      </p>
    </div>
  </div>
);

export default Name;

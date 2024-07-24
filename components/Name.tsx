// components/Name.tsx
import Head from "next/head";

interface NameProps {
  siteTitle: string;
  siteDescription: string;
}

const Name: React.FC<NameProps> = ({ siteTitle, siteDescription }) => {
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
      </Head>
      <div>
        <h1 className="text-4xl text-slate-300 font-bold mb-4 text-center">{siteTitle}</h1>
        <p className="text-center text-slate-400">{siteDescription}</p>
      </div>
    </div>
  );
};

export default Name;

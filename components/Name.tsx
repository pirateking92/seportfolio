// components/Name.tsx
import Head from "next/head";
import parse from 'html-react-parser';
import { Indie_Flower } from 'next/font/google';

interface NameProps {
  siteTitle: string;
  siteDescription: string;
}

const indieFlower = Indie_Flower({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-indieFlower',
})

const Name: React.FC<NameProps> = ({ siteTitle, siteDescription }) => {
  return (
    <div className={indieFlower.variable}>
      <Head>
        <title>{parse(siteTitle)}</title>
        <meta name="description" content={parse(siteDescription)} />
      </Head>
      <div>
        <h1 className="font-indieFlower py-5 text-4xl text-slate-300 font-bold mb-4 text-center">{siteTitle}</h1>
        <p className="font-indieFlower text-center text-2xl text-slate-400">{parse(siteDescription)}</p>
      </div>
    </div>
  );
};

export default Name;

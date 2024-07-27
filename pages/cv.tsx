// pages/cv.tsx
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";

const CVPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Head>
        <title>My CV</title>
        <meta name="description" content="CV" />
      </Head>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-slate-300 font-bold mb-4 text-center py-3">
          My CV
        </h1>
        <div className="mx-auto">
          <Image
            src="/SEPY BAGHAEI CV 2024-1.png" // Path to the CV image in the public directory
            alt="My CV"
            width={800} // Specify the width of the image
            height={1131} // Specify the height of the image
            className="rounded ring"
          />
        </div>
      </div>
    </div>
  );
};

export default CVPage;

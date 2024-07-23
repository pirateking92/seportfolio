import { GET_SITE_SETTINGS } from "../queries";
import { GetStaticProps } from "next";
import Head from "next/head";
import client from "../apollo-client";

interface NameProps {
    title: string;
    description: string;
}

const Name: React.FC<NameProps> = ({ title, description }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="Site title" content="Sepy Baghaei, Director and Playwright" />
            </Head>
        </div>
    )
}

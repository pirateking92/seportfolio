import Link from "next/link";
import { Indie_Flower } from "next/font/google";

interface NavLinkProps {
  href: string;
  title: string;
}

const indieFlower = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-indieFlower",
});

const NavLink: React.FC<NavLinkProps> = ({ href, title }) => {
  return (
    <Link
      href={href}
      className={`block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white ${indieFlower.variable}`}
    >
      {title}
    </Link>
  );
};

export default NavLink;

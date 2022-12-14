import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
const NavBar: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <header className="relative flex h-20 w-screen flex-wrap items-center justify-between bg-gradient-to-tl from-sky-500 to-indigo-500 font-sans">
      <div className="ml-32 space-x-4">
        <Link href="/">
          <a className="ml-2 text-3xl font-bold text-white hover:cursor-pointer">
            YelpCamp
          </a>
        </Link>

        <Link href="/campgrounds">
          <span
            className={`text-md  hover:cursor-pointer  hover:text-gray-400 ${
              router.route === "/campgrounds" ? "text-gray-400" : "text-white"
            }`}
          >
            Campgrounds
          </span>
        </Link>

        {sessionData?.user ? (
          <Link href="/campgrounds/new">
            <span
              className={`text-md hover:cursor-pointer hover:text-white ${
                router.route === "/campgrounds/new"
                  ? "text-gray-400"
                  : "text-white"
              }`}
            >
              New
            </span>
          </Link>
        ) : null}
        <Link href="/campgrounds/infinite">
          <a
            className={`text-sm  text-white  hover:cursor-pointer hover:text-gray-400`}
          >
            &#9888;Infinite camps&#9888;
          </a>
        </Link>
      </div>
      {sessionData?.user ? (
        <div className="mr-32 space-x-2">
          <span className="text-md mx-2 select-none uppercase text-white">
            {sessionData?.user?.name}
          </span>
          <button
            className="text-lg font-bold text-gray-300 hover:text-white"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          className="mr-32 text-lg font-bold text-white hover:text-gray-400"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      )}
    </header>
  );
};
export default NavBar;

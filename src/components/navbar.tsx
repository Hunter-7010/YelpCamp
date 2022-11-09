import Link from "next/link";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
const NavBar: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  console.log(router.route)
  return (
    <header className="relative flex h-20 w-screen items-center justify-between bg-gradient-to-tl from-sky-500 to-indigo-500">
      <div className="space-x-4 ml-32">
        <Link href="/">
      <a className="ml-2 text-3xl font-bold text-white hover:cursor-pointer">YelpCamp</a>
        </Link>
        <Link href="/campgrounds">
          <span className={`text-md text-gray-200 hover:cursor-pointer  hover:text-gray-400 ${router.route==="/campgrounds" ? "text-gray-400":null}`}>
            CampGrounds
          </span>
        </Link>
        <Link href="/campgrounds/new">
          <span className={`text-md text-gray-200 hover:cursor-pointer hover:text-gray-400 ${router.route==="/campgrounds/new" ? "text-gray-400":null}`}>
            New CampGround
          </span>
        </Link>
      </div>
      {sessionData?.user ? (
        <div className="mr-32 space-x-2">
          <span className="text-white mx-2 text-md uppercase">{sessionData?.user?.name}</span>
          <button
            className="text-white text-lg font-bold hover:text-gray-400"
            onClick={() => signOut()}
          >
           Sign out
          </button>
        </div>
      ) : (
        <button
          className="text-white text-lg font-bold hover:text-gray-400 mr-32"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      )}
    </header>
  );
};
export default NavBar;

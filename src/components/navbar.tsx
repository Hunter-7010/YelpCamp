import Link from "next/link";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
const NavBar: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  
  return (
    <header className="relative flex h-20 w-screen items-center justify-between bg-gradient-to-tl from-sky-500 to-indigo-500 font-sans flex-wrap">
      <div className="space-x-4 ml-32">
        <Link href="/">
      <a className="ml-2 text-3xl font-bold text-white hover:cursor-pointer">YelpCamp</a>
        </Link>
        <Link href="/campgrounds">
          <span className={`text-md  hover:cursor-pointer  hover:text-white ${router.route==="/campgrounds" ? "text-white":"text-gray-400"}`}>
            Campgrounds
          </span>
        </Link>
        {sessionData?.user ? ( <Link href="/campgrounds/new">
          <span className={`text-md hover:cursor-pointer hover:text-white ${router.route==="/campgrounds/new" ? "text-white":"text-gray-400"}`}>
            New
          </span>
        </Link>):null}
      
      </div>
      {sessionData?.user ? (
       
        <div className="mr-32 space-x-2">
          <span className="text-white mx-2 text-md uppercase select-none">{sessionData?.user?.name}</span>
          <button
            className="text-gray-300 text-lg font-bold hover:text-white"
            onClick={() => signOut()}
          >
           Sign out
          </button>
        </div>
   
      ) : (
        <button
          className="text-white text-lg font-bold hover:text-gray-400 mr-32"
          onClick={() => signIn("google")}
        >
          Sign in
        </button>
      )}
    </header>
  );
};
export default NavBar;

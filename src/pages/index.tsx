import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center bg-gray-300">
      <h1 className="text-3xl font-bold">Home page</h1>
    </div>
  );
};

export default Home; //MUST EXPORT SO THAT NEXT JS FINDS IT

import type { NextPage } from "next";
import { useRouter } from "next/router";

const Show: NextPage = () => {
  const router = useRouter();

  const params = router.query.campId;

  return (
    <div className="flex h-screen flex-col items-center bg-gray-300">
      <h1 className="text-3xl font-bold">Show</h1>
      <h2>{params}</h2>
    </div>
  );
};

export default Show;

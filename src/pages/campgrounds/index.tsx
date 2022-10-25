import type { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";

const Campgrounds: NextPage = () => {
  type CampTypes = {
    id: number;
    name: string;
    price: number;
    review: number;
    image: string;
    address: string;
  }[];
  const campgroundData = trpc.campground.getAll.useQuery();
  const campgrounds = campgroundData.data
 
  return (
    <div className="flex flex-col items-center bg-gray-300 md:h-full">
      <h1 className="text-3xl font-bold">Campgrounds</h1>
      <Link href="/campgrounds/new">
        <span className="mt-2 flex items-center justify-center rounded-3xl bg-sky-400 p-4 text-sky-900 duration-300 hover:scale-110 hover:cursor-pointer">
          Add a new campground
        </span>
      </Link>

      <div className="mt-4  w-full sm:flex sm:flex-wrap ">
        {campgrounds ? campgrounds.map((camp) => (
          <Link href={`/campgrounds/${camp.id}`}>
            <div className="flex md:w-1/3" key={camp.id}>
              <div className="m-2 flex w-full flex-col items-center justify-center duration-300 hover:scale-110 hover:bg-slate-400">
                <img src={camp.image} width="320" className="-pt-2" />
                <p className="pt-12">{camp.name}</p>
                <span className="mt-1 flex h-8 w-28 items-center justify-center rounded-3xl bg-orange-400">
                  Show
                </span>
              </div>
            </div>
          </Link>
        )): <p>Loding...</p>} 
      </div>
    </div>
  );
};

export default Campgrounds; //MUST EXPORT SO THAT NEXT JS FINDS IT

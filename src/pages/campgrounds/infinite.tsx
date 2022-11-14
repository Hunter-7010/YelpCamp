import type { NextPage } from "next";
import Link from "next/link";
import { ChangeEvent, Fragment, useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import DropDown from "../../components/dropDown";
import Image from "next/image";

const Infinite: NextPage = () => {
  const router = useRouter();
  let skip = 0;
  const { fetchNextPage, data, isFetchingNextPage, hasNextPage } =
    trpc.campground.testAll.useInfiniteQuery(
      {
        skip: skip,
      },
      {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage: any) => {
      
          
          lastPage.skip = skip;
          if(lastPage.camp.length ===0){
            return undefined;
          }
          return lastPage.skip
        },
      }
    );


  const [searchTerm, setSearchTerms] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(e.currentTarget.value);
  };
  const onSearchHandler = (e: React.MouseEvent<HTMLElement> | null): void => {
    router.push(`/campgrounds/q/${searchTerm.toLowerCase()}`);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      onSearchHandler(null);
    }
  };

  return (
    <div className="flex flex-col items-center md:h-full">
      <div
        className="flex h-80 w-full select-none flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1530488562579-7c1dd2e6667b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80")`,
        }}
      >
        <div className="text-5xl text-white">Welcome to YelpCamp</div>
        <div className="mt-2 text-lg text-white ">
          View CampGround form all around the world!
        </div>
      </div>
      <div className="flex h-12 w-full items-center justify-between bg-white shadow-lg">
        <DropDown />
        <div className="mr-52 flex">
          <input
            type="text"
            name=""
            id=""
            className="border pl-2 shadow-md"
            placeholder="Search Campground"
            onChange={onChangeHandler}
            onKeyDown={handleKeyDown}
          />
          <a
            className="flex w-8 cursor-pointer items-center justify-center bg-sky-400 shadow-md"
            onClick={onSearchHandler}
          >
            <svg
              className="text-gray-200 "
              width="21"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <circle
                cx="11.7669"
                cy="11.7666"
                r="8.98856"
                stroke="currentColor"
              ></circle>{" "}
              <path
                d="M18.0186 18.4851L21.5426 22"
                stroke="currentColor"
              ></path>{" "}
            </svg>
          </a>
        </div>
      </div>

      <div className="mt-4  w-full sm:flex sm:flex-wrap ">
        {data?.pages.map((group:any, i:any) => (
          <Fragment key={i}>
            {group.camp.map((camp: any) => (
              <Link href={`/campgrounds/${camp.id}`} key={camp.id}>
                <div className="flex md:w-1/3" key={camp.id}>
                  <div className="m-2 flex w-full flex-col items-center justify-center duration-300 hover:scale-110 hover:bg-slate-400">
                    <Image
                      src={camp.image}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
                      }}
                      width="320"
                      className="-pt-2"
                    />
                    <div>
                      <p className="select-none pt-4 text-blue-600">
                        {camp.name}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Fragment>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            skip = data?.pageParams.length ?? 0;
            return fetchNextPage();
          }}
          disabled={!hasNextPage || isFetchingNextPage}
          className="mb-4 h-8 w-64 rounded-md border duration-300 hover:bg-slate-300"
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};

export default Infinite; //MUST EXPORT SO THAT NEXT JS FINDS IT

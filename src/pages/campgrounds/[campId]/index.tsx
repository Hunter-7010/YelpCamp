import type { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";


const Show: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const param = router.query.campId as string;
  const campground = trpc.campground.getById.useQuery(
    {
      id: param ? param : "",
    },
    {
      refetchOnWindowFocus: false,
    }
  ).data?.campground;

  const ctx = trpc.useContext();
  const deleteCamp = trpc.campground.deleteCamp.useMutation({
    onSuccess: () => {
      ctx.invalidate();
      router.push("/campgrounds");
    },
  });
  const deleteReview = trpc.campground.deleteReview.useMutation({
    onSuccess: () => {
      ctx.invalidate();
    },
  });
  const deleteHandler = () => {
    deleteCamp.mutate({ id: param });
  };

  const commentRef = useRef<HTMLTextAreaElement>(null);
  const insertReview = trpc.campground.insertReview.useMutation({
    onSuccess: () => {
      ctx.invalidate();
    },
  });

  const commentHandler = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const reviewData = {
      campId: param,
      comment: commentRef.current?.value,
    };
    insertReview.mutate(reviewData);
    if (commentRef.current) {
      commentRef.current.value = "";
    }

  };

  const deleteReviewHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const reviewId = { reviewId: e.currentTarget.id };
    deleteReview.mutate(reviewId);
    
  };

  return (
    <div className=" ">
      {campground ? (
        <div className="flex flex-col items-center justify-center ">
          <img
            src={campground.image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
            }}
            width="620"
            className="-pt-2 mt-12"
          />

          <p className="mt-2 text-3xl">{campground.name}</p>
          <p className="">{campground.price}$/Night</p>

          <p className="">Review:{campground.review}</p>
          <p className="">Address:{campground.address}</p>
          <p className="">
            Created At: {campground.createdAt.toLocaleDateString()}
          </p>
          <p className="text-gray-400">Submitted By: {campground.authorName}</p>

          {campground.authorId == sessionData?.user?.id ? (
            <>
              <p className="text-gray-500"></p>
              <button
                className="h-8 w-32 rounded-2xl bg-red-600 duration-300 hover:scale-110"
                onClick={deleteHandler}
              >
                Delete
              </button>
              <Link href={`/campgrounds/${param}/edit`}>
                <a className="mt-2 flex h-10 w-60 items-center justify-center rounded-2xl bg-sky-500 duration-300 hover:scale-110">
                  Update CampGround
                </a>
              </Link>
            </>
          ) : null}

          <div className="mt-2 w-screen border">
            <h2 className="text-center text-2xl">Reviews:</h2>
            <form onSubmit={commentHandler}>
              <textarea
                className="w-full bg-gray-300 px-2 text-lg"
                ref={commentRef}
                disabled={!sessionData?.user ? true : false}
                placeholder={
                  !sessionData?.user ? "Please sign in to comment" : "Comment"
                }
              ></textarea>
              {sessionData?.user ? (
                <button className="w-24 rounded-2xl bg-sky-500">Comment</button>
              ) : null}
            </form>
            <ul className="p-2 ">
              {campground.reviews
                .slice(0)
                .reverse()
                .map((review:any) => (
                  <li
                    className="mt-2 flex h-20 items-center justify-between bg-white px-4"
                    key={review.id}
                  >
                    <div className="flex w-screen flex-col">
                      <p className="mb-2 text-blue-600">{review.username}</p>
                      <div className="w-1/2 overflow-auto">
                        {review.comment}
                      </div>
                    </div>

                    {review.userId == sessionData?.user?.id ? (
                      <div className="flex items-center justify-center">
                        <a
                          className="flex h-8 w-20 items-center justify-center rounded-2xl bg-red-600 text-red-900 duration-300 hover:scale-110 hover:cursor-pointer"
                          id={review.id}
                          onClick={deleteReviewHandler}
                        >
                          Delete
                        </a>
                      </div>
                    ) : null}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <div
          role="status"
          className="flex h-screen w-screen items-center justify-center"
        >
          <svg
            aria-hidden="true"
            className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Show;

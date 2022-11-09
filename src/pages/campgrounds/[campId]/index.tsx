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
  const campground = trpc.campground.getById.useQuery({
    id: param ? param : "",
  }).data?.campground;

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
    console.log("comment:", reviewData);
  };

  const deleteReviewHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const reviewId = { reviewId: e.currentTarget.id };
    deleteReview.mutate(reviewId);
    console.log("pressed a tag", e.currentTarget.id);
  };

  return (
    <div className="flex h-screen flex-col items-center bg-gray-300">
      <div className="flex h-full">
        {campground ? (
          <div className="mt-2 flex w-full flex-col items-center justify-center ">
            <img
              src={campground.image}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
              }}
              width="620"
              className="-pt-2 mt-64"
            />
            <p className="pt-12">Title: {campground.name}</p>
            <p className="">Price: {campground.price}</p>
            <p className="">Review:{campground.name}</p>
            <p className="">
              Created At: {campground.createdAt.toLocaleDateString()}
            </p>
            {campground.authorId == sessionData?.user?.id ? (
              <>
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

            <div className="w-full border">
              <h2 className="text-center">Reviews:</h2>
              <form onSubmit={commentHandler}>
                <textarea
                  className="w-full px-2 text-lg"
                  ref={commentRef}
                ></textarea>
                <button className="w-24 rounded-2xl bg-sky-500">Comment</button>
              </form>
              <ul className="p-2">
                {campground.reviews.map((review: any) => (
                  <li
                    className="mt-2 flex h-12 items-center justify-between bg-gray-400 px-4"
                    key={review.id}
                  >
                    {review.comment}

                    {review.userId == sessionData?.user?.id ? (
                      <div>
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
          <p>loading</p>
        )}
      </div>
    </div>
  );
};

export default Show;

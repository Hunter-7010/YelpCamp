import type { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import React, { useRef,useEffect } from "react";
import { useSession } from "next-auth/react";

const Edit: NextPage = () => {
  const { data: sessionData } = useSession();
  
  const router = useRouter();
  useEffect(()=>{
    if(!sessionData?.user){
      router.push('/')
    }
  },[])
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const reviewRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  

 
  const param = router.query.campId as string;
  const ctx = trpc.useContext();
  const {mutate} = trpc.campground.updateCamp.useMutation({
    onSuccess:()=>{
      ctx.invalidate()
      router.push(`/campgrounds/${param}`)
    }
  })
  const onSubmitHandler = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const enteredName = nameRef.current ? nameRef.current.value : null;
    const enteredAddress = addressRef.current ? addressRef.current.value : null;
    const enteredPrice = priceRef.current ? priceRef.current.value : null;
    const enteredImage = imageRef.current ? imageRef.current.value : null;
    const enteredReview = reviewRef.current ? reviewRef.current.value : null

    const campData = {
      id: param as string,
      name: enteredName as string,
      address: enteredAddress as string,
      price: enteredPrice ? +enteredPrice : enteredPrice,
      image: enteredImage as string,
      review: +enteredReview!
    };
   
    mutate(campData)
  };
  const campground = trpc.campground.getById.useQuery({
    id: param ? param : "",
  }).data?.campground;
  if (!campground) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form
        className="flex h-2/3 w-2/3 flex-col items-center justify-center border bg-gray-100"
        onSubmit={onSubmitHandler}
      >
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Add a new Campground
        </h1>
        <label htmlFor="name" className="mb-2 flex w-1/2">
          Title:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="h-12 w-1/2 rounded-md border-2 p-4"
          defaultValue={campground.name}
          ref={nameRef}
        />
        <label htmlFor="address" className="mb-2 flex w-1/2">
          Address:
        </label>
        <input
          type="text"
          id="address"
          className="h-12 w-1/2 rounded-md border-2 p-4"
          defaultValue={campground.address}
          ref={addressRef}
        />
        <label htmlFor="price" className="mb-2 flex w-1/2">
          Price:
        </label>
        <input
          type="number"
          id="price"
          className="h-12 w-1/2 rounded-md border-2 p-4"
          defaultValue={campground.price}
          ref={priceRef}
        />
          <label htmlFor="review" className="mb-2 flex w-1/2">
          Review:
        </label>
        <select name="" defaultValue={campground.review} id="review" className="w-1/2 border-2 rounded-md p-4 static" ref={reviewRef}>
          <option defaultValue="1" selected={+campground.review==1}>1</option>
          <option defaultValue="2" selected={+campground.review==2}>2</option>
          <option defaultValue="3" selected={+campground.review==3}>3</option>
          <option defaultValue="4" selected={+campground.review==4}>4</option>
          <option defaultValue="5" selected={+campground.review==5}>5</option>
        </select>
        <label htmlFor="image" className="mb-2 flex w-1/2">
          Image:
        </label>
        <input
          type="text"
          id="image"
          className="h-12 w-1/2 rounded-md border-2 p-4"
          defaultValue={campground.image}
          ref={imageRef}
        />
        <button className="mt-4 h-16 rounded-3xl bg-sky-500 px-6 text-sky-900 duration-500 hover:scale-110">
          Edit CampGround
        </button>
      </form>
    </div>
  );
};

export default Edit;

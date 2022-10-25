import type { NextPage } from "next";
import Link from "next/link";
import React, { useRef } from "react";

const NewCamp: NextPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const enteredName = nameRef.current ? nameRef.current.value : null;
    const enteredAddress = addressRef.current? addressRef.current.value : null; ;
    const enteredPrice = priceRef.current ? priceRef.current.value : null;;
    const enteredImage = imageRef.current ? imageRef.current.value : null;;

    const campData = {
      name: enteredName,
      address: enteredAddress,
      price: enteredPrice ? +enteredPrice:enteredPrice,
      image: enteredImage,
    };
    console.log(campData);
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-300">
      <form className="flex h-2/3 w-2/3 flex-col items-center justify-center border bg-gray-100" onSubmit={onSubmitHandler}>
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
          ref={nameRef}
        />
        <label htmlFor="address" className="mb-2 flex w-1/2">
          Address:
        </label>
        <input
          type="text"
          id="address"
          className="h-12 w-1/2 rounded-md border-2 p-4"
          ref={addressRef}
        />
        <label htmlFor="price" className="mb-2 flex w-1/2">
          Price:
        </label>
        <input
          type="number"
          id="price"
          className="h-12 w-1/2 rounded-md border-2 p-4"
          ref={priceRef}
        />
        <label htmlFor="image" className="mb-2 flex w-1/2">
          Image:
        </label>
        <input
          type="text"
          id="image"
          className="h-12 w-1/2 rounded-md border-2 p-4"
          ref={imageRef}
        />
        <button className="mt-4 h-16 rounded-3xl bg-sky-500 px-6 text-sky-900 duration-500 hover:scale-110">
          Add CampGround
        </button>
      </form>
    </div>
  );
};

export default NewCamp;

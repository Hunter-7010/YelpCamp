import type { NextPage } from "next";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { trpc } from "../../../utils/trpc";
import { useRouter } from "next/router";


const SearchCampground:NextPage = ()=> {
    const router = useRouter()
    const search = router.query.queryString
    const [searchTerm, setSearchTerms] = useState("")
    const {data:campgroundData} = trpc.searchCampground.getBySearchTerm.useQuery({searchTerm: search},{
        refetchOnWindowFocus:false
       }
      )
      
      const campgrounds= campgroundData
      
   
      const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setSearchTerms(e.currentTarget.value)
      }
      const onSearchHandler =(e:React.MouseEvent<HTMLElement> | null):void=> {
        router.push(`/campgrounds/q/${searchTerm.toLowerCase()}`)
      }
      const handleKeyDown = (e:React.KeyboardEvent<HTMLElement>)=>{
        if(e.key ==='Enter'){
          onSearchHandler(null)
        }
      }
      if(campgrounds?.length===0){
        return(
          
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
            <div></div>
            <div className="mr-52 flex">
              <input type="text" name="" id="" className="border pl-2 shadow-sm" placeholder="Search Campground" onChange={onChangeHandler} onKeyDown={handleKeyDown} />
              <a className="w-8 bg-sky-400 flex justify-center items-center cursor-pointer" onClick={onSearchHandler}>
                
                <svg
                className=""
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
          <div>Could not find any</div>
          </div>
        )
      }
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
            <div></div>
            <div className="mr-52 flex">
              <input type="text" name="" id="" className="border pl-2 shadow-sm" placeholder="Search Campground" onChange={onChangeHandler} onKeyDown={handleKeyDown} />
              <a className="w-8 bg-sky-400 flex justify-center items-center cursor-pointer" onClick={onSearchHandler}>
                
                <svg
                className=""
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
            {campgrounds ? (
              campgrounds.map((camp:any) => (
                <Link href={`/campgrounds/${camp._id}`} key={camp._id}>
                  <div className="flex md:w-1/3" key={camp._id}>
                    <div className="m-2 flex w-full flex-col items-center justify-center duration-300 hover:scale-110 hover:bg-slate-400">
                      <img
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
                      <p className="pt-4 text-blue-600">{camp.name}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div role="status" className="h-screen w-screen flex justify-center items-center">
              <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" width="32" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
            )}
          </div>
        </div>
      );
}

export default SearchCampground
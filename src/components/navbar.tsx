import Link from "next/link";
const NavBar:React.FC= ()=>{
   return(
     <header className="bg-purple-600 w-screen h-24 flex items-center relative justify-between">
       <span className="text-3xl text-white font-bold mx-12">YelpCamp</span>
       <div className="">
        <Link href="/campgrounds">
        <span className="mx-4 text-2xl text-gray-200 hover:cursor-pointer  hover:text-gray-400">All CampGrounds</span>
        </Link>
        <Link href="/campgrounds/new">
        <span className="mx-4 text-2xl text-gray-200 hover:cursor-pointer hover:text-gray-400">Add a New CampGround</span>
        </Link>
       </div>
    </header>
    )
}
export default NavBar;
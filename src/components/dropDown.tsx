import { Menu,Transition } from '@headlessui/react'
import { Fragment} from 'react'
import { useRouter } from "next/router";
const DropDown: React.FC = () => {
  const router = useRouter()

    return(
        <div>
            <Menu>
      <Menu.Button className='ml-52 static'>Sort By</Menu.Button>
      <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
               
      <Menu.Items className="absolute flex flex-col ml-48 space-y-2 rounded-lg bg-gray-200 w-52">
        <Menu.Item>
          {() => (
          
            <a
              className={'hover:bg-sky-400 hover:text-white rounded-t-lg pl-2 cursor-pointer'}
             onClick={()=>{
              router.push('/campgrounds/sort/createdAt')
             }}
            >
              By Creation date
            </a>
        
          )}
        </Menu.Item>
        <Menu.Item>
          {() => (
       
            <a
              className={'hover:bg-sky-400 hover:text-white pl-2 cursor-pointer'}
              onClick={()=>{
                router.push('/campgrounds/sort/price')
               }}
            >
              By Price
            </a>
           
          )}
        </Menu.Item>
        <Menu.Item>
          {() => (
           
            <a
              className={'hover:bg-sky-400 hover:text-white pl-2 rounded-b-lg cursor-pointer'}
              onClick={()=>{
                router.push('/campgrounds/sort/review')
               }}
            >
              By Review
            </a>
   
          )}
        </Menu.Item>
      </Menu.Items>
      </Transition>
    </Menu>

        </div>
    )
}

export default DropDown;
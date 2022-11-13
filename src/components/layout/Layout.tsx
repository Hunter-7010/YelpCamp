import NavBar from "../navbar"
type LayoutProps = {
    children: React.ReactNode; // 👈️ type children
  };

const LayOut = (props:LayoutProps)=> {
    return (
    <div className="font-serif bg-gray-100">
        <NavBar/>
        <main >
            {props.children ? props.children : null}
        </main>   
    </div>
    )
}
export default LayOut
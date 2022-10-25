import NavBar from "../navbar"
type LayoutProps = {
    children: React.ReactNode; // 👈️ type children
  };

const LayOut = (props:LayoutProps)=> {
    return (
    <div>
        <NavBar/>
        <main>
            {props.children ? props.children : null}
        </main>   
    </div>
    )
}
export default LayOut
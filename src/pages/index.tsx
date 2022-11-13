import type { NextPage } from "next";


const Home: NextPage = () => {
  
  return (
    <div className="flex h-screen flex-col justify-center items-center bg-cover bg-center" style={{ 
      backgroundImage: `url("https://images.unsplash.com/photo-1520824071669-892f70d8a23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2909&q=80")` 
    }}>
      <h1 className="text-6xl text-white select-none">Welcome to YelpCamp</h1>

    </div>
  );
};

export default Home; //MUST EXPORT SO THAT NEXT JS FINDS IT

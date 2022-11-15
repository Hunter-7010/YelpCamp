import type { NextPage } from "next";

const Home: NextPage = () => {
  
  return (
    <div className="flex h-screen flex-col justify-center items-center bg-cover bg-center" style={{ 
      backgroundImage: `url('/landing.jpg')`
    }}>
      <h1 className="text-6xl text-white select-none">Welcome to YelpCamp</h1>

    </div>
  );
};

export default Home; //MUST EXPORT SO THAT NEXT JS FINDS IT

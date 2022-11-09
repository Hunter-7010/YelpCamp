import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  
  return (
    <div className="flex h-screen flex-col items-center bg-gray-300">
      <h1 className="text-3xl font-bold">Home page</h1>
      {/* <AuthShowcase/> */}
    </div>
  );
};

// const AuthShowcase: React.FC = () => {

//   const { data: sessionData } = useSession();
  
//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();
  
//   return (
//     <div className="flex flex-col items-center justify-center gap-2">
//       {sessionData && (
//         <p className="text-2xl text-blue-500">
//           Logged in as {sessionData?.user?.name}
//         </p>
//       )}
//       {secretMessage && (
//         <p className="text-2xl text-blue-500">{secretMessage}</p>
//       )}
//       <button
//         className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   )
      
      
// };


export default Home; //MUST EXPORT SO THAT NEXT JS FINDS IT

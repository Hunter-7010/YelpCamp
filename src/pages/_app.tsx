// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import LayOut from "../components/layout/Layout";
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  <LayOut> 
    {/* HERE YOU CAN LOAD YOUR LAYOUTS */}
    <Component {...pageProps} />
  </LayOut>
  );
};

export default trpc.withTRPC(MyApp);

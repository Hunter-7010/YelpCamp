import NavBar from "../navbar";
import Head from "next/head";
type LayoutProps = {
  children: React.ReactNode; // 👈️ type children
};

const LayOut = (props: LayoutProps) => {
  return (
    <main className="bg-gray-100 font-serif">
      <Head>
        <title>YelpCamp</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="description"
          content="YelpCamp is Colt Steel's Famous project (re-written in Next.js)"
          key="desc"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar />
      <div>{props.children ? props.children : null}</div>
    </main>
  );
};
export default LayOut;

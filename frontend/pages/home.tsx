import Head from "next/head";
import FeaturedSection from "../src/components/homeAuth/featuresSection";
import NewestCategory from "../src/components/homeAuth/newestCategory";
import FavoritesCategory from "../src/components/homeAuth/favoritecCategory";
import FeaturedCategory from "../src/components/homeAuth/featuredCategory";
import Footer from "../src/components/common/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SwrSpinner from "@/components/common/swrSpinner";

const HomeAuth = function () {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <SwrSpinner />;
  }

  return (
    <>
      <Head>
        <title>Onebitflix - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <FeaturedSection />
        <NewestCategory />
        <FavoritesCategory />
        <FeaturedCategory />
        <Footer />
      </main>
    </>
  );
};

export default HomeAuth;

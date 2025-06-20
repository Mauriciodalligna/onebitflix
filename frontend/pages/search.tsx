import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import styles from "../styles/search.module.scss";
import courseService, { CourseType } from "../src/services/courseService";
import { useRouter } from "next/router";
import Head from "next/head";
import HeaderAuth from "../src/components/common/headerAuth";
import Footer from "../src/components/common/footer";
import SearchCard from "../src/components/searchCard";
import SwrSpinner from "../src/components/common/swrSpinner";

export default function Search() {
  const router = useRouter();
  const { name } = router.query;
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const searchCourses = async (searchName: string) => {
    if (!mounted) return;
    setLoading(true);
    try {
      const response = await courseService.getSearch(searchName);
      if (mounted) {
        setSearchResult(response.data.courses);
      }
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      if (mounted) {
        setSearchResult([]);
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    }
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (name && mounted) {
      searchCourses(name as string);
    }
  }, [name, mounted]);

  if (loading) {
    return <SwrSpinner />;
  }

  return (
    <>
      <Head>
        <title>Onebitflix - {name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        {searchResult.length >= 1 ? (
          <div className={styles.searchContainer}>
            <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
              {searchResult?.map((course) => (
                <SearchCard key={course.id} course={course} />
              ))}
            </Container>
          </div>
        ) : (
          <div className={styles.searchContainer}>
            <p className={styles.noSearchResult}>
              Nenhum resultado encontrado!
            </p>
          </div>
        )}

        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
}

import Head from "next/head";
import styles from "../styles/Home.NoAuth.module.scss";
import HeaderNoAuth from "../src/components/homeNoAuth/headerNoAuth";
import PresentationSection from "../src/components/homeNoAuth/presentationSection";
import CardsSection from "../src/components/homeNoAuth/cardsSection";
import Slidesection from "../src/components/homeNoAuth/slideSection";
import React, { ReactNode, useEffect } from "react";
import courseService, { CourseType } from "../src/services/courseService";
import { GetStaticProps } from "next";
import Footer from "../src/components/common/footer";
import AOS from "aos";
import "aos/dist/aos.css";

interface IndexPageProps {
  children: ReactNode;
  course: CourseType[];
}

const HomeNotAuth = ({ course }: IndexPageProps) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <title>Onebitflix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="Onebitflix" key="title" />
        <meta
          name="description"
          content="Tenha acesso aos melhores conteúdos sobre programação de uma forma simples e fácil."
        />
      </Head>
      <main>
        <div
          className={styles.sectionBackground}
          data-aos="fade-zoom-in"
          data-aos-duration="1600"
        >
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <div data-aos="fade-rigth" data-aos-duration="1200">
          <CardsSection />
        </div>
        <div data-aos="fade-up" data-aos-duration="1350">
          <Slidesection newstCourses={course} />
        </div>
        <Footer />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await courseService.getNewestCourses();

    if (res.status >= 400) {
      return {
        props: {
          course: [],
        },
        revalidate: 3600 * 24,
      };
    }

    return {
      props: {
        course: res.data || [],
      },
      revalidate: 3600 * 24,
    };
  } catch (error) {
    console.log("Erro ao buscar cursos:", error);
    return {
      props: {
        course: [],
      },
      revalidate: 3600 * 24,
    };
  }
};

export default HomeNotAuth;

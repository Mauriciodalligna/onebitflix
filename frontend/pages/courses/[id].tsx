import HeaderAuth from "@/components/common/headerAuth";
import styles from "../../styles/coursePage.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import courseService, {
  CourseType,
  EpisodeType,
} from "../../src/services/courseService";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Container } from "reactstrap";
import EpisodeList from "@/components/common/episodeList";
import Footer from "@/components/common/footer";
import SwrSpinner from "@/components/common/swrSpinner";

const CoursePage = function () {
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    const token = sessionStorage.getItem("onebitflix-token");
    if (!token) {
      router.push("/login");
      return;
    }

    const getCourse = async () => {
      if (typeof id !== "string") return;

      try {
        setLoading(true);
        setError(null);
        const res = await courseService.getEpisodes(id);

        if (res.status === 200 && res.data) {
          setCourse(res.data);
          setLiked(res.data.liked);
          setFavorited(res.data.favorited);
        } else {
          setError("Erro ao carregar o curso");
        }
      } catch (error) {
        console.error("Erro ao carregar curso:", error);
        setError("Erro ao carregar o curso");
      } finally {
        setLoading(false);
      }
    };

    getCourse();
  }, [router.isReady, id, router]);

  const handleLikeCourse = async () => {
    if (typeof id !== "string") return;

    try {
      if (liked === true) {
        await courseService.removeLike(id);
        setLiked(false);
      } else {
        await courseService.like(id);
        setLiked(true);
      }
    } catch (error) {
      console.error("Erro ao atualizar like:", error);
    }
  };

  const handleFavCourse = async () => {
    if (typeof id !== "string") return;

    try {
      if (favorited === true) {
        await courseService.removeFav(id);
        setFavorited(false);
      } else {
        await courseService.addToFav(id);
        setFavorited(true);
      }
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  const handleWatchNow = () => {
    if (course?.episodes && course.episodes.length > 0) {
      const firstEpisode = course.episodes[0];
      router.push(
        `/courses/episode/0?courseid=${course.id}&episodeid=${firstEpisode.id}`
      );
    }
  };

  if (loading) {
    return <SwrSpinner />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>{error}</h2>
        <Button onClick={() => router.push("/home")}>Voltar para Home</Button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={styles.errorContainer}>
        <h2>Curso não encontrado</h2>
        <Button onClick={() => router.push("/home")}>Voltar para Home</Button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Onebitflix - {course.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515),
	  url(http://localhost:3000/${course.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "450px",
          }}
        >
          <HeaderAuth />
        </div>
        <Container className={styles.courseInfo}>
          <p className={styles.courseTitle}>{course.name}</p>
          <p className={styles.courseDescription}>{course.synopsis}</p>
          <Button
            outline
            className={styles.courseBtn}
            disabled={course.episodes?.length === 0}
            onClick={handleWatchNow}
          >
            ASSISTIR AGORA!
            <img
              src="/buttonPlay.svg"
              alt="buttonImg"
              className={styles.buttonImg}
            />
          </Button>
          <div className={styles.interactions}>
            {liked === false ? (
              <img
                src="/course/iconLike.svg"
                alt="likeImage"
                className={styles.interactionImages}
                onClick={handleLikeCourse}
              />
            ) : (
              <img
                src="/course/iconLiked.svg"
                alt="likedImage"
                className={styles.interactionImages}
                onClick={handleLikeCourse}
              />
            )}
            {favorited === false ? (
              <img
                onClick={handleFavCourse}
                src="/course/iconAddFav.svg"
                alt="addFav"
                className={styles.interactionImages}
              />
            ) : (
              <img
                onClick={handleFavCourse}
                src="/course/iconFavorited.svg"
                alt="favorited"
                className={styles.interactionImages}
              />
            )}
          </div>
        </Container>

        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>EPISÓDIOS</p>
          <p className={styles.episodeLength}>
            {course.episodes?.length} episódios
          </p>
          {course.episodes?.length === 0 ? (
            <p>
              <strong>
                Não temos episódios ainda, volte outra hora! &#x1F606;
              </strong>
            </p>
          ) : (
            course.episodes?.map((episode: EpisodeType) => (
              <EpisodeList
                key={episode.id}
                episode={episode}
                courseId={course.id}
              />
            ))
          )}
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default CoursePage;

import { useRouter } from "next/router";
import Head from "next/head";
import HeaderGeneric from "../../../src/components/common/headerGeneric";
import courseService, { CourseType } from "../../../src/services/courseService";
import watchEpisodeService from "../../../src/services/episodeService";
import { useEffect, useState, useRef } from "react";
import SwrSpinner from "../../../src/components/common/swrSpinner";
import ReactPlayer from "react-player";
import { Button, Container } from "reactstrap";
import styles from "../../../styles/episodePlayer.module.scss";

const EpisodePlayer = function () {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const episodeId = parseFloat(router.query.episodeid?.toString() || "");
  const courseId = router.query.courseid?.toString() || "";

  const [getEpisodeTime, setGetEpisodeTime] = useState(0);
  const [episodeTime, setEpisodeTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);
  const saveTimeInterval = useRef<NodeJS.Timeout>();

  const handleGetEpisodeTime = async () => {
    try {
      const res = await watchEpisodeService.getWatchTime(episodeId);
      if (res.data !== null && typeof res.data.seconds === "number") {
        setGetEpisodeTime(res.data.seconds);
      } else {
        setGetEpisodeTime(0);
      }
    } catch (error) {
      console.error("Erro ao carregar tempo:", error);
      setGetEpisodeTime(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetEpisodeTime = async () => {
    try {
      if (episodeTime > 0) {
        await watchEpisodeService.setWatchTime({
          episodeId: episodeId,
          seconds: Math.round(episodeTime),
        });
      }
    } catch (error) {
      console.error("Erro ao salvar tempo:", error);
    }
  };

  const handlePlayerTime = () => {
    if (
      playerRef.current &&
      typeof getEpisodeTime === "number" &&
      !isNaN(getEpisodeTime)
    ) {
      playerRef.current.seekTo(getEpisodeTime, "seconds");
    }
    setIsReady(true);
  };

  const resetPlayerState = () => {
    setEpisodeTime(0);
    setGetEpisodeTime(0);
    setIsReady(false);
    setIsLoading(true);
    if (playerRef.current) {
      playerRef.current.seekTo(0);
    }
  };

  const handleLastEpisode = async () => {
    await handleSetEpisodeTime();
    resetPlayerState();

    const newEpisodeId = episodeId - 1;
    const newEpisodeOrder = episodeOrder - 1;

    if (newEpisodeOrder >= 0) {
      router.push(
        `/courses/episode/${newEpisodeOrder}?courseid=${courseId}&episodeid=${newEpisodeId}`
      );
    }
  };

  const handleNextEpisode = async () => {
    if (course?.episodes && episodeOrder < course.episodes.length - 1) {
      await handleSetEpisodeTime();
      resetPlayerState();

      const newEpisodeId = episodeId + 1;
      const newEpisodeOrder = episodeOrder + 1;

      router.push(
        `/courses/episode/${newEpisodeOrder}?courseid=${courseId}&episodeid=${newEpisodeId}`
      );
    }
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    setEpisodeTime(progress.playedSeconds);

    if (course?.episodes && episodeOrder < course.episodes.length - 1) {
      const currentEpisode = course.episodes[episodeOrder];
      if (
        Math.round(progress.playedSeconds) >=
        currentEpisode.secondsLong - 1
      ) {
        handleNextEpisode();
      }
    }
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (episodeId) {
      handleGetEpisodeTime();
    }
  }, [episodeId]);

  useEffect(() => {
    if (isReady) {
      saveTimeInterval.current = setInterval(handleSetEpisodeTime, 3000);
    }

    return () => {
      if (saveTimeInterval.current) {
        clearInterval(saveTimeInterval.current);
      }
    };
  }, [isReady]);

  const getCourse = async function () {
    if (typeof courseId !== "string") return;

    try {
      const res = await courseService.getEpisodes(courseId);
      if (res.status === 200) {
        setCourse(res.data);
      }
    } catch (error) {
      console.error("Erro ao carregar curso:", error);
    }
  };

  if (isLoading) return <SwrSpinner />;
  if (course?.episodes === undefined) return <SwrSpinner />;
  if (episodeOrder < 0 || episodeOrder >= course.episodes.length) {
    return <div className="text-center mt-5">Episódio não encontrado</div>;
  }

  const token = sessionStorage.getItem("onebitflix-token");
  if (!token) {
    return (
      <div className="text-center mt-5">
        Você precisa estar logado para assistir aos vídeos
      </div>
    );
  }

  const currentEpisode = course.episodes[episodeOrder];
  if (!currentEpisode?.videoUrl) {
    return <div className="text-center mt-5">Vídeo não disponível</div>;
  }

  const fullUrl = `http://localhost:3000/episodes/stream?videoUrl=${encodeURIComponent(
    currentEpisode.videoUrl
  )}&token=${token}`;

  if (loading) {
    return <SwrSpinner />;
  }

  return (
    <>
      <Head>
        <title>Onebitflix - {currentEpisode.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric
          logoUrl="/home"
          btnContent={`Voltar para o curso`}
          btnUrl={`/courses/${courseId}`}
        />
        <Container className="d-flex flex-column align-items-center gap-3 pt-5">
          <p className={styles.episodeTitle}>{currentEpisode.name}</p>
          {typeof window !== "undefined" && (
            <ReactPlayer
              ref={playerRef}
              className={styles.player}
              url={fullUrl}
              controls
              width="100%"
              height="100%"
              onStart={handlePlayerTime}
              onProgress={handleProgress}
              config={{
                file: {
                  attributes: {
                    crossOrigin: "anonymous",
                    controlsList: "nodownload",
                  },
                  forceVideo: true,
                },
              }}
            />
          )}
          <div className={styles.episodeButtonDiv}>
            <Button
              className={styles.episodeButton}
              onClick={handleLastEpisode}
              disabled={episodeOrder === 0}
            >
              <img
                src="/episode/iconArrowLeft.svg"
                alt="setaEsquerda"
                className={styles.arrowImg}
              />
            </Button>
            <Button
              className={styles.episodeButton}
              onClick={handleNextEpisode}
              disabled={episodeOrder + 1 === course.episodes.length}
            >
              <img
                src="/episode/iconArrowRight.svg"
                alt="setaDireita"
                className={styles.arrowImg}
              />
            </Button>
          </div>
          <p className="text-center pb-4">{currentEpisode.synopsis}</p>
        </Container>
      </main>
    </>
  );
};

export default EpisodePlayer;

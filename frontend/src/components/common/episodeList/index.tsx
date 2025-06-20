import styles from "./styles.module.scss";
import { EpisodeType } from "../../../services/courseService";
import { useRouter } from "next/router";

interface props {
  episode: EpisodeType;
  courseId: number;
}

const EpisodeList = function ({ episode, courseId }: props) {
  const router = useRouter();

  const handleSecondsToMin = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    function toString(num: number) {
      return num.toString().padStart(2, "0");
    }

    const result = `${toString(minutes)}:${toString(seconds)}`;

    return result;
  };

  const handleEpisodePlayer = () => {
    router.push(`/courses/episode/${episode.order - 1}?courseid=${courseId}&episodeid=${episode.id}`);
  };

  return (
    <>
      <div className={styles.episodeCard} onClick={handleEpisodePlayer}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episódio Nº {episode.order}</p>
          <p className={styles.episodeTime}>
            {handleSecondsToMin(episode.secondsLong)}
          </p>
        </div>
        <div className={styles.episodeTitleDescription}>
          <p className={styles.episodeTitle}>{episode.name}</p>
          <p className={styles.episodeDescription}>
            {episode.synopsis}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
            sequi ea nobis facere natus voluptate similique veritatis
            repellendus officia delectus odio et a in quam vel repellat,
            explicabo error atque deleniti labore mollitia asperiores voluptas.
            Soluta, quam quod enim ab unde dolorum dolor deleniti animi, itaque
            ducimus mollitia? Ab, quibusdam.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
            beatae.
          </p>
        </div>
      </div>
    </>
  );
};

export default EpisodeList;

import useSWR from "swr";
import courseService from "../../../services/courseService";
import SlideComponent from "../../common/slideComponent";
import styles from "../../../../styles/slideCategory.module.scss";
import SwrSpinner from "../../common/swrSpinner";

const NewestCategory = function () {
  const { data, error, isLoading } = useSWR(
    "/newest",
    courseService.getNewestCourses
  );

  if (error) {
    console.error("Erro ao carregar cursos:", error);
    return null;
  }

  if (isLoading || !data) {
    return <SwrSpinner />;
  }

  return (
    <>
      <p className={styles.titleCategory}>LANÇAMENTOS</p>
      <SlideComponent course={data.data} />
    </>
  );
};

export default NewestCategory;

import styles from "./styles.module.scss";
import { CourseType } from "../../../services/courseService";
import Link from "next/link";

interface props {
  course: CourseType;
}

const SlideCard = function ({ course }: props) {
  return (
    <>
      <Link href={`/courses/${course.id}`}>
        <div className={styles.slide}>
          <img
            src={`http://localhost:3000/${course.thumbnailUrl}`}
            alt={course.name}
            className={styles.slideImg}
          />
          <p className={styles.slideTitle}>{course.name}</p>
          <p className={styles.slideDescription}>{course.synopsis}</p>
        </div>
      </Link>
    </>
  );
};

export default SlideCard;

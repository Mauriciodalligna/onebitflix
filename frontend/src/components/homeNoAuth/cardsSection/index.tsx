import { Container } from "reactstrap";
import styles from "./styles.module.scss";

const CardsSection = function () {
  return (
    <>
      <p className={styles.sectionTitle}>OQUE VOCÊ VAI ACESSAR</p>
      <Container className="d-flex flex-wrap justify-content-center gap-4 pb-5">
        <div className={styles.cards1}>
          <p className={styles.cardTitle}>FRONT - END</p>
          <p className={styles.cardDescription}>
            O Onebitcode Black é o lugar para você evoluir. Para isso, você vai
            ter acesso às práticas avançadas de programação, atualizações de
            tecnologias e todo o suporte técnico necessário para ser um sênior
            na programação.
          </p>
        </div>
        <div className={styles.cards2}>
          <p className={styles.cardTitle}>BACK - END</p>
          <p className={styles.cardDescription}>
            O Onebitcode Black é o lugar para você evoluir. Para isso, você vai
            ter acesso às práticas avançadas de programação, atualizações de
            tecnologias e todo o suporte técnico necessário para ser um sênior
            na programação.
          </p>
        </div>
        <div className={styles.cards3}>
          <p className={styles.cardTitle}>MOBILE</p>
          <p className={styles.cardDescription}>
            O Onebitcode Black é o lugar para você evoluir. Para isso, você vai
            ter acesso às práticas avançadas de programação, atualizações de
            tecnologias e todo o suporte técnico necessário para ser um sênior
            na programação.
          </p>
        </div>
        <div className={styles.cards4}>
          <p className={styles.cardTitle}>GIT E GITHUB</p>
          <p className={styles.cardDescription}>
            O Onebitcode Black é o lugar para você evoluir. Para isso, você vai
            ter acesso às práticas avançadas de programação, atualizações de
            tecnologias e todo o suporte técnico necessário para ser um sênior
            na programação.
          </p>
        </div>
        <div className={styles.cards5}>
          <p className={styles.cardTitle}>PROJETOS</p>
          <p className={styles.cardDescription}>
            O Onebitcode Black é o lugar para você evoluir. Para isso, você vai
            ter acesso às práticas avançadas de programação, atualizações de
            tecnologias e todo o suporte técnico necessário para ser um sênior
            na programação.
          </p>
        </div>
        <div className={styles.cards6}>
          <p className={styles.cardTitle}>CARREIRA</p>
          <p className={styles.cardDescription}>
            O Onebitcode Black é o lugar para você evoluir. Para isso, você vai
            ter acesso às práticas avançadas de programação, atualizações de
            tecnologias e todo o suporte técnico necessário para ser um sênior
            na programação.
          </p>
        </div>
      </Container>
    </>
  );
};

export default CardsSection;

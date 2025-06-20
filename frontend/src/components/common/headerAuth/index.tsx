import { Container, Input, Form } from "reactstrap";
import Link from "next/link";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import profileService from "@/services/profileService";

Modal.setAppElement("#__next");

const HeaderAuth = function () {
  const router = useRouter();
  const [modalOpen, setModalIsOpen] = useState(false);
  const [initials, setInitials] = useState("");
  const [searchName, setSearchName] = useState("");
  const [mounted, setMounted] = useState(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/search?name=${searchName}`);
    setSearchName("");
  };

  const handleSearchClick = () => {
    router.push(`/search?name=${searchName}`);
    setSearchName("");
  };

  useEffect(() => {
    setMounted(true);
    let isMounted = true;

    profileService.fetchCurrent().then((user) => {
      if (isMounted) {
        const firstName = user.data.firstName.slice(0, 1);
        const lastName = user.data.lastName.slice(0, 1);
        setInitials(firstName + lastName);
      }
    });

    return () => {
      isMounted = false;
      setMounted(false);
    };
  }, []);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();

    router.push("/login");
  };

  return (
    <>
      <Container className={styles.nav}>
        <Link href="/home">
          <img
            src="/logoOnebitflix.svg"
            alt="logoOnebitflix"
            className={styles.imgLogoNav}
          />
        </Link>
        <div className="d-flex align-items-center">
          <Form onSubmit={handleSearch}>
            <Input
              name="search"
              type="search"
              placeholder="Pesquisar"
              className={styles.input}
              value={searchName}
              onChange={(event) =>
                setSearchName(event.currentTarget.value.toLowerCase())
              }
            />
          </Form>
          <img
            src="/homeAuth/iconSearch.svg"
            alt="lupaHeader"
            className={styles.searchImg}
            onClick={handleSearchClick}
          />
          <p className={styles.userProfile} onClick={handleOpenModal}>
            {initials}
          </p>
        </div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={handleCloseModal}
          shouldCloseOnEsc={true}
          className={styles.modal}
          overlayClassName={styles.overlayModal}
        >
          <Link href="/profile">
            <p className={styles.modalLink}>Meus Dados</p>
          </Link>
          <p className={styles.modalLink} onClick={handleLogout}>
            Sair
          </p>
        </Modal>
      </Container>
    </>
  );
};

export default HeaderAuth;

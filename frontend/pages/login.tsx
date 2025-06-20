import Head from "next/head";
import HeaderGeneric from "../src/components/common/headerGeneric";
import styles from "../styles/registerLogin.module.scss";
import { Input, Label, FormGroup, Button, Container, Form } from "reactstrap";
import Footer from "../src/components/common/footer";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
import ToastComponent from "../src/components/common/toast";
import authService from "../src/services/authService";

const Login = function () {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("onebitflix-token")) {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    const registerSucess = router.query.success;

    if (registerSucess === "true") {
      setToastColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Cadastro feito com sucesso!");
    }
  }, [router.query]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();

    const params = {
      email: email as string,
      password: password as string,
    };

    try {
      const { status, data } = await authService.login(params);

      if (status === 200) {
        router.push("/home");
      } else {
        setToastColor("bg-danger");
        setToastIsOpen(true);
        setTimeout(() => {
          setToastIsOpen(false);
        }, 1000 * 3);
        setToastMessage("Email ou senha inválidos");
      }
    } catch (error: any) {
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage(
        error.response?.data?.message || "Erro ao realizar login"
      );
    }
  };

  return (
    <>
      <Head>
        <title>Onebitflix - Login</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/register"
          btnContent="Quero fazer parte"
        />
        <Container className="py-5">
          <p className={styles.formTitle}>Bem-vindo(a) ao OneBitFlix!</p>
          <Form className={styles.form} onSubmit={handleLogin}>
            <p className="text-center">
              <strong>Bem-vindo(a) ao OneBitFlix!</strong>
            </p>
            <FormGroup>
              <Label for="email" className={styles.label}>
                E-MAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Qual o seu email?"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                SENHA
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Qual a sua senha?"
                required
                className={styles.input}
              />
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>
              ENTRAR
            </Button>
          </Form>
          <ToastComponent
            color={toastColor}
            isOpen={toastIsOpen}
            message={toastMessage}
          />
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default Login;

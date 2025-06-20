import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/profile.module.scss";
import { FormEvent, useEffect, useState } from "react";
import profileService from "../../../services/profileService";
import ToastComponent from "../../../components/common/toast";
import { useRouter } from "next/router";
const UserForm = function () {
  const router = useRouter();
  const [color, setColor] = useState("");
  const [toast, setToast] = useState(false);
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState(email);
  const [createdAt, setCreatedAt] = useState("");
  const [birth, setBirth] = useState("");

  const formatDate = (dateString: string) => {
    if (!dateString) return "Data não disponível";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Data inválida";

      const day = date.getDate();
      const month = date.toLocaleDateString("pt-BR", { month: "long" });
      const year = date.getFullYear();

      return `${day} de ${month} de ${year}`;
    } catch (error) {
      return "Data inválida";
    }
  };

  const formatPhone = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, "");

    // Limita a 11 dígitos (DDD + 9 dígitos)
    const limitedNumbers = numbers.slice(0, 11);

    // Formata o número
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(
        2,
        7
      )}-${limitedNumbers.slice(7)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setPhone(formattedPhone);
  };

  const fetchUserData = async () => {
    try {
      const response = await profileService.fetchCurrent();

      if (response?.data) {
        setFirstName(response.data.firstName || "");
        setLastName(response.data.lastName || "");
        setPhone(response.data.phone || "");
        setEmail(response.data.email || "");
        setInitialEmail(response.data.email || "");
        setCreatedAt(response.data.createdAt || "");
        setBirth(response.data.birth || "");
      }
    } catch (error) {
      setToastIsOpen(true);
      setErrorMessage("Erro ao carregar dados do usuário");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await profileService.userUpdate({
        firstName,
        lastName,
        phone,
        email,
        birth,
      });

      if (res === 200) {
        setToastIsOpen(true);
        setErrorMessage("Informações alteradas com sucesso!");
        setColor("bg-success");
        setTimeout(() => setToastIsOpen(false), 1000 * 3);
        if (email != initialEmail) {
          sessionStorage.clear();
          router.push("/");
        }
        // Recarregar os dados do usuário após a atualização
        await fetchUserData();
      } else {
        setToastIsOpen(true);
        setErrorMessage("Você não pode mudar para esse email!");
        setColor("bg-danger");
        setTimeout(() => setToastIsOpen(false), 1000 * 3);
      }
    } catch (error) {
      setToastIsOpen(true);
      setErrorMessage("Erro ao atualizar informações");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleUserUpdate}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>
            {firstName.slice(0, 1)}
            {lastName.slice(0, 1)}
          </p>
          <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="iconProfile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Membro desde <br />
            {formatDate(createdAt)}
          </p>
        </div>
        <hr />
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="firstName">
              NOME
            </Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Qual o seu primeiro nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="lastName">
              SOBRENOME
            </Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Qual o seu último nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="phone">
              WHATSAPP / TELEGRAM
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              placeholder="(xx) xxxxx-xxxx"
              required
              className={styles.input}
              value={phone}
              onChange={handlePhoneChange}
              maxLength={15}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="email">
              E-MAIL
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="Coloque o seu email"
              required
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
        </div>
        <Button type="submit" className={styles.formBtn} outline>
          Salvar Alterações
        </Button>
      </Form>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
};

export default UserForm;

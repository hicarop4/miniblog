import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPass) {
      setError("As senhas precisam ser iguais!");
      return;
    }
    const res = await createUser(user);
    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas memórias.</p>
      <form onSubmit={handleSubmit} method="POST" className={styles.form}>
        <label>
          <span>Nome: </span>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Insira seu nome"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>

        <label>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="pass"
            id="pass"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          <span>Confirmação de senha: </span>
          <input
            type="password"
            name="confirmPass"
            id="confirmPass"
            required
            placeholder="Confirme sua senha"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </label>

        {!loading && (
          <button className="btn" type="submit">
            Cadastrar
          </button>
        )}

        {loading && (
          <button className="btn" disabled type="submit">
            Aguarde...
          </button>
        )}

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;

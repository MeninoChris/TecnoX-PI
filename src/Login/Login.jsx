import './Login.css'
import { Link } from 'react-router';

function Login() {

  return (
    <div class="login-container">
        <img src="./public/Logo.png" alt='Logo' width="180" height="180"/>
        <h3>SEJA BEM VINDO</h3>
        <br></br>
        <p>Usuário</p>
        <input type="email" name="usuario" maxlength="50" size="40" placeholder="Digite seu e-mail" required></input><br></br>
        <p>Senha</p>
        <input type="password" name="senha" maxlength="20" placeholder="Digite sua senha" required></input><br></br>
        <button class="Esqueceu">Esqueceu a senha?</button>
        <br></br>
        <button class="CConta">
        <Link to="/">Não possui uma conta? Crie uma aqui</Link>
        </button>
        <button class="Login">LOGIN</button>
    </div>
  )
}

export default Login

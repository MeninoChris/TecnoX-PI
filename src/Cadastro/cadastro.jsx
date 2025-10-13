import './cadastro.css'
import { Link } from 'react-router';

function Cadastro() {

  return (
    <div class="login-container">
        <img src="./public/Logo.png" alt='Logo' width="180" height="180"/>
        <h3>SEJA BEM VINDO</h3>
        <br></br>
        <p>Usuário</p>
        <input class="email" type="email" name="usuario" maxlength="50" size="40" placeholder="Digite seu e-mail" required></input><br></br>
        <p>Senha</p>
        <input type="password" name="senha" maxlength="20" placeholder="Digite sua senha" required></input><br></br>
        <input class="cadastrar" type="password" name="confirmar_senha" placeholder="Confirme sua senha" pattern=".{8,}"></input>
        <button class="LLogin">
        <Link to="/Login">Já tem uma conta? Faça login</Link>
        </button>
        <button class="Login">Cadastrar</button>
    </div>
  )
}

export default Cadastro

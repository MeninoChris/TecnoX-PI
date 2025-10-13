import './cadastro.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Cadastro() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const navigate = useNavigate()

  const handleCadastro = async () => {
    if (!usuario || !senha) return alert('Preencha todos os campos!')
    if (senha !== confirmar) return alert('As senhas não coincidem!')

    // 🔍 Verifica se o e-mail já existe no "banco"
    const checkUser = await fetch(`http://localhost:5000/usuarios?usuario=${usuario}`)
    const existente = await checkUser.json()
    if (existente.length > 0) return alert('Usuário já cadastrado!')

    // 📝 Envia para o bd.json
    await fetch('http://localhost:5000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha })
    })

    alert('Cadastro realizado com sucesso!')
    navigate('/login')
  }

  return (
    <div className="login-container">
      <img src="./public/Logo.png" alt='Logo' width="180" height="180" />
      <h3>SEJA BEM-VINDO</h3>

      <p>Usuário</p>
      <input
        type="email"
        value={usuario}
        onChange={e => setUsuario(e.target.value)}
        placeholder="Digite seu e-mail"
      />

      <p>Senha</p>
      <input
        type="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        placeholder="Digite sua senha"
      />

      <p>Confirmar senha</p>
      <input
        type="password"
        value={confirmar}
        onChange={e => setConfirmar(e.target.value)}
        placeholder="Confirme sua senha"
      />

      <button className="Login" onClick={handleCadastro}>Cadastrar</button>
      <button className="LLogin">
        <Link to="/login">Já tem uma conta? Faça login</Link>
      </button>
    </div>
  )
}

export default Cadastro

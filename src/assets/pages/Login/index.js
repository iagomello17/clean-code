import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../pages/Login/style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.msg);
                localStorage.setItem('token', data.token); // Armazena o token
                navigate('/'); // Redireciona para a página inicial (home)
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="page-container">
            <div className="wrapper">
                <div className="form-box login">
                    <h2>LOGIN</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input
                                type="email"
                                required
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>E-MAIL</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input
                                type="password"
                                required
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label>SENHA</label>
                        </div>
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" /> Relembre-me
                            </label>
                            <a href="#">Esqueceu a senha?</a>
                        </div>
                        <button type="submit" className="btn">LOGIN</button>
                        <div className="login-register">
                            <p>
                                Não está cadastrado?{' '}
                                <Link to="/cadastro" className="nav-link nav-link-custom">
                                    Cadastrar-se
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

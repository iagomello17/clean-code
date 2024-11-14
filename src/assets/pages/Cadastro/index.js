import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/Cadastro/style.css';

function Cadastro() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmpassword: formData.confirmPassword
                })
            });

            const data = await response.json();
            alert(data.msg);

            if (response.ok) navigate('/login');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    };

    const renderInput = (type, name, label) => (
        <div className="input-box">
            <input
                type={type}
                name={name}
                required
                placeholder=" "
                value={formData[name]}
                onChange={handleChange}
            />
            <label>{label}</label>
        </div>
    );

    return (
        <div className="page-container">
            <div className="wrapper">
                <div className="form-box login">
                    <h2>CADASTRE-SE</h2>
                    <form onSubmit={handleSubmit}>
                        {renderInput('text', 'name', 'NOME')}
                        {renderInput('email', 'email', 'EMAIL')}
                        {renderInput('password', 'password', 'SENHA')}
                        {renderInput('password', 'confirmPassword', 'REPETIR SENHA')}
                        <button type="submit" className="btn">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;

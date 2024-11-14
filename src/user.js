import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function User() {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            redirectToLogin();
            return;
        }

        fetchUserData(token);
    }, [id, navigate]);

    const redirectToLogin = () => navigate('/login');

    const fetchUserData = async (token) => {
        try {
            const response = await fetchUser(token);
            handleResponse(response);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            redirectToLogin();
        }
    };

    const fetchUser = (token) => 
        fetch(`http://localhost:8080/user/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

    const handleResponse = async (response) => {
        const data = await response.json();
        if (response.ok) {
            setUser(data.user);
        } else {
            alert(data.msg);
            redirectToLogin();
        }
    };

    return (
        <div>
            {user ? (
                <UserDetails user={user} />
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}

function UserDetails({ user }) {
    return (
        <div>
            <h2>Bem-vindo, {user.name}!</h2>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default User;

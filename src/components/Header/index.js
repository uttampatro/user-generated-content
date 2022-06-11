import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import './style.css';

function Header() {
    const User = localStorage.getItem('accessToken');
    const user = User ? JSON.parse(User) : undefined;

    const navigate = useNavigate();

    const loggingOut = async () => {
        try {
            await logout();
            navigate('/');
            window.location = window.location
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="headerHome">
            <div className="headerBody">
                <h3>
                    <span>FATMUG</span>｜Greetings! {user.email}
                </h3>
            </div>
            <div>
                <div className="headerButton">
                    <button className="button1">Write</button>
                    <button className="button2">Your Article</button>
                    <button
                        style={{
                            backgroundColor: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '550',
                        }}
                        onClick={loggingOut}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;

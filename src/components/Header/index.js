import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import './style.css';

function Header() {
    const User = localStorage.getItem('accessToken');
    const user = User ? JSON.parse(User) : undefined;
    // console.log(user.id);

    const navigate = useNavigate();

    const loggingOut = async () => {
        try {
            await logout();
            navigate('/');
            window.location = window.location;
        } catch (error) {
            console.log(error);
        }
    };

    const goToUserArticles = async () => {
        try {
            navigate(`/usersArticles/${user.id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const goToHome = async () => {
        try {
            navigate(`/home`);
        } catch (error) {
            console.log(error);
        }
    };

    const writeArticle = async () => {
        try {
            navigate(`/writeArticle`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="headerHome">
            <div className="headerBody">
                <h3>
                    <span style={{ cursor: 'pointer' }} onClick={goToHome}>
                        FATMUG
                    </span>
                    ｜Greetings! {user.email}
                </h3>
            </div>
            <div>
                <div className="headerButton">
                    <button onClick={writeArticle} className="button1">
                        Write
                    </button>
                    <button onClick={goToUserArticles} className="button2">
                        Your Article
                    </button>
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

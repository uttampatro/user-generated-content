import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Publish from './pages/publishArticle';
import ViewArticle from './pages/viewArticle';
import Articles from './pages/userArticles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
    const userExists = localStorage.getItem('accessToken');

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {!userExists ? (
                        <>
                            <Route path="/" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </>
                    ) : (
                        <>
                            <Route path="/home" element={<Home />} />
                            <Route path="/viewArticle/:id" element={<ViewArticle />} />

                        </>
                    )}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

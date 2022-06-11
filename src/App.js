import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Publish from './pages/publishArticle';
import ViewArticle from './pages/viewArticle';
import Articles from './pages/userArticles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
                            <Route path="/usersArticles/:id" element={<Articles />} />
                            <Route path="/writeArticle" element={<Publish />} />

                        </>
                    )}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

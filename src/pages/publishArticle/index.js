import { CircularProgress, TextField, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import {
    createArticle,
    generateSignedUrl,
    uploadFile,
} from '../../services/articleService';
import { logout } from '../../services/authService';
import './style.css';

function Publish(props) {
    const navigate = useNavigate();
    const User = localStorage.getItem('accessToken');
    const user = User ? JSON.parse(User) : undefined;
    const userId = user.id;

    const [isCreatingArticle, setIsCreatingArticle] = useState(false);

    const {
        setTitle,
        setDescription,
        setImageFlie,
        setPreviewImage,
        imageFile,
        previewImage,
    } = props;

    const creatingArticle = async e => {
        e.preventDefault();
        try {
            const { title, description, imageFile } = props;

            if (!title) {
                return alert('please write title');
            }
            if (!description) {
                return alert('please write description');
            }
            if (!imageFile) {
                return alert('please upload Image');
            }
            
            setIsCreatingArticle(true);
            const imageUrl = await uploadThumbnail(imageFile);

            const article = await createArticle({
                title,
                description,
                imageUrl,
                userId,
            });
            if (article) {
                alert('article created successfully');
                navigate(`/viewArticle/${article._id}`);
                window.location = window.location;
            } else {
                alert('please fill details');
            }
            setIsCreatingArticle(false);
        } catch (error) {
            setIsCreatingArticle(false);
            console.log(error);
        }
    };

    const uploadThumbnail = async imageFile => {
        const awsSignedUrlRes = await generateSignedUrl(imageFile.name);
        const thumbnailSignedUrl = awsSignedUrlRes.signedRequest;
        const imageUrl = awsSignedUrlRes.url;
        await uploadFile(thumbnailSignedUrl, imageFile);
        return imageUrl;
    };

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

    useEffect(() => {
        if (imageFile) {
            setPreviewImage(window.URL.createObjectURL(imageFile));
        }
    }, [imageFile]);

    return (
        <div className="publishHome">
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
                        <button
                        disabled={isCreatingArticle}
                            onClick={creatingArticle}
                            className="button1"
                        >
                            Publish
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
            <div>
                <Typography
                    style={{
                        marginRight: '48%',
                        marginBottom: '10px',
                        color: 'black',
                    }}
                >
                    TITLE
                </Typography>
                <TextField
                    variant="standard"
                    required
                    rows={1}
                    InputProps={{ disableUnderline: true }}
                    onChange={e => setTitle(e.target.value)}
                    name="title"
                    style={{
                        width: '50%',
                        padding: '8px',
                        marginBottom: '20px',
                        background: 'rgb(238, 238, 238)',
                        border: 'none',
                    }}
                    maxRows={4}
                />
                <Typography
                    style={{
                        marginRight: '43.3%',
                        marginBottom: '10px',
                        color: 'black',
                    }}
                >
                    DESCRIPTION
                </Typography>
                <TextField
                    variant="standard"
                    multiline
                    required
                    rows={10}
                    InputProps={{ disableUnderline: true, border: 'none' }}
                    onChange={e => setDescription(e.target.value)}
                    name="description"
                    style={{
                        width: '50%',
                        marginBottom: '20px',
                        padding: '8px',
                        background: 'rgb(238, 238, 238)',
                    }}
                    maxRows={4}
                />
            </div>
            <TextField
                variant="standard"
                accept="image/png,image/jpg"
                className="createMovieThumbnail_input"
                id="select-image"
                type="file"
                InputProps={{ disableUnderline: true }}
                style={{
                    paddingBottom: '10px',
                    marginRight: '29%',
                    display: 'none',
                }}
                required
                name="thumbnail"
                onChange={e => setImageFlie(e.target.files[0])}
            />
            <label htmlFor="select-image">
                <Button
                    style={{ marginRight: '41%' }}
                    variant="contained"
                    color="primary"
                    component="span"
                >
                    Upload Image
                </Button>
            </label>
            {isCreatingArticle && (
                <CircularProgress
                    size={24}
                    style={{
                        color: 'green[500]',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: -12,
                        marginLeft: -12,
                    }}
                />
            )}
            {previewImage && imageFile && (
                <img
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginTop: '15px',
                        marginRight: 'auto',
                    }}
                    width="50%"
                    height="240px"
                    src={previewImage}
                />
            )}
        </div>
    );
}

const mapStateToProps = globalState => {
    // console.log(globalState.createArticleReducer);
    return globalState.createArticleReducer;
};
const mapDispatchToProps = dispatch => {
    return {
        setTitle: value => dispatch({ type: 'SET_TITLE', value }),
        setDescription: value => dispatch({ type: 'SET_DESCRIPTION', value }),
        setImageFlie: value => dispatch({ type: 'SET_IMAGEFILE', value }),
        setPreviewImage: value => dispatch({ type: 'SET_PREVIEWIMAGE', value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Publish);

import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    generateSignedUrl,
    getArticle,
    updateArticle,
    uploadFile,
} from '../../services/articleService';
import { logout } from '../../services/authService';

function EditArticle(props) {
    const navigate = useNavigate();
    const User = localStorage.getItem('accessToken');
    const user = User ? JSON.parse(User) : undefined;

    // console.log(props);
    const { article } = props.viewArticleReducer;

    const fetchArticle = async id => {
        try {
            const res = await getArticle(id);
            setArticle(res);
        } catch (error) {
            console.log(error);
        }
    };

    const {
        setTitle,
        setDescription,
        setImageFlie,
        setPreviewImage,
        updateArticleReducer,
        setArticle,
    } = props;
    const { title, description, imageFile, previewImage } =
        updateArticleReducer.article;

    const { id } = useParams();

    const [isUpdatingArticle, setIsUpdatingArticle] = useState(false);

    const updatingArticle = async e => {
        e.preventDefault();
        try {
            if (title == article.title) {
                return article.title;
            }
            if (description == article.description) {
                return article.description;
            }

            setIsUpdatingArticle(true);
            const imageUrl = await uploadThumbnail(imageFile)

            const url = imageUrl.slice(-9).toString() == 'undefined' ? article.imageUrl : imageUrl
            // console.log(imageUrl.slice(-9))
            // console.log(imageUrl)

            const articleData = await updateArticle(id, {
                title: title,
                description: description,
                imageUrl: url,
            });
            if (articleData) {
                alert('article updated successfully');
                navigate(`/viewArticle/${articleData._id}`);
                window.location = window.location;
            } else {
                alert('please fill details');
            }
            setIsUpdatingArticle(false);
        } catch (error) {
            setIsUpdatingArticle(false);
            console.log(error);
            alert('something went wrong');
        }
    };

    const uploadThumbnail = async imageFile => {
        const awsSignedUrlRes = await generateSignedUrl(imageFile?.name);
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
        fetchArticle(id);
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
                            disabled={isUpdatingArticle}
                            onClick={updatingArticle}
                            className="button1"
                        >
                            Update Article
                        </button>
                        <button onClick={goToUserArticles} className="button2">
                            Your Articles
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
                    value={title || article.title}
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
                    value={description || article.description}
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
            {isUpdatingArticle && (
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
            {previewImage && imageFile ? (
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
            ) : (
                <img
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginTop: '15px',
                        marginRight: 'auto',
                    }}
                    width="50%"
                    height="240px"
                    src={article.imageUrl}
                />
            )}
        </div>
    );
}

const mapStateToProps = globalState => {
    // console.log(globalState);
    return {
        updateArticleReducer: globalState.updateArticleReducer,
        viewArticleReducer: globalState.viewArticleReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setTitle: title =>
            dispatch({ type: 'SET_UPDATE_TITLE', payload: { title } }),
        setDescription: description =>
            dispatch({
                type: 'SET_UPDATE_DESCRIPTION',
                payload: { description },
            }),
        setImageFlie: imageFile =>
            dispatch({ type: 'SET_UPDATE_IMAGEFILE', payload: { imageFile } }),
        setPreviewImage: value => dispatch({ type: 'SET_PREVIEWIMAGE', value }),
        setArticle: value =>
            dispatch({ type: 'GETTING_ARTICLE_DETAILS', value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);

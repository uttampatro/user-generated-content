import { Avatar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { getArticle } from '../../services/articleService';
import './style.css';

function ViewArticle(props) {
    const { article, setArticle } = props;

    const fetchArticle = async id => {
        try {
            const res = await getArticle(id);
            setArticle(res);
        } catch (error) {
            console.log(error);
        }
    };

    const { id } = useParams();

    useEffect(() => {
        fetchArticle(id);
    }, []);

    // console.log(article);

    return (
        <div className="viewArticle">
            <Header />
            <div className="viewArticleBody">
                <img
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingTop: '20px',
                        width: '57%',
                        height: '300px',
                    }}
                    src={article.imageUrl}
                />
                <div className="viewArticleBody_content">
                    <Typography
                        style={{
                            marginLeft: '110px',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                        }}
                    >
                        {article.title}
                    </Typography>
                    <p
                        style={{
                            marginRight: '110px',
                            marginBottom: '5px',
                            fontStyle: 'italic',
                            fontFamily: 'sans-serif',
                            fontWeight: 'lighter',
                        }}
                    >
                        {article.createdAt}.
                        <span
                            style={{
                                color: 'gray',
                                paddingLeft: '5px',
                            }}
                        >
                            ★
                        </span>
                        {/* <span style={{ fontWeight: 'bold' }}>6 min read</span> */}
                    </p>
                </div>

                <hr style={{ margin: '10px 300px' }} />
                <Typography
                    style={{
                        paddingLeft: '22%',
                        paddingRight: '22%',
                        paddingTop: '20px',
                        textAlign: 'justify',
                    }}
                >
                    {article.description}
                </Typography>
            </div>
            <div
                style={{
                    display: 'flex',
                    paddingLeft: '22%',
                    paddingTop: '40px',
                }}
            >
                <Avatar />
                <p
                    style={{
                        padding: '8px',
                        fontStyle: 'italic',
                        fontWeight: 'lighter',
                        fontFamily: 'sans-serif',
                    }}
                >
                    by{' '}
                    <span style={{ fontWeight: 'bold', fontStyle: 'initial' }}>
                        {article.createdBy.email}
                    </span>
                </p>
            </div>
        </div>
    );
}

const mapStateToProps = globalState => {
    // console.log(globalState.viewArticleReducer);
    return globalState.viewArticleReducer;
};

const mapDispatchToProps = dispatch => {
    return {
        setArticle: value =>
            dispatch({ type: 'GETTING_ARTICLE_DETAILS', value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);

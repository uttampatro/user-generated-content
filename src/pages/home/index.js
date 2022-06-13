import { Avatar, Box, Grid, TablePagination, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import {
    getAllArticles,
    getRandomArticles,
} from '../../services/articleService';
import './style.css';

function Home(props) {
    const [currentPage, setCurrentPage] = useState(0);
    const [articlePerPage, setArticlePerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    // console.log(props)

    const { articles, setArticles, setRandomArticles, randomArticles } = props;

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    const handleChangeRowsPerPage = event => {
        setArticlePerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const fetchArticlesList = async () => {
        try {
            const data = await getAllArticles({
                page: currentPage + 1,
                limit: articlePerPage,
            });
            setArticles(data.articleList);
            setTotalCount(data.pagination.count);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchRandomArticlesList = async () => {
        try {
            const data = await getRandomArticles({});
            console.log(data);
            setRandomArticles(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchArticlesList();
        fetchRandomArticlesList();
    }, [currentPage, articlePerPage]);

    return (
        <div className="homeIndex">
            <Header />
            <div>
                <Grid
                    container
                    spacing={5}
                    columns={15}
                    style={{
                        paddingLeft: '50px',
                        paddingTop: '25px',
                    }}
                >
                    <Grid
                        xs={9.5}
                        style={{
                            padding: '20px',
                        }}
                    >
                        {articles.map(article => {
                            return (
                                <div>
                                    <Link
                                        to={`/viewArticle/${article._id}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                        }}
                                    >
                                        <img
                                            style={{
                                                // display: 'block',
                                                paddingTop: '20px',
                                                width: '100%',
                                                height: '250px',
                                            }}
                                            src={article.imageUrl}
                                        />
                                        <div
                                            style={{
                                                display: 'flex',
                                                paddingTop: '15px',
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    backgroundColor: 'white',
                                                    border: '2px solid lightgray',
                                                    color: 'gray',
                                                    fontWeight: 600,
                                                    fontSize: 'smaller',

                                                    width: 25,
                                                    height: 25,
                                                    marginTop: '2px',
                                                }}
                                            >
                                                i
                                            </Avatar>
                                            <p
                                                style={{
                                                    padding: '8px',
                                                    fontWeight: 'bold',
                                                    fontSize: 'small',
                                                    fontFamily: 'sans-serif',
                                                }}
                                            >
                                                {article.createdBy.email}{' '}
                                                <span
                                                    style={{
                                                        fontWeight: 'lighter',
                                                        fontStyle: 'italic',
                                                    }}
                                                >
                                                    {/* in{' '} */}
                                                </span>
                                                {/* Better Programming */}
                                            </p>
                                        </div>
                                        <Typography
                                            style={{
                                                fontWeight: 600,
                                                marginTop: '10px',
                                            }}
                                        >
                                            {article.title}
                                        </Typography>

                                        <Typography
                                            style={{
                                                paddingRight: '0%',
                                                paddingTop: '10px',
                                                textAlign: 'justify',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {article.description
                                                .split('')
                                                .slice(0, 300)}
                                        </Typography>
                                        <p
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                cursor: 'pointer',
                                                paddingTop: '5px',
                                                paddingBottom: '10px',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Read More{' '}
                                            <span
                                                style={{
                                                    color: 'gray',
                                                    paddingLeft: '5px',
                                                }}
                                            >
                                                ★
                                            </span>
                                            {/* 7 min read */}
                                        </p>
                                    </Link>
                                </div>
                            );
                        })}

                        <div className="home_footer">
                            <TablePagination
                                count={totalCount}
                                page={currentPage}
                                onPageChange={handleChangePage}
                                rowsPerPage={articlePerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </Grid>
                    <Grid
                        xs={5.1}
                        style={{
                            padding: '20px',
                            paddingLeft: '20px',
                        }}
                    >
                        <div style={{ paddingTop: '20px' }}>
                            <hr style={{ width: '105%' }} />
                            <h3
                                style={{
                                    padding: '5px',
                                    fontFamily: '-moz-initial',
                                }}
                            >
                                TOP ARTICLES
                            </h3>
                            <hr style={{ width: '105%' }} />
                        </div>
                        <div>
                            {randomArticles.map(randomArticle => {
                                return (
                                    <>
                                        <Link
                                            to={`/viewArticle/${randomArticle._id}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    cursor: 'pointer',
                                                    paddingLeft: '5px'
                                                }}
                                            >
                                                <div>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            paddingTop: '15px',
                                                        }}
                                                    >
                                                        <Avatar
                                                            sx={{
                                                                backgroundColor:
                                                                    'white',
                                                                border: '2px solid lightgray',
                                                                color: 'gray',
                                                                fontWeight: 600,
                                                                width: 20,
                                                                fontSize:
                                                                    'smaller',
                                                                height: 20,
                                                                marginTop:
                                                                    '2px',
                                                            }}
                                                        >
                                                            i
                                                        </Avatar>
                                                        <p
                                                            style={{
                                                                padding: '5px',
                                                                paddingLeft:
                                                                    '7px',
                                                                fontWeight:
                                                                    'bold',
                                                                fontSize:
                                                                    'small',
                                                                fontFamily:
                                                                    'sans-serif',
                                                            }}
                                                        >
                                                            {
                                                                randomArticle
                                                                    .createdBy
                                                                    .email
                                                            }{' '}
                                                        </p>
                                                    </div>
                                                    <Typography
                                                        style={{
                                                            fontWeight: 600,
                                                            marginTop: '5px',
                                                            fontSize: 'medium',
                                                        }}
                                                    >
                                                        {randomArticle.title}
                                                    </Typography>
                                                    <p
                                                        style={{
                                                            marginRight:
                                                                '100px',
                                                            marginBottom:
                                                                '10px',
                                                            marginTop: '10px',
                                                            fontSize: 'small',
                                                            fontFamily:
                                                                'sans-serif',
                                                            fontWeight:
                                                                'lighter',
                                                        }}
                                                    >
                                                        {
                                                            randomArticle.createdAt
                                                        }
                                                        .
                                                        <span
                                                            style={{
                                                                color: 'gray',
                                                                paddingLeft:
                                                                    '1px',
                                                                paddingBottom:
                                                                    '2px',
                                                            }}
                                                        >
                                                            ★
                                                        </span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <img
                                                        style={{
                                                            paddingTop: '15px',
                                                            paddingLeft: '5px',
                                                            width: '150px',
                                                            height: '100px',
                                                        }}
                                                        src={
                                                            randomArticle.imageUrl
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                        <hr style={{ }} />
                                    </>
                                );
                            })}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

const mapStateToProps = globalState => {
    // console.log(globalState.articlesReducer);
    return globalState.articlesReducer;
};

const mapDispatchToProps = dispatch => {
    return {
        setArticles: value => dispatch({ type: 'GETTING_ALL_ARTICLES', value }),
        setRandomArticles: value =>
            dispatch({ type: 'GETTING_RANDOM_ARTICLES', value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './style.css';
import { TablePagination, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { deleteArticle, getUsersArticles } from '../../services/articleService';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Articles(props) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [articlePerPage, setArticlePerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

    const { articles, setArticles } = props;

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    const handleChangeRowsPerPage = event => {
        setArticlePerPage(parseInt(event.target.value, 5));
        setCurrentPage(0);
    };

    const fetchUsersArticlesList = async id => {
        try {
            const data = await getUsersArticles(id, {
                page: currentPage + 1,
                limit: articlePerPage,
            });
            // console.log(data)
            setArticles(data.articleList);
            setTotalCount(data.pagination.count);
        } catch (error) {
            console.log(error);
        }
    };

    const deletingArticle = async id => {
        try {
            const data = await deleteArticle(id);
            if (data) {
                alert('Deleted student successfully');
            }
            window.location = window.location;
            navigate(`/usersArticles`);
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(articles);

    const editArticle = async id => {
        try {
            navigate(`/editArticle/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const { id } = useParams();

    useEffect(() => {
        fetchUsersArticlesList(id);
    }, [currentPage, articlePerPage]);

    return (
        <div className="articles">
            <Header />
            <div className="articlesBody">
                <div>
                    <hr style={{ margin: '10px 200px' }} />
                    <h3 style={{ padding: '5px', fontFamily: '-moz-initial' }}>
                        YOUR SUBMITTED ARTICLES
                    </h3>
                    <hr style={{ margin: '10px 200px' }} />
                </div>
                <div>
                    {articles.map(article => {
                        return (
                            <>
                                <div className="articlesBodyContent">
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-evenly',
                                            paddingLeft: '200px',
                                        }}
                                    >
                                        <Link
                                            to={`/viewArticle/${article._id}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black',
                                            }}
                                        >
                                            <img
                                                style={{
                                                    paddingTop: '15px',
                                                    width: '150px',
                                                    height: '100px',
                                                }}
                                                src={article.imageUrl}
                                            />
                                        </Link>
                                        <div
                                            style={{
                                                paddingLeft: '20px',
                                                paddingTop: '15px',
                                                textAlign: 'justify',
                                            }}
                                        >
                                            <Link
                                                to={`/viewArticle/${article._id}`}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'black',
                                                }}
                                            >
                                                <h3>{article.title}</h3>

                                                <Typography
                                                    style={{
                                                        paddingTop: '10px',
                                                    }}
                                                >
                                                    {article.description
                                                        .split('')
                                                        .slice(0, 170)}
                                                    .....
                                                </Typography>
                                            </Link>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            padding: '30px',
                                            paddingRight: '170px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <EditIcon
                                            onClick={() =>
                                                editArticle(article._id)
                                            }
                                            style={{ padding: '20px' }}
                                        />
                                        <DeleteIcon
                                            onClick={() =>
                                                deletingArticle(article._id)
                                            }
                                            style={{ padding: '20px' }}
                                        />
                                    </div>
                                </div>
                                <hr style={{ margin: '5px 200px' }} />
                            </>
                        );
                    })}
                </div>
                <div className="articles_footer">
                    <TablePagination
                        count={totalCount}
                        page={currentPage}
                        onPageChange={handleChangePage}
                        rowsPerPage={articlePerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = globalState => {
    // console.log(globalState.userArticlesReducer);
    return globalState.userArticlesReducer;
};

const mapDispatchToProps = dispatch => {
    return {
        setArticles: value =>
            dispatch({ type: 'GETTING_USERS_ARTICLES', value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);

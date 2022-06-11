import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../services/authService';

const theme = createTheme();

function Login(props) {
    const navigate = useNavigate();
    const { email, password } = props;
    const { setEmail, setPassword } = props;

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const user = await login({ email, password });
            if (!user) {
                alert('Invalid Credential');
            } else {
                navigate('/home');
                window.location = window.location;
            }
        } catch (error) {
            console.log('Invalid Credential');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        border: '1px solid gray',
                        borderRadius: '2px',
                        marginTop: '80px',
                        padding: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        style={{ margin: '10px', backgroundColor: 'lightRed' }}
                    >
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{
                                marginTop: '30px',
                                padding: '3px',
                                marginBottom: '20px',
                                backgroundColor: 'lightblue',
                                color: 'black',
                            }}
                        >
                            Login
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

const mapStateToProps = globalState => {
    // console.log(globalState.authState);
    return globalState.authState;
};
const mapDispatchToProps = dispatch => {
    return {
        setEmail: value => dispatch({ type: 'SET_EMAIL', value }),
        setPassword: value => dispatch({ type: 'SET_PASSWORD', value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

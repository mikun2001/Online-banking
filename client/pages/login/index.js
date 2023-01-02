import { Box, Button, CircularProgress, Container, Grid, Hidden, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useStore } from 'laco-react';
import UserStore from '../../src/store/userStore';
import { authenticate } from '../../src/apis/authentication';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import ClientCaptcha from "react-client-captcha";
import BackImg from '../../public/Group83.png';
import Vector from '../../public/Group 84.png';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import SelectedAccountStore from "../../src/store/selectedAccountStore";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: `url(${BackImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("lg")]: {
            padding: "0px 120px",
        },
        [theme.breakpoints.down("md")]: {
            padding: "0px 80px",
        },
        [theme.breakpoints.down("sm")]: {
            padding: "0px 60px",
        },
        [theme.breakpoints.down("xs")]: {
            padding: "0px 8px",
        },
    },
    create: {
        cursor: "pointer",
        userSelect: "none",
    },
    conatiner: {
        background: '#D8D6FF',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'cemter',
    },
    card: {
        padding: '50px 20px',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        [theme.breakpoints.down('xs')]: {
            padding: '20px 0px',

        }
    }
}));

const Index = () => {

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [customerId, setCustomerId] = useState('');
    const [password, setPassword] = useState('');
    const [captchaCode, setCaptchaCode] = useState('');
    const [writtencaptchaCode, setWrittenCaptchaCode] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();
    const { user } = useStore(UserStore);

    useEffect(() => {
        if (user && user.role === 2) {
            Router.replace('/admin/dashboard');
        } else if (user && user.role === 1) {
            Router.replace('/accountDetails');
        }
    }, []);


    const validate = () => {
        if (customerId.trim() === '') {
            enqueueSnackbar('Please Enter User Id', { variant: 'warning' });
            return false;
        } else if (customerId.length !== 8) {
            enqueueSnackbar('Please Enter a valid User Id', { variant: 'warning' });
            return false;
        } else if (password.trim() === '') {
            enqueueSnackbar('Please Enter password', { variant: 'warning' });
            return false;
        } else if (writtencaptchaCode.trim() === '') {
            enqueueSnackbar('Please Enter captcha code', { variant: 'warning' });
            return false;
        }
        else if (captchaCode !== writtencaptchaCode) {
            enqueueSnackbar('Captcha does not match!!', { variant: 'warning' });
            return false;
        } else {
            return true;
        }
    };

    const handleLogin = () => {
        if (validate()) {
            setLoading(true);
            authenticate(customerId, password)
                .then((response) => {
                    const { accessToken, user } = response;
                    console.log(accessToken, user);
                    localStorage.setItem('feathers-jwt', accessToken);
                    UserStore.set(() => ({ token: accessToken, user }), 'login');
                    enqueueSnackbar('Login successfully', { variant: 'success' });
                    if (user.role === 2) {
                        Router.replace('/admin/dashboard');
                    }
                    else {
                        Router.replace('/accountDetails');
                        if(user.accounts.length === 1){
                            SelectedAccountStore.set(() => ({ account: user.accounts[0].accountNumber }), 'account');
                        }
                    }
                })
                .catch(error => {
                    enqueueSnackbar(error.message && error.message ? error.message : 'Something went wrong!', { variant: 'error' });
                }).finally(() => {
                    setLoading(false);
                });
        }
    };


    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);



    return (
        <Box className={classes.root}>
            <Container maxWidth={'lg'}>
                <Grid className={classes.card} container justify={'center'} alignItems={'center'}>
                    <Hidden smDown>
                        <Grid item container xs={12} sm={6} justify={'center'} alignItems={'center'}>
                            <img width={'80%'} src={Vector} alt={'vector'} />
                        </Grid>
                    </Hidden>
                    <Grid
                        item
                        container
                        xs={12} sm={6}
                        justify={'center'}
                        alignItems={'center'}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            width={'90%'}
                            maxWidth={'450px'}
                            borderRadius={'borderRadius'}
                            bgcolor={'#fafafa'}
                            boxShadow={4}
                            p={{ xs: 1, sm: 2 }}
                        >
                            <Hidden xsDown>
                                <Typography variant={'h3'} >
                                    {'Please Login to Continue'}
                                </Typography>
                            </Hidden>
                            <Hidden smUp>
                                <Typography variant={'h6'} style={{ fontWeight: 600, lineHeight: 1, margin: '15px 0' }} >
                                    {'Please Login to Continue'}
                                </Typography>
                            </Hidden>
                            <Box my={1} />
                            <Box width={'100%'} mb={'5px'}>
                                <Typography variant={'caption'}>
                                    {'User Id'}
                                </Typography>
                            </Box>
                            <TextField
                                // label={'customerId'}
                                value={customerId}
                                onChange={event => setCustomerId(event.target.value)}
                                variant="outlined"
                                fullWidth
                                style={{ backgroundColor: '#ffffff' }}

                            />
                            <Box my={1} />
                            <Box width={'100%'} mb={'5px'}>
                                <Typography variant={'caption'}>
                                    {'Password'}
                                </Typography>
                            </Box>
                            <TextField
                                fullWidth
                                style={{ backgroundColor: '#ffffff' }}
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Box my={1} />
                            <Box display={'flex'} alignItems={'center'}
                                width={'100%'} justifyContent={{ xs: 'center', md: 'space-between' }}>
                                <Hidden smDown>
                                    <Typography variant={'caption'}>{'Captcha'}</Typography>
                                </Hidden>

                                <Box mr={2}>
                                    <ClientCaptcha
                                        width={200}
                                        backgroundColor={'#e1e0e0'}
                                        retryIconSize={20}
                                        captchaCode={code => {
                                            console.log(code);
                                            setCaptchaCode(code);
                                        }}>

                                    </ClientCaptcha>
                                </Box>
                            </Box>
                            <Box my={1} />
                            <Box width={'100%'} mb={'5px'}>
                                <Typography variant={'caption'}>
                                    {'Type Captcha Code'}
                                </Typography>
                            </Box>
                            <TextField
                                // label={'Password'}
                                value={writtencaptchaCode}
                                onChange={event => setWrittenCaptchaCode(event.target.value)}
                                variant="outlined"
                                fullWidth
                                style={{ backgroundColor: '#ffffff' }}
                            />
                            <Box my={1} />
                            <Button disabled={loading} onClick={() => handleLogin()} variant="contained" color={'primary'} fullWidth>
                                {loading ? <CircularProgress
                                    size={24}
                                /> : 'Login'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid >
            </Container>
        </Box >
    )
}

export default Index

Index.title = 'Login'
Index.Layout = null
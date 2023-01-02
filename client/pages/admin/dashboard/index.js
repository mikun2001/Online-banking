import React, {useEffect, useState} from 'react'
import {Box, Container, Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import TotalUsersImage from '../../../public/totalUsers.svg';
import TransactionTable from "../../../src/components/AdminComponents/TransactionTable";
import {getAllUsers} from "../../../src/apis/users";
import Loader from "../../../src/components/Loader";
import {useSnackbar} from "notistack";
import {getAllAccounts} from "../../../src/apis/accounts";
import {getAllRequests} from "../../../src/apis/requestChequebook";


const useStyles = makeStyles(theme =>( {
    card:{
        height: '200px',
        maxWidth: '580px'
    },
    paper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        padding: '20px',
        backgroundImage: 'linear-gradient(to right bottom, #69f0ae, #00e1d2, #00cdf3, #00b5ff, #0096ff, #0b84ff,' +
            ' #406fff, #6a53ff, #6854ff, #6655ff, #6356ff, #6157ff)'
    },
    paperText1: {
        width: '80%',
        fontSize: '1.3rem',
        fontWeight: 'bold',
        objectFit: 'contain',
        color: '#ffffff'
    },
    paperText2: {
        width: '80%',
        marginTop: '5px',
        borderRadius: '8px',
        fontSize: 'x-large',
        backgroundColor: '#f2f2f2',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f3740b',
        fontWeight: '800'
    }
}));

const Dashboard = () => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false)
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAccounts, setTotalAccounts] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        getAllUsers(0, 10, '').then(res => {
            setTotalUsers(res.total)
            console.log(res);
        }).catch((e) => {
        enqueueSnackbar(e.message ? e.message : "Something Went Wrong", { variant: 'error' })
    }).finally(() => setLoading(false))
        getAllAccounts(0,10,'')
            .then(res => setTotalAccounts((res.total)))
            .catch((e) => {
                enqueueSnackbar(e.message ? e.message : "Something Went Wrong", { variant: 'error' })
            }).finally(() => setLoading(false));
        getAllRequests(0,10)
            .then(res => setTotalRequests((res.total)))
            .catch((e) => {
                enqueueSnackbar(e.message ? e.message : "Something Went Wrong", { variant: 'error' })
            }).finally(() => setLoading(false));

    },[])

    return (
        <>
        {
            loading ?
                <Loader />
                :
                <Container maxWidth={'lg'} style={{padding: '40px 0'}}>
                    <Grid container spacing={3} alignItems={'center'} alignContent={'center'} justify={'center'} alignSelf={'center'}>
                        <Grid item xs={12} sm={6} md={4} className={classes.card}>
                            <Paper className={classes.paper}>
                                <Grid item container alignContent={'center'} justify={'center'} xs={7}>
                                    <Typography align={'center'} className={classes.paperText1}>{'Total Users'}</Typography>
                                    <Typography
                                        className={classes.paperText2}>{totalUsers}</Typography>
                                </Grid>
                                <Grid item xs={5} container alignItems={'center'}>
                                    <Box borderRadius={'borderRadius'} p={1} mr={-40} bgcolor={'secondary.dark'}>
                                        <img height={'120px'} src={TotalUsersImage} alt="image"/>
                                    </Box>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.card}>
                            <Paper className={classes.paper}>
                                <Grid item container alignContent={'center'} justify={'center'} xs={7}>
                                    <Typography align={'center'} className={classes.paperText1}>{'Total Accounts'}</Typography>
                                    <Typography
                                        className={classes.paperText2}>{totalAccounts}</Typography>
                                </Grid>
                                <Grid item xs={5} container alignItems={'center'}>
                                    <Box borderRadius={'borderRadius'} p={1} mr={-40} bgcolor={'secondary.dark'}>
                                        <img height={'120px'} src={TotalUsersImage} alt="image"/>
                                    </Box>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.card}>
                            <Paper className={classes.paper}>
                                <Grid item container alignContent={'center'} justify={'center'} xs={7}>
                                    <Typography align={'center'} className={classes.paperText1}>{'Total Requests'}</Typography>
                                    <Typography
                                        className={classes.paperText2}>{totalRequests}</Typography>
                                </Grid>
                                <Grid item xs={5} container alignItems={'center'}>
                                    <Box borderRadius={'borderRadius'} p={1} mr={-40} bgcolor={'secondary.dark'}>
                                        <img height={'120px'} src={TotalUsersImage} alt="image"/>
                                    </Box>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box my={3} />
                    <Box mb={3}>
                        <Typography variant={'h5'} color={'primary'}>
                            {'All Transactions'}
                        </Typography>
                    </Box>
                    <TransactionTable />
                </Container>
        }
        </>
    )
}

export default Dashboard

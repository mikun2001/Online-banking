import {Box, CircularProgress, Typography} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {getMiniStatement} from "../../src/apis/miniStatement";
import {useStore} from "laco-react";
import SelectedAccountStore from "../../src/store/selectedAccountStore";
import {useSnackbar} from "notistack";
import {getParticularAccount} from "../../src/apis/accounts";

const Index = () => {

    const [data, setData] = useState([]);
    const [myAccount, setMyAccount] = useState({});
    const [loading, setLoading] = useState(false);
    const { account } = useStore(SelectedAccountStore);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getParticularAccount(account).then((res) => {
            setMyAccount(res.data[0]);
        }).catch((e) =>  enqueueSnackbar(e.message ? e.message : "Something Went Wrong", { variant: 'error' }))

        setLoading(true);
        getMiniStatement().then((res) => {
            setData(res.data);
        }).catch((e) => {
            enqueueSnackbar(e.message ? e.message : "Something Went Wrong", { variant: 'error' })
        }).finally(() => setLoading(false))
    },[])


    const getCreationDate = (createdAt) => {
        let _date = new Date(createdAt);
        let formatedDate = _date.getFullYear() + '-' + _date.getMonth() + '-' + _date.getDate();
        return `Date : ${formatedDate}`;
    }

    const getCreationTime = (createdAt) => {
        let _date = new Date(createdAt);
        let formatedTime = _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds();
        return ` Time : ${formatedTime}`;
    }

    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            p={{ xs: 1, md: 3 }}
        >
            {
                loading ?
                    (
                        <CircularProgress size={55} />
                    ) :
                <Box
                    borderRadius={'borderRadius'}
                    boxShadow={3}
                    width={{ xs: '95%', md: '80%' }}
                    p={{ xs: 1, md: 3 }}
                    bgcolor={'common.white'}
                >
                    {
                        data && data.map((item) => (
                            <Box
                                display={'flex'}
                                height={'110px'}
                                borderRadius={'borderRadius'}
                                boxShadow={3}
                                my={2}
                            >
                                <Box
                                    px={{ xs: 1, md: 3 }}
                                    display={'flex'}
                                    flexDirection={'column'}
                                    justifyContent={'space-evenly'}
                                    flex={1}
                                    height={'100%'}
                                >
                                    <Box display={'flex'}>
                                        <Typography variant={'caption'}>
                                            {
                                                getCreationDate(item.createdAt)
                                            }
                                        </Typography>
                                        <Typography variant={'caption'}>
                                            {
                                                getCreationTime(item.createdAt)
                                            }
                                        </Typography>
                                    </Box>
                                    {
                                        myAccount && myAccount.accountNumber === item.receiver.accountNumber ?
                                        <Typography variant={'body1'}>
                                            {`From ${item.user.name}`}
                                        </Typography> :
                                            <Typography variant={'body1'}>
                                                {`To ${item.receiver.name}`}
                                            </Typography>
                                    }
                                    <Box>
                                        <Typography variant={'caption'}>
                                            {`Transaction Id : ${item.transactionCode}`}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    height={'100%'}
                                    style={{ borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}
                                    display={'flex'}
                                    flexDirection={'column'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    bgcolor={myAccount.accountNumber === item.receiver.accountNumber ? 'secondary.main' : 'primary.main'}
                                    px={{ xs: 1, md: 3 }}
                                >
                                    <Typography variant={'h6'} color={'textSecondary'}>
                                        {'Amount'}
                                    </Typography>
                                    <Typography variant={'h6'} color={'textSecondary'}>
                                        {item.amount}
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            }
        </Box>
    )
}

export default Index

Index.title = 'Mini Statements'
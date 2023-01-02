import { Box, Button, CircularProgress, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useStore } from "laco-react";
import UserStore from "../../src/store/userStore";
import SelectedAccountStore from "../../src/store/selectedAccountStore";
import { useSnackbar } from "notistack";
import { createFundsTransfer } from "../../src/apis/fundsTranfer";
import { getParticularAccount } from "../../src/apis/accounts";

const Index = () => {

    const [myAccount, setMyAccount] = useState({});
    const [name, setName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [amount, setAmount] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useStore(UserStore);
    const [loading, setLoading] = useState(false);
    const { account } = useStore(SelectedAccountStore);

    useEffect(() => {
        getParticularAccount(account).then((res) => {
            setMyAccount(res);
        }).catch((e) => enqueueSnackbar(e.message ? e.message : "Something Went Wrong", { variant: 'error' }));
    }, [])

    const validate = () => {
        if (name.trim() === '') {
            enqueueSnackbar("Please Enter user's name.", { variant: 'warning' });
            return false;
        }
        else if (accountNumber.trim() === '') {
            enqueueSnackbar("Please Enter user's Account Number.", { variant: 'warning' });
            return false;
        }
        else if (ifsc.trim() === '') {
            enqueueSnackbar("Please Enter IFSC code.", { variant: 'warning' });
            return false;
        } else if (amount.trim() === '') {
            enqueueSnackbar("Please Enter amount", { variant: 'warning' });
            return false;
        } else {
            return true;
        }
    }

    const sendHandler = () => {
        if (validate()) {
            setLoading(true);
            createFundsTransfer(myAccount.data[0]._id, name, accountNumber, ifsc, amount)
                .then((res) => {
                    console.log(res);
                    enqueueSnackbar("Amount Sent Successfully", { variant: 'success' });
                    setName('');
                    setAccountNumber('');
                    setIfsc('');
                    setAmount('');
                }).catch((e) => enqueueSnackbar(e.message ? e.message : "Something Went Wrong", { variant: 'error' }))
                .finally(() => setLoading(false));
        }
    }

    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            p={{ xs: 1, md: 3 }}
        >
            <Box
                boxShadow={2}
                borderRadius={'borderRadius'}
                p={{ xs: 1, md: 3 }}
                width={'100%'}
                bgcolor={'common.white'}
                maxWidth={'500px'}
            >
                <Box width={'100%'} mb={'5px'}>
                    <Typography variant={'caption'}>
                        {'From'}
                    </Typography>
                </Box>
                <Box
                    borderRadius={'borderRadius'}
                    bgcolor={'#e5e5e5'}
                    px={'15px'}
                    py={'15px'}
                    display={'flex'}
                    justifyContent={'space-between'}
                    mb={2}
                >
                    <Typography variant={'subtitle1'}>
                        {'Account'}
                    </Typography>
                    <Typography variant={'subtitle1'}>
                        {account}
                    </Typography>
                </Box>
                <Box width={'100%'} mb={'5px'}>
                    <Typography variant={'caption'}>
                        {'To'}
                    </Typography>
                </Box>
                <Box my={1} />
                <Box width={'100%'} mb={'5px'}>
                    <Typography variant={'caption'}>
                        {'Account Holder'}
                    </Typography>
                </Box>
                <TextField
                    value={name}
                    onChange={event => setName(event.target.value)}
                    variant="outlined"
                    fullWidth
                    style={{ backgroundColor: '#ffffff' }}
                />
                <Box my={1} />
                <Box width={'100%'} mb={'5px'}>
                    <Typography variant={'caption'}>
                        {'Account Number'}
                    </Typography>
                </Box>
                <TextField
                    value={accountNumber}
                    onChange={event => setAccountNumber(event.target.value)}
                    variant="outlined"
                    fullWidth
                    style={{ backgroundColor: '#ffffff' }}
                    inputProps={{ maxLength: 15 }}
                />
                <Box my={1} />
                <Box width={'100%'} mb={'5px'}>
                    <Typography variant={'caption'}>
                        {'IFSC code'}
                    </Typography>
                </Box>
                <TextField
                    value={ifsc}
                    onChange={event => setIfsc(event.target.value)}
                    variant="outlined"
                    fullWidth
                    style={{ backgroundColor: '#ffffff' }}

                />
                <Box my={1} />
                <Box width={'100%'} mb={'5px'}>
                    <Typography variant={'caption'}>
                        {'Amount'}
                    </Typography>
                </Box>
                <TextField
                    value={amount}
                    onChange={event => setAmount(event.target.value)}
                    variant="outlined"
                    fullWidth
                    style={{ backgroundColor: '#ffffff' }}

                />
                <Box my={2} />

                <Button
                    variant={'contained'}
                    color={'primary'}
                    fullWidth
                    onClick={() => sendHandler()}
                >
                    {loading ? (
                        <CircularProgress size={15} />
                    ) : (
                        <Typography variant={'button'}>
                            {'Send'}
                        </Typography>
                    )}
                </Button>
            </Box>
        </Box>
    )
}

export default Index

Index.title = 'Funds Transfer';
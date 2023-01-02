import { Avatar, Box, Dialog, Typography, Chip, Button } from '@material-ui/core'
import { useStore } from 'laco-react'
import React, { useEffect, useState } from 'react'
import UserStore from '../../src/store/userStore';
import WelcomeImage from '../../public/Group86.svg';
import SelectedAccountStore from '../../src/store/selectedAccountStore';

const Index = () => {

    const { user } = useStore(UserStore);
    const { account } = useStore(SelectedAccountStore);

    const [accounts, setAccounts] = useState(user.accounts ? user.accounts : '');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const account1 = accounts[0]
    const account2 = accounts[1]
    const [selectedChip, setSelectedChip] = useState();
    const [accountToDisplay, setAccountToDisplay] = useState(account ? user.accounts.filter(item => item.accountNumber == account)[0] : null);

    console.log(account);
    console.log('to show', accountToDisplay);

    useEffect(() => {
        console.log(user);
        console.log("account 1 ", account1);
        console.log("account 2 ", account2);
        if (accounts.length === 1){
            setAccountToDisplay(account1);
        }
        if (!account) {
            setIsLoading(true);
            if (accounts.length > 1) {
                setOpen(true);
            } else {
                setIsLoading(false);
            }
        }
    }, [])

    const selectAccountHandler = (acc) => {
        setSelectedChip(acc);
    };

    const saveHandler = () => {
        console.log(typeof selectedChip);
        localStorage.setItem('selectedAccount', selectedChip);
        SelectedAccountStore.set(() => ({ account: selectedChip }), 'account');
		window.location.reload();
        setOpen(false);
    };

    return (
        <React.Fragment>
            {
                user && user.accounts && accountToDisplay ?
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        width={'100%'}
                        p={{ xs: 1, md: 3 }}
                    >
                        <Box
                            boxShadow={2}
                            width={{ xs: '95%', md: '75%' }}
                            borderRadius={'borderRadius'}
                            p={{ xs: 1, md: 2 }}
                            display={{ xs: 'block', md: 'flex' }}
                            justifyContent={'space-between'}
                            bgcolor={'common.white'}
                        >
                            <Box
                                width={{ xs: '100%', md: '48%' }}
                                borderRadius={'borderRadius'}
                                boxShadow={2}
                                display={'flex'}
                                flexDirection={'column'}
                                alignItems={'center'}
                                justifyContent={'space-around'}
                                p={2}
                            >
                                <Box
                                    borderRadius={'50%'}
                                    width={{ xs: '100px', md: '200px' }}
                                    height={{ xs: '100px', md: '200px' }}
                                    bgcolor={'#c1c1c1'}
                                    my={2}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                >
                                    <Avatar style={{ width: '100%', height: '100%' }} src={user.avatar}></Avatar>
                                </Box>
                                <Typography variant={'body1'} align={'center'}>
                                    {user.name}
                                </Typography>
                                <Box mb={2} />
                                <Typography variant={'body2'} align={'center'}>
                                    {user.address}
                                </Typography>
                                <Box mb={2} />
                                <Typography variant={'body2'} align={'center'}>
                                    {`Phone : ${user.phone}`}
                                </Typography>
                                <Box mb={2} />
                                <Typography variant={'body2'} align={'center'}>
                                    {`Email : ${user.email}`}
                                </Typography>
                                <Box mb={2} />
                                <Typography variant={'body2'} align={'center'}>
                                    {`DOB : ${user.dob}`}
                                </Typography>
                                <Box mb={2} />
                                <Typography variant={'body2'} align={'center'}>
                                    {`Gender : ${user.gender === 1 ? 'Male' : 'Female'}`}
                                </Typography>
                                <Box mb={2} />
                                <Typography variant={'body2'} align={'center'}>
                                    {`Adhaar no : ${user.aadhar}`}
                                </Typography>
                                <Box mb={2} />
                            </Box>
                            <Box
                                width={{ xs: '100%', md: '48%' }}
                                borderRadius={'borderRadius'}
                                boxShadow={2}
                                display={'flex'}
                                flexDirection={'column'}
                                alignItems={'center'}
                                justifyContent={'space-around'}
                                p={2}
                                mt={{ xs: 2, sm: 0 }}
                            >
                                <Box
                                    width={{ xs: '100%', md: '80%' }}
                                    display={'flex'}
                                    my={1}
                                    justifyContent={'space-between'}
                                >
                                    <Typography variant={'body1'}>
                                        {'Account Number'}
                                    </Typography>
                                    <Typography variant={'body2'}>
                                        {accountToDisplay.accountNumber}
                                    </Typography>
                                </Box>
                                <Box
                                    my={1}
                                    width={{ xs: '100%', md: '80%' }}
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography variant={'body1'}>
                                        {'Account Type'}
                                    </Typography>
                                    <Typography variant={'body2'}>
                                        {accountToDisplay.accountType === 1 ? 'Savings' : 'Current'}
                                    </Typography>
                                </Box>
                                <Box
                                    my={1}
                                    width={{ xs: '100%', md: '80%' }}
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography variant={'body1'}>
                                        {'Branch'}
                                    </Typography>
                                    <Typography variant={'body2'}>
                                        {accountToDisplay.branch}
                                    </Typography>
                                </Box>
                                <Box
                                    my={1}
                                    width={{ xs: '100%', md: '80%' }}
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography variant={'body1'}>
                                        {'IFSC'}
                                    </Typography>
                                    <Typography variant={'body2'}>
                                        {accountToDisplay.ifsc}
                                    </Typography>
                                </Box>
                                <Box
                                    my={1}
                                    width={{ xs: '100%', md: '80%' }}
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography variant={'body1'}>
                                        {'Nominee'}
                                    </Typography>
                                    <Typography variant={'body2'}>
                                        {accountToDisplay.nomineeName}
                                    </Typography>
                                </Box>
                                <Box
                                    my={1}
                                    width={{ xs: '100%', md: '80%' }}
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography variant={'body1'}>
                                        {'Balance'}
                                    </Typography>
                                    <Typography variant={'body2'}>
                                        {accountToDisplay.balance}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box >
                    : null
            }
            <Dialog open={open} fullScreen>
                <Box
                    width={'100%'}
                    height={'100%'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        maxWidth={'500px'}
                    >
                        <img src={WelcomeImage} width={'80%'} />
                        <Box my={4} />
                        <Box
                            width={'80%'}
                        >
                            <Typography variant={'body2'}>
                                {`Hi, `}<span><strong>{user.name}</strong></span>
                                <br />
                                {`You have ${accounts.length} accounts in our bank.`}
                                {' Please select one account to continue...'}
                            </Typography>
                        </Box>
                        <Box
                            width={'80%'}
                            display={{ xs: 'block', sm: 'flex', }}
                            justifyContent={'space-around'}
                            my={3}
                        >
                            {
                                accounts.map(item => (
                                    <Chip
                                        color={'primary'}
                                        onClick={() => selectAccountHandler(item.accountNumber)}
                                        style={{ padding: '5px', height: '50px' }}
                                        label={
                                            <Typography variant={'caption'}>
                                                {item.accountType === 1 ? 'Savings' : 'Current'}
                                                <br />
                                                {`xxxx xxxx xxxx ${item.accountNumber.slice(11)}`}
                                            </Typography>
                                        }
                                    />
                                ))
                            }
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} my={3}>
                            <Button color={'primary'} variant={'contained'} disabled={!selectedChip}
                                onClick={() => saveHandler()}>
                                {'Save & Continue'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
    )
}

export default Index

Index.title = 'Account Details';
import {Box, Button, Dialog, TextField, Typography} from '@material-ui/core'
import React, {useState} from 'react'
import {useSnackbar} from "notistack";
import Done from '../../public/mail.svg';

const Index = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [open, setOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const saveHandler = () => {
        if(name.trim() === ''){
            enqueueSnackbar('Please Enter Name', { variant: 'warning' });
            return false;
        }else if(email.trim() === ''){
            enqueueSnackbar('Please Enter Email', { variant: 'warning' });
            return false;
        }else if(phone.trim() === ''){
            enqueueSnackbar('Please Enter Phone', { variant: 'warning' });
            return false;
        } else {
            setOpen(true);
            setName('');
            setEmail('');
            setPhone('');
        }
    }

    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            // height={'100vh'}
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
                <Box width={'100%'} mb={'15px'}>
                    <Typography align={'center'} color={'primary'} variant={'h6'}>
                        {'Update Profile'}
                    </Typography>
                </Box>
                <Box width={'100%'} mb={'5px'}>
                    <Typography variant={'caption'}>
                        {'Name'}
                    </Typography>
                </Box>
                <TextField
                    // label={'Email'}
                    value={name}
                    onChange={event => setName(event.target.value)}
                    variant="outlined"
                    fullWidth
                    style={{ backgroundColor: '#ffffff' }}

                />
                <Box my={1} />
                <Box width={'100%'} mb={'5px'}>
                    <Typography variant={'caption'}>
                        {'Email'}
                    </Typography>
                </Box>
                <TextField
                    // label={'Email'}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    variant="outlined"
                    fullWidth
                    style={{ backgroundColor: '#ffffff' }}

                />
                <Box my={1} />
                <Box width={'100%'} mb={'5px'}>
                    <Typography variant={'caption'}>
                        {'Phone'}
                    </Typography>
                </Box>
                <TextField
                    // label={'Email'}
                    value={phone}
                    onChange={event => setPhone(event.target.value)}
                    variant="outlined"
                    fullWidth
                    style={{ backgroundColor: '#ffffff' }}

                />
                <Box my={2} />
                <Button
                    variant={'contained'}
                    color={'primary'}
                    fullWidth
                    onClick={() => saveHandler()}
                >
                    {'Update'}
                </Button>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Box
                    p={2}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                >
                    <img src={Done}  alt={'Done'} width={'300px'} />
                    <Box my={2}></Box>
                    <Typography
                        variant={'h3'}
                        color={'primary'}
                    >
                        {'Your request has been recorded.'}
                    </Typography>
                    <Typography
                        variant={'body2'}
                        color={'primary'}
                        align={'center'}
                    >
                        {'We will get back to you within 48 working hours.'}
                    </Typography>
                </Box>
            </Dialog>
        </Box>
    )
}

export default Index

Index.title = 'Update Profile'

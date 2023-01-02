
import React, {useEffect, useState} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import {FormControl, MenuItem, Select} from "@material-ui/core";
import {getAllUsers} from "../../../apis/users";
import {useSnackbar} from "notistack";
import {Autocomplete} from "@material-ui/lab";

const CreateUser = ({show, dismiss, creating, saveClick, accountType, setAccountType, ifsc, setIfsc, branch, setBranch, nomineeName, setNomineeName, balance, setBalance, setUser}) => {

    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        getAllUsers(0, 10, search ? search : '').then(res => setAllUsers(res.data))
            .catch((e) => {
                enqueueSnackbar(e.message ? e.message : 'Something went wrong', {variant: 'error'})
            }).finally(() => {
            setLoading(false);
        })
    },[])

    return (
        <React.Fragment>
            <Dialog fullWidth maxWidth={'xs'} onClose={dismiss} open={show}>
                <DialogTitle>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant={'h6'}>
                            {'Create New Account'}
                        </Typography>
                        <IconButton onClick={dismiss}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box pb={2} display={'flex'} flexDirection={'column'}>
                        <Box width={'100%'} mb={'5px'}>
                            <Typography variant={'caption'}>
                                {'User'}
                            </Typography>
                        </Box>
                        {/*<Autocomplete*/}
                        {/*    options={allUsers}*/}
                        {/*    getOptionLabel={(option) => option.name}*/}
                        {/*    fullWidth*/}
                        {/*    renderInput={(params) => <TextField {...params} variant="outlined" />}*/}
                        {/*/>*/}
                        <Autocomplete
                            options={allUsers}
                            getOptionLabel={(option) => (option && option.name ? option.name : '')}
                            fullWidth
                            onChange={(event, newValue) => {
                                setUser(newValue);
                            }}
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    variant="outlined"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <Box mb={2} />
                        <Box width={'100%'} mb={'5px'}>
                            <Typography variant={'caption'}>
                                {'Account Type'}
                            </Typography>
                        </Box>
                        {/*<TextField*/}
                        {/*    value={accountType}*/}
                        {/*    onChange={(e) => setAccountType(e.target.value)}*/}
                        {/*    variant={'outlined'}*/}
                        {/*    type={'number'}*/}
                        {/*/>*/}
                        <FormControl variant="outlined">
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={accountType}
                                onChange={(e) => setAccountType(e.target.value) }
                            >
                                <MenuItem value={1}>{'Savings'}</MenuItem>
                                <MenuItem value={2}>{'Current'}</MenuItem>
                            </Select>
                        </FormControl>
                        <Box mb={2} />
                        <Box width={'100%'} mb={'5px'}>
                            <Typography variant={'caption'}>
                                {'Ifsc Code'}
                            </Typography>
                        </Box>
                        <TextField
                            value={ifsc}
                            onChange={(e) => setIfsc(e.target.value)}
                            variant={'outlined'}
                        />
                        <Box mb={2} />
                        <Box width={'100%'} mb={'5px'}>
                            <Typography variant={'caption'}>
                                {'Branch'}
                            </Typography>
                        </Box>
                        <TextField
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            variant={'outlined'}
                        />
                        <Box mb={2} />
                        <Box width={'100%'} mb={'5px'}>
                            <Typography variant={'caption'}>
                                {'Nominee Name'}
                            </Typography>
                        </Box>
                        <TextField
                            value={nomineeName}
                            onChange={(e) => setNomineeName(e.target.value)}
                            variant={'outlined'}
                        />
                        <Box mb={2} />
                        <Box width={'100%'} mb={'5px'}>
                            <Typography variant={'caption'}>
                                {'Balance'}
                            </Typography>
                        </Box>
                        <TextField
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                            variant={'outlined'}
                        />
                        <Box mb={2} />
                        <Button
                            disabled={creating}
                            variant={'contained'}
                            color={'primary'}
                            size={'large'}
                            onClick={saveClick}
                        >
                            {creating ? (
                                <CircularProgress size={15} />
                            ) : (
                                <Typography variant={'button'}>
                                    {'Create'}
                                </Typography>
                            )}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default CreateUser;

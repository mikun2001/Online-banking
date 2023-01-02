import React, {useState} from 'react';
import {useSnackbar} from "notistack";
import {
    Avatar,
    Box,
    Button, CircularProgress, Dialog, DialogContent, DialogTitle,
    Fade,
    IconButton,
    Menu,
    MenuItem,
    TableCell,
    TableRow,
    Typography
} from "@material-ui/core";
import {MoreHoriz} from "@material-ui/icons";
import {withStyles} from "@material-ui/styles";
import ConfirmDialog from "../confirm/ConfirmDialog";
import {DeleteUser, editUser} from "../../apis/users";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CropperDialog from "../cropper/CropperDialog";
import {uploadFile} from "../../apis/upload";


const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const UserRow = ({ each, i, pageLimit, page, deleteCallback, editCallback }) => {

    const { enqueueSnackbar } = useSnackbar();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [name, setName] = useState(each.name ? each.name : '');
    const [email, setEmail] = useState(each.email ? each.email : '');
    const [phone, setPhone] = useState(each.phone ? each.phone : '');
    const [address, setAddress] = useState(each.phone ? each.address : '');
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(each.avatar && each.avatar);
    const [editing, setEditing] = useState(false);
    const [imageFile, setImageFile] = useState(each.avatar);
    const [src, setSrc] = useState();
    const [edited, setEdited] = useState(false);

    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };


    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const deleteHandler = () => {
        DeleteUser(each._id)
            .then((res) => {
                deleteCallback(res);
                enqueueSnackbar('User removed successfully.', { variant: 'success' });
            }).catch((e) => {
            enqueueSnackbar(e.message ? e.message : "Can't Delete", { variant: 'error' });
        })
    }

    const validate = () => {
        if (!imageFile) {
            enqueueSnackbar('Please select an image.', { variant: 'warning' });
            return false;
        } else if (name.trim() === ''){
            enqueueSnackbar("Please Enter user's name.", { variant: 'warning' });
            return false;
        }
        else if (email.trim() === ''){
            enqueueSnackbar("Please Enter user's email.", { variant: 'warning' });
            return false;
        }
        else if (phone.trim() === ''){
            enqueueSnackbar("Please Enter user's phone number.", { variant: 'warning' });
            return false;
        }
        else if (address.trim() === ''){
            enqueueSnackbar("Please Enter user's address.", { variant: 'warning' });
            return false;
        } else {
            return true
        }
    }

    const handleEdit = async () => {
        console.log('log called');
        console.log('image file --edited--', imageFile)
        if (validate()){
            setEditing(true);
            let _logo = image;
            if (edited) {
                await uploadFile(imageFile).then((response) => {
                    console.log(response);
                    _logo = response.files ? response.files[0] : response.file;
                }).catch(e => console.log('uploading error ----> ', e.message));
            }
            console.log(each._id, _logo, name, email, phone, address)
            await editUser(each._id, _logo, name, email, phone, address)
                .then((res) => {
                    editCallback(res, i);
                    console.log(_logo);
                    enqueueSnackbar('User edited successfully', { variant: 'success' });
                })
                .catch((e) => enqueueSnackbar(e.message ? e.message : "Can't Edit, Something Went Wrong", { variant: 'error' }))
                .finally(() => {
                    setEditing(false);
                    setOpenEdit(false);
                });
        }
    }

    return (
        <>
            <StyledTableRow key={i}>
                <TableCell align="center">{pageLimit * (page - 1) + (i + 1)}</TableCell>
                <TableCell align={'center'}>
                    {each && each.avatar ? (
                        <Avatar src={each.avatar} alt={each.name && each.name.charAt(0)} />
                    ) : (
                        <Avatar component={Box} display={'flex'} alignItems={'center'}>
                            {each.name && each.name.charAt(0).toUpperCase()}
                        </Avatar>
                    )}
                </TableCell>
                <TableCell align="center">{each.name ? each.name : 'N/A'}</TableCell>
                <TableCell align="center">{each.email ? each.email : 'N/A'}</TableCell>
                <TableCell align="center">{each.phone ? each.phone : 'N/A'}</TableCell>
                <TableCell align="center">{each.customerId ? each.customerId : 'N/A'}</TableCell>
                <TableCell align="right">
                    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                        <MoreHoriz />
                    </Button>
                </TableCell>
            </StyledTableRow>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <Box p={1}>
                    <MenuItem
                        component={Box}
                        display={'flex'}
                        justifyContent={'center'}
                        onClick={() => {
                            setOpenEdit(true);
                            setAnchorEl(null);
                        }}
                    >
                        <Typography align={'center'} component={Box} px={3}>
                            {'Edit'}
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        component={Box}
                        display={'flex'}
                        justifyContent={'center'}
                        onClick={() => {
                            setOpenDelete(true);
                            setAnchorEl(null);
                        }}
                    >
                        <Typography align={'center'} component={Box} px={3}>
                            {'Delete'}
                        </Typography>
                    </MenuItem>
                </Box>
            </Menu>

            <Dialog fullWidth maxWidth={'xs'} open={openEdit} onClose={() => setOpenEdit(false)}>
                <DialogTitle>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant={'h3'}>
                            {'Edit'}
                        </Typography>
                        <IconButton onClick={() => setOpenEdit(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box my={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Box
                            width={{ xs: 200, sm: 300 }}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'flex-end'}
                            position={'relative'}
                        >
                            <Avatar
                                style={{ width: '100%', height: '100%' }}
                                src={image}
                                alt={each.name.charAt(0)}
                                variant={'square'}
                            />
                            <Box
                                position={'absolute'}
                                bottom={10}
                                right={10}
                                onClick={() => setShow(true)}
                                bgcolor={'common.white'}
                                borderRadius={'50%'}
                                p={1}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'flex-end'}
                            >
                                <AddAPhotoIcon />
                            </Box>
                        </Box>
                    </Box>
                    <Box pb={1} display={'flex'} flexDirection={'column'}>
                        <Box width={'100%'} mb={'5px'}>
                            <Typography variant={'caption'}>
                                {'Name'}
                            </Typography>
                        </Box>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant={'outlined'}
                            color={'primary'}
                        />
                        <Box mb={2} />
                        <Box width={'100%'} mb={'5px'}>
                            <Typography variant={'caption'}>
                                {'Email'}
                            </Typography>
                        </Box>
                        <TextField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant={'outlined'}
                        />
                        <Box mb={2} />
                        <Box width={'100%'} mb={'5px'}>
                            <Typography variant={'caption'}>
                                {'Phone'}
                            </Typography>
                        </Box>
                        <TextField
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            variant={'outlined'}
                        />
                        <Box mb={2} />
                        <Box width={'100%'} mb={'5px'}>
                            <Typography variant={'caption'}>
                                {'Address'}
                            </Typography>
                        </Box>
                        <TextField
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            variant={'outlined'}
                        />
                        <Box mb={2} />
                        <Button
                            onClick={() => handleEdit()}
                            disabled={editing}
                            variant={'contained'}
                            color={'primary'}
                            size={'large'}
                        >
                            {editing ? (
                                <CircularProgress size={15} />
                            ) : (
                                <Typography variant={'button'}>
                                    {'Done'}
                                </Typography>
                            )}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <CropperDialog
                show={show}
                onSelected={(s) => {
                    setSrc(s);
                }}
                src={src}
                cancel={() => {
                    setShow(false);
                    setSrc(null);
                }}
                aspectRatio={1}
                onCropped={(data) => {
                    setShow(false);
                    setImage(data);
                    setImageFile(dataURLtoFile(data, 'imageToUpload.png'));
                }}
                dismiss={() => {
                    setShow(false);
                }}
                setEdited={setEdited}
            />

            <ConfirmDialog
                show={openDelete}
                dismiss={() => setOpenDelete(false)}
                title={'Are You Sure To Delete'}
                confirmation={'Sure'}
                content={`Delete ${each.name}`}
                cancel={() => setOpenDelete(false)}
                proceed={() => deleteHandler()}
                okLabel={'ok'}
                cancelLabel={'cancel'}
            />
        </>
    );
}

export default UserRow;
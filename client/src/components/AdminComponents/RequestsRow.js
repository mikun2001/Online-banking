import React, {useState} from 'react';
import {useSnackbar} from "notistack";
import {Box, IconButton, TableCell, TableRow, Typography} from "@material-ui/core";
import {Check, Clear, Delete} from "@material-ui/icons";
import {withStyles} from "@material-ui/styles";
import ConfirmDialog from "../confirm/ConfirmDialog";
import {deleteRequest} from "../../apis/requestChequebook";

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const RequestsRow = ({ each, i, pageLimit, page, editCallback }) => {

    const { enqueueSnackbar } = useSnackbar();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);

    console.log(each)

    const deleteHandler = () => {
        deleteRequest(each._id, 3, 'Sorry we cant issue you a chequebook.')
            .then((res) => {
                editCallback(res);
                enqueueSnackbar('Request rejected successfully.', { variant: 'success' });
            }).catch((e) => {
            enqueueSnackbar(e.message ? e.message : "Can't Delete", { variant: 'error' });
        })
    }

    const AprroveHandler = () => {
        deleteRequest(each._id, 2)
            .then((res) => {
                editCallback(res, i);
                enqueueSnackbar('Request Approved successfully.', { variant: 'success' });
            }).catch((e) => {
            enqueueSnackbar(e.message ? e.message : "Can't Approve", { variant: 'error' });
        })
    }

    // const backColor = () => {
    //
    // }

    return (
        <>
            <StyledTableRow key={i}>
                <TableCell align="center">{pageLimit * (page - 1) + (i + 1)}</TableCell>
                <TableCell align="center">{each.account.accountNumber ? each.account.accountNumber : 'N/A'}</TableCell>
                <TableCell align="center">{each.user.name ? each.user.name : 'N/A'}</TableCell>
                <TableCell align="center">{each && each.account.accountType === 1 ? 'Savings' : 'Current'}</TableCell>
                <TableCell align="center">{each.account.balance ? each.account.balance : 'N/A'}</TableCell>
                    {
                        each.status === 2 ?
                            <TableCell style={{backgroundColor: '#35DD8B'}} align={'center'}>
                            <Box
                                width={'100%'}
                                height={'100%'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <Typography color={'textSecondary'}>{'Approved'}</Typography>
                            </Box>
                            </TableCell> : each.status === 3 ?
                            <TableCell style={{backgroundColor: '#ff0000'}}   align={'center'}>
                            <Box
                                width={'100%'}
                                height={'100%'}
                                bgcolor={'error'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <Typography color={'textSecondary'}>{'Rejected'}</Typography>
                            </Box>
                            </TableCell> :
                            <TableCell align={'center'}>
                            <Box>
                                <IconButton
                                    onClick={() => {
                                        AprroveHandler();
                                        setAnchorEl(null);
                                    }}
                                >
                                    <Check color={'secondary'} />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        setOpenDelete(true);
                                        setAnchorEl(null);
                                    }}
                                >
                                    <Clear />
                                </IconButton>
                            </Box>
                            </TableCell>
                    }
            </StyledTableRow>
            <ConfirmDialog
                show={openDelete}
                dismiss={() => setOpenDelete(false)}
                title={'Are You Sure To Delete'}
                confirmation={'Sure'}
                content={`Delete ${each.accountNumber} account.`}
                cancel={() => setOpenDelete(false)}
                proceed={() => deleteHandler()}
                okLabel={'ok'}
                cancelLabel={'cancel'}
            />

        </>
    );
};

export default RequestsRow;
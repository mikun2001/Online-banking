import React, {useState} from 'react';
import {useSnackbar} from "notistack";
import { IconButton, TableCell, TableRow} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {withStyles} from "@material-ui/styles";
import ConfirmDialog from "../confirm/ConfirmDialog";
import {deleteAccount} from "../../apis/accounts";

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const AccountRow = ({ each, i, pageLimit, page, deleteCallback }) => {

    const { enqueueSnackbar } = useSnackbar();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);

    const deleteHandler = () => {
        deleteAccount(each._id)
            .then((res) => {
                deleteCallback(res);
                enqueueSnackbar('Account removed successfully.', { variant: 'success' });
            }).catch((e) => {
            enqueueSnackbar(e.message ? e.message : "Can't Delete", { variant: 'error' });
        })
    }

    return (
        <>
            <StyledTableRow key={i}>
                <TableCell align="center">{pageLimit * (page - 1) + (i + 1)}</TableCell>
                <TableCell align="center">{each.accountNumber ? each.accountNumber : 'N/A'}</TableCell>
                <TableCell align="center">{each.user.name ? each.user.name : 'N/A'}</TableCell>
                <TableCell align="center">{each && each.accountType === 1 ? 'Savings' : 'Current'}</TableCell>
                <TableCell align="center">{each.balance ? each.balance : 'N/A'}</TableCell>
                <TableCell align="center">{each.branch ? each.branch : 'N/A'}</TableCell>
                <TableCell align={'center'}>
                    <IconButton
                        onClick={() => {
                            setOpenDelete(true);
                            setAnchorEl(null);
                        }}
                    >
                        <Delete />
                    </IconButton>
                </TableCell>
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

export default AccountRow;
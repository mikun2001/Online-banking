import React from 'react';
import { TableCell, TableRow} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const TransactionRow = ({ each, i, pageLimit, page }) => {

    return (
        <>
            <StyledTableRow key={i}>
                <TableCell align="center">{pageLimit * (page - 1) + (i + 1)}</TableCell>
                <TableCell align="center">{each.user.name ? each.user.name : 'N/A'}</TableCell>
                <TableCell align="center">{each.receiver.name ? each.receiver.name : 'N/A'}</TableCell>
                <TableCell align="center">{each.amount ? each.amount : 'N/A'}</TableCell>
                <TableCell align="center">{each.transactionCode ? each.transactionCode : 'N/A'}</TableCell>
            </StyledTableRow>
        </>
    );
};

export default TransactionRow;
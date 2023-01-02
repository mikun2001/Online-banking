import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import TransactionTable from "../../src/components/AdminComponents/TransactionTable";

const Transactions = () => {
    return (
        <>
            <Box
                py={2}
            >
                <Typography variant={'h3'}>{'All Transactions'}</Typography>

                <TransactionTable>

                </TransactionTable>
            </Box>
        </>
    );
};

export default Transactions;
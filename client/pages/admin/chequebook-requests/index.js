import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {
    Box,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import {getAllRequests} from "../../../src/apis/requestChequebook";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/styles";
import RequestsRow from "../../../src/components/AdminComponents/RequestsRow";

const useStyles = makeStyles((theme) => ({
    table: {
        [theme.breakpoints.down('xs')]: {
            maxWidth: '300px',
        },
    },
}));


const Index = () => {

    const classes = useStyles();

    const [total, setTotal] = useState(0);
    const [pageLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [pageRows, setPageRows] = useState([]);
    const [allData, setAllData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        setLoading(true);
        getAllRequests(0, pageLimit)
            .then((res) => {
                setTotal(res.total);
                setAllData(res.data);
                setPageRows(res.data);
                if (res.total % pageLimit === 0) {
                    setTotalPages(res.total / pageLimit);
                } else {
                    setTotalPages(Math.floor(res.total / pageLimit) + 1);
                }
            })
            .catch((e) => enqueueSnackbar(e.message ? e.message: 'Something Went Wrong', { variant: 'warning' }))
            .finally(() => {
                setLoading(false);
            });
    },[]);

    const handleChange = (event, value) => {
        setPage(value);
        if (value * pageLimit > allData.length) {
            setPageRows([]);
            if (allData.length === total) {
                let _allData = allData;
                setPageRows(_allData.slice((value - 1) * pageLimit, total));
            } else {
                loadData((value - 1) * pageLimit);
            }
        } else {
            let _allData = allData;
            setPageRows([]);
            setPageRows(_allData.slice((value - 1) * pageLimit, value * pageLimit));
        }
    };

    const loadData = (skip) => {
        setLoading(true);
        getAllRequests(skip, pageLimit)
            .then((response) => {
                if (response.data) {
                    setPageRows(response.data);
                    let _allData = allData;
                    let currentDAta = response.data;
                    _allData = [..._allData, ...currentDAta];
                    setAllData(_allData);
                }
            })
            .catch((e) => enqueueSnackbar(e.message ? e.message: 'Something Went Wrong', { variant: 'warning' }))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <Box
                py={2}
            >
                <Typography variant={'h3'}>{'Requests For Chequebooks'}</Typography>
                <Box width={'100%'} display={'flex'} justifyContent={'center'} className={classes.table} my={3}>
                    <TableContainer component={Box} borderRadius={'borderRadius'} bgcolor={'common.white'}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell component={Box} width={'100px'} align="center">
                                        <strong>{'Sl No.'}</strong>
                                    </TableCell>
                                    <TableCell align="center">
                                        <strong>{'Account Number'}</strong>
                                    </TableCell>
                                    <TableCell align="center">
                                        <strong>{'Account Holder'}</strong>
                                    </TableCell>
                                    <TableCell align="center">
                                        <strong>{'Account Type'}</strong>
                                    </TableCell>
                                    <TableCell align="center">
                                        <strong>{'Balance'}</strong>
                                    </TableCell>
                                    <TableCell align="center" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pageRows.length > 0 ? (
                                    pageRows.map((each, i) => (
                                        <RequestsRow
                                            key={each._id}
                                            each={each}
                                            i={i}
                                            pageLimit={pageLimit}
                                            page={page}
                                            editCallback={(editedElement, objIndex) => {
                                                let _pageRows = pageRows;
                                                _pageRows[objIndex].status = editedElement.status;
                                                setPageRows(_pageRows);
                                            }}
                                            deleteCallback={(elementToDelete) => {
                                                setPageRows(pageRows.filter((each) => each._id !== elementToDelete._id));
                                            }}
                                        />
                                    ))
                                ) : !loading ? (
                                    <TableRow>
                                        <TableCell align="center" colSpan={5}>
                                            {'No Account Available'}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell align="center" colSpan={5}>
                                            <CircularProgress size={27} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Box m={3} display="flex" justifyContent="flex-end">
                            <Pagination
                                count={totalPages}
                                color="secondary"
                                page={page}
                                shape="rounded"
                                onChange={handleChange}
                                size="small"
                            />
                        </Box>
                    </TableContainer>
                </Box>
            </Box>

        </>
    );
};

export default Index;
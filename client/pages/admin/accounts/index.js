import React, {useEffect, useState} from 'react';
import PageHeaderComponent from "../../../src/components/AdminComponents/PageHeaderComponent";
import {createAccount, getAllAccounts} from "../../../src/apis/accounts";
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
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/styles";
import AccountRow from "../../../src/components/AdminComponents/AccountRow";
import {Pagination} from "@material-ui/lab";
import CreateAccountDialog from "../../../src/components/AdminComponents/CreateAcount/CreateAccountDialog";

const useStyles = makeStyles((theme) => ({
    table: {
        [theme.breakpoints.down('xs')]: {
            maxWidth: '300px',
        },
    },
}));


const Index = () => {

    const classes = useStyles();

    const [search, setSearch] = useState();
    const [openCreate, setOpenCreate] = useState();
    const [selected, setSelected] = useState();
    const [total, setTotal] = useState(0);
    const [pageLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [pageRows, setPageRows] = useState([]);
    const [allData, setAllData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [accountType, setAccountType] = useState(0);
    const [ifsc, setIfsc] = useState('');
    const [branch, setBranch] = useState('');
    const [nomineeName, setNomineeName] = useState('');
    const [balance, setBalance] = useState('');
    const [user, setUser] = useState({});
    const [creating, setCreating] = useState('');

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        setOpenCreate(false);
        setUser({});
        setAccountType(0);
        setBranch('');
        setIfsc('');
        setNomineeName('');
        setBalance('');
    };

    useEffect(() => {
        setLoading(true);
        getAllAccounts(0, pageLimit, search ? search : '')
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
    },[search]);

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
        getAllAccounts(skip, pageLimit, search ? search : '')
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

    const  validate = () => {
        if (!user) {
            enqueueSnackbar('Please select user.', { variant: 'warning' });
            return false;
        } else if (!accountType){
            enqueueSnackbar("Please select account type.", { variant: 'warning' });
            return false;
        }
        else if (ifsc.trim() === ''){
            enqueueSnackbar("Please Enter Ifsc code.", { variant: 'warning' });
            return false;
        }
        else if (branch.trim() === ''){
            enqueueSnackbar("Please Enter branch.", { variant: 'warning' });
            return false;
        }
        else if (nomineeName.trim() === ''){
            enqueueSnackbar("Please Enter nominee name", { variant: 'warning' });
            return false;
        }
        else if (balance.trim() === ''){
            enqueueSnackbar("Please Enter available balance.", { variant: 'warning' });
            return false;
        } else {
            return true;
        }
    }

    const saveHandler = () => {
        console.log('---****----', user);
        if(validate){
            setCreating(true);
            createAccount(user._id, accountType, ifsc, branch,  nomineeName, balance)
                .then((res) => {
                    let _rows = pageRows;
                    _rows.push(res);
                    setPageRows(_rows);
                    setUser({});
                    setAccountType(0);
                    setIfsc('');
                    setBranch('');
                    setNomineeName('');
                    setBalance('');
                    enqueueSnackbar('Account Created Successfully', {variant: 'success'});
                })
                .catch((e) => enqueueSnackbar(e.message ? e.message: 'Something Went Wrong', { variant: 'warning' }))
                .finally(() => {
                    setCreating(false);
                    setOpenCreate(false);
                });
        }
    }

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <PageHeaderComponent
                title={'All Accounts'}
                addButtonText={'Create Account'}
                value={search}
                setSearch={setSearch}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPageRows([]);
                }}
                setOpenCreate={setOpenCreate}
                selected={selected}
                setSelected={setSelected}
            />
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
                                <TableCell align="center">
                                    <strong>{'Branch'}</strong>
                                </TableCell>
                                {/*<TableCell align="center" />*/}
                                <TableCell align="center" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pageRows.length > 0 ? (
                                pageRows.map((each, i) => (
                                    <AccountRow
                                        key={each._id}
                                        each={each}
                                        i={i}
                                        pageLimit={pageLimit}
                                        page={page}
                                        editCallback={(editedElement, objIndex) => {
                                            let _pageRows = pageRows;
                                            _pageRows[objIndex].name = editedElement.name;
                                            _pageRows[objIndex].shortName = editedElement.shortName;
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
            <CreateAccountDialog
                show={openCreate}
                dismiss={handleClose}
                accountType={accountType}
                ifsc={ifsc}
                branch={branch}
                nomineeName={nomineeName}
                balance={balance}
                setUser={setUser}
                setAccountType={setAccountType}
                setIfsc={setIfsc}
                setBranch={setBranch}
                setNomineeName={setNomineeName}
                setBalance={setBalance}
                saveClick={saveHandler}
                creating={creating}
            />
        </Box>
    );
}

export default Index;

// Index.Layout = null;
Index.title = 'All Accounts'
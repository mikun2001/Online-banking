import React, { useEffect, useState } from 'react';
import PageHeaderComponent from "../../../src/components/AdminComponents/PageHeaderComponent";
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
import { useSnackbar } from "notistack";
import { makeStyles, withStyles } from "@material-ui/styles";
import { getAllUsers, CreateUser } from "../../../src/apis/users";
import UserRow from "../../../src/components/AdminComponents/UserRow";
import { Pagination } from "@material-ui/lab";
import { uploadFile } from "../../../src/apis/upload";
import CreateUserDialog from '../../../src/components/AdminComponents/CreateUser/CreateUser';

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
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [src, setSrc] = useState();
    const [creating, setCreating] = useState(false);
    const [value, setValue] = useState('');
    const [shortName, setShortName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState(new Date().toISOString().slice(0, 10));
    const [aadhar, setAdhaar] = useState('');
    const [gender, setGender] = useState(1);
    const [password, setPassword] = useState('');

    const { enqueueSnackbar } = useSnackbar();

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

    useEffect(() => {
        setLoading(true);
        getAllUsers(0, pageLimit, search ? search : '')
            .then((res) => {
                setTotal(res.total);
                setAllData(res.data);
                console.log(res.data);
                setPageRows(res.data);
                if (res.total % pageLimit === 0) {
                    setTotalPages(res.total / pageLimit);
                } else {
                    setTotalPages(Math.floor(res.total / pageLimit) + 1);
                }
            })
            .catch((e) => enqueueSnackbar(e.message ? e.message : 'Something Went Wrong', { variant: 'warning' }))
            .finally(() => {
                setLoading(false);
            });
    }, [search]);

    const validate = () => {
        if (!imageFile) {
            enqueueSnackbar('Please select an image.', { variant: 'warning' });
            return false;
        } else if (name.trim() === '') {
            enqueueSnackbar("Please Enter user's name.", { variant: 'warning' });
            return false;
        }
        else if (email.trim() === '') {
            enqueueSnackbar("Please Enter user's email.", { variant: 'warning' });
            return false;
        }
        else if (phone.trim() === '') {
            enqueueSnackbar("Please Enter user's phone number.", { variant: 'warning' });
            return false;
        }
        // else if (phone.trim() === '') {
        //     enqueueSnackbar("Please Enter user's phone number.", { variant: 'warning' });
        //     return false;
        // }
        else if (address.trim() === '') {
            enqueueSnackbar("Please Enter user's address.", { variant: 'warning' });
            return false;
        }
        else if (dob.trim() === '') {
            enqueueSnackbar("Please Enter user's Date of birth.", { variant: 'warning' });
            return false;
        }
        else if (aadhar.trim() === '') {
            enqueueSnackbar("Please Enter user's aadhar number.", { variant: 'warning' });
            return false;
        }
        else if (!gender) {
            enqueueSnackbar("Please select user's gender.", { variant: 'warning' });
            return false;
        }
        else if (password.trim() === '') {
            enqueueSnackbar("Please Enter password to be assigned to the user.", { variant: 'warning' });
            return false;
        } else {
            return true;
        }
    }


    const handleCreate = async () => {
        if (validate()) {
            setCreating(true);
            await uploadFile(imageFile).then((response) => {
                console.log(response);
                CreateUser(name, phone, email, dob, address, aadhar, response.files[0], gender, password)
                    .then((res) => {
                        let _rows = pageRows;
                        _rows.push(res);
                        setPageRows(_rows);
                        setName('');
                        setPhone('');
                        setEmail('');
                        setAddress('');
                        setAdhaar('');
                        setGender(1);
                        setDob('');
                        setPassword('');
                        enqueueSnackbar('User Created Successfully', { variant: 'success' });
                    })
                    .catch((e) => enqueueSnackbar(e.message ? e.message : 'Something Went Wrong', { variant: 'warning' }))
                    .finally(() => {
                        setCreating(false);
                        setOpenCreate(false);
                    });
            });
        }
    };

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
        getAllUsers(skip, pageLimit, search ? search : '')
            .then((response) => {
                if (response.data) {
                    setPageRows(response.data);
                    let _allData = allData;
                    let currentDAta = response.data;
                    _allData = [..._allData, ...currentDAta];
                    setAllData(_allData);
                }
            })
            .catch((e) => enqueueSnackbar(e.message ? e.message : 'Something Went Wrong', { variant: 'warning' }))
            .finally(() => setLoading(false));
    };

    const handleClose = () => {
        setOpenCreate(false);
        setValue('');
        setShortName('');
        setSrc(null);
        setImage(null);
    };

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <PageHeaderComponent
                title={'All Users'}
                addButtonText={'Create User'}
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
                                    <strong>{'Avatar'}</strong>
                                </TableCell>
                                <TableCell align="center">
                                    <strong>{'Name'}</strong>
                                </TableCell>
                                <TableCell align="center">
                                    <strong>{'Email'}</strong>
                                </TableCell>
                                <TableCell align="center">
                                    <strong>{'Phone'}</strong>
                                </TableCell>
                                <TableCell align="center">
                                    <strong>{'Customer Id'}</strong>
                                </TableCell>
                                {/*<TableCell align="center" />*/}
                                <TableCell align="center" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pageRows.length > 0 ? (
                                pageRows.map((each, i) => (
                                    <UserRow
                                        key={each._id}
                                        each={each}
                                        i={i}
                                        pageLimit={pageLimit}
                                        page={page}
                                        editCallback={(editedElement, objIndex) => {
                                            let _pageRows = pageRows;
                                            _pageRows[objIndex].name = editedElement.name;
                                            _pageRows[objIndex].avatar = editedElement.avatar;
                                            _pageRows[objIndex].phone = editedElement.phone;
                                            _pageRows[objIndex].email = editedElement.email;
                                            _pageRows[objIndex].address = editedElement.address;
                                            setPageRows(_pageRows);
                                        }}
                                        deleteCallback={(elementToDelete) => {
                                            setPageRows(pageRows.filter((each) => each._id !== elementToDelete._id));
                                        }}
                                    />
                                ))
                            ) : !loading ? (
                                <TableRow>
                                    <TableCell align="center" colSpan={7}>
                                        {'No Users Available'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <TableCell align="center" colSpan={7}>
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
            <CreateUserDialog
                show={openCreate}
                dismiss={handleClose}
                onCropped={(data) => {
                    setImage(data);
                    setImageFile(dataURLtoFile(data, 'imageToUpload.png'));
                }}
                onSelected={(s) => {
                    setSrc(s);
                }}
                image={image}
                src={src}
                setSrc={setSrc}
                isSquare={true}
                aspectRatio={1}
                creating={creating}
                setValue={setValue}
                setShortName={setShortName}
                saveClick={handleCreate}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                address={address}
                setAddress={setAddress}
                dob={dob}
                setDob={setDob}
                adhaar={aadhar}
                setAdhaar={setAdhaar}
                gender={gender}
                setGender={setGender}
                password={password}
                setPassword={setPassword}
            />
        </Box>
    );
};

export default Index;

Index.title = 'All Users'
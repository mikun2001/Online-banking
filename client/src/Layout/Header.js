import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { useStore } from "laco-react";
import UserStore from "../store/userStore";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import { logout } from "../apis/authentication";
import { useRouter } from "next/router";
import app from '../apis/index';
import { Box } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import Popover from '@material-ui/core/Popover';
import { useState } from "react";
import {Dialog} from "@material-ui/core";
import WelcomeImage from '../../public/Group86.svg';
import SelectedAccountStore from '../store/selectedAccountStore';
import Logo from '../../public/Group 58.svg';

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = (theme) => ({
	secondaryBar: {
		zIndex: 0,
	},
	menuButton: {
		marginLeft: -theme.spacing(1),
	},
	link: {
		textDecoration: "none",
		color: lightColor,
		"&:hover": {
			color: theme.palette.common.white,
		},
	},
	button: {
		borderColor: lightColor,
	},
});

function Header(props) {
	const { classes, onDrawerToggle, title } = props;
	const { user } = useStore(UserStore);
	const Router = useRouter();
    const { account } = useStore(SelectedAccountStore);
    const [selectedChip, setSelectedChip] = useState();

    const [accounts, setAccounts] = useState(user.accounts ? user.accounts : '');

	const [openSwitchAccount,setOpenSwitchAccount] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem('feathers-jwt');
		localStorage.removeItem('selectedAccount');
		logout();
		window.location.reload();
	}

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;


    const selectAccountHandler = (acc) => {
        setSelectedChip(acc);
    };

    const saveHandler = () => {
        localStorage.setItem('selectedAccount', selectedChip);
        SelectedAccountStore.set(() => ({ account: selectedChip }), 'account');
		window.location.reload();
        setOpenSwitchAccount(false);
    };


	return (
		<React.Fragment>
			<Head>
				<title>
					{title ? title + " | IMCA Bank" : "IMCA Bank"}
				</title>
			</Head>
			<AppBar color={'#ffffff'} position="sticky" elevation={0}>
				<Toolbar>
					<Grid container spacing={1} alignItems="center">
						<Hidden smUp>
							<Grid item>
								<IconButton
									color="inherit"
									aria-label="open drawer"
									onClick={onDrawerToggle}
									className={classes.menuButton}
								>
									<MenuIcon />
								</IconButton>
							</Grid>
						</Hidden>
						<Grid item xs />
						<Grid item>
							<Box>
								<Chip onClick={handleClick} aria-describedby={id} 
								label={user.name ? user.name : ''} avatar={<Avatar src={user.avatar ? user.avatar : ''} />} />
								<Popover
									id={id}
									open={open}
									anchorEl={anchorEl}
									onClose={handleClose}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
								>
									<Box
										width={'100%'}
										p={2}
										display={'flex'}
										flexDirection={'column'}
									>
										{
											user.role && user.role === 1 && user.accounts.length > 1 ?
												<Button
													onClick={() => setOpenSwitchAccount(true)}
													color={"primary"}
												>
													{"Switch Account"}
												</Button> : null
										}
										<Button
											onClick={() => handleLogout()}
											color={"primary"}
										>
											{"Log Out"}
										</Button>
									</Box>
								</Popover>
							</Box>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			{
				user.role === 1 ?
				<AppBar
					component="div"
					className={classes.secondaryBar}
					color="#ffffff"
					position="static"
					elevation={2}
				>
					<Toolbar>
						<Grid container alignItems="center" spacing={1}>
							<Grid item xs>
								<Typography color="primary" variant="h3">
									{title ? title : ""}
								</Typography>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar> : null
			}

			<Dialog fullScreen open={openSwitchAccount}>
			<Box
                    width={'100%'}
                    height={'100%'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        maxWidth={'500px'}
                    >
                        <img src={WelcomeImage} width={'80%'} />
                        <Box my={4} />
                        <Box
                            width={'80%'}
                        >
                            <Typography variant={'body2'}>
                                {`Hi, `}<span><strong>{user.name}</strong></span>
                                <br />
                                {`You have ${accounts.length} accounts in our bank.`}
                                {' Please select one account to continue...'}
                            </Typography>
                        </Box>
                        <Box
                            width={'80%'}
                            display={{ xs: 'block', sm: 'flex', }}
                            justifyContent={'space-around'}
                            my={3}
                        >
                            {
                                accounts.length > 1 && accounts.map(item => (
                                    <Chip
                                        color={'primary'}
                                        onClick={() => selectAccountHandler(item.accountNumber)}
                                        style={{ padding: '5px', height: '50px' }}
                                        label={
                                            <Typography variant={'caption'}>
                                                {item.accountType === 1 ? 'Savings' : 'Current'}
                                                <br />
                                                {`xxxx xxxx xxxx ${item.accountNumber.slice(11)}`}
                                            </Typography>
                                        }
                                    />
                                ))
                            }
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} my={3}>
                            <Button color={'primary'} variant={'contained'} disabled={!selectedChip}
                                onClick={() => saveHandler()}>
                                {'Save & Continue'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
			</Dialog>
		</React.Fragment>
	);
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	onDrawerToggle: PropTypes.func.isRequired,
	title: PropTypes.string,
};

export default withStyles(styles)(Header);

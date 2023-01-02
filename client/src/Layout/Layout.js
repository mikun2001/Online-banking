import React  from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Navigator from './Navigator';
import Header from './Header';
import { useStore } from 'laco-react';
import { useRouter } from 'next/router';
import UserStore from "../store/userStore";

const drawerWidth = 256;

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        flex: 1,
        padding: theme.spacing(1, 4),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#D8D6FF',
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(4, 1),
        }
    },
    adminMain:{
        flex: 1,
        background: '#E8E7F1',
        padding: theme.spacing(1, 4),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(4, 1),
        }
    },
    footer: {
        padding: theme.spacing(2),
        background: '#eaeff1',
    },
}));

function Layout({ children, title }) {
    const classes = useStyle();
    const Router = useRouter();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const {user} = useStore(UserStore);


    // useEffect(() => {
    //     if (!user) {
    //         Router.push('/login');
    //     }
    // }, []);
    //
    // if (!user) return <Loader/>;

    return (
        <div className={classes.root}>
            <CssBaseline />
            {/*{*/}
            {/*    user.role === 1 ?*/}
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="js">
                        <Navigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        />
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Navigator PaperProps={{ style: { width: drawerWidth } }} />
                    </Hidden>
                </nav>
            {/*}*/}
            <div className={classes.app}>
                <Header onDrawerToggle={handleDrawerToggle} title={title} />
                {
                    user.role === 1 ?
                    <main className={classes.main}>
                        {children}
                    </main> :
                        <main className={classes.adminMain}>
                            {children}
                        </main>

                }
            </div>
        </div>
    );
}

export default Layout;

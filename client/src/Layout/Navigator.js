import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import Link from "../../src/Link";
import { useRouter } from "next/router";
import Logo from '../../public/Group 58.svg'
import { Box } from "@material-ui/core";
import {useStore} from "laco-react";
import UserStore from "../store/userStore";

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.black,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: theme.palette.text.primary,
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: theme.palette.primary.main,
  },
  itemPrimary: {
    fontSize: "inherit",
    textAlign: 'center',
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

function Navigator(props) {
  const { classes, ...other } = props;
  const { user } = useStore(UserStore);

  const Router = useRouter();

  const options = [
    {
      id: "Account Details",
      icon: <DnsRoundedIcon />,
      active: Router.pathname === "/accountDetails",
      href: "/accountDetails",
    },
    {
      id: "Balance Enquiry",
      icon: <DnsRoundedIcon />,
      active: Router.pathname === "/balanceEnquiry",
      href: "/balanceEnquiry",
    },
    {
      id: "Funds Transfer",
      icon: <DnsRoundedIcon />,
      active: Router.pathname === "/funds-transfer",
      href: "/funds-transfer",
    },
    {
      id: "Request Chequebook",
      icon: <DnsRoundedIcon />,
      active: Router.pathname === "/request-checkbook",
      href: "/request-checkbook",
    },
    {
      id: "Mini Statement",
      icon: <DnsRoundedIcon />,
      active: Router.pathname === "/mini-statement",
      href: "/mini-statement",
    },
  ]

  const adminNavs = [
    {
      id: "Dashboard",
      icon: <DnsRoundedIcon />,
      active: Router.pathname === "/admin/dashboard",
      href: "/admin/dashboard",
    },
    {
      id: "All Users",
      icon: <DnsRoundedIcon />,
      active: Router.pathname === "/admin/users",
      href: "/admin/users",
    },
    {
      id: "All Accounts",
      icon: <DnsRoundedIcon />,
      active: Router.pathname === "/admin/accounts",
      href: "/admin/accounts",
    },
    {
      id: "Chequebook Requests",
      icon: <DnsRoundedIcon />,
      active: Router.pathname === "/admin/chequebook-requests",
      href: "/admin/chequebook-requests",
    },
    {
      id: "All Transactions",
      icon: <DnsRoundedIcon />,
      active: Router.pathname === "/admin/transactions",
      href: "/admin/transactions",
    }
  ]

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <Box
          width={'100%'}
          bgcolor={'#ffffff'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          py={5}
        >
          <img width={'80%'} src={Logo}
            onClick={() => Router.push("/accountDetails")} />
        </Box>
        {
          user.role === 1 ?
              <React.Fragment>
                {options.map(({id: childId, icon, active, href}) => (
                    <React.Fragment key={childId}>
                      <ListItem
                          key={childId}
                          button
                          className={clsx(classes.item, active && classes.itemActiveItem)}
                          component={Link}
                          href={href}
                          as={href}
                          style={{
                            textDecoration: "none",
                            height: 40,
                          }}
                      >
                        <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                        <ListItemText
                            classes={{
                              primary: classes.itemPrimary,
                            }}
                        >
                          {childId}
                        </ListItemText>
                      </ListItem>
                      <Divider className={classes.divider}/>
                    </React.Fragment>
                ))}
              </React.Fragment> :
              <React.Fragment>
                {adminNavs.map(({id: childId, icon, active, href}) => (
                    <React.Fragment key={childId}>
                      <ListItem
                          key={childId}
                          button
                          className={clsx(classes.item, active && classes.itemActiveItem)}
                          component={Link}
                          href={href}
                          as={href}
                          style={{
                            textDecoration: "none",
                            height: 40,
                          }}
                      >
                        <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                        <ListItemText
                            classes={{
                              primary: classes.itemPrimary,
                            }}
                        >
                          {childId}
                        </ListItemText>
                      </ListItem>
                      <Divider className={classes.divider}/>
                    </React.Fragment>
                ))}
              </React.Fragment>
        }
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);

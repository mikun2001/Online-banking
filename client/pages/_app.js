import React, { useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { useRouter } from 'next/router';
import Loader from '../src/components/Loader';
import app  from '../src/apis/index';
import { SnackbarProvider } from 'notistack';
import UserStore from '../src/store/userStore';
import DefaultLayout from '../src/Layout/Layout';
import SelectedAccountStore from '../src/store/selectedAccountStore';
import 'cropperjs/dist/cropper.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Noop = ({ children }) => children;

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const Router = useRouter();

  let Layout = DefaultLayout;

  if (typeof Component.Layout !== 'undefined') {
    Layout = Component.Layout ? Component.Layout : Noop;
  }

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    AOS.init();
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    const token = localStorage.getItem('feathers-jwt');
    const selecteAccount = localStorage.getItem('selectedAccount');
    if (token) {
      app
        .authenticate({
          strategy: 'jwt',
          accessToken: token
        })
        .then(response => {
          const { accessToken, user } = response;
          localStorage.setItem('feathers-jwt', accessToken);
          UserStore.set(() => ({ token: accessToken, user }), 'login');
          if(user.accounts.length === 1){
            SelectedAccountStore.set(() => ({ account: user.accounts[0].accountNumber }), 'account');
          }else {
            SelectedAccountStore.set(() => ({ account: selecteAccount }), 'account');
          }
          if (Router.pathname === '/login') {
            if (user.role === 1) {
              Router.replace('/accountDetails').then(() => {
                setLoading(false);
              });
            } else {
              Router.replace('/admin/dashboard').then(() => {
                setLoading(false);
              });
            }
          } else {
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      if (Router.pathname === '/' || Router.pathname === '/login') {
        setLoading(false);
      } else {
        Router.replace('/login').then(() => {
          setLoading(false);
        });
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>IMCA BANK</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {
            loading ?
              <Loader /> :
              <Layout title={Component.title ? Component.title : ''}>
                <Component {...pageProps} />
              </Layout>
          }
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

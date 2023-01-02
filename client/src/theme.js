import { createMuiTheme } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9D97FF',
      main: '#6D52FF',
      dark: '#6157Ff',
    },
    secondary: {
      light: '#96FFCC',
      main: '#69F0AE',
      dark: '#35DD8B'
    },
    background: {
      default: '#ffffff'
    },
    text: {
      secondary: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'poppins',
    h1: {
      fontSize: 50,
      fontWeight: 'bold',
      letterSpacing: '-0.2px',
      lineHeight: '52px',
      fontStyle: 'normal',
      '@media (max-width:1050px)': {
        fontSize: 33,
        lineHeight: '40px',
      },
      '@media (max-width:900px)': {
        fontSize: 22,
        lineHeight: '30px',
      },
    },
    h2: {
      fontSize: 36,
      fontWeight: 'bold',
      letterSpacing: 0.3
    },
    h3: {
      fontSize: 22,
      fontWeight: '600',
      letterSpacing: 'normal',
      lineHeight: '24px',
      fontStyle: 'normal',
      '@media (max-width:1050px)': {
        fontSize: 16,
        lineHeight: '20px',
      },
      '@media (max-width:900px)': {
        fontSize: 12,
        lineHeight: '16px',
        letterSpacing: '0.5px',
      },
      '@media (max-width:500px)': {
        fontSize: 11,
        lineHeight: '12px',
      },
    },
    h4: {
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: '1px',
    },
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.7,
    },
    h6: {
      fontWeight: 500,
      fontSize: 20,
      letterSpacing: 0.7,
      '@media (max-width:500px)': {
        fontSize: 14,
        lineHeight: '16px',
      },
    },

    body1: {
      fontSize: 16,
      fontWeight: 'bold',
      '@media (max-width:1050px)': {
        fontSize: 15,
      },
      '@media (max-width:900px)': {
        fontSize: 14,
        lineHeight: '15px',
      },
      '@media (max-width:500px)': {
        fontSize: 12,
        lineHeight: '15px',
      },
    },
    body2: {
      fontWeight: 400,
      letterSpacing: '1px',
      '@media (max-width:1050px)': {
        fontSize: 15,
      },
      '@media (max-width:900px)': {
        fontSize: 14,
        lineHeight: '15px',
      },
      '@media (max-width:500px)': {
        fontSize: 10,
        lineHeight: '11px',
      },
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 400,
      letterSpacing: '0.75px',
      lineHeight: '22px',
      '@media (max-width:1050px)': {
        fontSize: 15,
      },
      '@media (max-width:900px)': {
        fontSize: 13,
        lineHeight: '15px',
      },
      '@media (max-width:500px)': {
        fontSize: 12,
        lineHeight: '15px',
      },
    },
    subtitle2: {
      fontSize: 17,
      fontWeight: 600,
      letterSpacing: '0.45px',
      lineHeight: '22px',
      '@media (max-width:1050px)': {
        fontSize: 15,
      },
      '@media (max-width:900px)': {
        fontSize: 14,
        lineHeight: '15px',
      },
      '@media (max-width:500px)': {
        fontSize: 14,
        lineHeight: '15px',
      },
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: '1px',
      '@media (max-width:500px)': {
        fontSize: 10,
        lineHeight: '15px',
      },
    }
  },
  shape: {
    borderRadius: 12,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'none'
      },
      contained: {
        height: '50px',
        [theme.breakpoints.down('sm')]: {
          height: '35px'
        }
      }
    },
    MuiInputBase: {
      input: {
        height: '10px',
        [theme.breakpoints.down('sm')]: {
          height: '1px'
        }
      }
    },
    MuiCheckbox: {
      root: {
        color: '#00000'
      }
    },
    MuiChip: {
      clickableColorPrimary: {
        '&:focus': {
          color: theme.palette.primary.main,
          backgroundColor: '#ffffff',
          border: `1px solid ${theme.palette.primary.main}`
        }
      }
    },
    MuiTableHead: {
        root:{
          background: theme.palette.primary.main,
        }
    },
    MuiTableCell:{
      head:{
        color: '#ffffff',
      }
    },
    MuiFormLabel:{
      root:{
        color: '#000',
      }
    }
  }
}

export default theme;

import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const PageHeaderComponent = ({ title, search, onChange, setOpenCreate, addButtonText, searchPlaceholder }) => {
    return (
        <Grid container style={{margin: '30px 0'}}>
            <Hidden xsDown>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant={'h3'}>{title}</Typography>
                </Grid>
            </Hidden>
            <Hidden smUp>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography align={'center'} variant={'h3'}>{title}</Typography>
                </Grid>
            </Hidden>
            <Grid container justify={'space-between'}>
                <Grid item xs={12} sm={6} md={6}>
                    <Box
                        p={1}
                        display={'flex'}
                        alignItems={'center'}
                        bgcolor={'common.white'}
                        justifyContent={'space-between'}
                        borderRadius={'borderRadius'}
                        boxShadow={1}
                        width={{ xs: 1, sm: 300, md: 300 }}
                        my={2}
                        height={{ xs: '40px' }}
                    >
                        <InputBase
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(e) => onChange(e)}
                            autoFocus
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <Box display={'flex'} alignItems={'center'} ml={1} fontSize={19} color={'primary.main'}>
                            <SearchIcon />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} container justify={'flex-end'} alignItems={'center'}>
                    <Hidden xsDown>
                        <Button
                            component={Box}
                            maxWidth={300}
                            size="large"
                            color={'primary'}
                            variant="contained"
                            onClick={() => setOpenCreate(true)}
                        >
                            <Typography variant={'button'}>{addButtonText}</Typography>
                        </Button>
                    </Hidden>
                    <Hidden smUp>
                        <Button
                            component={Box}
                            fullWidth
                            mb={2}
                            color={'primary'}
                            variant="contained"
                            onClick={() => setOpenCreate(true)}
                        >
                            <Typography variant={'button'}>{addButtonText}</Typography>
                        </Button>
                    </Hidden>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PageHeaderComponent;

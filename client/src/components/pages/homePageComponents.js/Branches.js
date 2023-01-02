import { Box, Typography, Container, Grid } from '@material-ui/core'
import React from 'react'
import Image1 from '../../../../public/undraw_Mind_map_re_nlb6 1.svg'

const Branches = () => {
    return (
        <Container maxWidth={'xl'}>
            <Box>
                <Typography align={'center'} variant={'h2'} color={'primary'}>
                    {'Our Branches'}
                </Typography>
                <Box my={{ xs: 2, sm: 9 }} />
                <Grid container justify={'center'} >
                    <Grid Container item xs={12} sm={6}>
                        <Grid item xs={12}>
                            <Box
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Box
                                    p={2}
                                    mx={{xs:2, sm:5, md: 9, lg: 12}}
                                    my={2}
                                    bgcolor={'#e1e0e0'}
                                    borderRadius={'borderRadius'}
                                    width={'155px'}
                                    data-aos={'fade-up'}
                                    data-aos-delay={'300'}
                                >
                                    <Typography color={'primary'} variant={'body2'} align={'center'} >
                                        {'Shaheed Nagar'}
                                    </Typography>
                                </Box>
                                <Box
                                    p={2}
                                    bgcolor={'#e1e0e0'}
                                    borderRadius={'borderRadius'}
                                    width={'155px'}
                                    data-aos={'fade-up'}
                                    data-aos-delay={'350'}
                                >
                                    <Typography color={'primary'} variant={'body2'} align={'center'} >
                                        {'Utkal University'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                data-aos={'fade-up'}
                                data-aos-delay={'400'}
                            >
                                <Box
                                    p={2}
                                    mx={{xs:2, sm:5, md: 9, lg: 12}}
                                    my={2}
                                    bgcolor={'#e1e0e0'}
                                    borderRadius={'borderRadius'}
                                    width={'155px'}
                                    data-aos={'fade-up'}
                                    data-aos-delay={'450'}
                                >
                                    <Typography color={'primary'} variant={'body2'} align={'center'} >
                                        {'Khandagiri'}
                                    </Typography>
                                </Box>
                                <Box
                                    p={2}
                                    bgcolor={'#e1e0e0'}
                                    borderRadius={'borderRadius'}
                                    width={'160px'}
                                    data-aos={'fade-up'}
                                    data-aos-delay={'500'}
                                >
                                    <Typography color={'primary'} variant={'body2'} align={'center'} >
                                        {'Master Canteen'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Box
                                    p={2}
                                    mx={{xs:2, sm:5, md: 9, lg: 12}}
                                    my={2}
                                    bgcolor={'#e1e0e0'}
                                    borderRadius={'borderRadius'}
                                    width={'155px'}
                                    data-aos={'fade-up'}
                                    data-aos-delay={'550'}
                                >
                                    <Typography color={'primary'} variant={'body2'} align={'center'} >
                                        {'Old Town'}
                                    </Typography>
                                </Box>
                                <Box
                                    p={2}
                                    bgcolor={'#e1e0e0'}
                                    borderRadius={'borderRadius'}
                                    width={'155px'}
                                    data-aos={'fade-up'}
                                    data-aos-delay={'600'}
                                >
                                    <Typography color={'primary'} variant={'body2'} align={'center'} >
                                        {'Ashok Nagar'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid data-aos={'zoom-in'} data-aos-delay={'300'} container item xs={12} sm={6} justify={'center'} alignItems={'center'}>
                        <img src={Image1} width={'80%'} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Branches

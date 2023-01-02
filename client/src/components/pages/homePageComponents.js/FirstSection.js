import { Box, Button, Hidden, Typography } from '@material-ui/core'
import { useRouter } from 'next/router';
import React, {useState} from 'react';
import Image2 from '../../../../public/g10 (1).svg'
import FirstImage from '../../../../public/Group 75.svg'
import Link from "../../../Link";
import Particles from "react-particles-js";
import ParticleJSON from '../../../particlesjs-config.json';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    canvas:{
        height: '100%',
        width: '100%',
    }
}))

const FirstSection = () => {

    const classes = useStyles();
    const Router = useRouter();

    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} p={{ xs: 1, md: 0 }}>
            <Hidden smDown>
                <Box style={{position: 'relative'}} width={'50%'} height={'100vh'} bgcolor={'primary.main'}>
                    <div style={{height: '100%'}}>
                        <Particles
                            width='100%'
                            height='100%'
                            params={ParticleJSON}
                            style={{width: '100%', height: '100%'}}
                            canvasClassName={classes.canvas}
                        />
                    </div>
                    <img style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} width={'80%'} src={FirstImage}></img>
                </Box>
            </Hidden>
            <Box width={{ xs: '100%', md: '50%' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Box width={{ xs: '100%', md: '45vw' }}>
                    <Box data-aos={'fade-left'} px={{ xs: 1, md: 0 }}>
                        <Typography variant={'h1'}>
                            {'Welcome to the'}
                            <span style={{ color: '#6C63FF' }}>{' IMCA Bank'}</span>
                        </Typography>
                    </Box>
                    <Box data-aos={'fade-left'} data-aos-delay={'700'} p={{ xs: 1, md: 0 }}>
                        <Typography variant={'body2'} >
                            {'Here our priority is your covinience so that you can do multiple tasks from your own home without physically coming to the bank. Here our priority is your covinience so that you can do multiple tasks from your own home without physically coming to the bank.'}
                        </Typography>
                    </Box>
                    <Hidden mdUp>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <img width={'80%'} src={Image2}></img>
                        </Box>
                    </Hidden>
                    <Hidden smDown>
                        <Box data-aos={'fade-left'} data-aos-delay={'900'} my={2} display={{ xs: 'block', md: 'flex' }} >
                            <Box mr={2}>
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    component={Box}
                                    width={'200px'}
                                    onClick={() => Router.push('/login')}
                                >
                                    {'Login'}
                                </Button>
                            </Box>
                            <Button
                                variant={'contained'}
                                color={'secondary'}
                                component={Link}
                                // width={'200px'}
                                style={{ color: '#ffffff', width: '200px' }}
                                href={'#ContactUs'}
                            >
                                {'Conatct Us'}
                            </Button>
                        </Box>
                    </Hidden>
                    <Hidden mdUp>
                        <Box my={2} />
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}
                            px={4}
                        >
                            <Button
                                variant={'contained'}
                                color={'primary'}
                                fullWidth
                                onClick={() => Router.push('/login')}
                            >
                                {'Login'}
                            </Button>
                            <Box my={1} />
                            <Button
                                variant={'contained'}
                                color={'secondary'}
                                fullWidth
                                style={{ color: '#ffffff' }}
                            >
                                {'Conatct Us'}
                            </Button>
                        </Box>
                    </Hidden>
                </Box>
            </Box>
        </Box >
    )
}

export default FirstSection

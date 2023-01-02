import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react';

const AuroWhyUsSignleItem = ({ image, title, description, isRight= false }) => {
    return (
        <Grid style={{overflowX: 'hidden'}} data-aos={isRight ? 'fade-left' : 'fade-right'} component={Box} container item xs={12} md={6} justify={'center'} alignItems={'center'}
            p={{ xs: 1, md: 4 }}>
            <Grid item xs={6} component={Box} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <img width={'90%'} src={image} />
            </Grid>
            <Grid item xs={6}>
                <Box>
                    <Typography variant={'h3'} color={'primary'}>
                        {title}
                    </Typography>
                    <Typography variant={'body2'}>
                        {description}
                    </Typography>

                </Box>
            </Grid>
        </Grid>
    )
}

export default AuroWhyUsSignleItem

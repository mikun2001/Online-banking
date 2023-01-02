import React from 'react';
import {Box, Grid, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import ContactImage from '../../../../public/Group 108.svg';
import LocationLogo from '../../../../public/LocationLogo.svg';
import WebLogo from '../../../../public/WebLogo.svg';
import EmailLogo from '../../../../public/EmailLogo.svg';
import PhoneLogo from '../../../../public/PhoneLogo.svg';

const ContctUs = () => {
    return (
        <>
            <Typography id={'ContactUs'} align={'center'} variant={'h2'} color={'primary'}>
                {'Contact Us'}
            </Typography>
            <Grid container justify={'center'} alignItems={'center'}>
                <Grid item xs={12} md={7}>
                    <Box data-aos={'zoom-in'} display={'flex'} justifyContent={'center'}>
                        <img src={ContactImage} alt={'ContactImage'} width={'90%'} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box display={'flex'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
                          <List data-aos={'fade-left'}>
                              <ListItem>
                                  <ListItemIcon>
                                      <img src={LocationLogo} alt={'Location'} />
                                  </ListItemIcon>
                                  <ListItemText>
                                      {'Old town, Bhubaneswar\n' +
                                      '144002'}
                                  </ListItemText>
                              </ListItem>
                              <ListItem>
                                  <ListItemIcon>
                                      <img src={WebLogo} alt={'Location'} />
                                  </ListItemIcon>
                                  <ListItemText>
                                      {'online.imca-bank.co.in'}
                                  </ListItemText>
                              </ListItem>
                              <ListItem>
                                  <ListItemIcon>
                                      <img src={WebLogo} alt={'Location'} />
                                  </ListItemIcon>
                                  <ListItemText>
                                      {'imca-bank.vercel.app'}
                                  </ListItemText>
                              </ListItem>
                              <ListItem>
                                  <ListItemIcon>
                                      <img src={EmailLogo} alt={'Location'} />
                                  </ListItemIcon>
                                  <ListItemText>
                                      {'imcabank@gmail.com'}
                                  </ListItemText>
                              </ListItem>
                              <ListItem>
                                  <ListItemIcon>
                                      <img src={PhoneLogo} alt={'Location'} />
                                  </ListItemIcon>
                                  <ListItemText>
                                      {'2200345, 6370882409'}
                                  </ListItemText>
                              </ListItem>
                          </List>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default ContctUs;
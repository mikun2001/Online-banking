import {Box, Button, Checkbox, CircularProgress, FormControlLabel, makeStyles, Typography} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {requestChequebook} from "../../src/apis/requestChequebook";
import {useStore} from "laco-react";
import SelectedAccountStore from "../../src/store/selectedAccountStore";
import {getParticularAccount} from "../../src/apis/accounts";
import {useSnackbar} from "notistack";


const Index = () => {

    const [checkedB, setCheckedDB] = useState(false);

    const [myAccount, setMyAccount] = useState({});
    const [loading, setLoading] = useState(false);
    const { account } = useStore(SelectedAccountStore);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getParticularAccount(account).then((res) => {
            setMyAccount(res);
        }).catch((e) =>  enqueueSnackbar(e.message ? e.message : "Something Went Wrong", { variant: 'error' }))
    },[])


    const handleChange = () => {
        setCheckedDB(!checkedB);
    }

    const requestHandler = () => {
        if(checkedB){
            setLoading(true);
            requestChequebook(myAccount.data[0]._id).then((res) => {
                enqueueSnackbar("Request Sent Successfully", { variant: 'success' });
            }).catch((e) =>  enqueueSnackbar(e.message ? e.message : "Something Went Wrong", { variant: 'error' }))
                .finally(() => setLoading(false));
        }
    }


    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            p={{ xs: 1, md: 3 }}
        >
            <Box
                boxShadow={2}
                borderRadius={'borderRadius'}
                p={{ xs: 1, md: 3 }}
                width={'100%'}
                bgcolor={'common.white'}
                maxWidth={'500px'}
            >
                <Typography variant={'caption'} color={'primary'}>
                    {'Terms & Conditions'}
                </Typography>
                <Box my={1} />
                <Box
                    width={'100%'}
                    height={'400px'}
                    style={{ overflowY: 'scroll' }}
                >
                    <Typography variant={'caption'}>
                        {'1. The new cheque book will be issued only upon written request/cheque requisition slip.However in case of personalized cheque book, Bank at its discretion may issue the sameto the customers.2. Personalised Cheque Book will be issued free with pre-printed name of the customer/company, account no. and shall be delivered in an envelope with a welcome letter. 3. Personalized cheque book shall be hand delivered by the Branch to the customer/authorized representative. 4. Bank may also dispatch the personalized cheque book at the customer address registered in his/her account with the Branch. It would be responsibility of the customer to notify the branch any change in his/her communication address and contact details to avoid wrong delivery of cheque book. Communication address and contact details such as tel. no./mobile no./email ID are required to enable timely delivery and to facilitate identification for security reasons. In case of any change in address & contact details, please submit the details to your branch with relevant documentary proof. 5. Bank at its discretion may levy charges for issue and dispatch of personalized cheque book in future. However, before levying the charges if any shall be informed well in advance (30 days) to the customer. 6. The cheque leaves have been designed as per specifications prescribed by RBI for MICR based automatic cheque clearing system. For smooth processing of MICR cheque please ensure that no writing, rubber stamp, pins, staple and paste etc enters the MICR band/code line. 7. Please affix crossing stamp or cross them with thick firm lines at top left corner only. 8. For cheque serial number refer to first code (first six digit) of the MICR code line. 9. Bank will not be liable for losses arising from alterations which cannot be readily detected by visual inspections. In the best interest of all please do not issue cheques with alterations. 10. Issue of cheque without sufficient funds in the account may attract penalty under Sec. 138 of NI Act. 11. Frequent dishonor of cheque/failed ECS (debit) due to insufficient fund may lead to closure of account. 12. Cheuqe is payable across the counter for any amount at account holder’s branch. 13. At non account holder branch withdrawal is permitted to account holder only upto themaximum limit of 1 lac, wherein charges will be applicable for the amount above 50 thousand. For complete details on service charges please click. Do’s: 14. Keep your cheque book under lock and key. 15. When a cheque book is issued please count the leaves contained therein before using any of them. The customers are advised to periodically verify whether all unused leaves are intact. 16. Cheque should be written clearly in permanent ink. Erasable ink should not be used for drawing cheques. 17. When drawing a cheque, begin to write the amount in words as near the word “Rupees” as possible; begin the figures as near as possible to “`”. 18. To stop payment of a lost or stolen please instruct your branch in writing to stop payment giving the cheque no. date, amount and payee’s name. 19. Use registered Post only when dispatching cheques is required by post. 20. Please return the unused cheques when account is closed.'}
                    </Typography>
                </Box>
                <Box my={1} />
                <Box>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checkedB}
                                onChange={handleChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="I agree all terms and conditions."
                    />
                </Box>
                <Box my={1} />
                <Button disabled={!checkedB} variant={'contained'} color={'primary'} fullWidth onClick={() => requestHandler()}>
                    {loading ? (
                        <CircularProgress size={15} />
                    ) : (
                        <Typography variant={'button'}>
                            {'Request'}
                        </Typography>
                    )}
                </Button>
            </Box>
        </Box>
    )
}

export default Index
Index.title = 'Request for cheque book'
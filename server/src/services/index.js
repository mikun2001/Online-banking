import user from './user/user.service';
import account from './account/account.service';
import upload from './upload/upload.service';
import chequeBookRequest from './cheque-book-request/cheque-book-request.service';
import uploadTest from './upload-test/upload-test.service';
import fundsTransfer from './funds-transfer/funds-transfer.service';

// eslint-disable-next-line no-unused-vars
export default function (app) {
    app.configure(user);
    app.configure(account);
    app.configure(upload);
    app.configure(chequeBookRequest);
    app.configure(uploadTest);
    app.configure(fundsTransfer);
}

import { BadRequest } from '@feathersjs/errors';

const CheckEmailOrPhone = () => async (context) => {
    const { data, app } = context;
    const { email, phone } = data;

    if (email) {
        if (email.toString().trim() === '') throw new BadRequest('Invalid Email ID.');

        if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email,
            )
        ) {
            throw new BadRequest('Please provide a valid email!');
        }

        const userData = await app
            .service('user')
            ._find({
                query: {
                    email: email,
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));

        if (userData) throw new BadRequest('Email Value Already Exists.');
    }

    if (phone) {
        if (phone.toString().trim() === '') throw new BadRequest('Invalid Phone Number.');

        if (!/^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(phone)) {
            throw new BadRequest('Please provide a valid phone number!');
        }

        const userData = await app
            .service('user')
            ._find({
                query: {
                    phone: phone,
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));

        if (userData) throw new BadRequest('Phone Number Already Exists.');
    }

    return context;
};

export default CheckEmailOrPhone;

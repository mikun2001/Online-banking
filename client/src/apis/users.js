import app from './index';

export const UsersService = app.service("user");

export const getAllUsers = (skip = 0, limit, search) => UsersService.find({
    query: {
        name: {
            $regex: `.*${search}.*`,
            $options: 'i',
        },
        role: 1,
        $skip: skip,
        $limit: limit,
        status: 1,
    }
});

export const CreateUser = (name, phone, email, dob, address, aadhar, avatar, gender, password) =>
    UsersService.create({name, phone, email, dob, address, aadhar, avatar, gender, password})


export const DeleteUser = (id) => UsersService.remove(id);

export const editUser = (id, avatar, name, email, phone, address) => UsersService.patch(id, { avatar, name, email, phone, address });
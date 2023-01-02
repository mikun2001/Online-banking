// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'user';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            name: {
                type: String,
                required: true,
            },
            customerId: {
                type: String,
                required: true,
                unique: true,
            },
            email: {
                type: String,
                unique: true,
                lowercase: true,
            },
            password: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            role: {
                type: Number,
                enum: [
                    1, // user
                    2, // admin
                ],
                default: 1,
            },
            aadhar: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
            },
            dob: {
                type: Date,
                required: true,
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    2, // blocked
                    0, // deleted
                ],
                default: 1,
            },
            requestCount: {
                type: Number,
                default: 0,
            },
            gender: {
                type: Number,
                enum: [
                    1, // active
                    2, // blocked
                    0, // deleted
                ],
                required: true,
            },
        },
        {
            timestamps: true,
        },
    );

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);
}

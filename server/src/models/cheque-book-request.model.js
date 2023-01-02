// cheque-book-request-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'chequeBookRequest';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            user: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            account: {
                type: ObjectId,
                ref: 'account',
                required: true,
            },
            status: {
                type: Number,
                enum: [
                    1, // requested
                    2, // approved
                    3, // rejected
                    0, // deleted
                ],
                default: 1,
            },
            message: {
                type: String,
                default: null,
            },
            approvedOrRejectedBy: {
                type: ObjectId,
                ref: 'user',
                default: null,
            },
            approvedOrRejectedOn: {
                type: Date,
                default: null,
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

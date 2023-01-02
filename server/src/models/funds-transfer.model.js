// funds-transfer-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'fundsTransfer';
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
            receiver: {
                name: {
                    type: String,
                    required: true,
                },
                accountNumber: {
                    type: String,
                    required: true,
                },
                ifsc: {
                    type: String,
                    required: true,
                },
            },
            amount: {
                type: Number,
                required: true,
            },
            status: {
                type: Number,
                enum: [
                    1, // initiated
                    2, // completed
                ],
            },
            transactionCode: {
                type: String,
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

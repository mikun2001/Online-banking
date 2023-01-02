// account-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'account';
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
            accountNumber: {
                type: String,
                required: true,
            },
            accountType: {
                type: Number,
                enum: [
                    1, // savings
                    2, // current
                ],
                required: true,
            },
            ifsc: {
                type: String,
                required: true,
            },
            branch: {
                type: String,
                required: true,
            },
            nomineeName: {
                type: String,
                required: true,
            },
            balance: {
                type: Number,
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

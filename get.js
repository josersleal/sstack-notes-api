import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context, callback) {
    const params = {
        TableName: "Sstack_notes", // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userid: event.requestContext.identity.cognitoIdentityId,
            noteid: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if (result.Item) {
            callback(null, success(result.Item));
        } else {
            callback(null, failure({ status: false, error: "item not found" }));
        }
    } catch (error) {
        callback(null, failure({ status: false }));
    }
}

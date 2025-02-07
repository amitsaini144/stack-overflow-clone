import { Permission } from 'node-appwrite';
import { storage } from './config';
import { questionAttachmentBucket } from '../name';

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentBucket);
    }
    catch (error) {
        console.log(error);
        try {
            await storage.createBucket(questionAttachmentBucket, questionAttachmentBucket, [
                Permission.read("any"),
                Permission.read("users"),
                Permission.write("users"),
                Permission.create("users"),
                Permission.delete("users"),
            ], false, false, undefined, ["jpg", "png", "gif", "jpeg", "webp", "heic"]);

        } catch (error) {
            console.log("Error creating storage : ", error);
        }
    }
}
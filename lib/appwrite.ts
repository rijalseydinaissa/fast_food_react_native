import {Account, Client, Avatars, Databases, ID, Query} from "react-native-appwrite";
import {string} from "postcss-selector-parser";
import {CreateUserPrams, SignInParams} from "@/type";

export const appwriteConfig={
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform:"com.food.ordoring",
    databaseId:"6870ff4e001d355fb60b",
    userCollectionId:"6870ff9d0024dc8f7b32",
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);



export const createUser =async ({email,password,name}:CreateUserPrams)=>{
    try {
        const newAccount = await account.create(ID.unique(),email,password,name);
        if (!newAccount) throw new Error("Failed to create user")
        await signIn({email,password})
        const avatarUrl = avatars.getInitialsURL(name)
        return await databases.createDocument(
             appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {email,name,accountId:newAccount.$id,avatar:avatarUrl}
    )
    }catch (e) {
        throw new Error(e as string)
    }
}

export const signIn =  async ({email,password}:SignInParams)=>{
    try {
        const session = await account.createEmailPasswordSession(email,password);
    }catch (e) {
        throw new Error(e as string)
    }

}

export const getCurrentUser = async ()=>{
    try {
       const currentAccount = await account.get();
        if (!createUser) throw Error("Failed to get current user")
        const currentUser=  await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId",currentAccount.$id)]
        )
        if (!currentUser) throw new Error("Failed to get current user")
        return currentUser.documents[0];
    }catch (e) {
        console.log(e)
        throw new Error(e as string)
    }
}
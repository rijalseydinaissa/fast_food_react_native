import {Account, Client, Avatars, Databases, ID, Query,Storage} from "react-native-appwrite";
import {string} from "postcss-selector-parser";
import {Category, CreateUserPrams, GetMenuParams, SignInParams} from "@/type";

export const appwriteConfig={
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform:"com.food.ordoring",
    databaseId:"6870ff4e001d355fb60b",
    bucketId:"68727f1a0004452aa483",
    userCollectionId:"6870ff9d0024dc8f7b32",
    categoriesCollectionId:"68726eff0034b41f2213",
    menuCollectionId:"68727527002205b98682",
    customizationsCollectionId:"6872787c00229d092b4e",
    menuCustomizationsCollectionId:"68727cdc002d7d989c79"
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);



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

export const getMenu = async ({category,query}:GetMenuParams)=>{
    try {
        const queries:string[] = []
        if (category) queries.push(Query.equal("categories",category));
        if(query) queries.push(Query.search("name",query))

        const menu = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        )
        return menu.documents
    }
    catch (e) {
        throw new Error(e as string)
    }
}

export const getCategories = async ():Promise<Category[]> =>{
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId
        )
        return categories.documents as Category[]
    }catch (e) {
        throw new Error(e as string)
    }
}
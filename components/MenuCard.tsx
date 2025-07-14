import {Image, Platform, Text, TouchableOpacity} from "react-native";
import {MenuItem} from "@/type";
import {appwriteConfig} from "@/lib/appwrite";

const MenuCard = ({item:{image_url,name,price}}:{item:MenuItem}) => {
    const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;
    //console.log(imageUrl)
    return(
        <TouchableOpacity className="menu-card" style={Platform.OS==='android' ? {elevation:10,shadowColor:'#878787'}:{}}>
            <Image
                source={{uri:imageUrl}} className="size-32 absolute -top-10" resizeMode="contain"
            />
            <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>{name}</Text>
            <Text className="body-regular mb-4 text-gray-200"> From {price}F</Text>
            <TouchableOpacity onPress={()=>{}}>
                <Text className="paragraph-bold text-primary">Add to Cart +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default MenuCard;
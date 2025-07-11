import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {images} from "@/constants";
const CartButton = () => {
    const totalItems=10
    return (
        <TouchableOpacity className={"cart-btn"} onPress={()=>{}}>
            <Image
            source={images.bag} resizeMode={"contain"} className={"size-5"}
            />
            {totalItems>0 &&(
                <View className={"cart-badge"}>
                    <Text className={"small-bold text-white"}>
                        {totalItems}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    )
}
export default CartButton;
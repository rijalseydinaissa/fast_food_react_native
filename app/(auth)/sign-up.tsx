import { View,Text ,Button} from 'react-native';
import React from 'react';
import {router} from "expo-router";

const SignUp = () => {
    return (
        <View>
            <Button title={"Sign In"} onPress={()=>(router.push("/sign-in"))}/>
            <Text>SignIn</Text>
        </View>
    )
}
export default SignUp;
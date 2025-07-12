import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({name:"",email:"",password:""});
    const {name,email,password} = form;

    const submit=async ()=>{
        if (!name || !email || !password) return  Alert.alert('Error','Please enter name, valid email and password')

        setIsSubmitting(true)
        try {
            await createUser({email,password,name })
            router.replace("/")
        }catch (e: any) {
            Alert.alert("Error",e.message || "Something went wrong")
        }finally {
            setIsSubmitting(false)
        }
    }
    return (

        <View className="gap-10 bg-white p-5 mt-5 rounded-lg">
            <CustomInput
                placeholder="Enter your full name"
                value={form.name}
                label="Full name"
                onChangeText={(text)=>setForm((prev)=>({...prev,name:text}))}
            />
            <CustomInput
                placeholder="Enter your email"
                value={form.email}
                label="Email"
                onChangeText={(text)=>setForm((prev)=>({...prev,email:text}))}
                keyboardType="email-address"
            />
            <CustomInput
                placeholder="Enter your password"
                label="Password"
                value={form.password}
                onChangeText={(text)=>setForm((prev)=>({...prev,password:text}))}
                secureTextEntry={true}
            />
            <CustomButton
                title={"Sign Up"}
                onPress={submit}
                isLoading={isSubmitting}
            />
            <View className="flex flex-center mt-5  flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    Already have an account?
                </Text>
                <Link href="/sign-in" className="base-bold text-primary" >
                    Sign In
                </Link>
            </View>
        </View>
    )
}
export default SignUp;
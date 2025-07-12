import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {signIn} from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({email:"",password:""});
    const {email,password} = form;
   const submit=async ()=>{
        if (!email || !password) return  Alert.alert('Error','Please enter valid email and password')

        setIsSubmitting(true)
        try {
            // Call appwrite SignIn Function
           await signIn({email, password})

            router.replace("/")
        }catch (e: any) {
                Alert.alert("Error",e.message || "Something went wrong")
                Sentry.captureEvent(e)
        }finally {
            setIsSubmitting(false)
        }
   }
     return (
         
            <View className="gap-10 bg-white p-5 mt-5 rounded-lg">
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
                    title={"Sign In"}
                    onPress={submit}
                    isLoading={isSubmitting}
                />
                <View className="flex flex-center mt-5  flex-row gap-2">
                    <Text className="base-regular text-gray-100">
                        Dont have an account?
                    </Text>
                    <Link href="/sign-up" className="base-bold text-primary" >
                        Sign Up
                    </Link>
                </View>
            </View>
     )
 }
 export default SignIn;
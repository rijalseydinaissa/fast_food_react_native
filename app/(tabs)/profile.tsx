import {View, Text,Image, FlatList, Alert, ScrollView} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import ProfileField from "@/components/ProfileField";
import {getCurrentUser, signOut} from "@/lib/appwrite";
import {User} from "@/type";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import CustomButton from "@/components/CustomButton";
import {images} from "@/constants";


const Profile = () => {

    const [user,setUser] = useState<User | null>(null)
    const [Loading,setLoading] = useState(true)
    const [loggingOut,setLoggingOut] = useState(false)

    const loadData = async ()=>{
        try {
            const userData = await getCurrentUser()
            setUser(userData as User)
        }catch (error) {
            console.error("Failed to load data: ",error || "Unknown Error")
            throw new Error("Failed to load data")
        }
    }

    useEffect(()=>{
        loadData()
        .then(()=>{
            setLoading(false)
        })
        .catch(()=>{
            setLoading(false)
        })
    },[])

    const handleLogout = async ()=>{
            return(
                Alert.alert(
                    "Sign Out",
                    "Are you sure you want to sign out?",
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                        {
                           text: "Sign Out",
                           style: "destructive",
                           onPress:async ()=>{
                               try {
                                   setLoggingOut(true)
                                   await signOut()
                                   router.replace('/(auth)/sign-in')
                               }
                               catch (error) {
                                   console.error('Error signing out:', error);
                                   Alert.alert('Error', 'Failed to sign out');
                               }finally {
                                   setLoggingOut(false)
                               }
                           }
                        }
                    ]

                )

            )
    }


    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="mx-5 ">
                <CustomHeader
                    title="Profile"
                    //showSearchButton={true}
                />
            </View>
            <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
                {/* Profile Avatar */}
                <View className="flex-center py-8">
                    <View className="profile-avatar">
                        <Image
                            source={images.ins}
                            className="w-full h-full rounded-full"
                        />
                        <View className="profile-edit">
                            <Image
                                source={images.pencil}
                                className="w-4 h-4"
                                style={{ tintColor: '#fff' }}
                            />
                        </View>
                    </View>
                </View>

                {/* Profile Fields */}
                <View className="p-5 m-5   rounded-lg bg-white shadow-sm">
                    <ProfileField
                        label="Full Name"
                        value={user?.name || "N/A"}
                        icon={images.user}
                    />

                    <ProfileField
                        label="Email"
                        value={user?.email || "N/A"}
                        icon={images.envelope}
                    />

                    <ProfileField
                        label="Phone number"
                        value={user?.Telephone || "+1 555 123 4567"}
                        icon={images.phone}
                    />

                    <ProfileField
                        label="Address 1 - (Home)"
                        value={user?.Adresse|| "123 Main Street, Springfield, IL 62704"}
                        icon={images.location}
                    />

                    <ProfileField
                        label="Address 2 - (Origine)"
                        value={user?.address2 || "221B Walo Louga, Senegal, keur Baye Aya"}
                        icon={images.location}
                    />
                </View>

                {/* Action Buttons */}
                <View className="px-5 py-5 gap-4">
                    <CustomButton
                        title="Edit Profile"
                        //onPress={editProfile}
                    />

                    <CustomButton
                        title="Logout"
                        //variant="secondary"
                        onPress={handleLogout}
                        isLoading={loggingOut}
                        leftIcon={images.logout}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default Profile;
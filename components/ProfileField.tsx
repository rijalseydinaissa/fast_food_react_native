import { View, Text, Image } from 'react-native';
import { ProfileFieldProps } from '@/type';

const ProfileField = ({ label, value, icon }: ProfileFieldProps) => {
    return (
        <View className="flex-row items-start gap-4 py-3">
            {/* Icône orange rond */}
            <View className="w-10 h-10 rounded-full bg-orange-100 justify-center items-center">
                <Image
                    source={icon}
                    className="w-5 h-5"
                    resizeMode="contain"
                />
            </View>

            {/* Texte */}
            <View className="flex-1">
                <Text className="text-xs text-gray-400">
                    {label || ''}
                </Text>
                <Text className="text-base text-gray-800 font-medium">
                    {value || 'N/A'}
                </Text>
            </View>
        </View>
    );
};

export default ProfileField;
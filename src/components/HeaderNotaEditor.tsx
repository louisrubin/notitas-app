import { Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

interface HeaderProp{
    children?: React.ReactNode;
    onPressCancel?: () => void;
    onPressBack?: () => void | boolean;     // puede retornar void o boolean
}

export default function HeaderNotaEditor({
    onPressBack = () => {},
    onPressCancel = () => {},
}: HeaderProp) {
    const insets = useSafeAreaInsets();

    return(
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <View>
                <Pressable style={ ({pressed}) => [
                    styles.buttonBack,
                    {
                        backgroundColor: pressed ? "#E7E5E4" : null,
                    }
                ]}
                onPress={ () => {
                    onPressBack();
                    router.back();
                }}
                >
                    
                    <AntDesign name="arrowleft" size={24} color="black" />
                </Pressable>
            </View>

            {/* <Pressable style={ ({pressed}) => [
                styles.cancelButton,
                {
                    backgroundColor: pressed ? "#ddd" : null,
                }
            ]}
            // onPress={ () => {router.back()} }
            >
                <Text style={styles.cancelButton}>Cancelar</Text>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
            </Pressable> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    },
    buttonBack: {
        borderRadius: 20,
        padding: 5,
    },
    cancelButton: {
        fontSize: 18,
        // marginRight: 10,
        padding: 5,
        borderRadius: 20,
    }
})
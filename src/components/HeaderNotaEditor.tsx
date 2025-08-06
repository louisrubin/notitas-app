import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import React from "react";
import { Colors } from "../constants/colors";
import { useSettings } from "../hooks/SettingsContext";
import AnimatedBackgroundView from "./AnimatedView";

interface HeaderProp{
    children?: React.ReactNode;
    onPressBack?: () => void | boolean;     // puede retornar void o boolean
    style?: StyleProp<ViewStyle>;
}

export default function HeaderNotaEditor({
    onPressBack = () => {},
    style,
}: HeaderProp) {
    const {theme} = useSettings();

    return(
        <AnimatedBackgroundView style={[styles.container, style]}>
            <View>
                <Pressable style={ ({pressed}) => [
                    styles.buttonBack,
                    {
                        backgroundColor: pressed 
                            ? Colors[theme.value].bgOnPressed 
                            : null,
                    }
                ]}
                onPress={ () => {
                    onPressBack();
                    router.back();
                }}
                >                    
                    <AntDesign name="arrowleft" size={24} 
                        color={Colors[theme.value].text} 
                    />
                </Pressable>
            </View>
        </AnimatedBackgroundView>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 15,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: "tomato"
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
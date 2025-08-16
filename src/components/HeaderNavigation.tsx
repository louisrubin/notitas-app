import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import React from "react";
import { Colors } from "../constants/colors";
import { useSettings } from "../hooks/SettingsContext";
import AnimatedBackgroundView from "./AnimatedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "react-native";

interface HeaderProp{
    title?: string;
    onPressBack?: () => void | boolean;     // puede retornar void o boolean
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export default function HeaderNavigation({
    title="",
    onPressBack = () => {},
    style,
    children,
}: HeaderProp) {
    const {theme} = useSettings();
    const insets = useSafeAreaInsets();

    return(
        <AnimatedBackgroundView 
            style={[
                styles.container, 
                style,
                { paddingTop: insets.top + 10 }
            ]}
        >
            <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
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

                <Text style={[ styles.title, {color: Colors[theme.value].text }]}>
                    {title}
                </Text>
            </View>
            {
                children
            }
        </AnimatedBackgroundView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: "lightgreen"
    },
    buttonBack: {
        borderRadius: 20,
        padding: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 500,
    },
})
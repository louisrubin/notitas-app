import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import Animated, { FadeInDown, FadeInUp, FadeOutDown } from "react-native-reanimated";
import * as NavigationBar from "expo-navigation-bar";
import { Colors } from "../constants/colors";
import { useSettings } from "../hooks/SettingsContext";

interface ModalProp {
    visible: boolean;

    title?: string;
    confirmBtn?: string;
    // number?: number;
    onConfirm?: () => void;

}

export default function ModalConfirmacion( {
    title = "¿Confirmar?", 
    confirmBtn = "Confirmar", 
    visible = false,
    // number,
    onConfirm = () => {},
}: ModalProp) {
    // const {theme} = useSettings();
//   const [visible, setVisible] = useState(true);

    useEffect( () => {
        // NavigationBar.setBackgroundColorAsync(Colors.)
    }, [])

  const handleOnConfirm = () => {
    // Lógica al confirmar modal
    onConfirm();    
    // setVisible(false);
  };

  return (
    <View style={styles.container}>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        // onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>

            <Animated.View style={styles.modal} 
                entering={FadeInDown.duration(300)}
                exiting={FadeOutDown.duration(200)}
            >
                <Text style={styles.title}>{title}</Text>

                <View style={styles.buttons}>
                    <Pressable
                        style={ ({pressed}) => [
                            styles.btn, 
                            {
                                backgroundColor: pressed ? "#242424" : null,
                            }
                        ]}
                        // onPress={() => setVisible(false)}
                    >
                        <Text style={styles.btn_Text}>Cancelar</Text>
                    </Pressable>

                    <Text style={[styles.btn_Text, {opacity: 0.3}]}>|</Text>

                    <Pressable
                        style={({pressed}) => [
                            styles.btn, 
                            {
                                backgroundColor: pressed ? "#242424" : null,
                            }
                        ]}
                        onPress={handleOnConfirm}
                    >
                        <Text style={styles.btn_Text}>{confirmBtn}</Text>
                    </Pressable>

                </View>


            </Animated.View>
          
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        position: "absolute",

        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "tomato"
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    modal: {
        position: "absolute",
        bottom: 10,
        padding: 20,
        paddingVertical: 25,
        borderRadius: 22,
        width: "95%",
        backgroundColor: "black",
    },
    title: { 
        color: "white", 
        fontSize: 16, 
        fontWeight: "500", 
        marginBottom: 20 
    },
    buttons: { 
        gap: 10,
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center" 
    },

    btn: { 
        padding: 6, 
        paddingHorizontal: 30,
        // marginLeft: 10, 
        // marginHorizontal: 10,
        borderRadius: 20, 
    },
    btn_Text: {
        textAlign: "center",
        color: "white",
        fontSize: 22,
        fontWeight: 500,
        // backgroundColor: "tomato"
    },
});

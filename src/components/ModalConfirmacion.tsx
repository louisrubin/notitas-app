import { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, OpaqueColorValue, BackHandler } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

interface ModalProp {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;  // hook

    title?: string;
    confirmText?: string;
    cancelText?: string;
    colorConfirmText?: string | OpaqueColorValue;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export default function ModalConfirmacion( {
    title = "¿Confirmar operación?", 
    confirmText = "Confirmar", 
    cancelText = "Cancelar", 
    colorConfirmText = "white",

    visible = false,
    setVisible,
    onCancel = () => {},
    onConfirm = () => {},
}: ModalProp) {

    useEffect( () => {
        // COMPORTAMIENTO AL VOLVER ATRAS Y CERRAR MODAL
        const volverAction = () => {
            if (visible) {
                setVisible(false); // SETEA PARA CERRAR
                return true;
            }
            return false;   // ok
        };
        const volverHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            volverAction
        );
        return () => volverHandler.remove();
    },[visible]);

    // AL 'CONFIRMAR' OPERACION
    const handleOnConfirm = () => {
        // Lógica al CONFIRMAR modal
        onConfirm();    
        setVisible(false);
    };

    // AL 'CANCELAR' OPERACION
    const handleOnCancel = () => {
        // Lógica al CANCELAR modal
        onCancel();    
        setVisible(false);
    };

    if (!visible) return null; // No renderiza nada si está oculto

    return (
        <View style={styles.wrapper}>
            <View style={styles.overlay}>

                <Animated.View style={styles.modal} 
                    entering={FadeInDown.duration(200)}
                    exiting={FadeOutDown.duration(200)}
                >
                    <Text style={styles.title}>{title}</Text>

                    <View style={styles.buttons}>
                        <Pressable
                            style={ ({pressed}) => [
                                styles.btn, 
                                {
                                    backgroundColor: pressed ? "#585858" : null,
                                }
                            ]}
                            onPress={handleOnCancel}
                        >
                            <Text style={styles.btn_Text}>{cancelText}</Text>
                        </Pressable>

                        <Text style={[styles.btn_Text, {opacity: 0.3}]}>|</Text>

                        <Pressable
                            style={({pressed}) => [
                                styles.btn, 
                                {
                                    backgroundColor: pressed ? "#585858" : null,
                                }
                            ]}
                            onPress={handleOnConfirm}
                        >
                            <Text style={[styles.btn_Text, {color: colorConfirmText}]}>
                                {confirmText}
                            </Text>
                        </Pressable>

                    </View>

                </Animated.View>
            
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { 
        ...StyleSheet.absoluteFillObject,
        zIndex: 9999,
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
        backgroundColor: "#333333",
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
        borderRadius: 20, 
    },
    btn_Text: {
        textAlign: "center",
        color: "white",
        fontSize: 22,
        fontWeight: 500,
    },
});

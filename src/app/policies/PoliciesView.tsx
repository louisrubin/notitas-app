import { Stack } from "expo-router"
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import HeaderNavigation from "../../components/HeaderNavigation"
import { Colors } from "../../constants/colors"
import { useSettings } from "../../hooks/SettingsContext"
import { app } from "../../../app"
import AntDesign from '@expo/vector-icons/AntDesign';
import HorizontalLine from "../../components/otros/HorizontalLine"

type IconName = 'linkedin-square' | 'heart' | 'github';

export default function PoliciesView() {
    const {theme} = useSettings();
    const ThemeValue = Colors[theme.value];

    
    const styles = StyleSheet.create({
        container: {
            flex: 1, 
            paddingTop: 20,
            paddingHorizontal: 24,
            backgroundColor: ThemeValue.background
        },
        title: {
            // textAlign: "center",
            color: ThemeValue.text,
            fontSize: 40,
            fontWeight: 700,
            marginBottom: 15,
            // backgroundColor: "tomato"
        },
        text: {
            color: ThemeValue.text,
            fontSize: 18, 
            textAlign: "justify", 
            // marginBottom: 5,
        },
        social: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
            gap: 40,
        },
        link: {
            padding: 10,
            borderRadius: 30,
            backgroundColor: ThemeValue.bgOnPressed
        },
    })

    function Subtitle_X({children}) {
        return(
            <Text style={[styles.text, 
                    {fontSize: 20, fontWeight: 700, textAlign: "center"}
            ]}>
                {children}
            </Text>
        )
    }

    function Bold({text} : {text: string} ) {
        return(
            <Text style={{fontSize: 18, fontWeight: 900}}>
                {text}
            </Text>
        )
    }

    function Social({ url = "#", iconName }: { url?: string; iconName: IconName }){
        return(
            <Pressable 
                style={styles.link}
                onPress={() => Linking.openURL(url)}
            >
                <AntDesign name={iconName} size={30} color={ThemeValue.bgPressedCreateButton}/>
            </Pressable>
        )
    }

    return(
        <>
        <Stack.Screen 
            options={{ header: () => <HeaderNavigation />}} 
        />

        <ScrollView style={styles.container}>
            {/* HEADER */}
            <View style={{alignItems: "center", marginBottom: 15, }}>
                <Text style={styles.title}>
                    {app.name}
                </Text>

                <Text style={{color: ThemeValue.subtitle, fontSize: 16,}}>
                    Versión {app.version}
                </Text>
            </View>

            <HorizontalLine />

            <View style={{flex: 1, gap: 15, marginTop: 10}}>
                <Subtitle_X>
                    Privacidad
                </Subtitle_X>

                <Text style={styles.text}>
                    <Bold text="1."/> En <Bold text={app.name}/>, valoramos tu privacidad y seguridad. 
                    Queremos que tengas la tranquilidad de que tus notas, 
                    ideas y recuerdos están protegidos y bajo tu control.
                </Text>
                

                <Subtitle_X>
                    Sobre la app
                </Subtitle_X>

                <View>
                    <Text style={styles.text}>
                        <Bold text="2."/> <Bold text={app.name}/> es una app pensada para que cualquier persona pueda anotar ideas, 
                        recordatorios o información importante de forma rápida y sencilla. No necesita 
                        internet para funcionar, porque guarda todo directamente en el teléfono usando 
                        SQLite, lo que asegura que las notas siempre estén disponibles y protegidas.
                    </Text>
                </View>

                <Subtitle_X>
                    Origen del proyecto
                </Subtitle_X>

                <View>
                    <Text style={styles.text}>
                        <Bold text="3."/> La idea de <Bold text={app.name}/> surgió en las vacaciones de invierno del 2025, justo después 
                        de que su creador aprobara las materias de la facultad del primer cuatrimestre de 
                        ese último año que le quedaba. Con algo de tiempo 
                        libre y muchas ganas de aprender más sobre desarrollo mobile, decidió crear 
                        una app que no solo fuera útil, sino que también le permitiera experimentar 
                        y reforzar conocimientos.
                    </Text>
                    <Text style={styles.text}>
                        La elección de SQLite como principal característica fue el punto de partida 
                        para comenzar y dar forma a esta app de notas.
                    </Text>
                </View>

                <Subtitle_X>
                    Sobre el creador
                </Subtitle_X>

                <Text style={styles.text}>
                    <Bold text="4."/> Detrás de <Bold text={app.name}/> hay un desarrollador apasionado por la 
                    programación, con el interés de crear apps amigables mientras aprende nuevas
                    tecnologías y lenguajes de desarrollo.
                </Text>                
            </View>

            <View style={{marginTop: 50}}>
                <Text style={styles.text}>
                    Expo: <Text style={{fontWeight:900}}>~52.0.47</Text>
                </Text>
                <Text style={styles.text}>
                    SQLite: <Text style={{fontWeight:900}}>~15.1.4</Text>
                </Text>
                <Text style={styles.text}>
                    React Native: <Text style={{fontWeight:900}}>0.76.9</Text>
                </Text>
                <Text style={styles.text}>
                    TypeScript: <Text style={{fontWeight:900}}>^5.3.3</Text>
                </Text>
            </View>
            


            {/* REDES SOCIALES */}
            <View style={styles.social}>
                <Social url="https://www.linkedin.com/in/luisrubin/" iconName="linkedin-square" />

                <Social iconName="heart" />
                
                <Social url="https://github.com/louisrubin/" iconName="github" />
            </View>

            <View style={{height: 300}} />

        </ScrollView>
        </>
    )
}


import { useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DropDownItem, getListItem, KeyType } from '../constants/DropDownLists';
import TitleX from './TitleX';
import { useDropDown } from '../hooks/DropDownContext';
import { Colors } from '../constants/colors';
import { useSettings } from '../hooks/SettingsContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage

interface Prop {
    id?: string;
    settingKey: KeyType; // indica qué setting es
    title: string;
    zIndex?: number;
    zIndexInverse?: number;
    containerStyle?: ViewStyle;
}

export default function LabelWithDropdown( { id, title,  
zIndex, zIndexInverse, settingKey, containerStyle }: Prop ) {

    const { theme } = useSettings();

    const { getSavedSettingValue, cambiarSetting } = useSettings();   // al cambiar la opcion elegida
    const { openKey, setOpenKey } = useDropDown();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(getSavedSettingValue(settingKey));
    const [items, setItems] = useState<DropDownItem[]>(getListItem(settingKey));
    
    // identificador único para este picker
    const pickerId = title; // O usa un ID único
    const handleOpen = () => {
        setOpenKey(pickerId);
    };

    useEffect(() => {
        if (openKey !== pickerId) {
            setOpen(false);
        }
    }, [openKey]);
    
    // Cuando seleccionas una opción en el DropDownPicker 'selectedValue'
    const handleOnChangeValue = (selectedValue: string | null) => {
        // busca el item acorde al valor string
        const selectedItem = items.find(item => item.value === selectedValue);
        if (selectedItem) { // si hubo coincidencias
            cambiarSetting(settingKey, selectedItem);
        }
    }

    return(
        <View style={[styles.container, containerStyle]}>
            <TitleX text={title} style={{width: "50%", color: Colors[theme.value].text}} />

            <DropDownPicker 
                key={id}                
                open={open}     
                value={value}   // State variable that specifies the value of the selected item
                items={items}    // State variable that holds the items.
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                listMode="SCROLLVIEW"   // usar internamente un ScrollView en lugar de FlatList
                closeOnBackPressed={true}

                onOpen={handleOpen}
                onChangeValue={handleOnChangeValue}
                zIndex={zIndex}
                zIndexInverse={zIndexInverse}

                // ESTILOS
                style={{ borderWidth: 0, paddingRight: 0,  backgroundColor: "transparent" }}
                containerStyle={{width: "50%",}}
                
                textStyle={{fontWeight: "600",}}
                labelStyle={{ fontWeight: "600", textAlign: "right", color: Colors[theme.value].text }}

                selectedItemContainerStyle={{ backgroundColor: "#b3e5fc"}}

                dropDownContainerStyle={{ 
                    backgroundColor: Colors.light.background, 
                    borderStartStartRadius: 6 
                }}

                ArrowDownIconComponent={() => (
                    <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors[theme.value].text} />
                )}
                ArrowUpIconComponent={() => (
                    <MaterialIcons name="keyboard-arrow-up" size={24} color={Colors[theme.value].text} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    // containerStyle: {
    //     width: "50%",
    // }
});
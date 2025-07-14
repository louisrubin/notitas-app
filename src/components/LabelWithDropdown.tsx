import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DropDownItem, getListItem, KeyType } from '../constants/DropDownLists';
import TitleX from './TitleX';
import { useDropDown } from '../hooks/DropDownContext';
import { Colors } from '../constants/colors';
import { useSettings } from '../hooks/SettingsContext';


// https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage

interface Prop {
    id?: string;
    settingKey: KeyType; // indica qué setting es
    title: string;
    valueDefault?: DropDownItem | null;
    // itemsList: DropDownItem[];
    zIndex?: number;
    zIndexInverse?: number;
}

export default function LabelWithDropdown( { id, title, valueDefault, 
 zIndex, zIndexInverse, settingKey }: Prop ) {

    // const itemList = OPTENER LISTA DE DROPDOWN LIST A PARTIR DEL settingKey
    const { cambiarSetting } = useSettings();   // al cambiar la opcion elegida
    const { openKey, setOpenKey } = useDropDown();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(valueDefault?.value ?? null);
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
        <View style={styles.container}>
            <TitleX text={title} style={{ width: "59%" }} />
            <DropDownPicker 
                key={id}                
                open={open}     
                value={value}   // State variable that specifies the value of the selected item
                items={items}    // State variable that holds the items.
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                listMode="SCROLLVIEW"   // indica que use internamente un ScrollView en lugar de FlatList
                closeOnBackPressed={true}

                onOpen={handleOpen}
                onChangeValue={handleOnChangeValue}
                zIndex={zIndex}
                zIndexInverse={zIndexInverse}

                // ESTILOS

                style={{ borderWidth: 0,  backgroundColor: "transparent" }}
                containerStyle={{ width: "41%",  }}
                
                textStyle={{fontWeight: "600"}}
                labelStyle={{ fontWeight: "600", textAlign: "right" }}

                selectedItemContainerStyle={{ backgroundColor: "#b3e5fc"}}
                dropDownContainerStyle={{ backgroundColor: Colors.light.background, borderStartStartRadius: 6 }}
                
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
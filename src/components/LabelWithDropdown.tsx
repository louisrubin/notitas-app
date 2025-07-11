import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DropDownItem } from '../constants/DropDownLists';
import TitleX from './TitleX';
import { useDropDown } from '../hooks/DropDownContext';

// https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage

interface Prop {
    id?: string;
    title: string;
    valueDefault?: DropDownItem | null;
    itemsList: DropDownItem[];
    zIndex?: number;
    zIndexInverse?: number;

}

export default function LabelWithDropdown( {id, title, valueDefault = null, itemsList, zIndex, zIndexInverse}: Prop ) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(valueDefault?.value ?? null);
    const [items, setItems] = useState<DropDownItem[]>(itemsList);
    
    const { openKey, setOpenKey } = useDropDown();

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
                
                zIndex={zIndex}
                zIndexInverse={zIndexInverse}

                style={{ borderWidth: 0,  backgroundColor: "transparent" }}
                containerStyle={{ width: "41%",  }}
                
                textStyle={{fontWeight: "600"}}
                labelStyle={{ fontWeight: "600", textAlign: "right" }}

                selectedItemContainerStyle={{ backgroundColor: "#b3e5fc"}}
                dropDownContainerStyle={{ borderStartStartRadius: 6 }}
                closeOnBackPressed={true}

                onOpen={handleOpen}
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
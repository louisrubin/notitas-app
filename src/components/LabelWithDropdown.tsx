import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DropDownItem } from '../constants/DropDownLists';
import TitleX from './TitleX';

// https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage

interface Prop {
    title: string;
    itemsList: DropDownItem[];
    zIndex?: number;
    zIndexInverse?: number;

}

export default function LabelWithDropdown( {title, itemsList, zIndex, zIndexInverse}: Prop ) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState<DropDownItem[]>(itemsList);
    
    return(
        <View style={styles.container}>
            <TitleX text={title} style={{ width: "60%" }} />
            <DropDownPicker 
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
                containerStyle={{ width: "40%",  }}
                
                textStyle={{fontWeight: "600"}}
                labelStyle={{ fontWeight: "600", textAlign: "right" }}

                selectedItemContainerStyle={{ backgroundColor: "#b3e5fc"}}
                listChildContainerStyle={{  }}
                dropDownContainerStyle={{ borderStartStartRadius: 6 }}

            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        // backgroundColor: "tomato"
    },

});
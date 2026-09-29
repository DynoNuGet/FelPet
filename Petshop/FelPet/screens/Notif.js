import { View, TouchableOpacity, Text, StyleSheet } from "react-native"; 

import Cabecalho from "../components/cabecalho.js";
import NavBar from "../components/navBar.js";
export default function Notif({navigator}) {
    return(
        <View>
            <Cabecalho/>
            <NavBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
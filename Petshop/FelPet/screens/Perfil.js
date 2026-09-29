import { View, TouchableOpacity, Text, StyleSheet } from "react-native"; 

import NavBar from "../components/navBar.js";
import Cabecalho from "../components/cabecalho.js";
export default function Perfil({navigator}) {
    return(
        <View style={styles.container}>
            <Cabecalho/>
            <View style={{flex:1}}>
                efefe
            </View>
            <NavBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
})
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"; 


import Cabecalho from "../components/cabecalho.js";
import NavBar from "../components/navBar.js";
export default function Home({navigator}) {
    return(
        <View style={styles.container}>
            <Cabecalho/>
            <View style={styles.optionView}>
                <View style={styles.optionHorView}>
                    <TouchableOpacity style={{...styles.optionButton, backgroundColor: 'rgb(181, 161, 255)'}}>
                        <Text style={styles.optionText}>Agendar banho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.optionButton, backgroundColor: 'rgb(255, 172, 88)'}}>
                        <Text style={styles.optionText}>Agendar tosa</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.optionHorView}>
                    <TouchableOpacity style={{...styles.optionButton, backgroundColor: 'rgb(75, 255, 195)'}}>
                        <Text style={styles.optionText}>Agendar consulta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.optionButton, backgroundColor: 'rgb(233, 224, 97)'}}>
                        <Text style={styles.optionText}>Comprar produtos</Text>
                    </TouchableOpacity>
                </View>
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
    optionView: {
        flex: 1,
        marginHorizontal: 20,
        aspectRatio: 1,
        marginBottom: 350,
        marginTop: 100,
        borderRadius: 20,
        marginHorizontal: 20,
    },
    optionHorView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionButton: {
        flex: 1,
        height: '100%',
        width: '45%',
        borderRadius: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 30,
    },
    optionText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        color: '#FFF',
        textAlign: 'center',
    }
})
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function NavBar({}) {
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Home')}>
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Notificações')}>
                <Text>Notificações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Perfil')}>
                <Text>Perfil</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 50,
        width: '80%',
        marginBottom: 20,
        flexDirection: 'row',
    },
    button: {
        marginVertical: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
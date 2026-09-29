import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Cabecalho() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>{route.name}</Text>
      </View>
      
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <Image 
          source={{ uri: 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png' }} 
          style={styles.imagemPerfil}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    position: 'relative',
  },
  containerTitulo: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  imagemPerfil: {
    width: 40, 
    height: 40,
    borderRadius: 20,
  }
});

import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

// Como o app se comporta quando a notificação chega com ele aberto.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const CANAL = "default";

// Tipos de notificação do app
export const TIPOS = {
  confirmacao: { rotulo: "Agendamento confirmado", emoji: "✅" },
  lembrete: { rotulo: "Lembrete", emoji: "⏰" },
  pedido: { rotulo: "Pedido", emoji: "🛍️" },
  geral: { rotulo: "Aviso", emoji: "🔔" },
};

export async function prepararNotificacoes() {
  if (Platform.OS === "android") {
    // No Android 13+ o pedido de permissão só aparece depois que existe um canal.
    await Notifications.setNotificationChannelAsync(CANAL, {
      name: "FelPet",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF7A59",
    });
  }
  const atual = await Notifications.getPermissionsAsync();
  if (atual.granted) return true;
  const pedido = await Notifications.requestPermissionsAsync();
  return pedido.granted;
}

/**
 * quando: null -> imediata | number -> em N segundos | Date -> na data informada
 */
export function enviarNotificacao({ tipo, titulo, corpo, quando = null, dados = {} }) {
  let trigger;
  if (quando instanceof Date) {
    trigger = { type: Notifications.SchedulableTriggerInputTypes.DATE, date: quando, channelId: CANAL };
  } else if (typeof quando === "number" && quando > 0) {
    trigger = {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: quando,
      channelId: CANAL,
    };
  } else {
    trigger = { channelId: CANAL };
  }

  return Notifications.scheduleNotificationAsync({
    content: { title: titulo, body: corpo, data: { tipo, ...dados } },
    trigger,
  });
}

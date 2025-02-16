/* global NDEFReader */
import { useEffect } from "react";

const useNFCReader = (setCardId) => {
  useEffect(() => {
    if (typeof window !== "undefined" && "NDEFReader" in window) {
      const ndef = new NDEFReader();

      ndef
        .scan()
        .then(() => {
          console.log("Escaneando NFC...");

          ndef.onreading = (event) => {
            console.log("🔍 Evento NFC Detectado:", event);

            // Obtener número de serie de la tarjeta
            const serialNumber = event.serialNumber || "Desconocido";

            // Si la tarjeta no tiene datos NDEF, la tratamos como NTAG215 vacía
            if (!event.message || event.message.records.length === 0) {
              console.warn(
                "⚠️ Tarjeta NTAG215 sin datos NDEF detectada."
              );
              setCardId(`📡 NTAG215 vacía (SN: ${serialNumber})`);
              return;
            }

            const decoder = new TextDecoder();
            for (const record of event.message.records) {
              let cardData = "⚠️ Formato desconocido";

              try {
                if (record.data instanceof DataView) {
                  const buffer = new Uint8Array(record.data.buffer);
                  cardData = decoder.decode(buffer);
                } else if (record.data instanceof ArrayBuffer) {
                  cardData = decoder.decode(record.data);
                } else {
                  console.warn("⚠️ Tipo de datos NFC inesperado:", record.data);
                }
              } catch (error) {
                console.error(
                  "❌ Error al decodificar datos NFC:",
                  error
                );
                cardData = `⚠️ Error al leer datos (SN: ${serialNumber})`;
              }

              console.log("✅ Tarjeta detectada:", cardData);
              setCardId(`📡 Tarjeta: ${cardData} (SN: ${serialNumber})`);
            }
          };
        })
        .catch((error) => console.error("Error al escanear NFC:", error));
    } else {
      console.log("⚠️ Tu navegador no soporta NFC.");
    }
  }, [setCardId]);
};

export default useNFCReader;

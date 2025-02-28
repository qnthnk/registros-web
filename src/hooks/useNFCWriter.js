/* global NDEFReader */
const useNFCWriter = () => {
    const writeToNfc = async (text, setItWorks) => {
      if (typeof window !== "undefined" && "NDEFReader" in window) {
        try {
          const ndef = new NDEFReader();
          console.log("Intentando escribir en la tarjeta NFC...");
          // Escribimos un mensaje NDEF con un registro de texto
          await ndef.write({
            records: [
              { recordType: "text", data: text }
            ]
          });
          console.log("¡Escritura exitosa!");
          setItWorks("Funcionó");
        } catch (error) {
          console.error("Error al escribir en la tarjeta NFC:", error);
          setItWorks("Algo salió mal");
        }
      } else {
        console.error("NFC no es soportado en este navegador.");
        setItWorks("Algo salió mal");
      }
    };
  
    return writeToNfc;
  };
  
  export default useNFCWriter;
  
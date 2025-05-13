import React from 'react';
import './Ayuda.css';
import tope from './../img/Blanco.png';

const faqData = [
  {
    question: "¿Cómo registro un nuevo socio?",
    answer:
      "Para registrar un nuevo socio, debes dirigirte al menú 'Nuevo Registro'. Asegurate de utilizar un CURP válido que no haya sido ingresado previamente."
  },
  {
    question: "¿Puedo editar o eliminar un registro?",
    answer:
      "Sí, puedes editar o eliminar un registro siempre y cuando el socio aún no haya sido declarado como pagado. Para editarlo, simplemente ingresá al menú 'Nuevo Registro' y proporciona el CURP correspondiente. El sistema te indicará que se está efectuando una actualización."
  },
  {
    question: "¿Qué sucede una vez que se declara un registro como pagado?",
    answer:
      "Una vez declarado el pago de un usuario, no hay vuelta atrás. El pago se informa solo si el socio pagó, y esa información se guarda en la base de datos para su contabilización."
  },
  {
    question: "¿Cómo funciona la opción de limpiar campos?",
    answer:
      "En el menú 'Nuevo Registro' encontrás una casilla desmarcable que, al guardar un registro exitosamente, limpia todos los campos. Si lo necesitas, puedes desactivar esa opción. Además, hay un botón 'Limpiar campos' justo al lado de 'Crear Socio'."
  },
  {
    question: "¿Quién puede ver los registros totales de todos los usuarios?",
    answer:
      "Solo los usuarios administradores tienen acceso a ver los registros de todos los usuarios. Los usuarios normales solo pueden visualizar los últimos 50 registros de su propia sesión y declararlos como pagos."
  },
  {
    question: "¿Qué hago si mi registro excede los últimos 50?",
    answer:
      "Si realizaste un registro que quieres informar como pago y ya excede los últimos 50 registros, puedes buscarlo vía CURP en el menú 'Busca Socio'. Ahí verás solo los registros generados en tu sesión; solo el administrador tiene acceso a la búsqueda completa del padrón."
  },
  {
    question: "¿Qué opciones tienen los administradores?",
    answer:
      "Los administradores pueden acceder al menú 'Obtener listas', donde revisan el estado de cada registro y, si es necesario, informan el pago. También tienen acceso al menú 'Usuarios', donde pueden crear, editar o eliminar usuarios, otorgar permisos de administrador y descargar listas de registros filtradas por usuario."
  },
  {
    question: "¿Dónde encuentro más información sobre las herramientas?",
    answer:
      "Cada usuario puede ver un resumen de todas las herramientas disponibles en esta web ingresando a 'Perfil / Ayuda'."
  }
];

const Ayuda = () => {
  return (
        <>
        <img src={tope} style={{width:"100%", height:"90px"}} alt="tope" className="tope" />
    
    <div className="grid-form p-5" style={{height:"65vh"}}>
      <h1 className='mb-4'>Preguntas Frecuentes</h1>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <details key={index} className="faq-item">
            <summary className="faq-question">{faq.question}</summary>
            <p className="faq-answer">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
    </>
  );
};

export default Ayuda;

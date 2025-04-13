import React, { useState } from "react";


export const App = () => {

    const [data, setData] = useState(
        [
            {
                "name": "string",
                "id": 0
            }
        ]
    );

    return (
        fetch('https://playground.4geeks.com/todo/todos/vbarbosa', {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(resp => {
              console.log(resp.ok); // Será true si la respuesta es exitosa
              console.log(resp.status); // El código de estado 201, 300, 400, etc.
              return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
          })
          .then(data => {
              
              console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
          })
          .catch(error => {
              // Manejo de errores
              console.log(error);
          })
    ); 
}
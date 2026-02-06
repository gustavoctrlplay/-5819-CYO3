import React from "react";

export default function page() {
  const lista = ["Ana", "Arthur", "Davi", "Thomas"];
  const objeto = {
    nome: "Davi",
    sobrenome: "Flato",
    idade: 12,
  };

  const listaDeObjetos = [
    {
      nome: "Ana",
      sobrenome: "Luiza",
      idade: 13,
    },
    {
      nome: "Davi",
      sobrenome: "Flato",
      idade: 12,
    },
    {
        nome: "Thomas",
        sobrenome: "Coelho",
        idade: 14
    }
  ];

  return <div>Pagina da Luiza</div>;
}

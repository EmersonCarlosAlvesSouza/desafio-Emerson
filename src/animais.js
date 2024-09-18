class Animais {
  static biomas = ["savana", "floresta", "rio"];
  static alimentacao = ["carnivoro", "onivoro", "herbivoro"];
  static animais = [

    {
      especie: "MACACO",
      tamanho: 1,
      biomas: ["savana", "floresta"],
      alimentacao: "onivoro",
    },
    {
      especie: "HIPOPOTAMO",
      tamanho: 4,
      biomas: ["savana", "rio"],
      alimentacao: "herbivoro",
    },
    {
      especie: "CROCODILO",
      tamanho: 3,
      biomas: ["rio"],
      alimentacao: "carnivoro",
    },
    {
      especie: "LEOPARDO",
      tamanho: 2,
      biomas: ["savana"],
      alimentacao: "carnivoro",
    },


    {
      especie: "GAZELA",
      tamanho: 2,
      biomas: ["savana"],
      alimentacao: "herbivoro",
    },
    {
      especie: "LEAO",
      tamanho: 3,
      biomas: ["savana"],
      alimentacao: "carnivoro",
    },

  ];

  static obterAnimal(especie) {
    if (typeof especie !== "string" || especie.length < 2) {
      return { erro: "Parâmetro inválido" };
    }

    const animal = this.animais.filter(
      (animal) => animal.especie === especie
    )[0];

    return animal;
  }

  static incluirAnimal(animal) {
    if (typeof animal !== "object") {
      return { erro: "Tipo de parâmetro inválido" };
    }

    if (!Animais.verificaAnimal(animal)) {
      return { erro: "Propriedade(s) do animal inválida(s)" };
    }

    const animalASerIncluso = {
      especie: animal.especie.toUpperCase(),
      tamanho: animal.tamanho,
      biomas: animal.biomas.map((bioma) => bioma.toLowerCase()),
      alimentacao: animal.alimentacao.toLowerCase(),
    };

    this.animais.push(animalASerIncluso);
    return { animalIncluido: animalASerIncluso };
  }

  static verificaAnimal(animal) {
    return (
      typeof animal.especie === "string" &&
      animal.especie.length > 1 &&
      typeof animal.tamanho === "number" &&
      animal.tamanho > 0 &&
      Array.isArray(animal.biomas) &&
      animal.biomas.length > 0 &&
      animal.biomas.every(
        (bioma) =>
          typeof bioma === "string" && this.biomas.includes(bioma.toLowerCase())
      ) &&
      typeof animal.alimentacao === "string" &&
      this.alimentacao.includes(animal.alimentacao.toLowerCase())
    );
  }

  static incluirBioma(bioma) {
    if (typeof bioma !== "string" || bioma.length < 2) {
      return { erro: "Bioma inválido" };
    }
    this.biomas.push(bioma.toLowerCase());
  }

  static incluirTipoAlimentacao(alimentacao) {
    if (typeof alimentacao !== "string" || alimentacao.length < 2) {
      return { erro: "Tipo de alimentação inválido" };
    }
    this.alimentacao.push(alimentacao.toLowerCase());
  }
}
const animalValido = {
  especie: "elefante",
  tamanho: 5,
  biomas: ["Savana", "Floresta"],
  alimentacao: "Herbivoro",
};

const animalInvalido = {
  especie: "",
  tamanho: 5,
  biomas: ["savana"],
  alimentacao: "herbivoro",
};

export { Animais as Animais };

Animais.incluirAnimal(animalInvalido);
Animais.incluirAnimal(animalValido);

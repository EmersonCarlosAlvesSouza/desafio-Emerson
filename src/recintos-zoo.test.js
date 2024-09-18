import { RecintosZoo } from "./recintos-zoo.js";

describe("Testes da classe RecintosZoo", () => {
  let zoo;

  beforeEach(() => {
    zoo = new RecintosZoo();
  });

  describe("Funcionalidade de adicionarAnimalEmRecinto", () => {
    test("Deve adicionar um animal de espécie diferente no recinto viável", () => {
      const resultado = zoo.adicionarAnimalEmRecinto("gazela", 2, 1);
      expect(zoo.erro).toBeFalsy();
      expect(resultado.sucesso).toBe("GAZELA - 2 adicionado(s) ao recinto 1");
      expect(zoo.recintosExistentes[0].animaisExistentes.length).toBe(2);
      expect(zoo.recintosExistentes[0].animaisExistentes[1].especie).toBe(
        "GAZELA"
      );
      expect(zoo.recintosExistentes[0].animaisExistentes[1].quantidade).toBe(2);
    });

    test("Deve adicionar animal no recinto viável", () => {
      const resultado = zoo.adicionarAnimalEmRecinto("macaco", 3, 1);
      expect(zoo.erro).toBeFalsy();
      expect(resultado.sucesso).toBe("MACACO - 3 adicionado(s) ao recinto 1");
      expect(zoo.recintosExistentes[0].animaisExistentes[0].quantidade).toBe(6);
    });

    test("Deve rejeitar número de recinto inválido para adicionar", () => {
      zoo.adicionarAnimalEmRecinto("hipopotamo", 1, 7);
      expect(zoo.erro).toBe("Número do recinto inválido");
    });

    test("Deve rejeitar recinto inviável para adicionar animal", () => {
      zoo.adicionarAnimalEmRecinto("hipopotamo", 1, 1);
      expect(zoo.erro).toBe("Recinto 1 não é viável");
    });
  });

  describe("Funcionalidade de removerAnimalDeRecinto", () => {
    test("Deve remover a quantidade especificada de um animal no recinto", () => {
      const resultado = zoo.removerAnimalDeRecinto("macaco", 2, 1);
      expect(zoo.erro).toBeFalsy();
      expect(resultado.sucesso).toBe("MACACO - 2 removido(s) do recinto 1");
    });

    test("Deve remover o animal do recinto", () => {
      const resultado = zoo.removerAnimalDeRecinto("macaco", 3, 1);
      expect(zoo.erro).toBeFalsy();
      expect(resultado.sucesso).toBe("MACACO - 3 removido(s) do recinto 1");
    });

    test("Deve rejeitar número de recinto inválido ao tentar remover animal", () => {
      zoo.removerAnimalDeRecinto("hipopotamo", 1, 0);
      expect(zoo.erro).toBe("Número do recinto inválido");
    });

    test("Não deve remover animal inexistente no recinto", () => {
      zoo.removerAnimalDeRecinto("macaco", 3, 2);
      expect(zoo.erro).toBe("Não há macaco suficiente no recinto 2");
    });
  });

  describe("Funcionalidade de análise de recintos", () => {
    test("Deve retornar erro ao faltar parâmetros", () => {
      zoo.analisaRecintos("LEAO");
      expect(zoo.erro).toBe("Parâmetro(s) inválido(s)");
      expect(zoo.recintosViaveis.length).toBeFalsy();
    });

    test("Deve rejeitar quantidade inválida", () => {
      zoo.analisaRecintos("MACACO", 0);
      expect(zoo.erro).toBe("Quantidade inválida");
      expect(zoo.recintosViaveis.length).toBeFalsy();
    });

    test("Deve rejeitar animal inexistente", () => {
      zoo.analisaRecintos("UNICORNIO", 1);
      expect(zoo.erro).toBe("Animal inválido");
      expect(zoo.recintosViaveis.length).toBeFalsy();
    });

    test("Não deve encontrar recinto para 10 macacos", () => {
      zoo.analisaRecintos("MACACO", 10);
      expect(zoo.erro).toBe("Não há recinto viável");
      expect(zoo.recintosViaveis.length).toBeFalsy();
    });

    test("Deve encontrar um recinto para 1 crocodilo", () => {
      zoo.analisaRecintos("CROCODILO", 1);
      expect(zoo.erro).toBeFalsy();
      expect(zoo.recintosViaveis[0].info).toBe(
        "Recinto 4 (espaço livre: 5 total: 8)"
      );
      expect(zoo.recintosViaveis.length).toBe(1);
    });

    test("Deve encontrar três recintos para 2 macacos", () => {
      zoo.analisaRecintos("MACACO", 2);
      expect(zoo.erro).toBeFalsy();
      expect(zoo.recintosViaveis.length).toBe(3);
      expect(zoo.recintosViaveis[0].info).toBe(
        "Recinto 1 (espaço livre: 5 total: 10)"
      );
      expect(zoo.recintosViaveis[1].info).toBe(
        "Recinto 2 (espaço livre: 3 total: 5)"
      );
      expect(zoo.recintosViaveis[2].info).toBe(
        "Recinto 3 (espaço livre: 2 total: 7)"
      );
    });

    test("Deve encontrar dois recintos para 5 macacos", () => {
      zoo.analisaRecintos("MACACO", 5);
      expect(zoo.erro).toBeFalsy();
      expect(zoo.recintosViaveis.length).toBe(2);
      expect(zoo.recintosViaveis[0].info).toBe(
        "Recinto 1 (espaço livre: 2 total: 10)"
      );
      expect(zoo.recintosViaveis[1].info).toBe(
        "Recinto 2 (espaço livre: 0 total: 5)"
      );
    });

    test("Deve encontrar dois recintos para 1 macaco", () => {
      zoo.analisaRecintos("MACACO", 1);
      expect(zoo.erro).toBeFalsy();
      expect(zoo.recintosViaveis.length).toBe(2);
      expect(zoo.recintosViaveis[0].info).toBe(
        "Recinto 1 (espaço livre: 6 total: 10)"
      );
      expect(zoo.recintosViaveis[1].info).toBe(
        "Recinto 3 (espaço livre: 3 total: 7)"
      );
    });

    test("Deve encontrar dois recintos para 1 hipopótamo", () => {
      zoo.analisaRecintos("hipopotamo", 1);
      expect(zoo.erro).toBeFalsy();
      expect(zoo.recintosViaveis.length).toBe(2);
      expect(zoo.recintosViaveis[0].info).toBe(
        "Recinto 3 (espaço livre: 0 total: 7)"
      );
      expect(zoo.recintosViaveis[1].info).toBe(
        "Recinto 4 (espaço livre: 4 total: 8)"
      );
    });

    test("Deve encontrar um recinto para 2 leões", () => {
      zoo.analisaRecintos("LEAO", 2);
      expect(zoo.erro).toBeFalsy();
      expect(zoo.recintosViaveis.length).toBe(1);
      expect(zoo.recintosViaveis[0].info).toBe(
        "Recinto 5 (espaço livre: 0 total: 9)"
      );
    });

    test("Deve encontrar um recinto para 2 hipopótamos", () => {
      zoo.analisaRecintos("hipopotamo", 2);
      expect(zoo.erro).toBeFalsy();
      expect(zoo.recintosViaveis.length).toBe(1);
      expect(zoo.recintosViaveis[0].info).toBe(
        "Recinto 4 (espaço livre: 0 total: 8)"
      );
    });

    test("Deve encontrar dois recintos para 2 gazelas", () => {
      zoo.analisaRecintos("GAZELA", 2);
      expect(zoo.erro).toBeFalsy();
      expect(zoo.recintosViaveis.length).toBe(2);
      expect(zoo.recintosViaveis[0].info).toBe(
        "Recinto 1 (espaço livre: 2 total: 10)"
      );
      expect(zoo.recintosViaveis[1].info).toBe(
        "Recinto 3 (espaço livre: 1 total: 7)"
      );
    });

    test("Deve encontrar um recinto para 3 elefantes", () => {
      zoo.incluirRecintos([
        {
          numero: 6,
          biomas: ["savana", "rio"],
          tamanhoTotal: 20,
          animaisExistentes: [{ especie: "HIPOPOTAMO", quantidade: 1 }],
        },
      ]);
      zoo.analisaRecintos("elefante", 3);
      expect(zoo.erro).toBeFalsy();
      expect(zoo.recintosViaveis.length).toBe(1);
      expect(zoo.recintosViaveis[0].info).toBe(
        "Recinto 6 (espaço livre: 0 total: 20)"
      );
    });

    test("Não deve encontrar recintos para 2 leopardos", () => {
      zoo.analisaRecintos("LEOPARDO", 2);
      expect(zoo.erro).toBe("Não há recinto viável");
      expect(zoo.recintosViaveis.length).toBeFalsy();
    });
  });
});

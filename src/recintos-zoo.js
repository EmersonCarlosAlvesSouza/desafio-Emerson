class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: [{ especie: 'LEAO', quantidade: 1 }] },
        ];

        this.animaisPermitidos = {
            LEAO: { tamanho: 3, bioma: ['savana'] },
            LEOPARDO: { tamanho: 2, bioma: ['savana'] },
            CROCODILO: { tamanho: 3, bioma: ['rio'] },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, bioma: ['savana'] },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] },
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animaisPermitidos[animal]) {
            return { erro: 'Animal inválido', recintosViaveis: null };
        }

        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida', recintosViaveis: null };
        }

        const animalInfo = this.animaisPermitidos[animal];
        const recintosViaveis = [];

        this.recintos.forEach((recinto) => {
            const espaçoOcupado = recinto.animaisExistentes.reduce((total, a) => {
                return total + this.animaisPermitidos[a.especie].tamanho * a.quantidade;
            }, 0);

            const espaçoLivre = recinto.tamanhoTotal - espaçoOcupado;

            const biomaPermitido = animal === 'CROCODILO' 
                ? recinto.bioma === 'rio'
                : recinto.bioma.split(' e ').some(bioma => animalInfo.bioma.includes(bioma));

            const temCarnivoro = recinto.animaisExistentes.some(a => ['LEAO', 'LEOPARDO'].includes(a.especie));

            const podeAlocarMacaco = !(animal === 'MACACO' && recinto.animaisExistentes.length === 0 && quantidade === 1);

            const temEspaçoSuficiente = espaçoLivre >= animalInfo.tamanho * quantidade;

            if (biomaPermitido && temEspaçoSuficiente && podeAlocarMacaco && !temCarnivoro) {
                const novoEspaçoLivre = espaçoLivre - (animalInfo.tamanho * quantidade);
                recintosViaveis.push({
                    numero: recinto.numero,
                    descricao: `Recinto ${recinto.numero} (espaço livre: ${novoEspaçoLivre} total: ${recinto.tamanhoTotal})`,
                });
            }
        });

        recintosViaveis.sort((a, b) => a.numero - b.numero);

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável', recintosViaveis: null };
        }

        return { erro: null, recintosViaveis: recintosViaveis.map(r => r.descricao) };
    }
}

export { RecintosZoo as RecintosZoo };

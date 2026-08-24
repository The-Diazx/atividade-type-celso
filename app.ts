function calcularPesoIdeal(sexo: string, altura: number): number {
    if (altura <= 0) {
        throw new Error("A altura deve ser maior que zero.");
    }

    const sexoFormatado = sexo.toUpperCase();

    if (sexoFormatado === "M") return (72.7 * altura) - 58;
    if (sexoFormatado === "F") return (62.1 * altura) - 44.7;

    throw new Error("Informe M ou F.");
}

function mostrarResultado(nome: string, sexo: string, altura: number): void {
    try {
        const peso = calcularPesoIdeal(sexo, altura);
        console.log(`${nome} (${altura}m): peso ideal estimado = ${peso.toFixed(2)} kg`);
    } catch (erro) {
        console.log(`${nome}: erro - ${(erro as Error).message}`);
    }
}

interface Pessoa {
    nome: string;
    sexo: string;
    altura: number;
}

const pessoas: Pessoa[] = [
    { nome: "João", sexo: "M", altura: 1.80 },
    { nome: "Ana", sexo: "f", altura: 1.65 },
    { nome: "Carlos", sexo: "m", altura: 1.75 },
];

for (const pessoa of pessoas) {
    mostrarResultado(pessoa.nome, pessoa.sexo, pessoa.altura);
}

mostrarResultado("Erro Teste", "X", 1.70);
mostrarResultado("Altura Inválida", "M", -1);
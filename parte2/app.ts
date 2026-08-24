/*
    DOM (Document Object Model)
    ---------------------------
    É a representação da página HTML em forma de objetos que o
    TypeScript consegue "enxergar" e manipular. Usamos
    document.getElementById() para localizar, dentro do DOM, cada
    elemento criado no HTML (formulário, campos e botões) e guardamos
    essa referência em uma constante.
*/
const formulario = document.getElementById("formPeso") as HTMLFormElement;
const campoNome = document.getElementById("nome") as HTMLInputElement;
const campoSexo = document.getElementById("sexo") as HTMLSelectElement;
const campoAltura = document.getElementById("altura") as HTMLInputElement;
const resultado = document.getElementById("resultado") as HTMLDivElement;
const btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;

// Texto mostrado antes de qualquer cálculo (e para onde voltamos
// quando o usuário clica em Limpar ou em Novo cálculo).
const mensagemInicial = "Preencha os dados e clique em calcular.";

/*
    Função de cálculo (mesma lógica da Parte 1).
    Recebe sexo e altura e devolve o peso ideal estimado.
*/
function calcularPesoIdeal(sexo: string, altura: number): number {
    if (sexo === "M") {
        return (72.7 * altura) - 58;
    }

    if (sexo === "F") {
        return (62.1 * altura) - 44.7;
    }

    return 0;
}

// Traduz o value do <select> ("M"/"F") para um texto amigável no cartão.
function textoSexo(sexo: string): string {
    return sexo === "M" ? "Homem" : "Mulher";
}

// Exibe uma mensagem de erro dentro da própria div de resultado.
function exibirErro(mensagem: string): void {
    resultado.textContent = mensagem;
    resultado.classList.add("erro");
}

// Volta o formulário e o resultado ao estado inicial.
// É usada tanto pelo botão LIMPAR quanto pelo botão "Novo cálculo".
function reiniciarFormulario(): void {
    formulario.reset();
    resultado.classList.remove("erro");
    resultado.innerHTML = mensagemInicial;
}

/*
    addEventListener("submit", ...)
    --------------------------------
    "Escuta" o evento de envio do formulário — disparado ao clicar no
    botão type="submit" ou pressionar Enter — e executa a função
    informada sempre que esse evento acontecer.
*/
formulario.addEventListener("submit", function (evento: Event) {

    /*
        preventDefault()
        -----------------
        Por padrão, o navegador recarregaria a página ao enviar um
        formulário. Chamar preventDefault() cancela esse comportamento,
        para que o próprio TypeScript controle o que acontece em
        seguida, sem perder os dados já digitados.
    */
    evento.preventDefault();

    resultado.classList.remove("erro");

    const nome: string = campoNome.value.trim();
    const sexo: string = campoSexo.value;
    const altura: number = Number(campoAltura.value);

    // --- Validações: campos vazios e altura inválida ---
    if (nome === "") {
        exibirErro("Informe o nome.");
        return;
    }

    if (sexo !== "M" && sexo !== "F") {
        exibirErro("Selecione o sexo.");
        return;
    }

    if (!(altura > 0)) {
        exibirErro("Informe uma altura válida.");
        return;
    }

    const peso: number = calcularPesoIdeal(sexo, altura);

    /*
        innerHTML
        ---------
        Substitui todo o conteúdo interno de um elemento por uma nova
        estrutura HTML. Aqui trocamos o texto simples da div
        #resultado pelo "cartão" com nome, sexo, altura, peso ideal,
        a mensagem de sucesso e o botão de novo cálculo.
    */
    resultado.innerHTML = `
        <div class="cartao-resultado">
            <span class="sucesso">Cálculo realizado com sucesso!</span>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Sexo:</strong> ${textoSexo(sexo)}</p>
            <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>
            <p><strong>Peso ideal estimado:</strong></p>
            <span class="peso-destaque">${peso.toFixed(2)} kg</span>
            <button type="button" id="btnNovoCalculo">Novo cálculo</button>
        </div>
    `;

    // O botão "Novo cálculo" só passa a existir depois que o innerHTML
    // acima é inserido na página, por isso ele só pode ser capturado
    // (getElementById) e ter seu evento de clique associado aqui dentro.
    const btnNovoCalculo = document.getElementById("btnNovoCalculo") as HTMLButtonElement;
    btnNovoCalculo.addEventListener("click", reiniciarFormulario);
});

// Botão LIMPAR: apaga os campos digitados e devolve o resultado ao estado inicial.
btnLimpar.addEventListener("click", reiniciarFormulario);

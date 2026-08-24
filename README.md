
Calculadora de Peso Ideal — TypeScript (Parte 2)

Projeto prático da disciplina Desenvolvimento dinâmico com TypeScript (Professor Celso Barreto). Uma página HTML com formulário onde o usuário informa nome, sexo e altura, e o TypeScript calcula e exibe o peso ideal estimado diretamente na página, sem recarregar e sem precisar olhar o terminal.

Estrutura do projeto
projeto-peso-ideal/
├── index.html   # estrutura da página: formulário e área de resultado
├── style.css    # aparência visual, cartão de resultado e destaque do peso
├── app.ts       # lógica em TypeScript (código-fonte)
└── app.js       # gerado pelo compilador a partir de app.ts
Como executar
Abra a pasta projeto-peso-ideal no VS Code.
Se alterar o app.ts, recompile no terminal:
   tsc app.ts

Isso regera o app.js (o navegador não executa .ts diretamente). 3. Abra o index.html no navegador (duplo clique ou extensão Live Server). 4. Preencha nome, sexo e altura e clique em Calcular peso ideal.

Fórmula utilizada
Homem:  (72.7 × altura) − 58
Mulher: (62.1 × altura) − 44.7
Funcionalidades

Exercício prático

Formulário completo (nome, sexo, altura) com resultado exibido na própria página.
Validação de campos vazios, sexo não selecionado e altura inválida (≤ 0).
Botão Limpar, que apaga os campos e o resultado.

Desafio — resultado mais visual

Após o cálculo, um cartão exibe nome, sexo, altura e o peso ideal estimado.
Mensagem de confirmação: "Cálculo realizado com sucesso!".
Botão Novo cálculo, que reinicia o formulário para um novo preenchimento.
Número do peso destacado visualmente via CSS (.peso-destaque).
Comentários no app.ts explicando o papel do DOM, addEventListener, preventDefault e innerHTML.
Como funciona (resumo técnico)
document.getElementById() captura os elementos do formulário e do resultado, com as HTMLInputElement / HTMLSelectElement / HTMLFormElement / HTMLDivElement para o TypeScript conhecer o tipo de cada um.
formulario.addEventListener("submit", ...) escuta o envio do formulário; evento.preventDefault() cancela o recarregamento padrão da página.
Os valores digitados (texto) são lidos e a altura é convertida com Number().
As validações rodam antes do cálculo; qualquer falha exibe uma mensagem de erro na própria div de resultado.
calcularPesoIdeal() aplica a fórmula e retorna o peso.
resultado.innerHTML insere o cartão com os dados e o peso calculado, usando template strings (`${...}`) para montar o HTML.
Testes realizados
Nome	Sexo	Altura	Peso ideal esperado
João	Homem	1.80 m	≈ 72.86 kg
Ana	Mulher	1.65 m	≈ 57.77 kg

Também foram validados: nome vazio, sexo não selecionado, altura ≤ 0 e o funcionamento do botão Limpar.

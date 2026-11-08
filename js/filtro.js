/* Filtro de imóveis da página Imóveis */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Pega o formulário e os cartões dos imóveis
    const formulario = document.querySelector("form");
    const cartoes = document.querySelectorAll("main article");

    if (formulario === null || cartoes.length === 0) {
        return;
    }

    // Mensagem mostrada quando nenhum imóvel combina com a busca
    const mensagem = document.createElement("p");
    mensagem.textContent = "Nenhum imóvel encontrado com esses filtros.";
    mensagem.style.display = "none";
    cartoes[0].parentElement.appendChild(mensagem);


    // 2. Função que aplica o filtro
    function filtrar() {
        const cidade = formulario.elements["cidade"].value;
        const tipo = formulario.elements["tipo"].value;
        const valor = formulario.elements["valor"].value;
        const quartos = formulario.elements["quartos"].value;

        let encontrados = 0;

        for (let i = 0; i < cartoes.length; i++) {
            const cartao = cartoes[i];

            // Os dados de cada imóvel estão nos atributos data-* do HTML
            const cidadeOk = (cidade === "todas") || (cartao.dataset.cidade === cidade);
            const tipoOk = (tipo === "todos") || (cartao.dataset.tipo === tipo);

            // O valor do formulário está em milhares (150 = R$ 150.000)
            const valorOk = (valor === "todos") || (Number(cartao.dataset.valor) <= Number(valor) * 1000);

            // "4" significa 4 ou mais quartos; os outros números são exatos
            let quartosOk = true;
            if (quartos === "4") {
                quartosOk = Number(cartao.dataset.quartos) >= 4;
            } else if (quartos !== "todos") {
                quartosOk = Number(cartao.dataset.quartos) === Number(quartos);
            }

            if (cidadeOk && tipoOk && valorOk && quartosOk) {
                cartao.style.display = "";       // volta ao que o CSS define
                encontrados++;
            } else {
                cartao.style.display = "none";
            }
        }

        // Mostra a mensagem só quando não sobrou nenhum imóvel
        if (encontrados === 0) {
            mensagem.style.display = "";
        } else {
            mensagem.style.display = "none";
        }
    }


    // 3. Se a busca veio da página inicial, preenche os campos com o que foi escolhido
    const parametros = new URLSearchParams(window.location.search);
    const nomes = ["cidade", "tipo", "valor", "quartos"];

    for (let i = 0; i < nomes.length; i++) {
        const campo = formulario.elements[nomes[i]];
        const escolhido = parametros.get(nomes[i]);

        if (escolhido !== null && campo.querySelector('option[value="' + escolhido + '"]') !== null) {
            campo.value = escolhido;
        }
    }


    // 4. Eventos: filtra ao clicar em Pesquisar (sem recarregar a página) e ao abrir
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        filtrar();
    });

    filtrar();
});

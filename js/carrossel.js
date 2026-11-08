/* Carrossel de fotos das páginas de detalhes do imóvel */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Pega a galeria e as fotos dela (cada foto é um slide)
    const galeria = document.querySelector(".galeria");

    if (galeria === null) {
        return;
    }

    const slides = galeria.querySelectorAll("img");

    // Com uma foto só não há o que girar
    if (slides.length < 2) {
        return;
    }

    const INTERVALO = 5000;   // tempo da troca automática (5 segundos)
    let atual = 0;            // posição do slide que está aparecendo
    let temporizador;         // guarda o setInterval para podermos parar


    // 2. Cria os controles dentro de um <figcaption> (a legenda da figura)
    const controles = document.createElement("figcaption");

    const botaoAnterior = document.createElement("button");
    botaoAnterior.type = "button";
    botaoAnterior.textContent = "Anterior";
    botaoAnterior.setAttribute("aria-label", "Foto anterior");

    const contador = document.createElement("span");

    const botaoProximo = document.createElement("button");
    botaoProximo.type = "button";
    botaoProximo.textContent = "Próximo";
    botaoProximo.setAttribute("aria-label", "Próxima foto");

    controles.appendChild(botaoAnterior);
    controles.appendChild(contador);
    controles.appendChild(botaoProximo);
    galeria.appendChild(controles);


    // 3. Funções do carrossel
    function mostrarSlide(indice) {
        // Carrossel circular: depois da última volta à primeira e vice-versa
        if (indice >= slides.length) {
            indice = 0;
        }
        if (indice < 0) {
            indice = slides.length - 1;
        }

        // Esconde todas as fotos
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Mostra apenas a foto escolhida
        slides[indice].style.display = "block";
        atual = indice;
        contador.textContent = (atual + 1) + " / " + slides.length;
    }

    function proximo() {
        mostrarSlide(atual + 1);
    }

    function anterior() {
        mostrarSlide(atual - 1);
    }

    function pararAutomatico() {
        clearInterval(temporizador);
    }

    function iniciarAutomatico() {
        pararAutomatico();   // evita criar dois temporizadores ao mesmo tempo
        temporizador = setInterval(proximo, INTERVALO);
    }


    // 4. Eventos
    botaoProximo.addEventListener("click", function () {
        proximo();
        iniciarAutomatico();   // reinicia a contagem depois do clique
    });

    botaoAnterior.addEventListener("click", function () {
        anterior();
        iniciarAutomatico();
    });

    // Pausa quando o mouse está sobre a galeria e volta quando sai
    galeria.addEventListener("mouseenter", pararAutomatico);
    galeria.addEventListener("mouseleave", iniciarAutomatico);


    // 5. Inicia o carrossel
    mostrarSlide(0);
    iniciarAutomatico();
});


(function () {
    "use strict";

    const IDIOMAS = {
        en: "en-US",
        es: "es-ES"
    };

    let mesAtual = null;
    let mesExibido = null;
    let dataSelecionada = null;
    let calendario = null;
    let observador = null;

    function obterIdioma() {
        const idioma = localStorage.getItem("serenity-language")
            || document.documentElement.lang
            || "en";

        return IDIOMAS[idioma] || IDIOMAS.en;
    }

    function obterHoje() {
        const agora = new Date();

        return new Date(
            agora.getFullYear(),
            agora.getMonth(),
            agora.getDate()
        );
    }

    function criarData(ano, mes, dia) {
        return new Date(ano, mes, dia);
    }

    function adicionarMeses(data, quantidade) {
        return new Date(
            data.getFullYear(),
            data.getMonth() + quantidade,
            1
        );
    }

    function mesmaData(primeira, segunda) {
        return Boolean(
            primeira &&
            segunda &&
            primeira.getFullYear() === segunda.getFullYear() &&
            primeira.getMonth() === segunda.getMonth() &&
            primeira.getDate() === segunda.getDate()
        );
    }

    function formatarDataISO(data) {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    }

    function formatarData(data, opcoes) {
        return new Intl.DateTimeFormat(
            obterIdioma(),
            opcoes
        ).format(data);
    }

    function atualizarNavegacao() {
        const botaoAnterior = calendario.querySelector(
            "#booking-prev-month"
        );

        const botaoProximo = calendario.querySelector(
            "#booking-next-month"
        );

        const proximoMes = adicionarMeses(mesAtual, 1);

        botaoAnterior.disabled =
            mesExibido.getTime() <= mesAtual.getTime();

        botaoProximo.disabled =
            mesExibido.getTime() >= proximoMes.getTime();
    }

    function renderizarDiasDaSemana() {
        const elemento = calendario.querySelector(
            "#booking-calendar-weekdays"
        );

        elemento.replaceChildren();

        // Domingo como primeiro dia da semana.
        const domingo = new Date(2026, 0, 4);

        for (let indice = 0; indice < 7; indice++) {
            const data = new Date(
                domingo.getFullYear(),
                domingo.getMonth(),
                domingo.getDate() + indice
            );

            const dia = document.createElement("span");

            dia.textContent = formatarData(data, {
                weekday: "short"
            }).replace(".", "");

            elemento.appendChild(dia);
        }
    }

    function criarCelulaVazia() {
        const elemento = document.createElement("span");

        elemento.className = "booking-calendar-empty";
        elemento.setAttribute("aria-hidden", "true");

        return elemento;
    }

    function criarBotaoDia(data) {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "booking-calendar-day";
        botao.textContent = data.getDate();

        botao.setAttribute(
            "aria-label",
            formatarData(data, {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            })
        );

        const hoje = obterHoje();

        if (data.getTime() <= hoje.getTime()) {
            botao.disabled = true;
            botao.classList.add("is-disabled");
        }

        if (mesmaData(data, dataSelecionada)) {
            botao.classList.add("is-selected");
            botao.setAttribute("aria-pressed", "true");
        } else {
            botao.setAttribute("aria-pressed", "false");
        }

        if (!botao.disabled) {
            botao.addEventListener("click", function () {
                selecionarData(data);
            });
        }

        return botao;
    }

    function renderizarCalendario() {
        if (!calendario) {
            return;
        }

        const titulo = calendario.querySelector(
            "#booking-calendar-month"
        );

        const dias = calendario.querySelector(
            "#booking-calendar-days"
        );

        titulo.textContent = formatarData(mesExibido, {
            month: "long",
            year: "numeric"
        });

        dias.replaceChildren();

        const ano = mesExibido.getFullYear();
        const mes = mesExibido.getMonth();

        const primeiroDia = criarData(ano, mes, 1);
        const quantidadeDias = criarData(ano, mes + 1, 0).getDate();

        // getDay(): domingo = 0, sábado = 6.
        const deslocamento = primeiroDia.getDay();

        for (let indice = 0; indice < deslocamento; indice++) {
            dias.appendChild(criarCelulaVazia());
        }

        for (let dia = 1; dia <= quantidadeDias; dia++) {
            const data = criarData(ano, mes, dia);

            dias.appendChild(criarBotaoDia(data));
        }

        renderizarDiasDaSemana();
        atualizarNavegacao();
    }

    function atualizarResumoDaData() {
        if (!dataSelecionada) {
            return;
        }

        const campoData = calendario.querySelector("#booking-date");

        const resumo = calendario.querySelector(
            "#booking-selected-date-text"
        );

        campoData.value = formatarDataISO(dataSelecionada);

        resumo.textContent = formatarData(dataSelecionada, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    function selecionarData(data) {
        if (data.getTime() <= obterHoje().getTime()) {
            return;
        }

        dataSelecionada = new Date(
            data.getFullYear(),
            data.getMonth(),
            data.getDate()
        );

        const formulario = calendario.querySelector(
            "#booking-form-wrapper"
        );

        formulario.hidden = false;

        atualizarResumoDaData();
        renderizarCalendario();

        formulario.scrollIntoView({
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "instant" : "smooth",
            block: "nearest"
        });
    }

    function alterarMes(quantidade) {
        const novoMes = adicionarMeses(mesExibido, quantidade);
        const ultimoMes = adicionarMeses(mesAtual, 1);

        if (
            novoMes.getTime() < mesAtual.getTime() ||
            novoMes.getTime() > ultimoMes.getTime()
        ) {
            return;
        }

        mesExibido = novoMes;

        renderizarCalendario();
    }

    function alterarData() {
        const formulario = calendario.querySelector(
            "#booking-form-wrapper"
        );

        formulario.hidden = true;

        dataSelecionada = null;

        calendario.querySelector("#booking-date").value = "";

        renderizarCalendario();
    }

    function atualizarIdioma() {
        if (!calendario) {
            return;
        }

        renderizarCalendario();
        atualizarResumoDaData();
    }

    function validarDataSelecionada() {
        if (!dataSelecionada) {
            return false;
        }

        const hoje = obterHoje();
        const primeiroMes = criarData(
            hoje.getFullYear(),
            hoje.getMonth(),
            1
        );

        const ultimoMes = adicionarMeses(primeiroMes, 1);

        const mesDaSelecao = criarData(
            dataSelecionada.getFullYear(),
            dataSelecionada.getMonth(),
            1
        );

        return (
            dataSelecionada.getTime() > hoje.getTime() &&
            mesDaSelecao.getTime() >= primeiroMes.getTime() &&
            mesDaSelecao.getTime() <= ultimoMes.getTime()
        );
    }

    function configurarFormulario() {
        const formulario = calendario.querySelector(
            "#booking-request-form"
        );

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            if (!validarDataSelecionada()) {
                alterarData();
                return;
            }

            const feedback = calendario.querySelector(
                "#booking-form-feedback"
            );

            feedback.hidden = false;

            feedback.textContent = obterIdioma() === "es-ES"
                ? "El envío de solicitudes estará disponible próximamente."
                : "Appointment requests will be available soon.";

            // Integração futura:
            // enviarSolicitacaoDeAgendamento(new FormData(formulario));
        });
    }

    function configurarEventos() {
        calendario.querySelector(
            "#booking-prev-month"
        ).addEventListener("click", function () {
            alterarMes(-1);
        });

        calendario.querySelector(
            "#booking-next-month"
        ).addEventListener("click", function () {
            alterarMes(1);
        });

        calendario.querySelector(
            "#booking-change-date"
        ).addEventListener("click", alterarData);

        configurarFormulario();
    }

    function inicializarBooking() {
        const elemento = document.querySelector(
            "#contact .booking-calendar"
        );

        if (!elemento || elemento.dataset.initialized === "true") {
            return;
        }

        calendario = document.querySelector("#contact");

        const hoje = obterHoje();

        mesAtual = criarData(
            hoje.getFullYear(),
            hoje.getMonth(),
            1
        );

        mesExibido = new Date(mesAtual);
        dataSelecionada = null;

        elemento.dataset.initialized = "true";

        configurarEventos();
        renderizarCalendario();
    }

    function observarCarregamento() {
        inicializarBooking();

        // Compatibilidade com os componentes HTML carregados via fetch.
        observador = new MutationObserver(function () {
            inicializarBooking();
        });

        observador.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            observarCarregamento
        );
    } else {
        observarCarregamento();
    }

    // Atualiza o calendário quando o idioma é alterado.
    document.addEventListener(
        "serenity:language-changed",
        function () {
            atualizarIdioma();
        }
    );

    
document.addEventListener("change", function (event) {
    const input = event.target;

    if (
        !(input instanceof HTMLInputElement) ||
        input.name !== "contactMethod"
    ) {
        return;
    }

    const fieldset = input.closest(".booking-contact-method");

    if (!fieldset) {
        return;
    }

    const emailContainer = fieldset.querySelector(
        ".booking-contact-email"
    );

    const emailInput = fieldset.querySelector(
        "#booking-email"
    );

    if (!emailContainer || !emailInput) {
        return;
    }

    const isEmail = input.value === "email";

    emailContainer.hidden = !isEmail;
    emailInput.required = isEmail;

    if (!isEmail) {
        emailInput.value = "";
    }
});

})();

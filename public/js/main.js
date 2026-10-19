import { loadComponents } from "./components.js";
import { initializeHeader } from "./components/header.js";
import { initializeI18n } from "./i18n.js";


async function initializeApplication() {

    await loadComponents();


    /*
     * Os componentes agora existem no DOM.
     */


    initializeHeader();


    await initializeI18n();

}

const footerYear = document.querySelector("#footer-year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}


document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);


/**
 * Controla os painéis de contato
 * do Header e do Footer.
 */
document.addEventListener("click", function (event) {
    const botao = event.target.closest("[data-booking-toggle]");

    if (!botao) {
        return;
    }

    const idPainel = botao.getAttribute("aria-controls");
    const painel = document.getElementById(idPainel);

    if (!painel) {
        return;
    }

    const aberto = !painel.hidden;

    painel.hidden = aberto;

    botao.setAttribute(
        "aria-expanded",
        String(!aberto)
    );
});

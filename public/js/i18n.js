const DEFAULT_LANGUAGE = "en";

const SUPPORTED_LANGUAGES = ["en", "es"];

const TRANSLATIONS_PATH = "./data/translations";


let currentLanguage = DEFAULT_LANGUAGE;

let translations = {};


/**
 * Retorna o idioma salvo pelo usuário.
 */
function getStoredLanguage() {

    const storedLanguage =
        localStorage.getItem("serenity-language");

    if (
        storedLanguage &&
        SUPPORTED_LANGUAGES.includes(storedLanguage)
    ) {
        return storedLanguage;
    }

    return DEFAULT_LANGUAGE;
}


/**
 * Carrega o arquivo de tradução.
 */
async function loadTranslations(language) {

    const response = await fetch(
        `${TRANSLATIONS_PATH}/${language}.json`
    );

    if (!response.ok) {
        throw new Error(
            `Unable to load translations for "${language}".`
        );
    }

    return response.json();
}


/**
 * Obtém um valor através de uma chave.
 *
 * Exemplo:
 *
 * getTranslation("header.home")
 */
function getTranslation(key) {

    return translations[key] ?? key;
}


/**
 * Aplica as traduções aos elementos
 * que possuem data-i18n.
 */
function applyTranslations() {

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.dataset.i18n;

            element.textContent =
                getTranslation(key);
        });


    /*
     * Tradução de atributos ARIA.
     */
    document
        .querySelectorAll("[data-i18n-aria-label]")
        .forEach(element => {

            const key =
                element.dataset.i18nAriaLabel;

            element.setAttribute(
                "aria-label",
                getTranslation(key)
            );
        });
}


/**
 * Atualiza o estado visual dos botões
 * EN / ES.
 */
function updateLanguageButtons() {

    document
        .querySelectorAll("[data-language]")
        .forEach(button => {

            const isActive =
                button.dataset.language === currentLanguage;

            button.classList.toggle(
                "active",
                isActive
            );

            button.setAttribute(
                "aria-pressed",
                String(isActive)
            );
        });
}


/**
 * Atualiza o atributo lang do documento.
 */
function updateDocumentLanguage() {

    document.documentElement.lang =
        currentLanguage;
}


/**
 * Altera o idioma atual.
 */
export async function setLanguage(language) {

    if (
        !SUPPORTED_LANGUAGES.includes(language)
    ) {
        console.warn(
            `Unsupported language: ${language}`
        );

        return;
    }


    try {

        translations =
            await loadTranslations(language);

        currentLanguage =
            language;


        localStorage.setItem(
            "serenity-language",
            language
        );


        updateDocumentLanguage();

        applyTranslations();

        updateLanguageButtons();

        // Notifica os componentes sobre a mudança de idioma.
        document.dispatchEvent(
            new CustomEvent("serenity:language-changed", {
                detail: {
                    language: currentLanguage
                }
            })
        );


    } catch (error) {

        console.error(
            "Unable to change language.",
            error
        );
    }
}


/**
 * Inicializa o sistema de idiomas.
 */
export async function initializeI18n() {

    const initialLanguage =
        getStoredLanguage();

    await setLanguage(
        initialLanguage
    );
}


/**
 * Retorna o idioma atual.
 */
export function getCurrentLanguage() {

    return currentLanguage;
}
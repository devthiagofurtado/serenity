import { setLanguage } from "./../i18n.js";


export function initializeHeader() {

    const header =
        document.querySelector(".site-header");

    const menuButton =
        document.querySelector(".mobile-menu-button");

    const navigation =
        document.querySelector(".main-navigation");


    if (
        !header ||
        !menuButton ||
        !navigation
    ) {
        return;
    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function openMenu() {

        navigation.classList.add("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );
    }


    function closeMenu() {

        navigation.classList.remove("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    function toggleMenu() {

        const isOpen =
            navigation.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    menuButton.addEventListener(
        "click",
        toggleMenu
    );


    /* =====================================================
       CLOSE MENU AFTER NAVIGATION
       ===================================================== */

    navigation
        .querySelectorAll(".navigation-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    /* =====================================================
       CLOSE WITH ESC
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* =====================================================
       LANGUAGE
       ===================================================== */

    document
        .querySelectorAll("[data-language]")
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    const language =
                        button.dataset.language;

                    await setLanguage(language);

                    /*
                     * Fecha o menu mobile após
                     * trocar o idioma.
                     */
                    closeMenu();

                }
            );

        });


    /* =====================================================
       HEADER SCROLL
       ===================================================== */

    function updateHeaderOnScroll() {

        header.classList.toggle(
            "is-scrolled",
            window.scrollY > 20
        );
    }


    updateHeaderOnScroll();


    window.addEventListener(
        "scroll",
        updateHeaderOnScroll,
        { passive: true }
    );
}
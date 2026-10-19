const components = {

    header: "./components/header.html",

    footer: "./components/footer.html",

    hero: "./components/home/hero.html",

    benefits: "./components/home/benefits.html",

    services: "./components/home/services.html",

    about: "./components/home/about.html",

    booking: "./components/home/booking.html"

};

async function loadComponent(element) {
    const componentName = element.dataset.component;
    const componentPath = components[componentName];

    if (!componentPath) {
        console.warn(
            `Component "${componentName}" not found.`
        );

        return;
    }

    try {
        const response = await fetch(componentPath);

        if (!response.ok) {
            throw new Error(
                `Failed to load component: ${componentPath}`
            );
        }

        element.innerHTML = await response.text();

        if (window.lucide) {
            window.lucide.createIcons();
        }

    } catch (error) {
        console.error(
            `Error loading component "${componentName}":`,
            error
        );
    }
}

export async function loadComponents() {
    const elements =
        document.querySelectorAll("[data-component]");

    await Promise.all(
        [...elements].map(loadComponent)
    );
}
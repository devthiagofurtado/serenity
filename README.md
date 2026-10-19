# Serenity Bodywork Therapeutics

**A calming, accessible, and responsive website for personalized massage therapy services.**

Serenity Bodywork Therapeutics is a wellness-focused web project designed to provide a welcoming digital experience for clients seeking professional massage therapy.

The website combines an elegant visual identity, multilingual support, and an intuitive interface to help visitors explore services, learn about therapeutic benefits, and connect with the business.

**Website:** [serenitybodyworks.site](https://serenitybodyworks.site)

---

## About the Project

Serenity Bodywork Therapeutics is designed around a simple philosophy: wellness begins with comfort, trust, and personal attention.

The platform prioritizes:

- **Accessibility:** Clear navigation, readable content, and user-friendly interactions.
- **Responsive Design:** A consistent experience across desktop, tablet, and mobile devices.
- **Multilingual Support:** English and Spanish language options.
- **Elegant Design:** A calming visual identity inspired by wellness and natural balance.
- **Simple Communication:** Convenient ways to contact the business and request appointments.

## Features

### Current Website — V1

- Responsive landing page.
- English and Spanish localization.
- Dynamic HTML component loading.
- Interactive massage service presentation.
- Therapeutic benefits section.
- Appointment request calendar interface.
- Contact options via SMS, phone, WhatsApp, and Instagram.
- Mobile-friendly navigation.
- Accessible interface elements.

### Planned — V1.1

The next development phase introduces the backend infrastructure required to manage appointment requests securely.

- PHP REST API for appointment submissions.
- MySQL database integration.
- Secure administrator authentication.
- Administrative dashboard.
- Appointment management and status tracking.
- Client contact preference management.
- Server-side validation and security controls.
- Database migrations for staging and production environments.

> Appointment requests are not automatically confirmed. Confirmation is handled by the business.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Localization | JSON translation files |
| Icons | Lucide |
| Backend (planned) | PHP 8+ |
| Database (planned) | MySQL |
| Database Access (planned) | PDO |
| Hosting | Hostinger |
| Version Control | Git and GitHub |

The frontend uses vanilla JavaScript and reusable HTML components to maintain a lightweight architecture without requiring a frontend framework.

## Project Structure

```text
serenity/
├── index.html
│
├── assets/
│   ├── icons/
│   └── images/
│
├── components/
│   ├── header.html
│   ├── footer.html
│   └── home/
│       ├── hero.html
│       ├── about.html
│       ├── services.html
│       ├── benefits.html
│       └── booking.html
│
├── css/
│   ├── variables.css
│   ├── main.css
│   ├── components.css
│   └── components/
│
├── js/
│   ├── main.js
│   ├── components.js
│   ├── i18n.js
│   └── booking.js
│
├── data/
│   └── translations/
│       ├── en.json
│       └── es.json
│
├── .gitignore
└── README.md
```

The backend structure and database migration files will be introduced during the V1.1 development phase.

---

## Getting Started

### Prerequisites

- Git
- A modern web browser
- A local HTTP server

### Clone the Repository

```bash
git clone <repository-url>
cd serenity
```

Replace `<repository-url>` with the repository's GitHub URL.

### Run Locally

Because the website dynamically loads HTML components and translation files, it should be served over HTTP instead of opening `index.html` directly using the `file://` protocol.

For example, using Python:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

No Node.js installation or build process is required for the current frontend.

---

## Internationalization

The website supports two languages:

| Language | Code |
|---|---|
| English | `en` |
| Spanish | `es` |

Translations are maintained in:

```text
data/translations/en.json
data/translations/es.json
```

The default language is English.

Language preferences are stored locally in the browser to provide a consistent experience across visits.

---

## Appointment Request Workflow

The booking interface is designed to make requesting a massage session straightforward.

The intended workflow is:

1. Select a future date from the calendar.
2. Enter personal and contact information.
3. Choose a preferred contact method.
4. Select a massage service.
5. Specify a preferred time period.
6. Provide the service location and optional notes.
7. Submit an appointment request.
8. Wait for confirmation from the business.

The booking interface is implemented in V1. Backend submission, persistence, and administrative processing are planned for V1.1.

### Supported Contact Methods

- SMS
- Phone call
- WhatsApp
- Email

---

## Database and Environments

The backend will use separate MySQL databases for staging and production.

Database changes will be maintained through version-controlled SQL migration files.

```text
database/
└── migrations/
    ├── 001_create_clients.sql
    ├── 002_create_appointments.sql
    └── 003_create_admin_users.sql
```

These files represent the planned initial migrations and will be introduced as the backend is implemented.

The deployment process will apply approved migrations independently to each environment without copying staging customer records into production.

---

## Security

Security is a fundamental requirement for the upcoming backend.

Planned protections include:

- Parameterized SQL queries using PDO.
- Server-side input validation.
- Secure password hashing and verification.
- Protected administrator sessions.
- CSRF protection for authenticated operations.
- Authentication and authorization checks.
- Rate limiting for sensitive endpoints.
- Secure storage of database credentials.
- Restricted access to private application files.
- HTTPS communication.
- Safe error handling and logging.

Sensitive information, credentials, environment files, and database backups must never be committed to version control.

---

## Design System

The Serenity visual identity uses a soft, natural color palette.

| Color | Hex |
|---|---|
| White | `#FFFFFF` |
| Aqua Green | `#7DC4BD` |
| Warm Gold | `#BD8A27` |
| Natural Greige | `#81755D` |
| Soft Cream | `#F8F7F3` |

The interface combines elegant typography, rounded visual elements, subtle interactions, and generous spacing to create a comfortable browsing experience.

---

## Development Roadmap

- [x] Landing page implementation.
- [x] Responsive layout.
- [x] English and Spanish translations.
- [x] Massage services and benefits.
- [x] Appointment calendar interface.
- [x] Contact channels.
- [x] V1 website deployment.
- [x] Staging MySQL database provisioned.
- [ ] Version-controlled database migrations.
- [ ] Secure PHP database connection.
- [ ] Appointment submission API.
- [ ] Administrator account initialization.
- [ ] Authentication and session management.
- [ ] Administrative dashboard.
- [ ] Appointment management.
- [ ] Backend integration testing.
- [ ] V1.1 production deployment.

---

## Project Status

**V1 — Live**

The public-facing website is available at [serenitybodyworks.site](https://serenitybodyworks.site).

**V1.1 — In Development**

Backend integration, appointment persistence, and administrative management are the next development milestones.

---

## License

This project is developed specifically for Serenity Bodywork Therapeutics.

All rights reserved. Unauthorized reproduction, redistribution, or commercial use requires permission from the project owner.
# XJTLU CPT208 Group B2-1 Portfolio

This repository contains the CPT208 Human-Centric Computing group portfolio project developed by Group B2-1.

The project is an interactive browser-based simulation game called **XJTLU Postgrad Simulator**. It presents a compressed postgraduate application journey where players manage action points, improve personal attributes, encounter campus events, and work toward different application outcomes.

## Submission Requirements Checklist

- **Source Code Repository:** included below as a GitHub repository link.
- **README.md Setup Instructions:** included in the `Setup Instructions` section.
- **README.md Technologies Used:** included in the `Technologies Used` section.
- **Vibe Coding Logs:** included in the `/ai-0logs` folder. The primary prompts are stored in `/ai-0logs/primary-prompts.md`.

## Source Code Repository

GitHub repository: https://github.com/cheese-block/XJTLU-CPT208-GroupB2-1/tree/backup-demo-version

## Individual Contributions

| Team Member | Student ID | Role | Contributions |
| --- | --- | --- | --- |
| Yiguan Zhang | 2362131 | UI Design | Main menu design, campus map UI, status bar components |
| Wenhan Wang | 2362355 | Code | Game engine core, event system, buff mechanics, state management |
| Zewei Li | 2363721 | Content | Story content, event scenarios, ending definitions, i18n |
| Juntao He | 2363044 | Testing | Usability testing, bug reporting, iteration feedback |

## Project Personas

The project personas are prepared for the GitHub portfolio page following the 10-80-10 user distribution rule.

## Setup Instructions

1. Install Node.js 18 or later.
2. Install project dependencies:

```bash
npm install
```

3. Run the project with a local static server:

```bash
npx vite --host 0.0.0.0
```

4. Open the URL printed by the terminal, usually:

```text
http://localhost:5173/
```

5. Run all tests:

```bash
npm test
```

Additional test commands:

```bash
npm run test:unit
npm run test:integration
npm run test:data
npm run test:monte-carlo
```

## Technologies Used

- HTML5
- CSS3
- JavaScript ES Modules
- Tailwind CSS via CDN
- Lucide Icons
- Vite-compatible frontend structure
- Vitest
- jsdom
- Browser local storage

This project does not use React or Three.js; the examples in the requirement are treated as examples of possible technologies.

## Main Features

- Campus-map based interaction flow
- Action point management
- Random event system
- Visual novel style event scenes
- Monthly summary and progression
- Exam and application outcome logic
- Multiple endings
- Collection screen for discovered results
- Unit and integration tests for core gameplay logic

## Related Documents

- `docs/project-vision.md` - Product vision, design intention, and future roadmap
- `docs/knowledge-base.md` - Knowledge base for event and narrative design
- `docs/gameplay-flow-4-months.md` - Four-month gameplay flow from the player's perspective
- `docs/xjtlu-student-experience-for-writers.md` - XJTLU student experience reference for writing realistic events

## Vibe Coding Logs

AI-assisted coding was used during development. The primary prompts used to generate and refine core components are stored in:

- `ai-0logs/primary-prompts.md`

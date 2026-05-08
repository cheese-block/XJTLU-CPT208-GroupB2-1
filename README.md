# XJTLU CPT208 Group B2-1 Portfolio

This repository contains the CPT208 Human-Centric Computing group portfolio project developed by Group B2-1.

The project is an interactive browser-based simulation game called **XJTLU Postgrad Simulator**. 

This version is the **Exhibition Edition (Showcase Demo)**, specifically optimized for a concentrated 10-minute gameplay experience while maintaining the full narrative arc and core mechanics of the postgraduate application journey. Players manage action points, improve personal attributes, encounter campus events, and work toward different application outcomes.

## Submission Requirements Checklist

- **Source Code Repository:** included below as a GitHub repository link.
- **README.md Setup Instructions:** included in the `Setup Instructions` section.
- **README.md Technologies Used:** included in the `Technologies Used` section.
- **Vibe Coding Logs:** included in the `/ai-logs` folder. The primary prompts are stored in `/ai-logs/primary-prompts.md`.

## Live Demo

- **Primary URL (Global):** https://cheese-block.github.io/XJTLU-CPT208-GroupB2-1/
- **Alternative URL (China Mainland Friendly):** http://www.xjtlu-sim.top

## Source Code Repository

GitHub repository: https://github.com/cheese-block/XJTLU-CPT208-GroupB2-1/

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

3. Run the project with a local development server:

```bash
npm run test:watch # if you want to run tests while developing
# Or simply open index.html in a browser using a local server extension (e.g., Live Server)
# Since the project uses ES Modules, it MUST be served via a local server.
```

If you are using Vite for local development:
```bash
npx vite
```

4. Open the URL printed by the terminal, usually `http://localhost:5173/`.

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

- **Frontend:** HTML5, CSS3 (Tailwind CSS via CDN), JavaScript (ES Modules)
- **Icons:** Lucide Icons
- **Build Tool/Server:** Vite (compatible structure)
- **Testing:** Vitest, jsdom
- **State Management:** Custom Vanilla JS State Manager
- **Persistence:** Browser Local Storage

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

AI-assisted coding was used extensively during development (following a Vibe Coding methodology). The primary prompts and interactive problem-solving logs are categorized chronologically and stored in the `/ai-logs` directory:

- `/ai-logs/01_phase1_architecture.md` - Core PRD, State Machine, and Mechanics
- `/ai-logs/02_phase2_ui_ux.md` - Interaction Design, Cognitive Load fixes, and UI Layout
- `/ai-logs/03_phase3_events_logic.md` - Event scripting, Bug fixing, and AI communication standards


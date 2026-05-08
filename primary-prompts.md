# Vibe Coding Logs

This folder records the primary AI prompts used to generate and refine core components of the XJTLU Postgrad Simulator project.

## Prompt 1: Project Structure and Game Architecture

Create a browser-based XJTLU postgraduate application simulator for a CPT208 Human-Centric Computing portfolio. Use modular JavaScript ES modules. Split the project into data, state, engine, UI components, and screen modules. The game should include a title screen, school selection, campus map, visual novel style event dialogue, monthly summary, endings, and collection views.

## Prompt 2: State Management

Design a central state manager for a four-month application-season simulation. Track month, action points, player stats, triggered events, active buffs, endings, and current screen phase. Provide functions to initialize state, update stats with clamping, consume action points, enqueue events, save/load local progress, and notify UI subscribers.

## Prompt 3: Game Loop

Implement the main game loop for a compressed four-month demo. The loop should execute map actions, apply action point costs, select available random events from an event pool, process queued events through the visual novel screen, resolve month-end effects, check bad endings, and progress to final outcomes.

## Prompt 4: Event Engine and Data

Generate an event system for an XJTLU student preparing postgraduate applications. Events should support Chinese and English text, choices, stat effects, repeatable flags, prerequisite conditions, tags, and links to campus locations. Include realistic student-life events around IELTS preparation, GPA pressure, internships, research, social support, agent consultation, and stress management.

## Prompt 5: Exam and Ending Logic

Create exam and ending engines for the simulator. IELTS and final application outcomes should depend on multiple player stats rather than a single score. Implement threshold-based results, bad ending checks, and final ending selection that reflects academic readiness, English ability, research experience, internship experience, money, and mental health.

## Prompt 6: Campus Map UI

Build a map screen using an XJTLU campus map image with clickable hotspots. Blue pins should represent actionable buildings and grey pins should represent display-only buildings. Each actionable building should show available actions, costs, and possible benefits. The layout should be responsive and readable on common laptop screens.

## Prompt 7: Visual Novel Screen

Create a visual novel style screen for event playback. It should show event title, narrative text, choices, stat changes, and smooth transitions back to the map or next queued event. The UI should support bilingual content and be suitable for short exhibition gameplay.

## Prompt 8: Reusable UI Components

Implement reusable UI components including a status bar, dialog box, choice panel, confirm modal, tooltip manager, and map hotspot. Use Lucide icons where appropriate, keep visual styling consistent with an XJTLU blue-and-yellow theme, and ensure text remains readable.

## Prompt 9: Testing

Write Vitest tests for key gameplay logic. Cover state stat-delta clamping, event-pool filtering, exam thresholds, bad-ending triggers, month-end progression, action flow, data integrity, and Monte Carlo smoke testing to detect impossible or unstable game states.

## Prompt 10: Documentation

Write README sections for setup instructions, technologies used, source-code repository link, and AI coding logs. Keep instructions practical for project reviewers who need to install dependencies, run the app, and execute tests.

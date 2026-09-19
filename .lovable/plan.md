# TRANS-SHIELD AI — Processes 4 and 5 Extension

## Goal
Extend the approved five-stage power-grid journey without redesigning or changing the existing functionality of Processes 1–3. Add complete Process 4 and Process 5 monitoring pages, and upgrade only the central animated visualizations on Processes 2 and 3.

## Build
- Extend the existing POWER GRID navigator with Process 4 Grid Substation and Process 5 Distribution Transformer, followed by a non-clickable Distribution Network / Consumers endpoint.
- Preserve all existing Process 1 content and behavior, and preserve every existing Process 2–3 section outside their main visualization components.
- Replace the Process 2 central scene with a detailed industrial transformer digital twin: incoming phases, HV/LV bushings, core and coils, oil tank/circulation, cooling indicators, relay state, connected output, and state-driven normal/warning/critical energy flow.
- Replace the Process 3 central scene with a detailed transmission corridor: source and destination substations, multiple lattice towers, insulator strings, three sagging phase conductors, moving energy markers, wind indicator, affected-section warning/fault emphasis, and trip-controlled flow interruption.
- Add Process 4 at `/substation` using the existing header, cards, simulation bar, status styling, metrics, health gauge, alerts, protection controls, logs, and architecture patterns. Include five requested sensors, substation power flow, stability and predictive AI panels, load shedding, voltage regulation, breaker-failure simulation, protected AUTO/MANUAL breaker controls, aggregation, and data flow.
- Add Process 5 at `/distribution` using those same patterns. Include five requested transformer sensors, distribution power flow, dynamic health and prediction, local edge safety logic, cooling controls, protected AUTO/MANUAL relay controls, alerts, event log, and data flow.
- Use smoothly converging local simulation values for Normal, Warning, Critical, and Reset modes. Critical trips remain local-edge actions, unsafe manual close/reset actions remain blocked, and reset unlocks only after safe conditions return.

## Visual and engineering constraints
- Reuse the current theme tokens, typography, card geometry, spacing, buttons, badges, and responsive rules; add only extension-specific classes.
- Keep all professional/prototype distinctions explicit: INDUSTRIAL STANDARD, PROTOTYPE, AI MODEL — PROTOTYPE, PROTOTYPE SAFETY THRESHOLDS, LOCAL EDGE PROTECTION, and SIMULATED SUBSTATION CONTROL.
- Keep animations technical and restrained, respect reduced-motion settings, and prevent mobile overflow.
- Add unique metadata for both new pages without changing existing route metadata.

## Verification
- Confirm Process 1 remains unchanged and all existing Process 2–3 controls and sections still behave as before.
- Exercise Process 4 and 5 Normal, Warning, Critical, Manual, safe-reset, breaker/relay priority, cooling/load-shedding, and breaker-failure paths.
- Verify all five routes on desktop and mobile, including visualization readability, no overlap or horizontal overflow, clean console/runtime signals, and a successful build.

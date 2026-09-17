# TRANS-SHIELD AI — WPS-01 Monitoring Module

## Goal
Build a responsive, single-screen wind power station control room for WPS-01. It will combine live-looking instrumentation, AI health and prediction, operator controls, safety states, and technical flow diagrams in a crisp industrial SCADA interface.

## Experience
- A persistent operations header shows station context, connectivity, AI status, and a live clock.
- The first viewport centers WPS-01 around a detailed animated wind turbine, current operating state, compact subsystem status, and a Turbine → Generator → Protection Relay → Grid energy path.
- A dense but readable monitoring grid presents six animated sensor instruments, power output, AI health, predictive risk, anomalies, alerts, and event history.
- Normal, Warning, and Critical controls drive the entire interface together: values, colors, turbine motion, alerts, risk prediction, diagrams, and relay behavior.
- Safety controls clearly separate automatic and manual relay operation. Critical mode trips automatically; reset remains unavailable until readings are safe.

## Implementation
- Create focused React components for the turbine scene, status rail, sensor cards, charts/gauges, protection controls, event logs, and architecture diagrams.
- Use SVG/CSS animation for the turbine, wind particles, waveforms, trend lines, gauges, and animated power paths; respect reduced-motion preferences.
- Use a central simulation state with smoothly changing readings and derived station status. Keep all data local and demonstrative; no external services or persistence.
- Implement operational behavior:
  - Normal: safe values, power flowing, relay connected.
  - Warning: elevated temperature/vibration, amber alerts, increased AI risk.
  - Critical: red alarm, automatic relay trip, interrupted power path.
  - Reset: restore safe readings, then enable protection reset.
  - Manual mode: permit explicit relay switching and add operator events to the log.
- Add collapsible prototype thresholds with the required industrial-deployment disclaimer.
- Add separate predictive-protection and station-data-flow diagrams with animated connectors and clear active stages.

## Visual System
- Off-white/light-slate work surface with graphite framing, teal and electric-cyan instrumentation, green operational states, amber warnings, and red critical states.
- Technical sans-serif typography, compact numeric readouts, thin borders, shallow glass surfaces, subtle grid texture, restrained shadows, and small purposeful transitions.
- Responsive layouts for desktop control rooms, tablets, and phones without overlapping labels or clipped telemetry.

## Verification
- Confirm the preview compiles cleanly and has no runtime or console errors.
- Exercise Normal → Warning → Critical → safe reset, automatic trip, manual relay control, and threshold expansion.
- Visually inspect desktop and mobile layouts, animation framing, chart readability, and control availability.
- Add complete page metadata for TRANS-SHIELD AI.

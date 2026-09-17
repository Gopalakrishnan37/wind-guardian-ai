# Wind Guardian AI

Build TRANS-SHIELD AI: Smart Power Grid Monitoring & Predictive Protection — Wind Power Station monitoring module (WPS-01).

Visual style:
- Industrial SCADA + AI predictive protection interface (modern, crisp, technical, responsive).
- Palette: Off-white / light slate base, graphite/charcoal accents, teal, electric cyan, operational green, amber warning, red critical. Do NOT use dark blue as the primary theme. Clean technical typography, glassmorphism, thin borders, micro-animations.

Key sections & features:
1. Header: 'TRANS-SHIELD AI' + 'Smart Power Grid Monitoring & Predictive Protection', live system status (ONLINE), AI Engine (ACTIVE), live clock, connection indicator, breadcrumb (Power Grid → Generation → Wind Power Station).
2. Hero & Animated Wind Turbine: Station ID WPS-01, running status, grid connected, protection armed. Large high-fidelity animated wind turbine (SVG/Canvas) with rotating 3-blade rotor, wind particles, and dynamic energy-flow line (Turbine → Generator → Protection Relay → Grid). Visual state changes dynamically with Normal / Warning / Critical simulation.
3. Turbine Status Panel: Rotor, Generator, Gearbox, Grid, Protection states with status dots.
4. 6 Live Sensor Cards (dynamic smooth simulation updates, normal ranges, unit, trend chart/waveform/compass/gauge, prototype & industrial sensor labels):
   - Vibration & Tower Tilt (ADXL345 / IEPE; mm/s & tilt°, X/Y/Z)
   - Generator & Gearbox Temp (DS18B20 / PT100; °C gauge with zones)
   - Wind Speed & Direction (Anemometer; m/s, circular compass & direction particles)
   - Electrical Voltage (ZMPT101B / PT; V AC waveform)
   - Electrical Current (ACS712 / CT; A, load %, trend)
   - Rotor Speed (LM393 / Optical; RPM gauge)
5. Power Generation: Large power metrics (kW, V, A, PF, RPM, wind speed) and live real-time trend chart.
6. AI Turbine Health Index: 94/100 circular gauge, breakdown (Mechanical, Electrical, Thermal, Structural), AI diagnostic note.
7. AI Predictive Protection: Risk level, 24h failure probability %, 24h health prediction chart, armed state.
8. AI Anomaly Detection: Timestamped anomaly log/timeline with normal, warning, critical color codes.
9. Predictive Protection Flow: Visual animated flowchart from sensor inputs → Data Acquisition → AI Analysis → Anomaly Detection → Risk Prediction → Protection Decision (Normal / Warning / Critical Tripped).
10. Protection Relay Control & Safety Priority:
    - Current state (RELAY OFF / RELAY ON), Auto vs Manual toggle.
    - Automatic trip on Critical condition, trip alarm banner, 'Reset Protection' button (only active once sensors return safe).
    - Manual mode allows operator toggle (ON/OFF) with logged events.
    - Animated electrical single-line diagram showing Turbine → Generator → Relay → Grid with animated power flow that breaks when tripped.
11. Prototype Safety Thresholds: Collapsible reference table with explicit disclaimer 'PROTOTYPE SAFETY THRESHOLDS – NOT FOR DIRECT INDUSTRIAL DEPLOYMENT'.
12. Simulation Mode Controls: Interactive buttons for [Normal], [Warning Simulation] (elevates temp/vibration, yellow alert), [Critical Simulation] (triggers automatic relay trip, red alarm), and [Reset].
13. Active Alerts Panel & Protection Event Log: Categorized logs with Auto/Manual action badges.
14. Wind Station Data Flow Architecture: Interactive diagram showing Sensors → ESP32 Edge Controller → Wi-Fi/LoRa → Cloud/API → AI Engine → Dashboard → Protective Relay.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9c343e85-0997-42c1-b460-5f6f6e04f1f8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

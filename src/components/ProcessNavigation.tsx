import { Link } from "@tanstack/react-router";
import { Building2, Factory, Network, RadioTower, Wind } from "lucide-react";

const processes = [
  { to: "/", step: "PROCESS 1", label: "Wind Power Station", icon: Wind },
  { to: "/transformer", step: "PROCESS 2", label: "Step-Up Transformer", icon: Factory },
  { to: "/transmission", step: "PROCESS 3", label: "Transmission Line & Tower", icon: RadioTower },
  { to: "/substation", step: "PROCESS 4", label: "Grid Substation", icon: Building2 },
  { to: "/distribution", step: "PROCESS 5", label: "Distribution Transformer", icon: Factory },
] as const;

export function ProcessNavigation() {
  return (
    <nav className="process-nav" aria-label="Power grid processes">
      <div className="process-nav-label"><span>POWER GRID</span><strong>PROCESS MONITOR</strong></div>
      <div className="process-nav-links">
        {processes.map(({ to, step, label, icon: Icon }, index) => (
          <div className="process-nav-wrap" key={to}>
            <Link to={to} activeOptions={{ exact: true }} className="process-nav-link">
              <Icon /><span><small>{step}</small><strong>{label}</strong></span>
            </Link>
            {index < processes.length - 1 && <b aria-hidden="true">›</b>}
          </div>
        ))}
        <div className="future-process"><Network/><span><small>GRID DESTINATION</small><strong>Distribution Network · Consumers</strong></span></div>
      </div>
    </nav>
  );
}

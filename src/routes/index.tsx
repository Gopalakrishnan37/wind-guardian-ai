import { createFileRoute } from "@tanstack/react-router";
import { WindStationDashboard } from "@/components/WindStationDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRANS-SHIELD AI | WPS-01 Monitoring" },
      { name: "description", content: "AI-powered wind power station monitoring, predictive protection, and relay safety control for WPS-01." },
      { property: "og:title", content: "TRANS-SHIELD AI | WPS-01 Monitoring" },
      { property: "og:description", content: "Live wind turbine telemetry, AI health prediction, and protection relay control." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WindStationDashboard,
});

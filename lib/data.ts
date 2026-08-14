// ─────────────────────────────────────────────────────────────────────────────
// Data model — Ruben V. Feliu · AI Data Center Power Campus Experience
// All values shown in the experience are conceptual. CONCEPTUAL DIGITAL TWIN.
// ─────────────────────────────────────────────────────────────────────────────

export type AssetId =
  | "datacenter"
  | "generation"
  | "bess"
  | "solar"
  | "switchyard"
  | "poi"
  | "maincontrol"
  | "backupcontrol"
  | "otnetwork"
  | "loadbank";

export type LayerId =
  | "ALL"
  | "GENERATION"
  | "BESS"
  | "SOLAR"
  | "SWITCHYARD"
  | "TRANSMISSION"
  | "DATA CENTER"
  | "CONTROLS"
  | "CYBER"
  | "OT NETWORK";

export type ScenarioId =
  | "normal"
  | "grid"
  | "islanded"
  | "contingency"
  | "renewable"
  | "blackstart"
  | "loadevent";

export interface AssetInfo {
  id: AssetId;
  label: string;
  subLabel: string;
  role: string;
  keySystems: string[];
  integration: string;
  smes: string[];
}

export const ASSETS: Record<AssetId, AssetInfo> = {
  datacenter: {
    id: "datacenter",
    label: "AI FACTORY",
    subLabel: "Compute • Network • Storage • Cooling",
    role: "Concentrates extraordinary compute density into data halls with highly dynamic electrical and thermal demand. Requires coordinated medium-voltage distribution, UPS ride-through, cooling capacity and load-prioritization strategy aligned with the campus power system.",
    keySystems: [
      "Data halls & GPU compute blocks",
      "MV distribution & unit substations",
      "UPS / power conversion",
      "PDU / busway distribution",
      "Cooling & heat-rejection plant",
      "DCIM & building management",
      "Load prioritization / ride-through controls",
    ],
    integration: "Campus PCC → MV Distribution → UPS / PDU → Compute Racks · DCIM ↔ EMS coordination",
    smes: [
      "Data Center Electrical SME",
      "UPS / Power Conversion SME",
      "Cooling Systems SME",
      "DCIM SME",
      "Reliability SME",
      "EMS Integration SME",
      "Cybersecurity SME",
    ],
  },
  generation: {
    id: "generation",
    label: "ON-SITE GENERATION",
    subLabel: "Firm Capacity • Load Following • Resilience",
    role: "Provides firm, dispatchable capacity behind the meter — carrying baseload, following dynamic AI load, supporting islanded operation and anchoring campus frequency and voltage. Simple-cycle and combined-cycle blocks with balance-of-plant and fuel-gas infrastructure.",
    keySystems: [
      "Gas turbine generator blocks",
      "Optional combined-cycle / heat recovery",
      "Generator step-up transformers",
      "Turbine & generator control systems",
      "Fuel gas conditioning & supply",
      "Balance-of-plant auxiliaries",
      "Emissions & environmental systems",
    ],
    integration: "EMS / AGC → Plant DCS → Turbine Controls → Generator Breakers → GSU → Switchyard",
    smes: [
      "Generation Integration SME",
      "Gas Turbine SME",
      "Generator Controls SME",
      "Balance-of-Plant SME",
      "Power Systems SME",
      "Protection & Control SME",
      "Commissioning SME",
    ],
  },
  bess: {
    id: "bess",
    label: "BESS",
    subLabel: "Fast Response • Grid Support • Resilience",
    role: "Supports fast active-power response, reactive-power support, power-quality mitigation, contingency response and microgrid resilience. Buffers dynamic AI load excursions and bridges generation contingencies.",
    keySystems: [
      "BPPC / plant controller",
      "PCS (power conversion systems)",
      "Battery management systems",
      "MV transformers & collector buses",
      "Metering",
      "Protection",
      "EMS interface",
    ],
    integration: "EMS → BPPC → PCS / Battery Blocks",
    smes: [
      "BESS Integration SME",
      "Power Systems SME",
      "EMS SME",
      "Protection & Control SME",
      "Cybersecurity SME",
      "Commissioning SME",
    ],
  },
  solar: {
    id: "solar",
    label: "SOLAR PV",
    subLabel: "Renewable Generation",
    role: "Contributes renewable energy to the campus energy mix, reducing fuel consumption and emissions intensity. Coordinated with BESS state-of-charge strategy and EMS dispatch for renewable optimization.",
    keySystems: [
      "PV panel arrays",
      "String / central inverter blocks",
      "MV collection circuits",
      "Plant controller",
      "Metering & forecasting inputs",
    ],
    integration: "EMS → PV Plant Controller → Inverters → Collector System → Switchyard",
    smes: [
      "Solar PV SME",
      "DER Controls SME",
      "Energy Optimization SME",
      "Power Systems SME",
      "Protection & Control SME",
    ],
  },
  switchyard: {
    id: "switchyard",
    label: "HV SWITCHYARD",
    subLabel: "Protection • Switching • Metering",
    role: "The electrical heart of the campus — interconnecting generation, storage, renewables, the utility POI and the data-center PCC. Provides switching, protection, metering and synchronization across all sources and loads.",
    keySystems: [
      "HV bus structures & gantries",
      "Circuit breakers & disconnect switches",
      "CTs, VTs / CVTs, surge arresters",
      "Power transformers",
      "Relay / control house",
      "Protection & automation systems",
      "Revenue & operational metering",
    ],
    integration: "All sources & loads ↔ HV Buses · Relay House ↔ EMS / SCADA · Synchronization across sources",
    smes: [
      "Substation SME",
      "Protection & Control SME",
      "HV Equipment SME",
      "Substation Automation SME",
      "Metering SME",
      "Commissioning SME",
    ],
  },
  poi: {
    id: "poi",
    label: "UTILITY POI",
    subLabel: "Grid Interconnection",
    role: "The point of interconnection with the utility transmission system. Governs import/export capability, grid-code compliance, interconnection agreements and the boundary between campus and utility protection philosophies.",
    keySystems: [
      "POI breaker & disconnect",
      "HV transmission line & structures",
      "Interchange metering",
      "Telemetry to utility / RTO",
      "Interconnection protection schemes",
    ],
    integration: "Utility Grid ↔ POI ↔ Campus Switchyard · Utility telemetry ↔ EMS",
    smes: [
      "Grid Interconnection SME",
      "Transmission Planning SME",
      "Protection & Control SME",
      "Metering SME",
      "Regulatory / Compliance SME",
    ],
  },
  maincontrol: {
    id: "maincontrol",
    label: "MAIN CONTROL CENTER",
    subLabel: "EMS • SCADA • Operations",
    role: "The operational nerve center of the campus. Hosts the EMS, SCADA, operator HMIs and the real-time applications that dispatch generation, optimize the microgrid, supervise the switchyard and coordinate with data-center operations.",
    keySystems: [
      "EMS & microgrid optimization",
      "SCADA & generation dispatch",
      "Operator HMI & video wall",
      "Alarm management & SOE",
      "Historian & reporting",
      "Cybersecurity monitoring interfaces",
      "Engineering workstations",
    ],
    integration: "EMS ↔ Generation / BESS / PV / Switchyard / PCC · Historian ↔ Digital Twin · SOC monitoring",
    smes: [
      "EMS Architect",
      "SCADA SME",
      "Operations Readiness SME",
      "Alarm Management SME",
      "Historian SME",
      "OT Cybersecurity SME",
    ],
  },
  backupcontrol: {
    id: "backupcontrol",
    label: "BACKUP CONTROL CENTER",
    subLabel: "Business Continuity • Disaster Recovery",
    role: "A geographically separated facility providing business continuity and emergency operating capability. Maintains redundant EMS/SCADA access, backup HMIs and alternate communications so the campus can be operated through loss of the primary control center.",
    keySystems: [
      "Backup operator HMI",
      "Redundant EMS / SCADA access",
      "Emergency communications",
      "Recovery procedures & runbooks",
      "Alternate network paths",
    ],
    integration: "Redundant OT network ↔ All campus assets · Failover from Main Control Center",
    smes: [
      "Operations Readiness SME",
      "EMS SME",
      "OT Network SME",
      "Cybersecurity SME",
      "Business Continuity SME",
    ],
  },
  loadbank: {
    id: "loadbank",
    label: "LOAD BANKS",
    subLabel: "Commissioning • Black Start Testing",
    role: "Resistive / reactive load banks provide controllable artificial load for commissioning generation before real load is available — validating governor response, voltage regulation, protection and heat rejection. During black-start restoration, load banks stabilize generation blocks before priority data-center load is picked up.",
    keySystems: [
      "Resistive load bank units",
      "Reactive (inductive) load elements",
      "Load bank step controllers",
      "MV connection & switching",
      "Cooling fans & discharge hoods",
      "Test instrumentation & metering",
    ],
    integration: "Generation → GSU / MV Bus → Load Bank Yard · Test control ↔ Commissioning team · EMS visibility",
    smes: [
      "Commissioning SME",
      "Generation Integration SME",
      "Generator Controls SME",
      "Protection & Control SME",
      "Test / Simulation Engineer",
      "EMS SME",
    ],
  },
  otnetwork: {
    id: "otnetwork",
    label: "OT NETWORK",
    subLabel: "Fiber • Protection Signaling • Emergency Paths",
    role: "The communications fabric binding the campus into one operable system. Redundant operational Ethernet/fiber, protection signaling and hardwired emergency paths connect every asset to the primary and backup control centers under a secure, segmented architecture.",
    keySystems: [
      "Redundant OT LAN / WAN",
      "Fiber backbone & diverse routing",
      "Protection signaling channels",
      "Emergency hardwired paths",
      "Precision time synchronization",
      "IEC 61850 / DNP3 / Modbus / OPC UA",
      "Security zones & conduits",
    ],
    integration: "All assets ↔ Main & Backup Control Centers · Segmented per security architecture",
    smes: [
      "OT Network Architect",
      "Telecom SME",
      "Time Sync SME",
      "Protection Signaling SME",
      "OT Cybersecurity SME",
    ],
  },
};

// ── Layers ───────────────────────────────────────────────────────────────────

export interface LayerInfo {
  id: LayerId;
  assets: AssetId[];
  smes: string[];
  disciplines: string[];
  phases: string[];
}

export const LAYERS: LayerInfo[] = [
  {
    id: "ALL",
    assets: [
      "datacenter", "generation", "bess", "solar", "switchyard",
      "poi", "maincontrol", "backupcontrol", "otnetwork",
    ],
    smes: ["Full integrated program team"],
    disciplines: ["All engineering disciplines"],
    phases: ["Phase 0 → Phase 6"],
  },
  {
    id: "GENERATION",
    assets: ["generation", "switchyard", "loadbank"],
    smes: ["Gas Turbine SME", "Generator Controls SME", "BOP SME", "Fuel Gas SME"],
    disciplines: ["Mechanical", "Electrical", "Controls", "Environmental"],
    phases: ["Phase 1 — Strategy", "Phase 3 — Engineering", "Phase 5 — Commissioning"],
  },
  {
    id: "BESS",
    assets: ["bess", "switchyard"],
    smes: ["BESS Integration SME", "PCS SME", "BPPC SME", "Energy Optimization SME"],
    disciplines: ["Power Systems", "Controls", "Protection", "Fire Protection"],
    phases: ["Phase 1 — Strategy", "Phase 3 — Engineering", "Phase 5 — Commissioning"],
  },
  {
    id: "SOLAR",
    assets: ["solar", "switchyard"],
    smes: ["Solar PV SME", "DER Controls SME", "Energy Optimization SME"],
    disciplines: ["PV Engineering", "Power Systems", "Controls"],
    phases: ["Phase 1 — Strategy", "Phase 3 — Engineering", "Phase 5 — Commissioning"],
  },
  {
    id: "SWITCHYARD",
    assets: ["switchyard", "poi"],
    smes: ["Substation SME", "Protection & Control SME", "HV Equipment SME", "Metering SME"],
    disciplines: ["Substation Design", "Protection", "Civil / Structural"],
    phases: ["Phase 1 — Strategy", "Phase 3 — Engineering", "Phase 5 — Commissioning"],
  },
  {
    id: "TRANSMISSION",
    assets: ["poi", "switchyard"],
    smes: ["Grid Interconnection SME", "Transmission Planning SME", "Dynamic Studies SME"],
    disciplines: ["Transmission Planning", "Grid Studies", "Regulatory"],
    phases: ["Phase 0 — Discovery", "Phase 1 — Strategy", "Phase 3 — Engineering"],
  },
  {
    id: "DATA CENTER",
    assets: ["datacenter", "switchyard"],
    smes: ["DC Electrical SME", "UPS SME", "Cooling SME", "DCIM SME", "Reliability SME"],
    disciplines: ["DC Electrical", "Mechanical / Cooling", "DCIM", "Reliability"],
    phases: ["Phase 1 — Strategy", "Phase 3 — Engineering", "Phase 4 — Integration"],
  },
  {
    id: "CONTROLS",
    assets: ["maincontrol", "backupcontrol", "generation", "bess", "switchyard", "datacenter"],
    smes: ["EMS Architect", "Microgrid Controls SME", "SCADA SME", "DCS / PLC SME", "HMI SME"],
    disciplines: ["EMS / Microgrid", "SCADA", "DCS / PLC", "Real-Time Applications"],
    phases: ["Phase 1 — Strategy", "Phase 3 — Engineering", "Phase 4 — Integration", "Phase 5 — Testing"],
  },
  {
    id: "CYBER",
    assets: ["maincontrol", "backupcontrol", "switchyard", "bess", "datacenter", "otnetwork"],
    smes: ["OT Cyber Architect", "Network Security SME", "IAM / PAM SME", "SOC Integration SME"],
    disciplines: ["OT Cybersecurity", "Network Security", "GRC / Compliance"],
    phases: ["Phase 1 — Strategy", "Phase 3 — Engineering", "Phase 5 — Testing", "Phase 6 — Operations"],
  },
  {
    id: "OT NETWORK",
    assets: ["otnetwork", "maincontrol", "backupcontrol", "generation", "bess", "solar", "switchyard", "datacenter"],
    smes: ["OT Network Architect", "Telecom SME", "Time Sync SME", "Data Integration SME"],
    disciplines: ["OT Networking", "Telecom / Fiber", "Systems Integration"],
    phases: ["Phase 1 — Strategy", "Phase 3 — Engineering", "Phase 4 — Integration"],
  },
];

// ── Operating scenarios ──────────────────────────────────────────────────────

export interface ScenarioInfo {
  id: ScenarioId;
  name: string;
  short: string;
  description: string;
  note?: string;
  /** live "system response" feed shown on the campus overlay */
  responses: { system: string; action: string; tone: "ok" | "warn" | "info" }[];
}

export const SCENARIOS: ScenarioInfo[] = [
  {
    id: "normal",
    name: "Normal / Behind-the-Meter",
    short: "On-site generation primarily supplies the AI Data Center.",
    description:
      "On-site generation carries the campus load behind the meter. BESS provides fast-response buffering, the utility connection remains available, and the EMS balances generation against dynamic compute demand.",
    responses: [
      { system: "GENERATION", action: "Carrying campus load", tone: "ok" },
      { system: "EMS", action: "Balancing dispatch vs. compute demand", tone: "info" },
      { system: "BESS", action: "Standby — fast-response reserve", tone: "ok" },
      { system: "POI", action: "Available, minimal exchange", tone: "info" },
    ],
  },
  {
    id: "grid",
    name: "Grid Connected",
    short: "Campus operates in coordination with utility interconnection.",
    description:
      "The campus operates in coordination with the utility interconnection — exchanging power at the POI per interconnection agreements, providing grid support where contracted, and coordinating protection and telemetry with the utility.",
    responses: [
      { system: "POI", action: "Importing / exchanging with utility", tone: "ok" },
      { system: "EMS", action: "Coordinating interchange schedule", tone: "info" },
      { system: "BESS", action: "Charging on favorable exchange", tone: "ok" },
      { system: "PROTECTION", action: "Utility coordination active", tone: "info" },
    ],
  },
  {
    id: "islanded",
    name: "Islanded",
    short: "Utility line opens. Generation and BESS maintain the campus.",
    description:
      "The utility connection is opened and the campus separates from the grid. On-site generation anchors frequency and voltage while BESS provides fast stabilization. The EMS manages the transition and maintains campus load in island mode.",
    responses: [
      { system: "POI", action: "BREAKER OPEN — campus separated", tone: "warn" },
      { system: "GENERATION", action: "Anchoring frequency & voltage", tone: "ok" },
      { system: "BESS", action: "Discharging — fast stabilization", tone: "warn" },
      { system: "EMS", action: "Island mode — load/gen balance", tone: "info" },
    ],
  },
  {
    id: "contingency",
    name: "Generation Contingency",
    short: "One generation block unavailable. BESS responds.",
    description:
      "A generation block trips or becomes unavailable. BESS responds within cycles to arrest frequency deviation, remaining units pick up load, and load-management logic stands ready to prioritize critical compute if required.",
    responses: [
      { system: "GT UNIT 2", action: "UNAVAILABLE — block offline", tone: "warn" },
      { system: "BESS", action: "Discharging — arresting deviation", tone: "warn" },
      { system: "GENERATION", action: "Remaining units picking up load", tone: "ok" },
      { system: "LOAD MGMT", action: "Armed — compute prioritization ready", tone: "info" },
    ],
  },
  {
    id: "renewable",
    name: "Renewable Optimization",
    short: "Solar contribution increases. BESS charge strategy adapts.",
    description:
      "Solar PV output is maximized into the campus energy mix. The EMS optimizes BESS charge/discharge around solar availability, reducing fuel burn while maintaining firm capacity margins for dynamic AI load.",
    responses: [
      { system: "SOLAR PV", action: "Maximum output into energy mix", tone: "ok" },
      { system: "BESS", action: "Charging on solar surplus", tone: "ok" },
      { system: "GENERATION", action: "Backing down — fuel savings", tone: "info" },
      { system: "EMS", action: "Optimizing renewable dispatch", tone: "info" },
    ],
  },
  {
    id: "blackstart",
    name: "Black Start / Restoration",
    short: "Conceptual staged restoration of the campus.",
    description:
      "A conceptual staged restoration sequence: essential systems → control infrastructure → generation (stabilized against the load-bank yard) → electrical buses → priority data-center load → additional compute blocks. Restoration philosophy is project-specific.",
    note: "Conceptual sequence — actual black-start architecture is established per project requirements.",
    responses: [
      { system: "RESTORATION", action: "Staged sequence in progress", tone: "warn" },
      { system: "CONTROLS", action: "Control infrastructure first", tone: "info" },
      { system: "LOAD BANKS", action: "Stabilizing generation blocks", tone: "warn" },
      { system: "PRIORITY LOAD", action: "Staged pickup after buses", tone: "info" },
    ],
  },
  {
    id: "loadevent",
    name: "AI Load Event",
    short: "Temporary compute-load excursion. Systems coordinate.",
    description:
      "A large training or inference event drives a rapid compute-load excursion. EMS, generation governors, BESS fast response and power-quality monitoring coordinate to hold frequency and voltage through the transient.",
    responses: [
      { system: "AI FACTORY", action: "Compute-load excursion detected", tone: "warn" },
      { system: "BESS", action: "Fast injection — buffering transient", tone: "warn" },
      { system: "GOVERNORS", action: "Generation following load ramp", tone: "ok" },
      { system: "PQ MONITOR", action: "Frequency / voltage in limits", tone: "ok" },
    ],
  },
];

export const BLACKSTART_STAGES = [
  "Essential systems",
  "Control infrastructure",
  "Generation",
  "Electrical buses",
  "Priority data-center load",
  "Additional compute blocks",
];

// ── AI Factory layers ────────────────────────────────────────────────────────

export interface FactoryLayer {
  id: string;
  name: string;
  blurb: string;
  systems: string[];
  color: string;
}

export const FACTORY_LAYERS: FactoryLayer[] = [
  {
    id: "power",
    name: "POWER",
    blurb: "Generation, transmission, switchyard, substations, BESS, renewables and distribution.",
    systems: ["On-site generation", "HV switchyard", "Utility interconnection", "BESS", "Solar PV", "MV distribution", "Protection & metering"],
    color: "#4c8dff",
  },
  {
    id: "facility",
    name: "FACILITY",
    blurb: "Cooling, electrical distribution, UPS systems, physical infrastructure and operational resilience.",
    systems: ["Cooling / heat rejection", "UPS / power conversion", "PDU / busway", "Building management", "Fire & life safety", "Physical security"],
    color: "#8b98ab",
  },
  {
    id: "compute",
    name: "COMPUTE",
    blurb: "GPU clusters, networking, storage and workload orchestration.",
    systems: ["GPU compute blocks", "High-speed fabric / networking", "Storage systems", "Workload orchestration", "Capacity management"],
    color: "#22d3ee",
  },
  {
    id: "control",
    name: "CONTROL",
    blurb: "EMS, microgrid controls, DCS, SCADA, DCIM, automation and digital twins.",
    systems: ["EMS / microgrid control", "DCS / PLC", "SCADA", "DCIM", "Protection & control", "Historian", "Digital twin"],
    color: "#f5a524",
  },
  {
    id: "operations",
    name: "OPERATIONS",
    blurb: "Reliability, cybersecurity, maintenance, compliance, energy optimization and incident response.",
    systems: ["Control-room operations", "OT cybersecurity / SOC", "Maintenance & reliability", "Compliance", "Energy optimization", "Incident response"],
    color: "#34d399",
  },
];

// ── Success pillars ──────────────────────────────────────────────────────────

export interface Pillar {
  id: string;
  name: string;
  blurb: string;
}

export const PILLARS: Pillar[] = [
  { id: "speed", name: "Speed to Power", blurb: "Interconnection strategy, permitting, generation strategy, long-lead equipment and phased energization." },
  { id: "reliability", name: "Reliability", blurb: "N+1 / resilience philosophy, generation availability, BESS support, backup systems and operational readiness." },
  { id: "stability", name: "Grid Stability", blurb: "Load-flow, transient, short-circuit, harmonics, dynamic studies, frequency response and voltage performance." },
  { id: "control", name: "Integrated Control", blurb: "EMS, microgrid control, generation controls, protection, SCADA, DCIM and compute coordination." },
  { id: "cyber", name: "Cybersecurity", blurb: "Secure OT architecture, segmentation, remote access, identity, monitoring, incident response and compliance." },
  { id: "commissioning", name: "Commissioning", blurb: "FAT, SAT, SIT, UAT, protection validation, end-to-end testing and scenario testing." },
  { id: "readiness", name: "Operational Readiness", blurb: "Procedures, training, control-room readiness, maintenance strategies and operational governance." },
  { id: "program", name: "Program Integration", blurb: "One program structure connecting engineering, vendors, controls, construction, IT/OT, commissioning and operations." },
];

// ── Workstreams ──────────────────────────────────────────────────────────────

export interface Workstream {
  id: string;
  num: string;
  name: string;
  smes: string[];
  capabilities: string[];
  assets: AssetId[];
  note?: string;
}

export const WORKSTREAMS: Workstream[] = [
  {
    id: "pmo",
    num: "01",
    name: "Program Leadership & PMO",
    smes: [
      "Executive Sponsor", "Program Director", "Program Manager", "Deputy Program Manager",
      "PMO Lead", "Project Controls Lead", "Scheduler", "Cost Controls SME", "Risk Manager",
      "Requirements Manager", "Interface Manager", "Document Control Lead",
      "Commercial / Contract Management", "Procurement / Vendor Management", "Change Management Lead",
    ],
    capabilities: [
      "Integrated master schedule", "Governance", "Decision management", "RAID management",
      "Requirements traceability", "Executive reporting", "Interface coordination", "Cost and schedule controls",
    ],
    assets: ["datacenter", "generation", "bess", "solar", "switchyard", "poi", "maincontrol", "backupcontrol", "otnetwork"],
  },
  {
    id: "powersystems",
    num: "02",
    name: "Power Systems & Grid",
    smes: [
      "Power Systems Architect", "Grid Interconnection SME", "Transmission Planning SME",
      "Load Flow SME", "Short Circuit SME", "Dynamic Studies SME",
      "Harmonics / Power Quality SME", "Grounding SME", "Electrical Studies Lead",
    ],
    capabilities: [
      "Interconnection strategy", "Steady-state studies", "Transient studies", "Dynamic simulations",
      "Grid-code evaluation", "Protection coordination", "Operating limits", "Grid stability",
    ],
    assets: ["poi", "switchyard", "generation", "bess", "solar", "datacenter"],
  },
  {
    id: "generation",
    num: "03",
    name: "Generation & Balance of Plant",
    smes: [
      "Generation Integration Lead", "Gas Turbine SME", "Combined Cycle SME", "Balance-of-Plant SME",
      "Generator Controls SME", "Fuel Gas SME", "Mechanical Systems SME",
      "Electrical Generation SME", "Emissions / Environmental SME",
    ],
    capabilities: [
      "Generation architecture", "Dispatch strategy", "Start sequencing", "Governor interaction",
      "Electrical integration", "Availability", "Fuel-to-power coordination",
    ],
    assets: ["generation", "switchyard", "loadbank"],
  },
  {
    id: "bess",
    num: "04",
    name: "BESS & Renewable Energy",
    smes: [
      "BESS Integration Lead", "Battery SME", "PCS SME", "BPPC / Plant Controller SME",
      "Solar PV SME", "DER Controls SME", "Energy Optimization SME",
    ],
    capabilities: [
      "BESS sizing", "Active / reactive power support", "Frequency response", "State-of-charge strategy",
      "Renewable integration", "Grid-forming studies", "Resilience", "Power-quality support",
    ],
    assets: ["bess", "solar", "switchyard"],
  },
  {
    id: "substation",
    num: "05",
    name: "Switchyard, Substation & Protection",
    smes: [
      "Substation Lead", "Switchyard Engineer", "Protection & Control Lead", "Relay SME",
      "Metering SME", "Transformer SME", "HV Equipment SME", "Substation Automation SME",
    ],
    capabilities: [
      "Conceptual one-lines", "Breaker schemes", "Bus architecture", "Protection design",
      "Relay coordination", "Synchronization", "Revenue metering", "Station automation",
    ],
    assets: ["switchyard", "poi", "generation", "bess"],
  },
  {
    id: "ems",
    num: "06",
    name: "EMS / Microgrid / SCADA",
    smes: [
      "EMS Architect", "Microgrid Controls SME", "SCADA Lead", "AGC / Generation Control SME",
      "Load-Shedding SME", "HMI SME", "Historian SME", "Alarm Management SME",
      "Network Model SME", "Real-Time Applications SME",
    ],
    capabilities: [
      "Generation dispatch", "P/f control", "Q/V control", "Topology processing", "State estimation",
      "Load shedding", "Operating-mode management", "Alarms", "Situational awareness",
      "Historian", "Operator HMI",
    ],
    assets: ["maincontrol", "backupcontrol", "generation", "bess", "solar", "switchyard", "datacenter"],
  },
  {
    id: "dcs",
    num: "07",
    name: "DCS / PLC / Plant Controls",
    smes: [
      "DCS Architect", "PLC Engineer", "Turbine Controls Integration SME",
      "Balance-of-Plant Controls SME", "Instrumentation SME", "Controls Interface SME",
    ],
    capabilities: [
      "Plant control", "Interlocks", "Sequencing", "Process automation",
      "Equipment health", "EMS/DCS integration",
    ],
    assets: ["generation", "maincontrol"],
  },
  {
    id: "dcelectrical",
    num: "08",
    name: "Data Center Electrical & Facility Integration",
    smes: [
      "Data Center Electrical Lead", "MV Distribution SME", "UPS SME", "PDU / Busway SME",
      "Cooling Systems SME", "DCIM SME", "Building Management Systems SME", "Data Center Reliability SME",
    ],
    capabilities: [
      "Load architecture", "Electrical distribution", "Cooling coordination", "Ride-through strategy",
      "Load prioritization", "DCIM integration", "Facility observability",
    ],
    assets: ["datacenter", "switchyard"],
  },
  {
    id: "otit",
    num: "09",
    name: "OT / IT Integration & Communications",
    smes: [
      "OT Network Architect", "Telecom Engineer", "Fiber / Communications SME",
      "Systems Integration Architect", "API / Middleware Architect",
      "Time Synchronization SME", "Data Integration SME",
    ],
    capabilities: [
      "OT LAN/WAN", "Redundant networking", "Telemetry architecture", "Protocols",
      "IEC 61850", "DNP3", "Modbus", "OPC UA", "API integration", "Precision timing", "System interfaces",
    ],
    assets: ["otnetwork", "maincontrol", "backupcontrol", "generation", "bess", "solar", "switchyard", "datacenter"],
  },
  {
    id: "cyber",
    num: "10",
    name: "Cybersecurity & Compliance",
    smes: [
      "OT Cybersecurity Architect", "Cyber Program Lead", "Network Security SME", "IAM / PAM SME",
      "SOC Integration SME", "Vulnerability Management SME", "Incident Response SME",
      "NERC CIP SME", "Governance / Risk / Compliance SME",
    ],
    capabilities: [
      "Segmentation", "Zones and conduits", "Firewall architecture", "Secure remote access",
      "Identity", "Privileged access", "Logging", "Monitoring", "Asset inventory",
      "Vulnerability management", "Incident response",
      "NERC CIP applicability assessment and compliance support where applicable",
    ],
    assets: ["maincontrol", "backupcontrol", "switchyard", "bess", "datacenter", "otnetwork"],
    note: "NERC CIP applicability is assessed per project — it does not automatically apply to every AI data center program.",
  },
  {
    id: "digitaltwin",
    num: "11",
    name: "Data, AI & Digital Twin",
    smes: [
      "Digital Twin Architect", "Data Platform Architect", "Data Engineer", "AI / Analytics Lead",
      "Predictive Reliability SME", "Visualization SME", "Asset Information SME", "Industrial Data Model SME",
    ],
    capabilities: [
      "Unified operating context", "Asset models", "Real-time telemetry", "Engineering data",
      "Predictive maintenance", "Anomaly detection", "Scenario analysis", "AI-assisted operations",
    ],
    assets: ["maincontrol", "datacenter", "generation", "bess", "otnetwork"],
  },
  {
    id: "commissioning",
    num: "12",
    name: "Testing & Commissioning",
    smes: [
      "Commissioning Manager", "Test Manager", "EMS Test Lead", "Protection Test SME",
      "Controls Test SME", "Cyber Test SME", "Interface Test Lead",
      "Simulation Engineer", "Operational Readiness Lead",
    ],
    capabilities: [
      "FAT", "SAT", "SIT", "UAT", "Hardware-in-the-loop", "Scenario testing", "Failover testing",
      "Islanding testing", "Synchronization testing", "Performance verification", "Cutover readiness",
    ],
    assets: ["generation", "bess", "solar", "switchyard", "poi", "datacenter", "maincontrol", "backupcontrol", "loadbank"],
  },
  {
    id: "operations",
    num: "13",
    name: "Operations & Managed Services",
    smes: [
      "Operations Readiness Lead", "Control Room Operations SME", "Reliability Engineer",
      "Maintenance Strategy SME", "Asset Performance SME", "Training Lead",
      "Procedures Lead", "Managed Services Lead",
    ],
    capabilities: [
      "SOPs", "Training", "Staffing model", "Alarm governance", "Maintenance strategy",
      "Reliability", "KPI framework", "Continuous optimization", "Incident management",
    ],
    assets: ["maincontrol", "backupcontrol", "datacenter", "generation", "bess"],
  },
];

// ── Delivery roadmap ─────────────────────────────────────────────────────────

export interface Phase {
  num: string;
  name: string;
  activities: string[];
  outputs: string[];
}

export const PHASES: Phase[] = [
  {
    num: "0",
    name: "Discovery & Readiness",
    activities: [
      "Business objectives", "Stakeholder alignment", "Document intake", "Site / asset inventory",
      "Telemetry inventory", "Initial load assumptions", "Baseline risks", "Project delivery strategy",
    ],
    outputs: ["Readiness Assessment", "Initial Architecture", "Gap Register", "Executive Roadmap"],
  },
  {
    num: "1",
    name: "Strategy, Requirements & Procurement",
    activities: [
      "Use cases", "Basis of Design", "Operating philosophy", "Requirements",
      "RFP development", "Vendor strategy", "Interconnection strategy", "Commercial framework",
    ],
    outputs: ["Requirements Specification", "Operating Philosophy", "RFP Package", "Evaluation Framework"],
  },
  {
    num: "2",
    name: "Vendor Evaluation & Selection",
    activities: [
      "Technical scoring", "Architecture reviews", "Demonstrations", "Interface reviews",
      "Cyber evaluation", "TCO", "Risk analysis", "Negotiations",
    ],
    outputs: ["Vendor Scorecards", "Risk Assessment", "Recommendation", "Contract Technical Exhibits"],
  },
  {
    num: "3",
    name: "Engineering & Solution Design",
    activities: [
      "Detailed architecture", "Electrical design", "Controls design", "Network design",
      "Cybersecurity architecture", "Protection philosophy", "Interface control documents",
      "Design reviews & requirements verification",
    ],
    outputs: ["Approved Design Packages", "Interface Control Documents", "Cyber Architecture", "Test Strategy"],
  },
  {
    num: "4",
    name: "Implementation & Integration",
    activities: [
      "Vendor engineering oversight", "Factory builds", "Software configuration", "System integration",
      "OT network deployment", "Interface implementation", "Construction & installation coordination",
      "Change and configuration management",
    ],
    outputs: ["Integrated Systems", "FAT Results", "Configuration Baselines", "Integration Reports"],
  },
  {
    num: "5",
    name: "Testing, Commissioning & Energization",
    activities: [
      "SAT / SIT / UAT", "Protection validation", "End-to-end scenario testing", "Failover & islanding tests",
      "Cyber validation", "Phased energization", "Performance verification", "Operational cutover",
    ],
    outputs: ["Commissioning Records", "Test Reports", "Energization Certificates", "As-Built Baselines"],
  },
  {
    num: "6",
    name: "Operations & Continuous Optimization",
    activities: [
      "Control-room operations", "Alarm governance", "Maintenance & reliability programs",
      "Cyber monitoring & incident response", "KPI reporting", "Energy optimization",
      "Digital-twin-assisted operations", "Continuous improvement",
    ],
    outputs: ["Operational KPIs", "Reliability Reports", "Optimization Roadmap", "Lessons-Learned Register"],
  },
];

// ── Program organization (typical structure) ─────────────────────────────────

export interface OrgBranch {
  lead: string;
  color: string;
  reports: string[];
}

export const ORG = {
  sponsor: "Executive Sponsor",
  director: "Program Director",
  pm: "Program Manager",
  pmo: [
    "PMO Lead", "Project Controls", "Scheduler", "Risk Manager",
    "Requirements Manager", "Interface Manager", "Document Control",
    "Commercial / Contracts", "Procurement / Vendors",
  ],
  branches: [
    {
      lead: "Engineering Lead",
      color: "#4c8dff",
      reports: [
        "Power Systems & Grid",
        "Generation & BOP",
        "BESS & Renewables",
        "Switchyard & Protection",
        "Data Center Electrical",
      ],
    },
    {
      lead: "Controls & Integration Lead",
      color: "#22d3ee",
      reports: [
        "EMS / Microgrid / SCADA",
        "DCS / PLC / Plant Controls",
        "OT / IT & Communications",
        "Data & Digital Twin",
      ],
    },
    {
      lead: "Cybersecurity Lead",
      color: "#f5a524",
      reports: [
        "OT Cyber Architecture",
        "SOC Integration",
        "IAM / Remote Access",
        "GRC / Compliance",
      ],
    },
    {
      lead: "Commissioning & Test Lead",
      color: "#fb7185",
      reports: [
        "FAT / SAT / SIT / UAT",
        "Protection & Relay Testing",
        "Load Bank & Islanding Tests",
        "Simulation / HIL",
      ],
    },
    {
      lead: "Operations Readiness Lead",
      color: "#34d399",
      reports: [
        "Control Room Operations",
        "Training & Procedures",
        "Maintenance & Reliability",
        "Managed Services",
      ],
    },
  ] as OrgBranch[],
};

// ── Conceptual commissioning & energization schedule ─────────────────────────

export interface ScheduleBar {
  name: string;
  start: number; // month (1-based, inclusive)
  end: number;   // month (inclusive)
}

export interface ScheduleLane {
  name: string;
  color: string;
  bars: ScheduleBar[];
}

export const SCHEDULE_MONTHS = 18;

export const SCHEDULE_LANES: ScheduleLane[] = [
  {
    name: "HV Switchyard & POI",
    color: "#94a3b8",
    bars: [
      { name: "Construction & installation", start: 1, end: 6 },
      { name: "Protection / relay SAT", start: 6, end: 8 },
    ],
  },
  {
    name: "On-Site Generation",
    color: "#4c8dff",
    bars: [
      { name: "Installation", start: 2, end: 8 },
      { name: "Load bank testing & tuning", start: 9, end: 11 },
      { name: "Reliability runs", start: 11, end: 13 },
    ],
  },
  {
    name: "Load Banks",
    color: "#fb923c",
    bars: [
      { name: "Mobilize & connect", start: 8, end: 9 },
      { name: "Generation commissioning support", start: 9, end: 12 },
      { name: "Island / black-start test support", start: 13, end: 14 },
    ],
  },
  {
    name: "BESS",
    color: "#34d399",
    bars: [
      { name: "Installation", start: 4, end: 9 },
      { name: "PCS / BPPC SAT", start: 9, end: 11 },
      { name: "Grid-support tests", start: 11, end: 13 },
    ],
  },
  {
    name: "Solar PV",
    color: "#a3e635",
    bars: [
      { name: "Installation", start: 5, end: 10 },
      { name: "Inverter SAT & integration", start: 10, end: 13 },
    ],
  },
  {
    name: "EMS / SCADA / Controls",
    color: "#22d3ee",
    bars: [
      { name: "FAT", start: 5, end: 7 },
      { name: "Site install & SAT", start: 8, end: 11 },
      { name: "SIT — end-to-end", start: 11, end: 14 },
      { name: "UAT", start: 14, end: 15 },
    ],
  },
  {
    name: "Cybersecurity",
    color: "#f5a524",
    bars: [
      { name: "Architecture validation", start: 6, end: 9 },
      { name: "Cyber testing", start: 12, end: 14 },
      { name: "Compliance evidence", start: 14, end: 16 },
    ],
  },
  {
    name: "AI Data Center",
    color: "#818cf8",
    bars: [
      { name: "Fit-out", start: 3, end: 12 },
      { name: "Priority hall energization", start: 13, end: 14 },
      { name: "Phased compute ramp", start: 14, end: 18 },
    ],
  },
];

export interface Milestone {
  name: string;
  month: number;
}

export const MILESTONES: Milestone[] = [
  { name: "Backfeed available", month: 8 },
  { name: "First fire", month: 9 },
  { name: "Island / black-start test", month: 14 },
  { name: "Phase 1 COD", month: 15 },
  { name: "Full campus COD", month: 18 },
];

// ── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { label: "Campus", href: "#campus" },
  { label: "AI Factory", href: "#ai-factory" },
  { label: "Architecture", href: "#architecture" },
  { label: "Workstreams", href: "#workstreams" },
  { label: "Delivery", href: "#delivery" },
  { label: "Schedule", href: "#schedule" },
  { label: "Operations", href: "#operations" },
  { label: "Advisory", href: "#advisory" },
  { label: "About", href: "#about" },
];

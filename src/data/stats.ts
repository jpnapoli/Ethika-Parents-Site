import { TOOLS } from "./tools";
import { CASES } from "./cases";
import { EXPERTS, ORGANIZATIONS } from "./experts";
import { ACTIVITIES } from "./activities";

export function getStats() {
  return {
    tools: TOOLS.length,
    cases: CASES.length,
    experts: EXPERTS.length,
    organizations: ORGANIZATIONS.length,
    activities: ACTIVITIES.length,
    freeTools: TOOLS.filter(t => t.free).length,
    highPrivacyTools: TOOLS.filter(t => t.privacyLevel === "high").length,
    saudiOrgs: ORGANIZATIONS.filter(o => o.region === "saudi").length,
  };
}

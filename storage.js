const KEY = "demo_leads_v1";

export function getLocalLeads() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}

export function addLocalLead(lead) {
  const leads = getLocalLeads();
  leads.unshift(lead);
  localStorage.setItem(KEY, JSON.stringify(leads));
  return leads;
}

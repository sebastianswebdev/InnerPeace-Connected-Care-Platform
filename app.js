const $ = (selector, root = document) => root.querySelector(selector);
const app = document.querySelector("#app");

const state = {
  staffLoggedIn: false,
  managementLoggedIn: false,
  familyLoggedIn: false,
  trainingCompleted: false,
  moduleStep: 1,
  activeTrainingTab: "required",
};

const iconPaths = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',
  training: '<path d="m3 5 9-3 9 3-9 3-9-3Z"/><path d="M7 7.5V13c0 1.8 2.2 3.5 5 3.5s5-1.7 5-3.5V7.5"/><path d="M21 5v8"/>',
  file: '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3.5 2.1c-1.2.6-1.3 1.2-1.3 2.2M12 17h.01"/>',
  form: '<path d="M6 3h12v18H6z"/><path d="M9 7h6M9 11h6M9 15h3"/>',
  award: '<circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-2 4.5 2-1-9"/>',
  arrow: '<path d="m9 18 6-6-6-6"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  people: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-5"/>',
  message: '<path d="M4 5h16v12H8l-4 4z"/><path d="M8 9h8M8 13h5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
  activity: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
  upload: '<path d="M12 16V3M7 8l5-5 5 5"/><path d="M4 15v5h16v-5"/>',
  download: '<path d="M12 3v13M7 11l5 5 5-5"/><path d="M4 20h16"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  family: '<path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21v-2a7 7 0 0 1 14 0v2M17 11a3 3 0 1 0 0-6M17 14a6 6 0 0 1 5 6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
  log: '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 3h7v18h-7"/>',
  spark: '<path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3ZM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15ZM19 13l.6 1.4L21 15l-1.4.6L19 17l-.6-1.4L17 15l1.4-.6L19 13Z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
};

function icon(name, className = "icon") {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.info}</svg>`;
}

function brand(compact = false) {
  return `<a class="brand" href="#/" aria-label="InnerPeace Connected Care Platform home">
    <span class="brand-mark">${icon("heart")}</span>
    ${compact ? "" : `<span class="brand-copy"><strong>InnerPeace</strong><small>CONNECTED CARE</small></span>`}
  </a>`;
}

function route(path) { window.location.hash = path; }
function currentRoute() { return (window.location.hash || "#/ ").replace("#", "").trim() || "/"; }
function isActive(prefix) { const r = currentRoute(); return r === prefix || r.startsWith(prefix + "/"); }

function toast(message) {
  const region = document.querySelector("#toast-region");
  const node = document.createElement("div");
  node.className = "toast";
  node.innerHTML = `${icon("check")}<span>${message}</span>`;
  region.appendChild(node);
  window.setTimeout(() => node.remove(), 3400);
}

function openModal(content) {
  const wrapper = document.createElement("div");
  wrapper.className = "modal-backdrop";
  wrapper.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${content}</div>`;
  wrapper.addEventListener("click", (event) => { if (event.target === wrapper) wrapper.remove(); });
  document.body.appendChild(wrapper);
  $(".modal-close", wrapper)?.addEventListener("click", () => wrapper.remove());
  return wrapper;
}

const status = (label, kind = "info") => `<span class="status ${kind}">${label}</span>`;
const avatar = (initials, kind = "") => `<span class="avatar ${kind}">${initials}</span>`;

function presentationNav() {
  return `<nav class="site-nav" aria-label="Presentation navigation"><div class="container">
    ${brand()}
    <div class="site-nav-links">
      <a href="#opportunity">Opportunity</a><a href="#ecosystem">Ecosystem</a><a href="#impact">Business impact</a>
      <a class="btn btn-primary" href="#/staff/login">Explore the prototype ${icon("arrow", "icon-sm")}</a>
    </div>
  </div></nav>`;
}

function deviceStage() {
  return `<div class="device-stage" aria-label="Clickable previews of the connected platform">
    <span class="family-ribbon">Three connected experiences</span>
    <button class="device device-phone" data-route="/staff/login" aria-label="Open Staff App">
      <span class="device-screen">
        <span class="device-head"><span class="mini-logo">Staff App</span><span class="mini-avatar">MC</span></span>
        <span class="mini-welcome">Good morning,<br>Maya</span><span class="mini-sub">Here’s what needs your attention today.</span>
        <span class="mini-card teal"><strong>Infection Prevention</strong><span>Required • 12 mins remaining</span><span class="mini-progress"><i></i></span></span>
        <span class="mini-card"><strong>Today’s update</strong><span>Spring wellbeing reminder</span></span>
        <span class="mini-bottom"><b>Home</b><span>Training</span><span>Resources</span><span>More</span></span>
      </span>
    </button>
    <button class="device device-tablet" data-route="/family/login" aria-label="Open Client and Family Portal">
      <span class="device-screen" style="padding:0"><span class="tablet-layout">
        <span class="mini-side"><b>Family Portal</b><span class="mini-nav"><i></i><i></i><i></i><i></i></span></span>
        <span class="mini-main"><span class="mini-welcome">Welcome, Alice</span><span class="mini-sub">A simple way to stay connected with John’s care.</span>
          <span class="mini-grid"><span class="mini-stat"><b>2</b><span>new updates</span></span><span class="mini-stat"><b>6</b><span>resources</span></span><span class="mini-stat"><b>1</b><span>message</span></span></span>
          <span class="mini-card" style="margin-top:10px"><strong>A lovely morning out</strong><span>Authorised update • Today</span></span>
        </span>
      </span></span>
    </button>
    <button class="device device-laptop" data-route="/management/login" aria-label="Open Management Platform">
      <span class="device-screen" style="padding:0"><span class="laptop-layout">
        <span class="mini-side"><b>Management</b><span class="mini-nav"><i></i><i></i><i></i><i></i><i></i></span></span>
        <span class="mini-main"><span class="mini-welcome">Good morning, Annette</span><span class="mini-sub">Your team and compliance overview.</span>
          <span class="mini-grid"><span class="mini-stat"><b>28</b><span>active staff</span></span><span class="mini-stat"><b>86%</b><span>compliance</span></span><span class="mini-stat"><b>4</b><span>overdue</span></span></span>
          <span class="mini-chart"><i style="height:55%"></i><i></i><i></i><i></i><i></i><i style="height:92%"></i></span>
        </span>
      </span></span>
    </button>
  </div>`;
}

function landingPage() {
  return `${presentationNav()}
    <main id="main-content">
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">A connected digital future for InnerPeace</p>
            <h1>InnerPeace<br><em>Connected Care</em><br>Platform</h1>
            <p class="lead"><strong>One connected platform for Staff, Management, Clients &amp; Families.</strong><br>Designed to simplify operations, strengthen communication and support the sustainable growth of InnerPeace.</p>
            <div class="button-row"><a class="btn btn-primary" href="#/staff/login">Explore Staff App ${icon("arrow", "icon-sm")}</a><a class="btn btn-secondary" href="#ecosystem">See the ecosystem</a></div>
            <div class="hero-note"><span class="pulse-dot"></span><span>Interactive concept — choose any device to explore</span></div>
          </div>
          ${deviceStage()}
        </div>
      </section>
      <section class="intro-band"><div class="container">
        <h3>One calm, familiar place for everyone InnerPeace supports.</h3>
        <div class="intro-pill"><b>Staff</b><span>Learn &amp; stay informed</span></div>
        <div class="intro-pill"><b>Management</b><span>See &amp; act clearly</span></div>
        <div class="intro-pill"><b>Families</b><span>Feel connected</span></div>
      </div></section>

      <section class="section" id="opportunity"><div class="container">
        <div class="section-head"><div><p class="eyebrow">The opportunity</p><h2>More time for care.<br>Less time managing systems.</h2></div><p class="lead">As InnerPeace grows, everyday administration should not have to grow at the same rate. A connected platform gives every person a clearer next step.</p></div>
        <div class="opportunity-grid">
          <div class="photo-card"><img src="./assets/innerpeace-team.jpg" alt="InnerPeace care team"><div class="photo-caption"><h3>Technology that supports the human work</h3><p>Simple enough for every team member. Structured enough to help management grow with confidence.</p></div></div>
          <div class="problem-list">
            <article class="problem-card"><div class="icon-wrap">${icon("clock")}</div><h3>Less chasing</h3><p>Required training, reminders and completion records in one place.</p></article>
            <article class="problem-card"><div class="icon-wrap">${icon("search")}</div><h3>Fewer repeat questions</h3><p>Current policies, resources and forms are easy to find.</p></article>
            <article class="problem-card"><div class="icon-wrap">${icon("people")}</div><h3>Smoother onboarding</h3><p>A clear welcome journey for every new staff member.</p></article>
            <article class="problem-card"><div class="icon-wrap">${icon("heart")}</div><h3>Stronger connection</h3><p>Selected updates and resources for authorised family members.</p></article>
            <article class="problem-card"><div class="icon-wrap">${icon("eye")}</div><h3>Greater visibility</h3><p>Management can see what is complete, due and overdue.</p></article>
            <article class="problem-card"><div class="icon-wrap">${icon("chart")}</div><h3>Built to scale</h3><p>Support more people without administration increasing at the same rate.</p></article>
          </div>
        </div>
      </div></section>

      <section class="section ecosystem" id="ecosystem"><div class="container">
        <div class="section-head"><div><p class="eyebrow">One connected ecosystem</p><h2>Different needs.<br>One shared source of truth.</h2></div><p class="lead">Each experience is tailored to its audience while remaining part of the same InnerPeace service ecosystem.</p></div>
        <div class="ecosystem-map">
          <div class="ecosystem-hub">${icon("heart")}</div>
          <article class="ecosystem-card"><div class="role-icon">${icon("training")}</div><h3>Staff App</h3><p>A mobile and iPad-first home for learning, resources and everyday updates.</p><ul class="feature-list"><li>Required training &amp; progress</li><li>Policies, resources &amp; forms</li><li>Announcements &amp; notifications</li></ul><a class="btn btn-secondary btn-sm" href="#/staff/login">Open Staff App</a></article>
          <article class="ecosystem-card"><div class="role-icon">${icon("chart")}</div><h3>Management Platform</h3><p>Clarity across people, training, documents, reports and access.</p><ul class="feature-list"><li>Compliance at a glance</li><li>Staff onboarding &amp; profiles</li><li>Reports, roles &amp; activity</li></ul><a class="btn btn-secondary btn-sm" href="#/management/login">Open Management</a></article>
          <article class="ecosystem-card"><div class="role-icon">${icon("family")}</div><h3>Client &amp; Family Portal</h3><p>A secure-looking, welcoming place for approved information and connection.</p><ul class="feature-list"><li>Authorised updates</li><li>Helpful resources &amp; documents</li><li>Simple contact &amp; access controls</li></ul><a class="btn btn-secondary btn-sm" href="#/family/login">Open Family Portal</a></article>
        </div>
      </div></section>

      <section class="section"><div class="container">
        <div class="section-head"><div><p class="eyebrow">Better for everyone</p><h2>A simpler experience at every touchpoint.</h2></div></div>
        <div class="role-story">
          <article class="role-panel light"><p class="eyebrow">Better for staff</p><h2>Everything they need.<br>Nothing they don’t.</h2><div class="story-items">
            <div class="story-item"><div class="icon-wrap">${icon("training")}</div><div><h3>Know what comes next</h3><p>Required learning and due dates are clear from the first screen.</p></div></div>
            <div class="story-item"><div class="icon-wrap">${icon("file")}</div><div><h3>Find the right resource</h3><p>Current policies and practical guides are a few taps away.</p></div></div>
            <div class="story-item"><div class="icon-wrap">${icon("award")}</div><div><h3>See progress grow</h3><p>Completion and certificates reinforce momentum.</p></div></div>
          </div><span class="big-number">01</span></article>
          <article class="role-panel dark"><p class="eyebrow">Better for management</p><h2>Visibility that turns<br>into action.</h2><div class="story-items">
            <div class="story-item"><div class="icon-wrap">${icon("eye")}</div><div><h3>See compliance clearly</h3><p>Spot outstanding training without manually checking each record.</p></div></div>
            <div class="story-item"><div class="icon-wrap">${icon("people")}</div><div><h3>Welcome staff consistently</h3><p>Guide every new employee through a repeatable onboarding path.</p></div></div>
            <div class="story-item"><div class="icon-wrap">${icon("chart")}</div><div><h3>Make informed decisions</h3><p>Simple operational reporting shows where attention is needed.</p></div></div>
          </div><span class="big-number">02</span></article>
        </div>
      </div></section>

      <section class="section impact" id="impact"><div class="container impact-grid">
        <div class="impact-copy"><p class="eyebrow">Business impact</p><h2>Designed to create capacity—not complexity.</h2><p class="lead">The value is not just in putting information online. It is in making everyday work easier, improving communication and giving InnerPeace a stronger platform for sustainable growth.</p><div class="roi-note"><strong>Potential ROI</strong><br><span class="muted">Reduced administrative workload, improved operational capacity and opportunities to create additional value through enhanced digital services.</span></div></div>
        <div class="impact-cards">
          <article class="impact-card">${icon("clock")}<h3>Less administration</h3><p>Centralised training, documents and self-service information.</p></article>
          <article class="impact-card">${icon("people")}<h3>More capacity</h3><p>Support business growth without admin effort rising at the same pace.</p></article>
          <article class="impact-card">${icon("message")}<h3>Stronger communication</h3><p>A clearer connection between management, staff and families.</p></article>
          <article class="impact-card">${icon("spark")}<h3>Meaningful difference</h3><p>A modern service experience that can help InnerPeace stand apart.</p></article>
        </div>
      </div></section>

      <section class="section"><div class="container"><div class="growth-card">
        <div class="growth-content"><p class="eyebrow">Built for growth</p><h2>A strong first step—with room to keep building.</h2><p class="lead">The initial platform can focus on the experiences that create the most value now, while establishing a coherent design system and product foundation for future phases.</p><div class="button-row"><a class="btn btn-primary" href="#/management/login">Experience the platform</a><a class="btn btn-secondary" href="#/family/login">View Family Portal</a></div></div>
        <div class="growth-steps"><div class="growth-step"><span>1</span><div><h3>Connect the essentials</h3><p>Staff learning, management visibility and family access.</p></div></div><div class="growth-step"><span>2</span><div><h3>Learn from real use</h3><p>Refine the production scope around actual workflows.</p></div></div><div class="growth-step"><span>3</span><div><h3>Expand with confidence</h3><p>Add approved automation and integrations in later phases.</p></div></div></div>
      </div></div></section>
    </main>
    <footer class="site-footer"><div class="container">${brand()}<p>One connected platform. Better for staff. Better for families. Better for InnerPeace.</p></div></footer>`;
}

function loginPage(role) {
  const config = {
    staff: { title: "Welcome back", eyebrow: "Staff App", copy: "Training, resources and updates—together in one simple place.", quote: "Everything I need for my workday is easy to find.", button: "Continue to Staff App", route: "/staff/dashboard", email: "maya.chen@innerpeace.demo" },
    management: { title: "Management sign in", eyebrow: "Management Platform", copy: "A clear view of your people, training and operations.", quote: "See where attention is needed, then take action in a few clicks.", button: "Continue to Management", route: "/management/dashboard", email: "annette@innerpeace.demo" },
    family: { title: "Welcome to your portal", eyebrow: "Client & Family Portal", copy: "A simple, private-looking place to stay informed and connected.", quote: "The information that matters, shared with the people who are authorised to see it.", button: "Continue to Family Portal", route: "/family/dashboard", email: "alice.wood@family.demo" },
  }[role];
  return `<main id="main-content" class="login-page">
    <section class="login-brand">${brand()}<div class="login-brand-copy"><p class="eyebrow" style="color:var(--sage-soft)">${config.eyebrow}</p><h1>${config.copy}</h1></div><blockquote class="login-quote">“${config.quote}”</blockquote></section>
    <section class="login-panel"><form class="login-box" data-login="${role}"><a class="back-link" href="#/">${icon("back", "icon-sm")} Back to platform overview</a><p class="eyebrow">Secure access concept</p><h2>${config.title}</h2><p>Use the pre-filled fictional details to explore this concept.</p>
      <div class="field"><label for="${role}-email">Email address</label><input class="input" id="${role}-email" type="email" value="${config.email}" autocomplete="username"></div>
      <div class="field"><label for="${role}-password">Password</label><input class="input" id="${role}-password" type="password" value="InnerPeaceDemo" autocomplete="current-password"></div>
      <div class="form-options"><label class="check"><input type="checkbox" checked> Remember me</label><a href="#" class="muted">Need help signing in?</a></div>
      <button class="btn btn-primary" type="submit">${icon("lock", "icon-sm")} ${config.button}</button><div class="demo-note">Simulated authentication only. No real account or personal data is used.</div>
    </form></section>
  </main>`;
}

const staffNav = [
  ["/staff/dashboard", "home", "Home"], ["/staff/training", "training", "Training"], ["/staff/progress", "award", "Progress & Certificates"],
  ["/staff/resources", "file", "Resources"], ["/staff/documents", "file", "Policies & Documents"], ["/staff/announcements", "bell", "Announcements"],
  ["/staff/forms", "form", "Forms & Checklists"], ["/staff/notifications", "bell", "Notifications", "3"], ["/staff/profile", "user", "Profile"], ["/staff/help", "help", "Help & Support"],
];

const managementNav = [
  ["/management/dashboard", "home", "Dashboard"], ["/management/staff", "people", "Staff"], ["/management/onboarding", "spark", "Onboarding"],
  ["/management/compliance", "training", "Training Compliance", "4"], ["/management/documents", "file", "Documents & Resources"], ["/management/announcements", "bell", "Announcements"],
  ["/management/forms", "form", "Forms"], ["/management/reports", "chart", "Reports"], ["/management/activity", "activity", "Activity Log"],
  ["/management/permissions", "shield", "Roles & Access"], ["/management/families", "family", "Client & Family Accounts"],
];

function sideNav(items, role) {
  const groupAt = role === "management" ? 4 : 3;
  return items.map((item, index) => `${index === groupAt ? '<p class="side-section-label">More tools</p>' : ""}<a href="#${item[0]}" class="${isActive(item[0]) ? "active" : ""}">${icon(item[1], "icon-sm")}<span>${item[2]}</span>${item[3] ? `<span class="nav-count">${item[3]}</span>` : ""}</a>`).join("");
}

function mobileHeader(role) {
  const title = role === "management" ? "Management" : "Staff App";
  return `<header class="mobile-app-head">${brand(true)}<b>${title}</b><a class="icon-btn" href="#/${role}/notifications" aria-label="Notifications">${icon("bell", "icon-sm")}</a></header>`;
}

function mobileBottom(role) {
  const items = role === "management"
    ? [["/management/dashboard","home","Home"],["/management/staff","people","Staff"],["/management/compliance","training","Training"],["/management/reports","chart","Reports"]]
    : [["/staff/dashboard","home","Home"],["/staff/training","training","Training"],["/staff/resources","file","Resources"],["/staff/profile","user","More"]];
  return `<nav class="mobile-bottom" aria-label="Mobile navigation">${items.map(i => `<a href="#${i[0]}" class="${isActive(i[0]) ? "active" : ""}">${icon(i[1], "icon-sm")}<span>${i[2]}</span></a>`).join("")}</nav>`;
}

function appShell(role, title, body, actions = "") {
  const isManager = role === "management";
  const items = isManager ? managementNav : staffNav;
  const person = isManager ? { name: "Annette Keat", role: "Director", initials: "AK" } : { name: "Maya Chen", role: "Care Support Worker", initials: "MC" };
  return `<div class="app-shell">
    <aside class="app-sidebar">${brand()}<p class="side-section-label">${isManager ? "Manage" : "Your workspace"}</p><nav class="side-nav" aria-label="${title} navigation">${sideNav(items, role)}</nav><div class="sidebar-bottom"><div class="role-switch"><small>Presentation mode</small><a href="#/">${icon("back", "icon-sm")} Return to overview</a></div></div></aside>
    <div class="app-main">${mobileHeader(role)}<header class="app-topbar"><h1>${title}</h1><div class="topbar-actions">${actions}<a class="icon-btn" href="#/${role}/notifications" aria-label="Notifications">${icon("bell", "icon-sm")}</a><div class="user-chip">${avatar(person.initials, isManager ? "sage" : "")}<span><strong>${person.name}</strong><small>${person.role}</small></span></div></div></header><main id="main-content" class="app-content">${body}</main>${mobileBottom(role)}</div>
  </div>`;
}

function staffDashboard() {
  const percent = state.trainingCompleted ? 82 : 68;
  const trainingTitle = state.trainingCompleted ? "Manual Handling Refresher" : "Infection Prevention Essentials";
  return appShell("staff", "Home", `<div class="page-head"><div><h2>Good morning, Maya</h2><p>Tuesday, 6 October • Here’s what needs your attention today.</p></div><button class="btn btn-secondary btn-sm" data-route="/staff/notifications">${icon("bell", "icon-sm")} 3 new notifications</button></div>
    <section class="dashboard-grid">
      <article class="welcome-card"><span class="eyebrow" style="color:var(--sage-soft)">Today’s focus</span><h2>${state.trainingCompleted ? "Great work—one less task to chase." : "One required module is due this week."}</h2><p>${state.trainingCompleted ? "Your training progress has been updated and your certificate is ready." : "Complete Infection Prevention Essentials by Friday to stay up to date."}</p><div class="focus-row"><div><b>${trainingTitle}</b><span>${state.trainingCompleted ? "Due 24 October • 18 mins" : "Due 9 October • 12 mins remaining"}</span></div><a class="btn btn-white btn-sm" href="#/${state.trainingCompleted ? "staff/training" : "staff/training/infection-prevention"}">${state.trainingCompleted ? "View next module" : "Continue training"}</a></div></article>
      <article class="card progress-card"><div class="progress-ring" style="--value:${percent}"><span>${percent}%</span></div><h3>Training progress</h3><p>${state.trainingCompleted ? "9 of 11 modules complete" : "8 of 11 modules complete"}</p><a class="btn btn-quiet btn-sm" href="#/staff/progress">View my progress</a></article>
    </section>
    <section class="quick-grid" style="margin-top:20px">
      <a class="card quick-card" href="#/staff/training"><div class="icon-wrap">${icon("training")}</div><h3>Training</h3><span>${state.trainingCompleted ? "2" : "3"} modules to complete</span></a>
      <a class="card quick-card" href="#/staff/resources"><div class="icon-wrap">${icon("file")}</div><h3>Staff resources</h3><span>Guides and useful information</span></a>
      <a class="card quick-card" href="#/staff/forms"><div class="icon-wrap">${icon("form")}</div><h3>Forms</h3><span>Checklists and submissions</span></a>
      <a class="card quick-card" href="#/staff/announcements"><div class="icon-wrap">${icon("bell")}</div><h3>Announcements</h3><span>2 unread team updates</span></a>
    </section>
    <section class="content-grid" style="margin-top:20px">
      <article class="card card-pad"><div class="card-head"><h3>Required training</h3><a href="#/staff/training">View all</a></div><div class="list">
        ${state.trainingCompleted ? "" : `<div class="list-item"><div class="list-icon">${icon("shield")}</div><div><b>Infection Prevention Essentials</b><small>12 mins remaining • Due 9 October</small></div>${status("Required", "required")}</div>`}
        <div class="list-item"><div class="list-icon">${icon("people")}</div><div><b>Manual Handling Refresher</b><small>18 mins • Due 24 October</small></div>${status("Due soon", "due")}</div>
        <div class="list-item"><div class="list-icon">${icon("heart")}</div><div><b>Dementia-Inclusive Communication</b><small>25 mins • Due 3 November</small></div>${status("Upcoming", "info")}</div>
      </div></article>
      <article class="card card-pad"><div class="card-head"><h3>Latest announcements</h3><a href="#/staff/announcements">View all</a></div><div class="announcement"><time>Today, 8:30 am</time><h4>Spring wellbeing reminder</h4><p>A quick note on hydration and warmer weather visits.</p></div><div class="announcement"><time>Yesterday</time><h4>Updated incident form</h4><p>Please use the new version from Forms.</p></div></article>
    </section>`);
}

const trainingCards = [
  { id:"infection-prevention", title:"Infection Prevention Essentials", desc:"Practical steps to protect clients, colleagues and yourself.", time:"12 mins remaining", due:"Due 9 Oct", kind:"required", icon:"shield", colour:"" },
  { id:"manual-handling", title:"Manual Handling Refresher", desc:"Safe movement principles for everyday in-home support.", time:"18 mins", due:"Due 24 Oct", kind:"due", icon:"people", colour:"blue" },
  { id:"dementia-communication", title:"Dementia-Inclusive Communication", desc:"Communication approaches that preserve dignity and connection.", time:"25 mins", due:"Due 3 Nov", kind:"info", icon:"heart", colour:"gold" },
  { id:"privacy", title:"Privacy in Home Care", desc:"Handling personal information respectfully and consistently.", time:"Completed 18 Sep", due:"Certificate ready", kind:"complete", icon:"lock", colour:"blue" },
  { id:"medication-awareness", title:"Medication Awareness", desc:"Recognising responsibilities, boundaries and escalation points.", time:"Completed 2 Sep", due:"Valid for 12 months", kind:"complete", icon:"info", colour:"" },
  { id:"first-aid", title:"First Aid Annual Update", desc:"Core emergency response knowledge for community-based care.", time:"Completed 14 Aug", due:"Valid until Aug 2027", kind:"complete", icon:"heart", colour:"gold" },
];

function staffTraining() {
  const filter = state.activeTrainingTab;
  const cards = trainingCards.filter(card => filter === "all" || filter === "completed" ? (filter === "all" || card.kind === "complete") : card.kind !== "complete").filter(card => !(state.trainingCompleted && card.id === "infection-prevention" && filter !== "all"));
  return appShell("staff", "Training", `<div class="page-head"><div><h2>My training</h2><p>Complete required learning and revisit past modules at any time.</p></div><a class="btn btn-secondary btn-sm" href="#/staff/progress">${icon("award", "icon-sm")} Progress & certificates</a></div>
    <div class="filter-row"><div class="tabs" data-training-tabs><button class="tab ${filter === "required" ? "active" : ""}" data-tab="required">Required (${state.trainingCompleted ? 2 : 3})</button><button class="tab ${filter === "completed" ? "active" : ""}" data-tab="completed">Completed (8)</button><button class="tab ${filter === "all" ? "active" : ""}" data-tab="all">All training</button></div><label class="search">${icon("search", "icon-sm")}<input aria-label="Search training" placeholder="Search training"></label></div>
    <div class="training-grid">${cards.map(card => `<article class="card training-card"><div class="training-visual ${card.colour}"><div class="big-icon">${icon(card.icon)}</div>${status(card.kind === "required" ? "Required" : card.kind === "due" ? "Due soon" : card.kind === "complete" ? "Complete" : "Upcoming", card.kind)}</div><div class="training-body"><h3>${card.title}</h3><p>${card.desc}</p>${card.id === "infection-prevention" && !state.trainingCompleted ? `<div class="bar" style="margin:14px 0"><span style="width:44%"></span></div>` : ""}<div class="meta-row"><span>${card.time}</span><span>${card.due}</span></div><a class="btn ${card.kind === "complete" ? "btn-secondary" : "btn-primary"} btn-sm" style="width:100%;margin-top:17px" href="#/staff/training/${card.id}">${card.kind === "complete" ? "Review module" : card.id === "infection-prevention" ? "Continue module" : "Start module"}</a></div></article>`).join("")}</div>`);
}

function trainingModule() {
  if (state.trainingCompleted) {
    return appShell("staff", "Training", `<div class="module-layout"><aside class="card module-nav"><h3>Module complete</h3><div class="module-step done"><i>${icon("check", "icon-sm")}</i><span>Understanding infection risks</span></div><div class="module-step done"><i>${icon("check", "icon-sm")}</i><span>Standard precautions</span></div><div class="module-step done"><i>${icon("check", "icon-sm")}</i><span>Quick knowledge check</span></div></aside><article class="card completion-panel"><div class="success-mark">${icon("check")}</div><p class="eyebrow">Module complete</p><h2>Beautiful work, Maya.</h2><p class="lead">Your progress has been updated to <strong>82%</strong> and a completion certificate has been added to your profile.</p><div class="button-row" style="justify-content:center"><a class="btn btn-primary" href="#/staff/dashboard">Return to dashboard</a><a class="btn btn-secondary" href="#/staff/progress">View updated progress</a></div></article></div>`);
  }
  const step = state.moduleStep;
  return appShell("staff", "Training module", `<div class="page-head"><div><a class="btn btn-quiet btn-sm" href="#/staff/training">${icon("back", "icon-sm")} Back to training</a></div><span class="muted small">Module 1 of 3 • Autosaved</span></div><div class="module-layout"><aside class="card module-nav"><h3>In this module</h3><div class="module-step ${step > 1 ? "done" : "active"}"><i>${step > 1 ? icon("check", "icon-sm") : "1"}</i><span>Understanding infection risks</span></div><div class="module-step ${step === 2 ? "active" : step > 2 ? "done" : ""}"><i>${step > 2 ? icon("check", "icon-sm") : "2"}</i><span>Standard precautions</span></div><div class="module-step ${step === 3 ? "active" : ""}"><i>3</i><span>Quick knowledge check</span></div></aside><article class="card module-content"><div class="module-hero"><div class="icon-wrap">${icon("shield")}</div><span class="eyebrow" style="color:var(--sage-soft)">Required learning • 25 minutes</span><h2>Infection Prevention Essentials</h2><p>Simple, practical habits that protect everyone.</p></div><div class="lesson">${moduleStepContent(step)}</div></article></div>`);
}

function moduleStepContent(step) {
  if (step === 1) return `<h3>Why prevention matters in home care</h3><p>Care takes place in personal environments, so good infection prevention relies on consistent everyday actions and respectful communication.</p><div class="key-points"><div class="key-point">${icon("check", "icon-sm")} Perform hand hygiene at the right moments</div><div class="key-point">${icon("check", "icon-sm")} Use protective equipment as directed</div><div class="key-point">${icon("check", "icon-sm")} Keep clean and used items separate</div><div class="key-point">${icon("check", "icon-sm")} Report exposure concerns promptly</div></div><div class="button-row" style="justify-content:flex-end"><button class="btn btn-primary" data-module-next>Continue to precautions</button></div>`;
  if (step === 2) return `<h3>Use standard precautions every time</h3><p>Standard precautions create a reliable baseline. Apply them based on the task, the environment and guidance in the current InnerPeace policy.</p><div class="card" style="padding:20px;margin:22px 0;background:var(--cream)"><b style="color:var(--deep)">Before every visit</b><p style="margin:6px 0 0">Confirm that you have the supplies, information and protective equipment needed for the planned support.</p></div><div class="key-points"><div class="key-point">${icon("shield", "icon-sm")} Follow the current procedure</div><div class="key-point">${icon("message", "icon-sm")} Explain actions clearly</div></div><div class="button-row" style="justify-content:space-between"><button class="btn btn-secondary" data-module-prev>Back</button><button class="btn btn-primary" data-module-next>Take knowledge check</button></div>`;
  return `<h3>Quick knowledge check</h3><p>Which action best reflects standard precautions during an in-home visit?</p><div class="form-stack" style="margin:22px 0"><label class="card" style="padding:16px;display:flex;gap:10px"><input type="radio" name="quiz"> Apply precautions only when a person appears unwell</label><label class="card" style="padding:16px;display:flex;gap:10px"><input type="radio" name="quiz" checked> Assess the task and follow the current procedure every time</label><label class="card" style="padding:16px;display:flex;gap:10px"><input type="radio" name="quiz"> Use the same protective equipment for every task</label></div><div class="button-row" style="justify-content:space-between"><button class="btn btn-secondary" data-module-prev>Back</button><button class="btn btn-primary" data-complete-module>${icon("check", "icon-sm")} Complete module</button></div>`;
}

function staffProgress() {
  const percent = state.trainingCompleted ? 82 : 68;
  return appShell("staff", "Progress & Certificates", `<div class="page-head"><div><h2>Your learning progress</h2><p>See what you’ve completed and keep certificates together.</p></div><button class="btn btn-secondary btn-sm" data-download-certificate>${icon("download", "icon-sm")} Download summary</button></div><section class="dashboard-grid"><article class="card card-pad" style="display:flex;align-items:center;gap:28px"><div class="progress-ring" style="--value:${percent};flex:0 0 auto"><span>${percent}%</span></div><div><p class="eyebrow">2026 learning plan</p><h3>${state.trainingCompleted ? "9" : "8"} of 11 required modules complete</h3><p class="muted">${state.trainingCompleted ? "You’re making excellent progress. Two modules remain." : "Complete the outstanding module to reach 82%."}</p><a class="btn btn-primary btn-sm" href="#/staff/training">View training</a></div></article><article class="card progress-card"><div class="success-mark" style="width:64px;height:64px;margin-bottom:15px;box-shadow:0 0 0 9px #e5f2ed">${icon("award")}</div><h3>${state.trainingCompleted ? "9" : "8"} certificates</h3><p>Available to view or download</p></article></section>
    <section class="card table-card" style="margin-top:20px"><div class="card-head card-pad" style="margin:0"><h3>Completed training</h3><span class="muted small">Most recent first</span></div><table class="data-table"><thead><tr><th>Module</th><th>Completed</th><th>Certificate</th><th>Status</th></tr></thead><tbody>${state.trainingCompleted ? `<tr><td><b>Infection Prevention Essentials</b></td><td>6 Oct 2026</td><td><button class="btn btn-quiet btn-sm" data-download-certificate>Download</button></td><td>${status("Current", "complete")}</td></tr>` : ""}<tr><td><b>Privacy in Home Care</b></td><td>18 Sep 2026</td><td><button class="btn btn-quiet btn-sm" data-download-certificate>Download</button></td><td>${status("Current", "complete")}</td></tr><tr><td><b>Medication Awareness</b></td><td>2 Sep 2026</td><td><button class="btn btn-quiet btn-sm" data-download-certificate>Download</button></td><td>${status("Current", "complete")}</td></tr><tr><td><b>First Aid Annual Update</b></td><td>14 Aug 2026</td><td><button class="btn btn-quiet btn-sm" data-download-certificate>Download</button></td><td>${status("Current", "complete")}</td></tr></tbody></table></section>`);
}

const resources = [
  ["New Starter Guide", "A practical guide for your first weeks with InnerPeace.", "PDF • 2.4 MB", "spark"],
  ["Supporting Wellbeing at Home", "Conversation prompts and wellbeing resources.", "PDF • 1.1 MB", "heart"],
  ["Who to Contact", "Key operational, clinical and after-hours contacts.", "Updated Sep 2026", "people"],
  ["East Gippsland Community Services", "Useful local referral and community information.", "Web guide", "info"],
  ["Dementia Communication Pocket Guide", "Short, person-centred communication reminders.", "PDF • 620 KB", "message"],
  ["Work iPad Quick Guide", "Signing in, notifications and everyday troubleshooting.", "PDF • 840 KB", "help"],
];

function resourceCards(items = resources) {
  return items.map(item => `<article class="card resource-card"><div class="file-icon">${icon(item[3])}</div><h3>${item[0]}</h3><p>${item[1]}</p><div class="resource-meta"><span>${item[2]}</span><button class="btn btn-quiet btn-sm" data-open-resource="${item[0]}">Open ${icon("arrow", "icon-sm")}</button></div></article>`).join("");
}

function staffResources() {
  return appShell("staff", "Staff Resources", `<div class="page-head"><div><h2>Resources</h2><p>Helpful guides and information for your everyday work.</p></div></div><div class="filter-row"><div class="tabs"><button class="tab active">All resources</button><button class="tab">Popular</button><button class="tab">New</button></div><label class="search">${icon("search", "icon-sm")}<input aria-label="Search resources" placeholder="Search resources"></label></div><div class="resource-grid">${resourceCards()}</div>`);
}

function staffDocuments() {
  const docs = [
    ["Infection Prevention Policy", "Current version • Updated 29 Sep 2026", "Required reading", "required"],
    ["Code of Conduct", "Version 3.1 • Updated 14 Aug 2026", "Acknowledged", "complete"],
    ["Privacy & Confidentiality Policy", "Version 2.4 • Updated 1 Jul 2026", "Acknowledged", "complete"],
    ["Incident Escalation Procedure", "Current version • Updated 18 Jun 2026", "Current", "info"],
    ["Work Health & Safety Policy", "Version 4.0 • Updated 2 Apr 2026", "Current", "info"],
  ];
  return appShell("staff", "Policies & Documents", `<div class="page-head"><div><h2>Policies & documents</h2><p>Always access the current version from here.</p></div></div><div class="filter-row"><div class="tabs"><button class="tab active">All</button><button class="tab">Acknowledgement needed</button><button class="tab">Recently updated</button></div><label class="search">${icon("search", "icon-sm")}<input aria-label="Search documents" placeholder="Search documents"></label></div><div class="form-stack">${docs.map(d => `<article class="card form-card"><div class="icon-wrap">${icon("file")}</div><div><h3>${d[0]}</h3><p>${d[1]}</p></div><div style="display:flex;align-items:center;gap:10px">${status(d[2], d[3])}<button class="btn btn-secondary btn-sm" data-open-resource="${d[0]}">View</button></div></article>`).join("")}</div>`);
}

function staffAnnouncements() {
  const announcements = [
    ["Today, 8:30 am", "Spring wellbeing reminder", "With warmer days arriving across East Gippsland, please review the hydration and heat-safety prompts before your next visit.", "Wellbeing"],
    ["5 Oct 2026", "Updated incident report form", "A simpler incident form is now available. Please use the new version for all future submissions.", "Operations"],
    ["1 Oct 2026", "Welcome to our new team members", "Please join us in welcoming Nina and Thomas to the InnerPeace team this week.", "People"],
    ["25 Sep 2026", "Dementia Care learning resources", "New short guides are now available in Staff Resources.", "Learning"],
  ];
  return appShell("staff", "Announcements", `<div class="page-head"><div><h2>Team announcements</h2><p>Important updates from InnerPeace, all in one place.</p></div><button class="btn btn-secondary btn-sm" data-mark-read>${icon("check", "icon-sm")} Mark all as read</button></div><div class="content-grid"><div class="form-stack">${announcements.map((a,i)=>`<article class="card card-pad"><div class="update-top"><div>${status(a[3], i === 0 ? "complete" : "info")} ${i < 2 ? status("New", "due") : ""}</div><time class="muted small">${a[0]}</time></div><h3 style="font-family:var(--font-head);font-size:25px">${a[1]}</h3><p class="muted">${a[2]}</p><button class="btn btn-quiet btn-sm" data-open-announcement="${a[1]}">Read update ${icon("arrow", "icon-sm")}</button></article>`).join("")}</div><aside class="card card-pad"><div class="card-head"><h3>Announcement topics</h3></div><div class="list"><div class="list-item"><div class="list-icon">${icon("heart")}</div><div><b>Wellbeing</b><small>3 updates</small></div></div><div class="list-item"><div class="list-icon">${icon("settings")}</div><div><b>Operations</b><small>7 updates</small></div></div><div class="list-item"><div class="list-icon">${icon("people")}</div><div><b>People</b><small>5 updates</small></div></div></div></aside></div>`);
}

function staffForms() {
  const forms = [
    ["Incident Report", "Use when an incident or near miss needs to be recorded.", "About 6 minutes", "shield"],
    ["Visit Safety Checklist", "A short pre-visit environmental and safety check.", "About 3 minutes", "check"],
    ["Resource Request", "Request equipment, printed information or other support.", "About 2 minutes", "form"],
    ["Leave Request", "Submit a leave request for manager review.", "About 3 minutes", "calendar"],
  ];
  return appShell("staff", "Forms & Checklists", `<div class="page-head"><div><h2>Forms & checklists</h2><p>Complete common tasks without searching for the right document.</p></div><button class="btn btn-secondary btn-sm" data-view-submissions>${icon("file", "icon-sm")} My submissions</button></div><div class="form-stack">${forms.map(f=>`<article class="card form-card"><div class="icon-wrap">${icon(f[3])}</div><div><h3>${f[0]}</h3><p>${f[1]} • ${f[2]}</p></div><button class="btn btn-primary btn-sm" data-start-form="${f[0]}">Start form</button></article>`).join("")}</div>`);
}

function staffNotifications() {
  const notes = [
    ["training", "Training due this week", "Infection Prevention Essentials is due Friday.", "10 minutes ago", "required"],
    ["file", "Policy updated", "The Infection Prevention Policy has a new version.", "1 hour ago", "info"],
    ["bell", "New team announcement", "Spring wellbeing reminder", "Today, 8:30 am", "complete"],
    ["form", "Submission received", "Your leave request has been sent to management.", "Yesterday", "complete"],
    ["award", "Certificate available", "Privacy in Home Care certificate is ready.", "18 Sep", "info"],
  ];
  return appShell("staff", "Notifications", `<div class="page-head"><div><h2>Notifications</h2><p>Reminders, updates and confirmations for you.</p></div><button class="btn btn-secondary btn-sm" data-mark-read>${icon("check", "icon-sm")} Mark all as read</button></div><article class="card card-pad"><div class="list">${notes.map((n,i)=>`<div class="list-item"><div class="list-icon">${icon(n[0])}</div><div><b>${n[1]} ${i < 3 ? '<span style="color:var(--teal)">•</span>' : ""}</b><small>${n[2]} • ${n[3]}</small></div>${status(i < 3 ? "New" : "Read", n[4])}</div>`).join("")}</div></article>`);
}

function staffProfile() {
  return appShell("staff", "Profile", `<div class="page-head"><div><h2>Your profile</h2><p>Personal details, preferences and account settings.</p></div><button class="btn btn-secondary btn-sm" data-edit-profile>Edit profile</button></div><div class="profile-layout"><article class="card profile-card">${avatar("MC", "sage")}<h2>Maya Chen</h2><p>Care Support Worker</p>${status("Active", "active")}<div style="margin-top:24px;text-align:left"><div class="info-row"><span>Staff ID</span><b>IP-024</b></div><div class="info-row"><span>Started</span><b>12 March 2025</b></div><div class="info-row"><span>Manager</span><b>Laura Bennett</b></div><div class="info-row"><span>Region</span><b>East Gippsland</b></div></div></article><div class="stack"><article class="card settings-list"><div class="settings-row"><div><h3>Email notifications</h3><p>Training reminders and important announcements.</p></div><button class="switch on" aria-label="Toggle email notifications"></button></div><div class="settings-row"><div><h3>Device notifications</h3><p>Allow notifications on this iPad or phone.</p></div><button class="switch on" aria-label="Toggle device notifications"></button></div><div class="settings-row"><div><h3>Weekly progress summary</h3><p>A short summary of upcoming and completed learning.</p></div><button class="switch" aria-label="Toggle weekly summary"></button></div></article><article class="card card-pad"><div class="card-head"><h3>Account & security</h3></div><div class="button-row"><button class="btn btn-secondary btn-sm" data-demo-action="Password reset link sent">Change password</button><button class="btn btn-secondary btn-sm" data-demo-action="Support request started">Report account issue</button><a class="btn btn-danger btn-sm" href="#/staff/login">Sign out</a></div></article></div></div>`);
}

function staffHelp() {
  const faq = ["How do I find required training?","Where are my certificates?","How do I submit a form?","I can’t find a policy","I need help signing in"];
  return appShell("staff", "Help & Support", `<div class="page-head"><div><h2>How can we help?</h2><p>Quick answers and a simple way to contact support.</p></div></div><div class="dashboard-grid"><article class="card card-pad"><label class="search" style="width:100%;margin-bottom:22px">${icon("search", "icon-sm")}<input aria-label="Search help" placeholder="Search help topics"></label><div class="list">${faq.map(q=>`<button class="list-item" data-open-help="${q}" style="width:100%;border-left:0;border-right:0;border-bottom:0;background:transparent;text-align:left"><div class="list-icon">${icon("help")}</div><div><b>${q}</b><small>View step-by-step guidance</small></div>${icon("arrow", "icon-sm")}</button>`).join("")}</div></article><aside class="stack"><article class="card card-pad"><div class="list-icon" style="margin-bottom:18px">${icon("message")}</div><h3>Contact support</h3><p class="muted">Send a question to the InnerPeace administration team.</p><button class="btn btn-primary btn-sm" data-contact-support>Send a support message</button></article><article class="card card-pad"><h3>Urgent operational concern?</h3><p class="muted">Follow the current escalation procedure or call the authorised contact for your shift.</p><button class="btn btn-secondary btn-sm" data-open-resource="Incident Escalation Procedure">View procedure</button></article></aside></div>`);
}

const staffRows = [
  ["Maya Chen","MC","Care Support Worker","8 / 11","1 outstanding","overdue"],
  ["Liam Walker","LW","Registered Nurse","11 / 11","Complete","complete"],
  ["Sophie Nguyen","SN","Care Support Worker","10 / 11","Due soon","due"],
  ["Thomas Reed","TR","Care Support Worker","7 / 11","2 overdue","overdue"],
  ["Nina Patel","NP","Dementia Care Consultant","11 / 11","Complete","complete"],
  ["Oliver Hart","OH","Care Coordinator","9 / 11","1 due soon","due"],
];

function managementDashboard() {
  return appShell("management", "Management Dashboard", `<div class="page-head"><div><h2>Good morning, Annette</h2><p>Here’s the operational picture for Tuesday, 6 October.</p></div><div class="button-row"><button class="btn btn-secondary btn-sm" data-export-report>${icon("download", "icon-sm")} Export overview</button><button class="btn btn-primary btn-sm" data-add-staff>${icon("plus", "icon-sm")} Add staff member</button></div></div>
    <section class="metrics"><article class="card metric"><div class="metric-top"><span>Active staff</span><div class="icon-wrap">${icon("people", "icon-sm")}</div></div><strong>28</strong><span class="trend">+3 this quarter</span></article><article class="card metric"><div class="metric-top"><span>Training compliance</span><div class="icon-wrap">${icon("training", "icon-sm")}</div></div><strong>86%</strong><span class="trend">+7% since July</span></article><article class="card metric"><div class="metric-top"><span>Overdue items</span><div class="icon-wrap">${icon("clock", "icon-sm")}</div></div><strong>4</strong><span class="trend down">Needs attention</span></article><article class="card metric"><div class="metric-top"><span>Family accounts</span><div class="icon-wrap">${icon("family", "icon-sm")}</div></div><strong>19</strong><span class="trend">+4 this month</span></article></section>
    <section class="content-grid"><article class="card chart-card"><div class="card-head"><div><h3>Training completion trend</h3><span class="muted small">Required modules completed on time</span></div><div class="tabs"><button class="tab active">6 months</button><button class="tab">12 months</button></div></div><div class="chart-wrap"><div class="bar-group"><i class="chart-bar" style="height:48%"></i><i class="chart-bar secondary" style="height:32%"></i><span class="bar-label">May</span></div><div class="bar-group"><i class="chart-bar" style="height:58%"></i><i class="chart-bar secondary" style="height:38%"></i><span class="bar-label">Jun</span></div><div class="bar-group"><i class="chart-bar" style="height:67%"></i><i class="chart-bar secondary" style="height:46%"></i><span class="bar-label">Jul</span></div><div class="bar-group"><i class="chart-bar" style="height:74%"></i><i class="chart-bar secondary" style="height:49%"></i><span class="bar-label">Aug</span></div><div class="bar-group"><i class="chart-bar" style="height:79%"></i><i class="chart-bar secondary" style="height:56%"></i><span class="bar-label">Sep</span></div><div class="bar-group"><i class="chart-bar" style="height:86%"></i><i class="chart-bar secondary" style="height:61%"></i><span class="bar-label">Oct</span></div></div></article><article class="card card-pad"><div class="card-head"><div><h3>Compliance snapshot</h3><span class="muted small">Across all active staff</span></div><a href="#/management/compliance">View detail</a></div><div class="donut"><div><strong>86%</strong><span>compliant</span></div></div><div class="meta-row"><span>${status("24 current","complete")}</span><span>${status("4 need action","overdue")}</span></div></article></section>
    <section class="content-grid" style="margin-top:20px"><article class="card table-card"><div class="card-head card-pad" style="margin:0"><div><h3>Training requiring attention</h3><span class="muted small">Due or overdue items</span></div><a href="#/management/compliance">View all</a></div><table class="data-table"><thead><tr><th>Staff member</th><th>Module</th><th>Due</th><th>Status</th></tr></thead><tbody><tr><td><a class="person table-link" href="#/management/staff/maya-chen">${avatar("MC")}<span><b>Maya Chen</b><small>Care Support Worker</small></span></a></td><td>Infection Prevention</td><td>9 Oct</td><td>${status("Required","required")}</td></tr><tr><td><a class="person table-link" href="#/management/staff/thomas-reed">${avatar("TR","gold")}<span><b>Thomas Reed</b><small>Care Support Worker</small></span></a></td><td>Privacy in Home Care</td><td>30 Sep</td><td>${status("Overdue","overdue")}</td></tr><tr><td><a class="person table-link" href="#/management/staff/sophie-nguyen">${avatar("SN","sage")}<span><b>Sophie Nguyen</b><small>Care Support Worker</small></span></a></td><td>Manual Handling</td><td>14 Oct</td><td>${status("Due soon","due")}</td></tr></tbody></table></article><aside class="card card-pad"><div class="card-head"><h3>Recent activity</h3><a href="#/management/activity">View all</a></div><div class="list"><div class="list-item"><div class="list-icon">${icon("award")}</div><div><b>Training completed</b><small>Liam Walker • 24 mins ago</small></div></div><div class="list-item"><div class="list-icon">${icon("people")}</div><div><b>Staff account activated</b><small>Nina Patel • 1 hour ago</small></div></div><div class="list-item"><div class="list-icon">${icon("family")}</div><div><b>Family access approved</b><small>Alice Wood • Yesterday</small></div></div></div></aside></section>`);
}

function managementCompliance() {
  return appShell("management", "Training Compliance", `<div class="page-head"><div><h2>Training compliance</h2><p>See who is current, due soon or needs follow-up.</p></div><div class="button-row"><button class="btn btn-secondary btn-sm" data-send-reminders>${icon("bell", "icon-sm")} Send reminders</button><a class="btn btn-primary btn-sm" href="#/management/reports">${icon("chart", "icon-sm")} Open reports</a></div></div><section class="metrics"><article class="card metric"><span>Compliant staff</span><strong>24</strong><span>of 28 active staff</span></article><article class="card metric"><span>Due this month</span><strong>7</strong><span>across 5 modules</span></article><article class="card metric"><span>Overdue</span><strong style="color:var(--danger)">4</strong><span>across 3 staff</span></article><article class="card metric"><span>Average completion</span><strong>4.2d</strong><span>from assignment</span></article></section><div class="filter-row"><div class="tabs"><button class="tab active">Needs attention (6)</button><button class="tab">All staff (28)</button><button class="tab">By module</button></div><label class="search">${icon("search", "icon-sm")}<input aria-label="Search staff" placeholder="Search staff"></label></div><article class="card table-card"><table class="data-table"><thead><tr><th>Staff member</th><th>Role</th><th>Progress</th><th>Outstanding</th><th>Status</th><th></th></tr></thead><tbody>${staffRows.map(row=>`<tr><td><a class="person table-link" href="#/management/staff/${row[0].toLowerCase().replaceAll(" ","-")}">${avatar(row[1], row[5] === "complete" ? "sage" : row[5] === "due" ? "gold" : "")}<span><b>${row[0]}</b><small>${row[0] === "Maya Chen" ? "IP-024" : "Active staff"}</small></span></a></td><td>${row[2]}</td><td><div style="min-width:120px"><div class="meta-row"><span>${row[3]}</span></div><div class="bar"><span style="width:${parseInt(row[3]) / 11 * 100}%"></span></div></div></td><td>${row[4]}</td><td>${status(row[5] === "complete" ? "Current" : row[5] === "due" ? "Due soon" : "Action needed", row[5])}</td><td><a class="btn btn-quiet btn-sm" href="#/management/staff/${row[0].toLowerCase().replaceAll(" ","-")}">View</a></td></tr>`).join("")}</tbody></table><div class="pagination"><span>Showing 1–6 of 28 staff</span><div class="button-row"><button class="btn btn-secondary btn-sm">Previous</button><button class="btn btn-secondary btn-sm">Next</button></div></div></article>`);
}

function employeeProfile(slug = "maya-chen") {
  const maya = slug === "maya-chen";
  const person = maya ? {name:"Maya Chen", initials:"MC", role:"Care Support Worker", id:"IP-024", email:"maya.chen@innerpeace.demo", started:"12 March 2025", manager:"Laura Bennett", progress: state.trainingCompleted ? "9 / 11" : "8 / 11"} : {name:slug.split("-").map(x=>x[0].toUpperCase()+x.slice(1)).join(" "), initials:slug.split("-").map(x=>x[0].toUpperCase()).join(""), role:"Care Support Worker", id:"IP-031", email:"staff.member@innerpeace.demo", started:"22 June 2026", manager:"Laura Bennett", progress:"7 / 11"};
  return appShell("management", "Staff Profile", `<div class="page-head"><div><a class="btn btn-quiet btn-sm" href="#/management/compliance">${icon("back", "icon-sm")} Back to compliance</a></div><div class="button-row"><button class="btn btn-secondary btn-sm" data-message-staff>${icon("message", "icon-sm")} Message</button><button class="btn btn-secondary btn-sm" data-edit-staff>Edit staff</button></div></div><article class="card employee-hero"><div class="employee-id">${avatar(person.initials,"sage")}<div><h2>${person.name}</h2><p>${person.role} • ${person.id}</p></div></div>${status("Active", "active")}</article><div class="employee-grid"><div class="stack"><article class="card card-pad"><div class="card-head"><div><h3>Training overview</h3><span class="muted small">${person.progress} required modules complete</span></div><strong style="font-family:var(--font-head);font-size:28px;color:var(--deep)">${maya ? (state.trainingCompleted ? "82%" : "68%") : "64%"}</strong></div><div class="bar" style="height:11px"><span style="width:${maya ? (state.trainingCompleted ? 82 : 68) : 64}%"></span></div><div class="list" style="margin-top:24px">${maya && state.trainingCompleted ? "" : `<div class="list-item"><div class="list-icon">${icon("shield")}</div><div><b>Infection Prevention Essentials</b><small>Due 9 October 2026</small></div>${status("Outstanding","required")}</div>`}<div class="list-item"><div class="list-icon">${icon("people")}</div><div><b>Manual Handling Refresher</b><small>Due 24 October 2026</small></div>${status("Due soon","due")}</div><div class="list-item"><div class="list-icon">${icon("award")}</div><div><b>Privacy in Home Care</b><small>Completed 18 September</small></div>${status("Complete","complete")}</div></div></article><article class="card table-card"><div class="card-head card-pad" style="margin:0"><h3>Recent activity</h3><a href="#/management/activity">View all</a></div><table class="data-table"><tbody><tr><td>Signed in on work iPad</td><td>Today, 7:42 am</td></tr><tr><td>Viewed Infection Prevention Policy</td><td>Yesterday</td></tr><tr><td>Completed Privacy in Home Care</td><td>18 Sep</td></tr></tbody></table></article></div><aside class="stack"><article class="card card-pad"><div class="card-head"><h3>Staff details</h3></div><div class="detail-list"><div class="detail-item"><small>Email</small><b>${person.email}</b></div><div class="detail-item"><small>Started</small><b>${person.started}</b></div><div class="detail-item"><small>Manager</small><b>${person.manager}</b></div><div class="detail-item"><small>Region</small><b>East Gippsland</b></div></div></article><article class="card card-pad"><h3>Quick actions</h3><div class="form-stack"><button class="btn btn-secondary btn-sm" data-send-reminder>${icon("bell", "icon-sm")} Send training reminder</button><button class="btn btn-secondary btn-sm" data-assign-training>${icon("plus", "icon-sm")} Assign training</button><a class="btn btn-primary btn-sm" href="#/management/reports">${icon("chart", "icon-sm")} View in compliance report</a></div></article></aside></div>`);
}

function managementReports() {
  return appShell("management", "Reports", `<div class="page-head"><div><h2>Reports</h2><p>Clear operational information for follow-up and planning.</p></div><div class="button-row"><button class="btn btn-secondary btn-sm" data-report-filter>${icon("calendar", "icon-sm")} 1 Jul – 6 Oct 2026</button><button class="btn btn-primary btn-sm" data-export-report>${icon("download", "icon-sm")} Export report</button></div></div><div class="tabs" style="margin-bottom:20px"><button class="tab active">Training compliance</button><button class="tab">Onboarding</button><button class="tab">Staff activity</button><button class="tab">Family access</button></div><section class="metrics"><article class="card metric"><span>Completion rate</span><strong>86%</strong><span class="trend">+7% from prior period</span></article><article class="card metric"><span>Completed modules</span><strong>73</strong><span>Across all staff</span></article><article class="card metric"><span>Average time</span><strong>4.2d</strong><span>-1.3 days vs prior</span></article><article class="card metric"><span>Reminders sent</span><strong>12</strong><span>67% completed after reminder</span></article></section><div class="content-grid"><article class="card chart-card"><div class="card-head"><div><h3>Completion by month</h3><span class="muted small">Completed by due date</span></div></div><div class="chart-wrap"><div class="bar-group"><i class="chart-bar" style="height:48%"></i><span class="bar-label">May</span></div><div class="bar-group"><i class="chart-bar" style="height:58%"></i><span class="bar-label">Jun</span></div><div class="bar-group"><i class="chart-bar" style="height:67%"></i><span class="bar-label">Jul</span></div><div class="bar-group"><i class="chart-bar" style="height:74%"></i><span class="bar-label">Aug</span></div><div class="bar-group"><i class="chart-bar" style="height:79%"></i><span class="bar-label">Sep</span></div><div class="bar-group"><i class="chart-bar" style="height:86%"></i><span class="bar-label">Oct</span></div></div></article><article class="card card-pad"><div class="card-head"><h3>Status breakdown</h3></div><div class="donut"><div><strong>28</strong><span>active staff</span></div></div><div class="list"><div class="list-item"><span class="status complete">Current</span><b>24 staff</b></div><div class="list-item"><span class="status due">Due soon</span><b>3 staff</b></div><div class="list-item"><span class="status overdue">Overdue</span><b>1 staff</b></div></div></article></div><article class="card table-card" style="margin-top:20px"><div class="card-head card-pad" style="margin:0"><div><h3>Outstanding training detail</h3><span class="muted small">Included in export</span></div></div><table class="data-table"><thead><tr><th>Staff</th><th>Module</th><th>Assigned</th><th>Due</th><th>Reminder</th><th>Status</th></tr></thead><tbody><tr><td><a class="table-link" href="#/management/staff/maya-chen">Maya Chen</a></td><td>Infection Prevention</td><td>18 Sep</td><td>9 Oct</td><td>5 Oct</td><td>${status("Required","required")}</td></tr><tr><td><a class="table-link" href="#/management/staff/thomas-reed">Thomas Reed</a></td><td>Privacy in Home Care</td><td>2 Sep</td><td>30 Sep</td><td>1 Oct</td><td>${status("Overdue","overdue")}</td></tr><tr><td><a class="table-link" href="#/management/staff/sophie-nguyen">Sophie Nguyen</a></td><td>Manual Handling</td><td>22 Sep</td><td>14 Oct</td><td>Not sent</td><td>${status("Due soon","due")}</td></tr></tbody></table></article>`);
}

function managementStaff() {
  return appShell("management", "Staff", `<div class="page-head"><div><h2>Staff overview</h2><p>Manage active, onboarding and inactive staff accounts.</p></div><button class="btn btn-primary btn-sm" data-add-staff>${icon("plus", "icon-sm")} Add staff member</button></div><section class="metrics"><article class="card metric"><span>Active</span><strong>28</strong><span>Across 5 roles</span></article><article class="card metric"><span>Onboarding</span><strong>3</strong><span>2 starting this week</span></article><article class="card metric"><span>On leave</span><strong>2</strong><span>Temporary access retained</span></article><article class="card metric"><span>Inactive</span><strong>9</strong><span>Access removed</span></article></section><div class="filter-row"><div class="tabs"><button class="tab active">Active (28)</button><button class="tab">Onboarding (3)</button><button class="tab">Inactive (9)</button></div><label class="search">${icon("search", "icon-sm")}<input aria-label="Search staff" placeholder="Search by name or role"></label></div><article class="card table-card"><table class="data-table"><thead><tr><th>Staff member</th><th>Role</th><th>Manager</th><th>Training</th><th>Last active</th><th>Status</th><th></th></tr></thead><tbody>${staffRows.map((s,i)=>`<tr><td><a class="person table-link" href="#/management/staff/${s[0].toLowerCase().replaceAll(" ","-")}">${avatar(s[1],i%2?"sage":"")}<span><b>${s[0]}</b><small>IP-${String(24+i).padStart(3,"0")}</small></span></a></td><td>${s[2]}</td><td>${i<3?"Laura Bennett":"Annette Keat"}</td><td>${s[3]}</td><td>${i===0?"Today, 7:42 am":"Yesterday"}</td><td>${status("Active","active")}</td><td><button class="btn btn-quiet btn-sm" data-staff-menu="${s[0]}">Manage</button></td></tr>`).join("")}</tbody></table><div class="pagination"><span>Showing 1–6 of 28 staff</span><div class="button-row"><button class="btn btn-secondary btn-sm">Previous</button><button class="btn btn-secondary btn-sm">Next</button></div></div></article>`);
}

function managementOnboarding() {
  const starters = [
    ["Nina Patel","NP","Dementia Care Consultant","Starts 12 Oct","6 of 8 complete",75],
    ["Jordan Mills","JM","Care Support Worker","Starts 19 Oct","3 of 8 complete",38],
    ["Eva Collins","EC","Registered Nurse","Starts 26 Oct","Invite scheduled",8],
  ];
  return appShell("management", "Staff Onboarding", `<div class="page-head"><div><h2>Onboarding</h2><p>Give every new team member a clear, consistent start.</p></div><button class="btn btn-primary btn-sm" data-add-staff>${icon("plus", "icon-sm")} Start onboarding</button></div><section class="metrics"><article class="card metric"><span>In progress</span><strong>3</strong><span>Across October starters</span></article><article class="card metric"><span>Average completion</span><strong>5.1d</strong><span>Before first shift</span></article><article class="card metric"><span>Ready to activate</span><strong>1</strong><span>Nina Patel</span></article><article class="card metric"><span>Tasks completed</span><strong>14</strong><span>This month</span></article></section><div class="form-stack">${starters.map((s,i)=>`<article class="card card-pad"><div class="employee-hero" style="padding:0;margin:0 0 22px"><div class="employee-id">${avatar(s[1],i===0?"sage":"")}<div><h2>${s[0]}</h2><p>${s[2]} • ${s[3]}</p></div></div>${status(i===0?"Ready soon":i===1?"In progress":"Scheduled",i===0?"complete":"info")}</div><div class="meta-row"><span>${s[4]}</span><b>${s[5]}%</b></div><div class="bar" style="margin:8px 0 18px"><span style="width:${s[5]}%"></span></div><div class="button-row"><button class="btn btn-secondary btn-sm" data-view-onboarding="${s[0]}">View checklist</button>${i===0?`<button class="btn btn-primary btn-sm" data-demo-action="Nina’s account is ready for activation">Activate account</button>`:""}</div></article>`).join("")}</div>`);
}

function managementDocuments() {
  const docs = [["Infection Prevention Policy","Policy","v4.2","29 Sep 2026","28 / 28"],["Incident Escalation Procedure","Procedure","v2.6","18 Jun 2026","28 / 28"],["Code of Conduct","Policy","v3.1","14 Aug 2026","27 / 28"],["New Starter Guide","Resource","v5.0","2 Oct 2026","—"],["Dementia Communication Guide","Resource","v1.3","25 Sep 2026","—"]];
  return appShell("management", "Documents & Resources", `<div class="page-head"><div><h2>Documents & resources</h2><p>Publish current information and track staff acknowledgement.</p></div><button class="btn btn-primary btn-sm" data-upload-document>${icon("upload", "icon-sm")} Upload document</button></div><div class="filter-row"><div class="tabs"><button class="tab active">All (24)</button><button class="tab">Policies</button><button class="tab">Resources</button><button class="tab">Archived</button></div><label class="search">${icon("search", "icon-sm")}<input aria-label="Search documents" placeholder="Search documents"></label></div><article class="card table-card"><table class="data-table"><thead><tr><th>Name</th><th>Type</th><th>Version</th><th>Last updated</th><th>Acknowledged</th><th>Status</th><th></th></tr></thead><tbody>${docs.map((d,i)=>`<tr><td><div class="person"><div class="list-icon">${icon("file")}</div><span><b>${d[0]}</b><small>${i<3?"Staff access":"Resource library"}</small></span></div></td><td>${d[1]}</td><td>${d[2]}</td><td>${d[3]}</td><td>${d[4]}</td><td>${status("Published","complete")}</td><td><button class="btn btn-quiet btn-sm" data-open-resource="${d[0]}">Manage</button></td></tr>`).join("")}</tbody></table></article>`);
}

function managementAnnouncements() {
  const posts = [["Spring wellbeing reminder","Published","Staff","6 Oct, 8:30 am","28 recipients"],["Updated incident report form","Published","Staff","5 Oct, 2:15 pm","28 recipients"],["October family newsletter","Scheduled","Families","10 Oct, 9:00 am","19 recipients"],["Welcome to our new team members","Published","Staff","1 Oct, 10:00 am","26 recipients"]];
  return appShell("management", "Announcements", `<div class="page-head"><div><h2>Announcements</h2><p>Create clear, targeted updates for staff and families.</p></div><button class="btn btn-primary btn-sm" data-create-announcement>${icon("plus", "icon-sm")} New announcement</button></div><section class="metrics"><article class="card metric"><span>Published this month</span><strong>4</strong><span>3 staff • 1 family</span></article><article class="card metric"><span>Average read rate</span><strong>89%</strong><span class="trend">+4% this quarter</span></article><article class="card metric"><span>Scheduled</span><strong>1</strong><span>10 October</span></article><article class="card metric"><span>Drafts</span><strong>2</strong><span>Not visible to users</span></article></section><article class="card table-card"><table class="data-table"><thead><tr><th>Announcement</th><th>Status</th><th>Audience</th><th>Date</th><th>Reach</th><th></th></tr></thead><tbody>${posts.map((p,i)=>`<tr><td><b>${p[0]}</b></td><td>${status(p[1],p[1]==="Published"?"complete":"due")}</td><td>${p[2]}</td><td>${p[3]}</td><td>${p[4]}</td><td><button class="btn btn-quiet btn-sm" data-open-announcement="${p[0]}">${i===2?"Edit":"View"}</button></td></tr>`).join("")}</tbody></table></article>`);
}

function managementForms() {
  const forms = [["Incident Report","18 submissions","Updated 5 Oct","Staff","Active"],["Visit Safety Checklist","64 submissions","Updated 12 Sep","Staff","Active"],["Leave Request","9 submissions","Updated 3 Aug","Staff","Active"],["Family Contact Request","7 submissions","Updated 1 Oct","Families","Draft"]];
  return appShell("management", "Forms", `<div class="page-head"><div><h2>Forms</h2><p>Manage simple forms, checklists and submissions.</p></div><button class="btn btn-primary btn-sm" data-create-form>${icon("plus", "icon-sm")} Create form</button></div><div class="resource-grid">${forms.map((f,i)=>`<article class="card resource-card"><div class="file-icon">${icon("form")}</div><h3>${f[0]}</h3><p>${f[1]} • ${f[2]}</p><div class="meta-row"><span>${status(f[3],"info")}</span><span>${status(f[4],f[4]==="Active"?"complete":"draft")}</span></div><div class="button-row" style="margin-top:18px"><button class="btn btn-secondary btn-sm" data-manage-form="${f[0]}">Manage</button><button class="btn btn-quiet btn-sm" data-demo-action="Showing ${f[0]} submissions">Submissions</button></div></article>`).join("")}</div>`);
}

function managementActivity() {
  const activities = [["training","Training completed","Liam Walker completed First Aid Annual Update","Today, 9:12 am"],["people","Staff account activated","Nina Patel was activated by Annette Keat","Today, 8:45 am"],["family","Family access approved","Alice Wood was granted authorised access for John Wood","Yesterday, 4:21 pm"],["file","Policy version published","Infection Prevention Policy v4.2 published by Laura Bennett","Yesterday, 2:08 pm"],["bell","Reminder sent","Training reminder sent to Maya Chen","5 Oct, 3:30 pm"],["settings","Permission changed","Care Coordinator role updated by Annette Keat","4 Oct, 11:02 am"]];
  return appShell("management", "Activity Log", `<div class="page-head"><div><h2>Activity log</h2><p>A transparent history of important platform actions.</p></div><button class="btn btn-secondary btn-sm" data-export-report>${icon("download", "icon-sm")} Export log</button></div><div class="filter-row"><div class="tabs"><button class="tab active">All activity</button><button class="tab">People</button><button class="tab">Training</button><button class="tab">Access</button></div><label class="search">${icon("search", "icon-sm")}<input aria-label="Search activity" placeholder="Search activity"></label></div><article class="card card-pad"><div class="list">${activities.map(a=>`<div class="list-item"><div class="list-icon">${icon(a[0])}</div><div><b>${a[1]}</b><small>${a[2]}</small></div><time class="muted small">${a[3]}</time></div>`).join("")}</div></article>`);
}

function managementPermissions() {
  const roles = [["Administrator","Full platform access","2 people",true],["Manager","Staff, training, documents and reports","3 people",true],["Care Coordinator","Staff and selected client/family access","4 people",true],["Staff","Personal training, resources and forms","28 people",true],["Family member","Authorised updates and selected resources","19 people",true]];
  return appShell("management", "Roles & Access", `<div class="page-head"><div><h2>Roles & access</h2><p>Keep each person’s access clear, appropriate and easy to revoke.</p></div><button class="btn btn-primary btn-sm" data-create-role>${icon("plus", "icon-sm")} Create role</button></div><article class="card settings-list">${roles.map((r,i)=>`<div class="settings-row"><div style="display:flex;gap:14px;align-items:center"><div class="list-icon">${icon(i===4?"family":"shield")}</div><div><h3>${r[0]}</h3><p>${r[1]} • ${r[2]}</p></div></div><div class="button-row"><button class="btn btn-quiet btn-sm" data-edit-role="${r[0]}">Edit permissions</button><button class="switch on" aria-label="Toggle ${r[0]} role"></button></div></div>`).join("")}</article><article class="card card-pad" style="margin-top:20px;background:var(--cream)"><div style="display:flex;gap:13px;align-items:start">${icon("info")}<div><h3>Production security note</h3><p class="muted" style="margin:0">This concept visualises role-based access. Detailed privacy, security, audit, hosting and regulatory requirements would be confirmed during discovery and production architecture.</p></div></div></article>`);
}

function managementFamilies() {
  const families = [["Alice Wood","AW","John Wood","Daughter","Active","Last active today"],["Peter Harris","PH","Evelyn Harris","Son","Active","Last active yesterday"],["Rebecca Stone","RS","Margaret Stone","Authorised representative","Invited","Invite sent 4 Oct"],["Daniel King","DK","Helen King","Son","Active","Last active 2 Oct"]];
  return appShell("management", "Client & Family Accounts", `<div class="page-head"><div><h2>Client & family accounts</h2><p>Manage authorised access to selected updates and resources.</p></div><button class="btn btn-primary btn-sm" data-invite-family>${icon("plus", "icon-sm")} Invite family member</button></div><section class="metrics"><article class="card metric"><span>Active accounts</span><strong>19</strong><span>Across 14 clients</span></article><article class="card metric"><span>Pending invitations</span><strong>3</strong><span>Awaiting acceptance</span></article><article class="card metric"><span>Updates shared</span><strong>42</strong><span>This month</span></article><article class="card metric"><span>Access reviews due</span><strong>2</strong><span>By 31 October</span></article></section><article class="card table-card"><table class="data-table"><thead><tr><th>Family member</th><th>Linked client</th><th>Relationship</th><th>Access</th><th>Activity</th><th></th></tr></thead><tbody>${families.map((f,i)=>`<tr><td><div class="person">${avatar(f[1],i%2?"gold":"sage")}<span><b>${f[0]}</b><small>Authorised contact</small></span></div></td><td>${f[2]}</td><td>${f[3]}</td><td>${status(f[4],f[4]==="Active"?"complete":"due")}</td><td>${f[5]}</td><td><button class="btn btn-quiet btn-sm" data-manage-family="${f[0]}">Manage access</button></td></tr>`).join("")}</tbody></table></article>`);
}

const familyNavItems = [["/family/dashboard","Home"],["/family/updates","Updates"],["/family/resources","Resources"],["/family/announcements","Announcements"],["/family/contact","Contact"],["/family/access","Family access"]];

function familyShell(body) {
  return `<div class="family-shell"><header class="family-nav"><div class="container">${brand()}<nav class="family-links" aria-label="Family portal navigation">${familyNavItems.map(i=>`<a href="#${i[0]}" class="${isActive(i[0])?"active":""}">${i[1]}</a>`).join("")}</nav><div class="user-chip">${avatar("AW","sage")}<span><strong>Alice Wood</strong><small>Authorised family</small></span></div></div></header><main id="main-content" class="family-content"><div class="container">${body}</div></main><nav class="mobile-bottom" aria-label="Family portal mobile navigation">${[["/family/dashboard","home","Home"],["/family/updates","heart","Updates"],["/family/resources","file","Resources"],["/family/contact","message","Contact"]].map(i=>`<a href="#${i[0]}" class="${isActive(i[0])?"active":""}">${icon(i[1],"icon-sm")}<span>${i[2]}</span></a>`).join("")}</nav></div>`;
}

function familyDashboard() {
  return familyShell(`<div class="page-head"><div><h2>Good morning, Alice</h2><p>Tuesday, 6 October • Welcome to your InnerPeace family portal.</p></div><a class="btn btn-secondary btn-sm" href="#/">${icon("back","icon-sm")} Platform overview</a></div><section class="family-welcome"><article class="family-hero"><span class="authorised">${icon("lock","icon-sm")} Authorised access for John Wood</span><h1>A simple way to stay connected.</h1><p>View approved updates, helpful information and resources shared by InnerPeace.</p></article><article class="card care-circle"><div><div class="avatar sage">JW</div><h3>John Wood</h3><p>InnerPeace client since February 2025</p><div class="care-team" style="justify-content:center;margin-top:16px">${avatar("LB")}${avatar("MC","sage")}${avatar("LW","gold")}</div><p style="margin-top:8px">Supported by a dedicated care team</p></div></article></section><section class="family-grid"><a class="card family-action" href="#/family/updates"><div class="icon-wrap">${icon("heart")}</div><h3>Latest updates</h3><p>2 new authorised updates</p></a><a class="card family-action" href="#/family/resources"><div class="icon-wrap">${icon("file")}</div><h3>Useful resources</h3><p>Guides and selected documents</p></a><a class="card family-action" href="#/family/announcements"><div class="icon-wrap">${icon("bell")}</div><h3>Announcements</h3><p>News from InnerPeace</p></a><a class="card family-action" href="#/family/contact"><div class="icon-wrap">${icon("message")}</div><h3>Contact InnerPeace</h3><p>Send a non-urgent message</p></a></section><section class="family-columns"><div class="stack"><article class="card update-card"><div class="update-top"><div class="update-type"><div class="icon-wrap">${icon("heart")}</div><div><b>Wellbeing update</b><div class="muted small">Today, 10:15 am</div></div></div>${status("New","complete")}</div><h3>A lovely morning out</h3><p>John enjoyed a relaxed morning visit to the community garden today. He spent time outdoors and had a good chat over morning tea.</p><div class="update-foot"><div class="person">${avatar("MC","sage")}<span><b>Maya Chen</b><small>Care Support Worker</small></span></div><a class="btn btn-secondary btn-sm" href="#/family/updates/garden-visit">View update</a></div></article><article class="card update-card"><div class="update-top"><div class="update-type"><div class="icon-wrap">${icon("calendar")}</div><div><b>Service information</b><div class="muted small">3 October</div></div></div></div><h3>October visit information</h3><p>A summary of upcoming visit times and who to contact with a question.</p><div class="update-foot"><span class="muted small">Shared by InnerPeace</span><a class="btn btn-quiet btn-sm" href="#/family/updates">View information</a></div></article></div><aside class="stack"><article class="card card-pad"><div class="card-head"><h3>Important information</h3></div><div class="list"><div class="list-item"><div class="list-icon">${icon("people")}</div><div><b>Care coordination</b><small>Laura Bennett • 03 5155 0182</small></div></div><div class="list-item"><div class="list-icon">${icon("clock")}</div><div><b>Office hours</b><small>Mon–Fri, 8:30 am–5:00 pm</small></div></div><div class="list-item"><div class="list-icon">${icon("help")}</div><div><b>Need help?</b><small>View contact guidance</small></div></div></div></article><article class="card card-pad" style="background:var(--cream)"><div style="display:flex;gap:12px">${icon("lock")}<div><h3>Private by design</h3><p class="muted small" style="margin:0">You only see information specifically authorised for your account in this concept.</p></div></div></article></aside></section>`);
}

function familyUpdates(detail = false) {
  if (detail) return familyShell(`<div class="page-head"><div><a class="btn btn-quiet btn-sm" href="#/family/updates">${icon("back","icon-sm")} Back to updates</a></div></div><article class="card update-card" style="max-width:820px;margin:auto"><div class="update-top"><div class="update-type"><div class="icon-wrap">${icon("heart")}</div><div><b>Wellbeing update</b><div class="muted small">Today, 10:15 am</div></div></div>${status("Authorised for family","complete")}</div><h2 style="font-size:38px;margin-bottom:16px">A lovely morning out</h2><p class="lead">John enjoyed a relaxed morning visit to the community garden today. He spent time outdoors, took in the spring flowers and had a good chat over morning tea.</p><p>No action is needed—this is simply a selected update to help you feel connected to John’s day.</p><div class="update-foot" style="margin-top:28px"><div class="person">${avatar("MC","sage")}<span><b>Maya Chen</b><small>Care Support Worker</small></span></div><button class="btn btn-secondary btn-sm" data-reply-update>${icon("message","icon-sm")} Send a reply</button></div></article>`);
  return familyShell(`<div class="page-head"><div><h2>Authorised updates</h2><p>Selected information shared with you by InnerPeace.</p></div><div class="tabs"><button class="tab active">All updates</button><button class="tab">Wellbeing</button><button class="tab">Service information</button></div></div><div class="family-columns"><div class="form-stack"><article class="card update-card"><div class="update-top"><div class="update-type"><div class="icon-wrap">${icon("heart")}</div><div><b>Wellbeing update</b><div class="muted small">Today, 10:15 am</div></div></div>${status("New","complete")}</div><h3>A lovely morning out</h3><p>John enjoyed a relaxed morning visit to the community garden today.</p><a class="btn btn-secondary btn-sm" href="#/family/updates/garden-visit">View full update</a></article><article class="card update-card"><div class="update-top"><div class="update-type"><div class="icon-wrap">${icon("calendar")}</div><div><b>Service information</b><div class="muted small">3 October</div></div></div>${status("New","info")}</div><h3>October visit information</h3><p>A summary of upcoming visit times and who to contact with a question.</p><button class="btn btn-secondary btn-sm" data-open-resource="October visit information">View information</button></article><article class="card update-card"><div class="update-top"><div class="update-type"><div class="icon-wrap">${icon("heart")}</div><div><b>Wellbeing update</b><div class="muted small">28 September</div></div></div></div><h3>Enjoying music at home</h3><p>John chose some favourite songs during his visit and enjoyed sharing a few stories.</p><button class="btn btn-quiet btn-sm" data-open-resource="Enjoying music at home">View update</button></article></div><aside class="card card-pad" style="height:max-content"><div class="card-head"><h3>About updates</h3></div><p class="muted">This area is designed for selected, approved information. It is not a medical record or clinical management system.</p><div class="list"><div class="list-item"><div class="list-icon">${icon("lock")}</div><div><b>Authorised access</b><small>Controlled by InnerPeace</small></div></div><div class="list-item"><div class="list-icon">${icon("shield")}</div><div><b>Selected information</b><small>Only appropriate items are shared</small></div></div></div></aside></div>`);
}

function familyResources() {
  const items = [["Welcome to InnerPeace","A guide to services, contact and communication.","PDF • 1.2 MB","heart"],["Preparing for warmer weather","Practical comfort and wellbeing reminders.","PDF • 780 KB","info"],["Family communication guide","How and when to contact the InnerPeace team.","PDF • 640 KB","message"],["Understanding home care funding","General information and useful links.","Web guide","file"],["Feedback and compliments","How to share feedback with InnerPeace.","Online form","form"],["Privacy information","How information is handled and access is managed.","PDF • 520 KB","lock"]];
  return familyShell(`<div class="page-head"><div><h2>Resources & documents</h2><p>Helpful information selected for InnerPeace clients and families.</p></div><label class="search">${icon("search","icon-sm")}<input aria-label="Search resources" placeholder="Search resources"></label></div><div class="resource-grid">${resourceCards(items)}</div>`);
}

function familyAnnouncements() {
  return familyShell(`<div class="page-head"><div><h2>Announcements</h2><p>News and general information from InnerPeace.</p></div></div><div class="form-stack"><article class="card card-pad"><time class="muted small">6 October 2026</time><h2 style="font-size:29px;margin:8px 0 10px">Spring wellbeing reminder</h2><p class="muted">A few simple reminders for staying comfortable and well as the days become warmer across East Gippsland.</p><button class="btn btn-secondary btn-sm" data-open-announcement="Spring wellbeing reminder">Read announcement</button></article><article class="card card-pad"><time class="muted small">1 October 2026</time><h2 style="font-size:29px;margin:8px 0 10px">InnerPeace community update</h2><p class="muted">A short update from the team and helpful service information for October.</p><button class="btn btn-secondary btn-sm" data-open-announcement="InnerPeace community update">Read announcement</button></article></div>`);
}

function familyContact() {
  return familyShell(`<div class="page-head"><div><h2>Contact InnerPeace</h2><p>Send a non-urgent question or view important contact information.</p></div></div><section class="family-columns"><article class="card message-layout"><aside class="message-list"><div class="message-list-head"><b>Messages</b></div><div class="conversation active">${avatar("LB","sage")}<div><b>Laura Bennett</b><p>Thanks Alice, I’ll confirm...</p></div></div><div class="conversation">${avatar("IP")}<div><b>InnerPeace Office</b><p>Welcome to your family portal.</p></div></div></aside><div class="chat"><div class="chat-head">${avatar("LB","sage")}<div><b>Laura Bennett</b><div class="muted small">Care Coordinator</div></div></div><div class="chat-body"><div class="bubble">Hi Alice, welcome to your InnerPeace portal. Please feel free to send a non-urgent question here.<time>1 Oct, 10:15 am</time></div><div class="bubble mine">Thank you. Could you please confirm who I contact if a visit time needs checking?<time>Yesterday, 3:20 pm</time></div><div class="bubble">Thanks Alice, I’ll confirm any scheduling question during office hours. For anything urgent, please follow the contact guidance in the portal.<time>Yesterday, 3:42 pm</time></div></div><form class="chat-compose" data-send-message><input class="input" aria-label="Write a message" placeholder="Write a non-urgent message"><button class="btn btn-primary btn-sm" type="submit">Send</button></form></div></article><aside class="stack"><article class="card card-pad"><div class="list-icon" style="margin-bottom:17px">${icon("people")}</div><h3>InnerPeace office</h3><p class="muted">Monday to Friday<br>8:30 am–5:00 pm</p><p><b>0419 853 811</b><br><span class="muted">General service enquiries</span></p></article><article class="card card-pad" style="background:#fff8ec;border-color:#efddbd"><h3>Urgent or emergency?</h3><p class="muted">This portal is not monitored as an emergency service. Call emergency services when immediate assistance is required.</p></article></aside></section>`);
}

function familyAccess() {
  return familyShell(`<div class="page-head"><div><h2>Family access</h2><p>See who is authorised to access John’s selected portal information.</p></div><button class="btn btn-secondary btn-sm" data-request-access>${icon("plus","icon-sm")} Request another family member</button></div><div class="family-columns"><article class="card card-pad"><div class="card-head"><div><h3>Authorised family members</h3><span class="muted small">Managed by InnerPeace</span></div></div><div class="permission-row">${avatar("AW","sage")}<div><b>Alice Wood</b><small>Daughter • Primary family contact</small></div>${status("Active","complete")}</div><div class="permission-row">${avatar("BW","gold")}<div><b>Ben Wood</b><small>Son • Updates and resources</small></div>${status("Active","complete")}</div></article><aside class="stack"><article class="card card-pad"><h3>Your access includes</h3><ul class="feature-list"><li>Selected wellbeing updates</li><li>Approved documents and resources</li><li>General InnerPeace announcements</li><li>Non-urgent messages</li></ul></article><article class="card card-pad" style="background:var(--cream)"><div style="display:flex;gap:12px">${icon("shield")}<div><h3>Access is reviewed</h3><p class="muted small" style="margin:0">InnerPeace can update or revoke access when authorisation changes.</p></div></div></article></aside></div>`);
}

function render() {
  const path = currentRoute();
  let html;
  if (path === "/" || ["opportunity","ecosystem","impact"].includes(path)) html = landingPage();
  else if (path === "/staff/login") html = loginPage("staff");
  else if (path === "/staff/dashboard") html = staffDashboard();
  else if (path === "/staff/training") html = staffTraining();
  else if (path.startsWith("/staff/training/")) html = trainingModule();
  else if (path === "/staff/progress") html = staffProgress();
  else if (path === "/staff/resources") html = staffResources();
  else if (path === "/staff/documents") html = staffDocuments();
  else if (path === "/staff/announcements") html = staffAnnouncements();
  else if (path === "/staff/forms") html = staffForms();
  else if (path === "/staff/notifications") html = staffNotifications();
  else if (path === "/staff/profile") html = staffProfile();
  else if (path === "/staff/help") html = staffHelp();
  else if (path === "/management/login") html = loginPage("management");
  else if (path === "/management/dashboard") html = managementDashboard();
  else if (path === "/management/staff") html = managementStaff();
  else if (path.startsWith("/management/staff/")) html = employeeProfile(path.split("/").pop());
  else if (path === "/management/onboarding") html = managementOnboarding();
  else if (path === "/management/compliance") html = managementCompliance();
  else if (path === "/management/documents") html = managementDocuments();
  else if (path === "/management/announcements") html = managementAnnouncements();
  else if (path === "/management/forms") html = managementForms();
  else if (path === "/management/reports") html = managementReports();
  else if (path === "/management/activity" || path === "/management/notifications") html = managementActivity();
  else if (path === "/management/permissions") html = managementPermissions();
  else if (path === "/management/families") html = managementFamilies();
  else if (path === "/family/login") html = loginPage("family");
  else if (path === "/family/dashboard") html = familyDashboard();
  else if (path === "/family/updates/garden-visit") html = familyUpdates(true);
  else if (path === "/family/updates") html = familyUpdates();
  else if (path === "/family/resources") html = familyResources();
  else if (path === "/family/announcements") html = familyAnnouncements();
  else if (path === "/family/contact") html = familyContact();
  else if (path === "/family/access") html = familyAccess();
  else html = landingPage();
  app.innerHTML = html;
  wireInteractions();
  if (["opportunity","ecosystem","impact"].includes(path)) requestAnimationFrame(() => document.querySelector(`#${path}`)?.scrollIntoView());
  else window.scrollTo({ top: 0, behavior: "instant" });
}

function basicModal(title, copy, actionLabel = "Done") {
  const wrapper = openModal(`<div class="modal-head"><h2>${title}</h2><button class="icon-btn modal-close" aria-label="Close">${icon("close","icon-sm")}</button></div><p class="muted">${copy}</p><div class="modal-actions"><button class="btn btn-primary modal-close">${actionLabel}</button></div>`);
  wrapper.querySelectorAll(".modal-close").forEach(button => button.addEventListener("click", () => wrapper.remove()));
}

function formModal(name) {
  const wrapper = openModal(`<div class="modal-head"><h2>${name}</h2><button class="icon-btn modal-close" aria-label="Close">${icon("close","icon-sm")}</button></div><p class="muted">This short concept form shows how staff could complete a task without searching for a separate document.</p><form data-concept-form><div class="field"><label>Summary</label><input class="input" required placeholder="Add a short summary"></div><div class="field"><label>Details</label><textarea class="input" required placeholder="Add relevant details"></textarea></div><div class="field"><label>Category</label><select class="input"><option>General</option><option>Safety</option><option>Equipment</option><option>Other</option></select></div><div class="modal-actions"><button type="button" class="btn btn-secondary modal-close">Cancel</button><button type="submit" class="btn btn-primary">Submit form</button></div></form>`);
  $("[data-concept-form]",wrapper).addEventListener("submit",event=>{event.preventDefault();wrapper.remove();toast(`${name} submitted in the concept prototype.`);});
}

function addStaffModal() {
  const wrapper = openModal(`<div class="modal-head"><h2>Add staff member</h2><button class="icon-btn modal-close" aria-label="Close">${icon("close","icon-sm")}</button></div><p class="muted">Create a fictional staff profile and start the onboarding checklist.</p><form data-add-staff-form><div class="field"><label>Full name</label><input class="input" required value="Alex Morgan"></div><div class="field"><label>Email</label><input class="input" type="email" required value="alex.morgan@innerpeace.demo"></div><div class="field"><label>Role</label><select class="input"><option>Care Support Worker</option><option>Registered Nurse</option><option>Care Coordinator</option></select></div><div class="modal-actions"><button type="button" class="btn btn-secondary modal-close">Cancel</button><button type="submit" class="btn btn-primary">Create & start onboarding</button></div></form>`);
  $("[data-add-staff-form]",wrapper).addEventListener("submit",event=>{event.preventDefault();wrapper.remove();toast("Alex Morgan added to the onboarding workflow.");});
}

function uploadModal() {
  const wrapper = openModal(`<div class="modal-head"><h2>Upload document</h2><button class="icon-btn modal-close" aria-label="Close">${icon("close","icon-sm")}</button></div><p class="muted">Add a document, set its audience and publish it to the right people.</p><form data-upload-form><div class="field"><label>Document name</label><input class="input" required value="Home Visit Preparation Guide"></div><div class="field"><label>Audience</label><select class="input"><option>All staff</option><option>Managers only</option><option>Clients & families</option></select></div><div class="field"><label>Publication status</label><select class="input"><option>Publish now</option><option>Save as draft</option></select></div><div class="modal-actions"><button type="button" class="btn btn-secondary modal-close">Cancel</button><button type="submit" class="btn btn-primary">Upload concept document</button></div></form>`);
  $("[data-upload-form]",wrapper).addEventListener("submit",event=>{event.preventDefault();wrapper.remove();toast("Document uploaded and published in the concept.");});
}

function announcementModal() {
  const wrapper = openModal(`<div class="modal-head"><h2>New announcement</h2><button class="icon-btn modal-close" aria-label="Close">${icon("close","icon-sm")}</button></div><form data-announcement-form><div class="field"><label>Title</label><input class="input" required value="Team morning tea reminder"></div><div class="field"><label>Audience</label><select class="input"><option>All staff</option><option>Managers</option><option>Clients & families</option></select></div><div class="field"><label>Message</label><textarea class="input" required>Join us for a relaxed team morning tea next Tuesday.</textarea></div><div class="modal-actions"><button type="button" class="btn btn-secondary modal-close">Save draft</button><button type="submit" class="btn btn-primary">Publish announcement</button></div></form>`);
  $("[data-announcement-form]",wrapper).addEventListener("submit",event=>{event.preventDefault();wrapper.remove();toast("Announcement published to all staff.");});
}

function exportFile() {
  const csv = "InnerPeace Connected Care Platform — Concept Report\nMetric,Value\nActive staff,28\nTraining compliance,86%\nOverdue items,4\nFamily accounts,19\n\nConcept data only — for discussion purposes";
  const url = URL.createObjectURL(new Blob([csv], {type:"text/csv"}));
  const link = document.createElement("a"); link.href = url; link.download = "innerpeace-concept-report.csv"; link.click(); URL.revokeObjectURL(url);
  toast("Concept report downloaded.");
}

function wireInteractions() {
  document.querySelectorAll("[data-route]").forEach(el => el.addEventListener("click", () => route(el.dataset.route)));
  document.querySelectorAll("[data-login]").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    const role = form.dataset.login; state[`${role}LoggedIn`] = true;
    route(`/${role}/dashboard`); toast("Welcome to the concept prototype.");
  }));
  document.querySelectorAll("[data-tab]").forEach(button => button.addEventListener("click", () => { state.activeTrainingTab = button.dataset.tab; render(); }));
  $("[data-module-next]")?.addEventListener("click", () => { state.moduleStep = Math.min(3,state.moduleStep+1); render(); });
  $("[data-module-prev]")?.addEventListener("click", () => { state.moduleStep = Math.max(1,state.moduleStep-1); render(); });
  $("[data-complete-module]")?.addEventListener("click", () => { state.trainingCompleted = true; render(); toast("Module complete—progress updated to 82%."); });
  document.querySelectorAll("[data-open-resource]").forEach(button => button.addEventListener("click", () => basicModal(button.dataset.openResource, "This is a selected concept resource. In production, the current authorised document would open here.", "Close resource")));
  document.querySelectorAll("[data-open-announcement]").forEach(button => button.addEventListener("click", () => basicModal(button.dataset.openAnnouncement, "A full, accessible announcement would appear here, with its audience, publish date and attachments where relevant.")));
  document.querySelectorAll("[data-open-help]").forEach(button => button.addEventListener("click", () => basicModal(button.dataset.openHelp, "Step-by-step support content would guide the staff member through this task in plain language.")));
  document.querySelectorAll("[data-start-form]").forEach(button => button.addEventListener("click", () => formModal(button.dataset.startForm)));
  document.querySelectorAll("[data-add-staff]").forEach(button => button.addEventListener("click", addStaffModal));
  document.querySelectorAll("[data-upload-document]").forEach(button => button.addEventListener("click", uploadModal));
  document.querySelectorAll("[data-create-announcement]").forEach(button => button.addEventListener("click", announcementModal));
  document.querySelectorAll("[data-export-report], [data-download-certificate]").forEach(button => button.addEventListener("click", exportFile));
  document.querySelectorAll("[data-mark-read]").forEach(button => button.addEventListener("click", () => toast("All items marked as read.")));
  document.querySelectorAll("[data-send-reminders]").forEach(button => button.addEventListener("click", () => toast("Training reminders sent to 6 staff members.")));
  document.querySelectorAll("[data-send-reminder]").forEach(button => button.addEventListener("click", () => toast("Training reminder sent to this staff member.")));
  document.querySelectorAll("[data-demo-action]").forEach(button => button.addEventListener("click", () => toast(button.dataset.demoAction + ".")));
  document.querySelectorAll(".switch").forEach(button => button.addEventListener("click", () => { button.classList.toggle("on"); toast("Preference updated."); }));
  $("[data-send-message]")?.addEventListener("submit",event=>{event.preventDefault(); const input=$("input",event.currentTarget); if(!input.value.trim()) return; input.value=""; toast("Message sent in the concept portal.");});
  const simpleModalActions = [
    ["data-view-submissions","My submissions","A personal submission history would appear here."],["data-edit-profile","Edit profile","Editable contact and preference fields would open here."],
    ["data-contact-support","Contact support","A short support request could be sent from this panel."],["data-message-staff","Message staff member","A secure internal message composer would open here."],
    ["data-edit-staff","Edit staff profile","Managers could update role, manager, status and account details."],["data-assign-training","Assign training","Select one or more modules and a due date."],
    ["data-report-filter","Report period","Choose a custom reporting period and comparison range."],["data-staff-menu","Manage staff","View profile, change role, deactivate access or restart onboarding."],
    ["data-view-onboarding","Onboarding checklist","Account setup, required reading, role training and first-shift readiness."],["data-create-form","Create form","A simple form builder would open here."],
    ["data-manage-form","Manage form","Edit fields, audience, status and view submissions."],["data-create-role","Create role","Define a named role and choose only the permissions it needs."],
    ["data-edit-role","Edit permissions","Review view, create, edit, export and account-management permissions."],["data-invite-family","Invite family member","Link an authorised person to a client and select approved access."],
    ["data-manage-family","Manage family access","Review authorised information, linked client and access status."],["data-reply-update","Reply to update","A simple non-urgent reply could be sent to the care coordinator."],
    ["data-request-access","Request family access","Send a request to InnerPeace to review another family member’s access."],
  ];
  simpleModalActions.forEach(([attribute,title,copy]) => document.querySelectorAll(`[${attribute}]`).forEach(button => button.addEventListener("click",()=>basicModal(button.dataset[attribute.replace("data-","").replace(/-([a-z])/g,(_,c)=>c.toUpperCase())] || title, copy))));
}

function registerWebMCP() {
  const context = typeof document === "undefined" ? undefined : document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  const register = tool => {
    try { void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch (_) {}
  };
  register({
    name: "navigate_to_platform_experience",
    title: "Open platform experience",
    description: "Open the Staff App, Management Platform, or Client and Family Portal within the InnerPeace concept prototype.",
    inputSchema: { type:"object", properties:{ experience:{ type:"string", enum:["staff","management","family"] } }, required:["experience"], additionalProperties:false },
    annotations: { readOnlyHint:false, untrustedContentHint:false },
    execute(input) {
      if (!input || !["staff","management","family"].includes(input.experience)) throw new Error("experience must be staff, management, or family");
      route(`/${input.experience}/dashboard`);
      return { experience:input.experience, path:`/${input.experience}/dashboard`, status:"opened" };
    },
  });
  register({
    name: "get_concept_compliance_summary",
    title: "Read compliance summary",
    description: "Read the current fictional management compliance summary shown in this concept prototype.",
    inputSchema: { type:"object", properties:{}, additionalProperties:false },
    annotations: { readOnlyHint:true, untrustedContentHint:false },
    execute(input) {
      if (input && Object.keys(input).length) throw new Error("This tool does not accept input fields");
      return { activeStaff:28, compliantStaff:24, compliancePercent:86, overdueItems:4, dataType:"fictional concept data" };
    },
  });
  register({
    name: "complete_required_training_demo",
    title: "Complete required training demo",
    description: "Complete the fictional Infection Prevention Essentials module and update Maya Chen’s visible training progress in the prototype.",
    inputSchema: { type:"object", properties:{}, additionalProperties:false },
    annotations: { readOnlyHint:false, untrustedContentHint:false },
    execute(input) {
      if (input && Object.keys(input).length) throw new Error("This tool does not accept input fields");
      state.trainingCompleted = true; state.moduleStep = 3;
      route("/staff/training/infection-prevention");
      if (currentRoute() === "/staff/training/infection-prevention") render();
      return { module:"Infection Prevention Essentials", status:"completed", progressPercent:82 };
    },
  });
}

window.addEventListener("hashchange", render);
render();
registerWebMCP();

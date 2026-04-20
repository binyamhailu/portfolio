// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Mobile nav toggle ----------
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}

// ---------- Consultation modal ----------
const modal = document.getElementById("request-modal");
const openModal = () => {
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => modal.querySelector("input[name=name]")?.focus(), 50);
};
const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

document.querySelectorAll("[data-open-request]").forEach((el) =>
  el.addEventListener("click", openModal)
);
document.querySelectorAll("[data-close-request]").forEach((el) =>
  el.addEventListener("click", closeModal)
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("open")) closeModal();
});

const requestForm = document.getElementById("request-form");
if (requestForm) {
  requestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(requestForm);
    const get = (k) => (data.get(k) || "").toString().trim();

    const name = get("name");
    const email = get("email");
    const company = get("company");
    const timeline = get("timeline");
    const projectType = get("project_type");
    const engagement = get("engagement");
    const budget = get("budget");
    const message = get("message");

    if (!name || !email || !projectType || !engagement || !message) {
      alert("Please fill in the required fields.");
      return;
    }

    const subject = `Consultation request — ${projectType} (${engagement})`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "-"}`,
      `Project type: ${projectType}`,
      `Engagement: ${engagement}`,
      `Timeline: ${timeline || "-"}`,
      `Budget: ${budget || "-"}`,
      ``,
      `Message:`,
      message,
      ``,
      `— Sent from binyamhailu.github.io/portfolio`,
    ].join("\n");

    const mailto =
      "mailto:binwelbeck@gmail.com" +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    window.location.href = mailto;
  });
}

// ---------- Interactive terminal ----------
(function initTerminal() {
  const body = document.getElementById("xterm-body");
  const output = document.getElementById("xterm-output");
  const input = document.getElementById("xterm-input");
  if (!body || !output || !input) return;

  const history = [];
  let historyIndex = -1;

  const escape = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const print = (html, cls = "xterm-output-text") => {
    const div = document.createElement("div");
    div.className = "line " + cls;
    div.innerHTML = html;
    output.appendChild(div);
    body.scrollTop = body.scrollHeight;
  };

  const printCmd = (cmd) => {
    print(
      `<span class="xterm-prompt">binyam@cloud<span class="muted">:~$</span></span> ${escape(cmd)}`,
      "xterm-output-cmd"
    );
  };

  const commands = {
    help() {
      print(`<span class="xterm-output-heading">Available commands</span>`);
      print(
        [
          "  <strong>help</strong>       show this help",
          "  <strong>about</strong>      who I am",
          "  <strong>services</strong>   consulting offerings",
          "  <strong>skills</strong>     tech stack",
          "  <strong>certs</strong>      certifications",
          "  <strong>experience</strong> work history",
          "  <strong>contact</strong>    reach out",
          "  <strong>request</strong>    open consultation form",
          "  <strong>social</strong>     social links",
          "  <strong>whoami</strong>     identity",
          "  <strong>date</strong>       current date",
          "  <strong>clear</strong>      clear terminal",
        ].join("<br>")
      );
    },
    about() {
      print(
        `AWS-certified Cloud & DevOps Engineer based in Addis Ababa, Ethiopia.<br>` +
          `5+ years building and operating scalable cloud platforms across AWS and GCP.<br>` +
          `Currently at <strong>Fayda — Ethiopian National ID</strong>, working on MOSIP-based DPI.`
      );
    },
    services() {
      print(`<span class="xterm-output-heading">Consulting offerings</span>`);
      print(
        [
          "  • AWS & GCP cloud deployments (VPC, IAM, compute, networking)",
          "  • Kubernetes platforms — RKE2, EKS, Argo CD, Helmfile, GitOps",
          "  • Telecloud & local cloud deployments (Ethio Telecom / on-prem)",
          "  • SMS gateway integration — Jasmin, Kannel ↔ telecom SMSC",
          "  • IPsec site-to-site VPN — banks & private companies",
          "  • Secure deployments + end-to-end monitoring (Istio, EFK)",
          "",
          "  <strong>Engagement:</strong> one-time · contract · long-term · open to discussion.",
          "  Type <strong>request</strong> to send a consultation enquiry.",
        ].join("<br>")
      );
    },
    skills() {
      print(`<span class="xterm-output-heading">Stack</span>`);
      print(
        [
          "  AWS         VPC, EC2, EKS, Lambda, EventBridge, S3, IAM, RDS, VPN, Direct Connect",
          "  K8s         RKE2, EKS, Argo CD, Helmfile, Istio, Rancher, Keycloak",
          "  CI/CD       GitLab CI, Jenkins, GitOps",
          "  Backend     Java / Spring Boot, Reactive Spring, Node.js / NestJS",
          "  Events      Kafka, RabbitMQ, EventBridge",
          "  Observ.     ELK / EFK (Elasticsearch, Fluentd/Logstash, Kibana)",
          "  Cloud       AWS, GCP",
        ].join("<br>")
      );
    },
    certs() {
      print(`<span class="xterm-output-heading">Certifications</span>`);
      print(
        [
          "  ✓ AWS Solutions Architect — Associate (Nov 2024)",
          "  ✓ AWS Cloud Practitioner (Jul 2024)",
          "  ✓ GCP Professional Cloud Architect (Oct 2024)",
          "  ✓ KCNA — Kubernetes & Cloud Native Associate (Aug 2025)",
          "  ✓ CNCF / LFS250 — Kubernetes & Cloud Native Essentials",
        ].join("<br>")
      );
    },
    experience() {
      print(`<span class="xterm-output-heading">Experience</span>`);
      print(
        [
          "  <strong>Fayda — Ethiopian National ID</strong> · Sep 2024 — Present",
          "    DevOps & Cloud Engineer · MOSIP/DPI, RKE2, Argo CD, Istio, EFK",
          "",
          "  <strong>Hoski</strong> · Mar 2023 — Sep 2024",
          "    Backend & AWS Cloud Developer · NestJS, EKS, RabbitMQ, Lambda",
          "",
          "  <strong>Safaricom Ethiopia</strong> · Mar 2021 — Feb 2023",
          "    Backend & DevOps · Java/Spring, Istio, ELK, Kafka, CI/CD",
        ].join("<br>")
      );
    },
    contact() {
      print(`<span class="xterm-output-heading">Contact</span>`);
      print(
        [
          "  email     <a href='mailto:binwelbeck@gmail.com'>binwelbeck@gmail.com</a>",
          "  linkedin  <a href='https://linkedin.com/in/binkid1' target='_blank' rel='noopener'>linkedin.com/in/binkid1</a>",
          "  github    <a href='https://github.com/binyamhailu' target='_blank' rel='noopener'>github.com/binyamhailu</a>",
        ].join("<br>")
      );
    },
    social() {
      commands.contact();
    },
    request() {
      print(`Opening consultation request form…`);
      openModal();
    },
    whoami() {
      print("binyam — aws cloud & devops engineer");
    },
    date() {
      print(new Date().toString());
    },
    clear() {
      output.innerHTML = "";
    },
  };

  // Aliases
  commands.ls = commands.help;
  commands.ll = commands.help;
  commands.cv = commands.experience;
  commands.resume = commands.experience;
  commands.hire = commands.request;
  commands.consult = commands.request;

  function runCommand(raw) {
    const cmd = raw.trim();
    if (cmd === "") return;
    printCmd(cmd);
    const [name, ...rest] = cmd.split(/\s+/);
    const fn = commands[name.toLowerCase()];
    if (fn) {
      fn(rest);
    } else {
      print(
        `command not found: ${escape(name)} — type <strong>help</strong>`,
        "xterm-output-error"
      );
    }
  }

  // Welcome banner
  print(
    [
      "Welcome to binyam@cloud — interactive terminal",
      `Session started ${new Date().toLocaleString()}`,
      "",
    ].join("<br>"),
    "xterm-output-text"
  );
  runCommand("help");

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = input.value;
      if (value.trim() !== "") {
        history.push(value);
        historyIndex = history.length;
      }
      runCommand(value);
      input.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex] || "";
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] || "";
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = input.value.trim().toLowerCase();
      if (!current) return;
      const match = Object.keys(commands).find((k) => k.startsWith(current));
      if (match) input.value = match;
    }
  });

  body.addEventListener("click", (e) => {
    if (e.target.tagName !== "A") input.focus();
  });
})();

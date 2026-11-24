// ============================================================
// AFTAB MULANI — Cinematic Cloud Portfolio
// main.js · nav · reveal · modals · subtle 3D cloud-node field
// ============================================================
(() => {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ---------- HEADER: shrink on scroll ----------
  const header = document.getElementById("site-header");
  const onScrollHeader = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("bg-ink-900/80", "backdrop-blur-xl", "border-b", "border-white/5");
    } else {
      header.classList.remove("bg-ink-900/80", "backdrop-blur-xl", "border-b", "border-white/5");
    }
  };
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  // ---------- MOBILE NAV ----------
  const navToggle = document.getElementById("nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("hidden") === false;
      navToggle.setAttribute("aria-expanded", String(open));
    });
    mobileNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobileNav.classList.add("hidden");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // ---------- ACTIVE NAV ON SCROLL ----------
  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll("#nav a")];
  const setActive = () => {
    if (!sections.length) return;
    const nearest = sections
      .map((s) => ({ id: s.id, d: Math.abs(s.getBoundingClientRect().top - 120) }))
      .sort((a, b) => a.d - b.d)[0];
    navLinks.forEach((l) =>
      l.classList.toggle("active", l.getAttribute("href") === "#" + nearest.id)
    );
  };
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  // ---------- SCROLL REVEAL ----------
  const reveals = [...document.querySelectorAll(".reveal")];
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in-view"));
  }

  // ---------- PROJECT MODAL ----------
  const projects = {
    lambda: {
      file: "lambda_benchmark_dashboard.md",
      title: "Lambda Performance and Cost Benchmarking Suite",
      role: "AWS serverless performance and cost analysis",
      summary: "Benchmarked six AWS Lambda memory tiers across three workloads. The 512 MB tier cut CPU-bound warm latency by 76.9% and estimated cost per 1,000 requests by 6.7%.",
      overview: "The suite provisions six isolated Lambda functions in eu-west-1 with AWS SAM and HTTP API Gateway v2. A Boto3 harness measures cold and warm execution, and a FastAPI dashboard compares the recorded results.",
      tags: ["Python 3.12", "FastAPI", "Mangum", "AWS SAM", "Lambda", "DynamoDB", "Boto3", "SciPy", "Chart.js"],
      points: [
        "Provisioned 128 MB, 256 MB, 512 MB, 1,024 MB, 2,048 MB, and 3,008 MB Lambda functions for health, CPU-bound transformation, and DynamoDB I/O benchmarks.",
        "Used Mangum and lazy DynamoDB initialization to avoid unnecessary SDK setup on health and transformation requests.",
        "Captured Lambda REPORT data with LogType=Tail and collected 50 warm runs per memory tier without waiting for CloudWatch ingestion.",
        "Identified 512 MB as the best cost-performance tradeoff for the CPU-bound workload, reducing warm latency from 684.54 ms to 158.36 ms.",
        "Reduced DynamoDB I/O warm latency from 63.82 ms to 8.16 ms and built a Function URL analyzer that measures DNS, TCP, TLS, and time to first byte.",
      ],
      takeaway: "The dashboard compares latency and cost across tiers using recorded benchmark CSVs.",
      metrics: [
        { k: "6", v: "memory tiers" },
        { k: "76.9%", v: "lower CPU warm latency" },
        { k: "6.7%", v: "lower estimated CPU cost" },
      ],
      stack: "Python 3.12 · FastAPI · AWS SAM · Lambda · API Gateway v2 · DynamoDB · SciPy · Chart.js",
      repo: "https://github.com/AftabMulani11/lambda-benchmark-dashboard",
    },
    greenstay: {
      file: "greenstay.md",
      title: "GreenStay — Event-Driven Hotel Operations Platform",
      role: "Flask, EC2 deployment, and asynchronous messaging",
      summary: "A hotel operations app that separates REST booking and check-in flows from transactional email delivery through SQS, Lambda, and SES.",
      overview: "The Flask API queues notifications while responding to booking requests. A background processing path handles email delivery independently. Jenkins and Docker Compose deploy the app to EC2, and version-controlled Kubernetes manifests describe an alternative deployment.",
      tags: ["AWS EC2", "SQS", "Lambda", "SES", "Flask", "React", "Docker Compose", "Jenkins", "Kustomize"],
      points: [
        "Implemented hotel registration, guest check-in and checkout, sustainability reporting, and asynchronous email delivery.",
        "Packaged Flask with four Gunicorn workers and served the multi-stage React build through Nginx.",
        "Deployed the multi-container app to EC2 with Jenkins and Docker Compose.",
        "Configured Nginx to resolve backend addresses through Docker DNS at request time, accommodating backend startup delays.",
        "Authored Kustomize manifests for backend, frontend, worker, HPA, and Ingress and maintained Prometheus and Grafana configurations.",
      ],
      takeaway: "Booking requests and transactional emails can complete or retry independently.",
      metrics: [
        { k: "SQS", v: "message queue" },
        { k: "4", v: "Gunicorn workers" },
        { k: "EC2", v: "Compose deployment" },
      ],
      stack: "Python 3.12 · Flask · React · EC2 · SQS · Lambda · SES · Docker Compose · Nginx · Jenkins",
      repo: "https://github.com/AftabMulani11/greenstay",
    },
    cryptofolio: {
      file: "cryptofolio.md",
      title: "CryptoFolio — Real-Time Crypto Analytics and CI/CD",
      role: "Flask, market-data processing, and Jenkins delivery",
      summary: "A Flask and React crypto analytics app that consumes Binance WebSocket data and stores user portfolios in DynamoDB.",
      overview: "A background worker processes market data. A six-stage Jenkins pipeline runs tests, enforces the SonarCloud quality gate, builds Docker images, pushes them to ECR, and deploys to Elastic Beanstalk.",
      tags: ["Python", "Flask", "React", "Binance WebSockets", "DynamoDB", "Jenkins", "SonarCloud", "Docker", "AWS ECR", "Elastic Beanstalk"],
      points: [
        "Consumed Binance WebSocket market-data streams and persisted portfolio and application state in DynamoDB.",
        "Implemented background processing and developed eight automated test modules using Pytest and Unittest.",
        "Validated REST routes, WebSocket parsing, and DynamoDB operations in the test suite.",
        "Configured SonarCloud quality checks and automated Docker builds, ECR publishing, and Elastic Beanstalk deployment through Jenkins.",
      ],
      takeaway: "The delivery pipeline checks application and data-handling behavior before deploying container images.",
      metrics: [
        { k: "6 stages", v: "Jenkins CI/CD" },
        { k: "8", v: "test modules" },
        { k: "ECR", v: "image registry" },
      ],
      stack: "Python · Flask · React · Binance WebSockets · DynamoDB · Jenkins · SonarCloud · Docker · ECR · Elastic Beanstalk",
      repo: "https://github.com/AftabMulani11/cryptofolio",
    },
    saarush: {
      file: "saarush_2.0.md",
      title: "SAARUSH 2.0 — Voice Automation Assistant",
      role: "Python · applied AI",
      summary:
        "A voice-driven automation assistant featuring face authentication, speech-to-text, text-to-speech and computer vision for extensible, hands-free system workflows.",
      overview:
        "SAARUSH 2.0 is a desktop voice assistant that puts a face-authentication gate in front of hands-free automation. It listens for spoken commands, converts speech to text, executes an extensible command set, and responds with synthesized voice — while computer vision verifies the user before unlocking sensitive actions. Built as an exploration of real-time audio processing and applied CV.",
      tags: ["Python", "Speech Recognition", "PyAudio", "Pyttsx3", "OpenCV", "Automation"],
      points: [
        "Built voice command flows for faster, hands-free task automation.",
        "Integrated speech-to-text and text-to-speech for natural input and spoken responses.",
        "Added a face-authentication gate using computer vision before privileged commands.",
        "Designed an extensible command layer so new automations plug in cleanly.",
      ],
      takeaway:
        "Highlights system-level scripting, real-time audio processing and applied computer vision in a single interactive tool.",
      metrics: [
        { k: "voice", v: "STT + TTS" },
        { k: "face", v: "CV auth" },
        { k: "modular", v: "commands" },
      ],
      stack: "Python · SpeechRecognition · PyAudio · Pyttsx3 · OpenCV",
      repo: "https://github.com/AftabMulani11/saarush-assistant",
    },
    terraform: {
      file: "terraform_learning.md",
      title: "Automated AWS Infrastructure with Terraform and Ansible",
      role: "Infrastructure provisioning and Linux configuration",
      summary: "Modular Terraform configurations provision AWS networking and EC2. Reusable Ansible tasks configure the Linux instance after provisioning.",
      overview: "Terraform defines VPC networking, subnets, route tables, security groups, and EC2 instances. It resolves AMIs through a data source and generates RSA SSH keys during provisioning. Ansible separates package installation, configuration, and service management into reusable tasks.",
      tags: ["Terraform", "Ansible", "AWS VPC", "EC2", "Linux", "SSH"],
      points: [
        "Provisioned VPC networking, subnets, internet gateway, route tables, security groups, and EC2.",
        "Used a Terraform data source to replace hardcoded AMI values.",
        "Generated 4,096-bit RSA SSH keys during provisioning.",
        "Organized Ansible installation, configuration, and service tasks in a reusable Config role.",
      ],
      takeaway: "Terraform provisions the infrastructure and Ansible configures Linux services as separate, repeatable steps.",
      metrics: [
        { k: "VPC", v: "AWS networking" },
        { k: "4,096-bit", v: "RSA SSH key" },
        { k: "Config", v: "Ansible role" },
      ],
      stack: "Terraform · Ansible · AWS VPC · EC2 · Linux · SSH",
      repo: "https://github.com/AftabMulani11/Terraform-Learning",
    },
    qa: {
      file: "qa_automation_portfolio.md",
      title: "QA Automation Portfolio",
      role: "Test automation · JALA Academy",
      summary:
        "Five Java test-automation projects consolidated in one repo — Selenium UI suites, a reusable Page Object framework, Cucumber BDD specs, REST Assured API tests and a full end-to-end booking flow.",
      overview:
        "These projects consolidate QA automation work completed at JALA Academy. It spans 17 Selenium test classes of real-world UI scenarios, a framework layer with a driver factory and Page Object Model, business-readable Cucumber BDD with Gherkin feature files, REST Assured API tests covering CRUD, token auth and JSON schema validation, and an end-to-end yoga-booking user journey. Each subfolder is a standalone Maven project.",
      tags: ["Java", "Selenium", "Cucumber", "REST Assured", "TestNG", "Maven", "Page Object Model"],
      points: [
        "17 Selenium test classes covering real-world UI scenarios, waits, assertions and cross-page flows.",
        "Reusable framework layer: base test, driver factory, wrapper utilities and Page Object Model.",
        "Cucumber BDD with Gherkin feature specs and step definitions for business-readable tests.",
        "REST Assured API suite: CRUD, token authentication, response and JSON schema validation.",
        "End-to-end booking-flow automation modeling a complete user journey.",
      ],
      takeaway:
        "Shows framework thinking — separating reusable test infrastructure from test cases — and multi-layer coverage (UI, API, BDD, E2E), the testing discipline that carries straight into CI/CD quality gates.",
      metrics: [
        { k: "5", v: "projects" },
        { k: "17", v: "UI test classes" },
        { k: "4", v: "test layers" },
      ],
      stack: "Java · Selenium · Cucumber · REST Assured · TestNG · Maven",
      repo: "https://github.com/AftabMulani11/qa-automation-portfolio",
    },
  };

  const modal = document.getElementById("modal");
  const mFile = document.getElementById("modal-file");
  const mTitle = document.getElementById("modal-title");
  const mSummary = document.getElementById("modal-summary");
  const mTags = document.getElementById("modal-tags");
  const mPoints = document.getElementById("modal-points");
  const mTakeaway = document.getElementById("modal-takeaway");
  const mRole = document.getElementById("modal-role");
  const mOverview = document.getElementById("modal-overview");
  const mMetrics = document.getElementById("modal-metrics");
  const mStack = document.getElementById("modal-stack");
  const mRepo = document.getElementById("modal-repo");

  document.querySelectorAll("[data-project]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = projects[btn.dataset.project];
      if (!p || !modal) return;
      mFile.textContent = p.file;
      mTitle.textContent = p.title;
      if (mRole) mRole.textContent = p.role || "";
      mSummary.textContent = p.summary;
      if (mOverview) mOverview.textContent = p.overview || p.summary;
      mTakeaway.textContent = p.takeaway;
      if (mStack) mStack.textContent = p.stack || "";

      // repo link
      if (mRepo) {
        if (p.repo) {
          mRepo.href = p.repo;
          mRepo.classList.remove("hidden");
        } else {
          mRepo.classList.add("hidden");
        }
      }

      // metrics
      if (mMetrics) {
        mMetrics.replaceChildren(
          ...(p.metrics || []).map((m) => {
            const d = document.createElement("div");
            d.className =
              "rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5 text-center";
            const k = document.createElement("div");
            k.className = "font-display text-lg font-700 text-white";
            k.textContent = m.k;
            const v = document.createElement("div");
            v.className =
              "mt-0.5 font-mono text-[9px] uppercase tracking-widest text-mist-500";
            v.textContent = m.v;
            d.append(k, v);
            return d;
          })
        );
      }

      mTags.replaceChildren(
        ...p.tags.map((t) => {
          const s = document.createElement("span");
          s.className = "chip";
          s.textContent = t;
          return s;
        })
      );
      mPoints.replaceChildren(
        ...p.points.map((pt) => {
          const li = document.createElement("li");
          li.className = "flex gap-2";
          const dot = document.createElement("span");
          dot.className = "text-sky-glow";
          dot.textContent = "▹";
          const txt = document.createElement("span");
          txt.textContent = pt;
          li.append(dot, txt);
          return li;
        })
      );
      modal.showModal();
    });
  });

  if (modal) {
    document
      .getElementById("modal-close")
      ?.addEventListener("click", () => modal.close());
    // click outside to close
    modal.addEventListener("click", (e) => {
      const r = modal.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        modal.close();
    });
  }

  // ---------- CINEMATIC CLOUD-NODE FIELD (Three.js) ----------
  // Subtle, content-first. Desktop only, paused off-screen, reduced-motion aware.
  const initCloud = () => {
    const canvas = document.getElementById("cloud-canvas");
    if (!canvas || !window.THREE || prefersReduced) return;
    if (window.matchMedia("(max-width: 820px)").matches) return; // mobile: skip

    const THREE = window.THREE;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0e, 0.04);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- particle cloud (nodes) ---
    const COUNT = 900;
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      speeds[i] = Math.random() * 0.5 + 0.15;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // soft round glowing sprite
    const makeSprite = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d");
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, "rgba(125,211,252,0.95)");
      grd.addColorStop(0.4, "rgba(56,189,248,0.35)");
      grd.addColorStop(1, "rgba(56,189,248,0)");
      g.fillStyle = grd;
      g.fillRect(0, 0, 64, 64);
      const tex = new THREE.Texture(c);
      tex.needsUpdate = true;
      return tex;
    };

    const mat = new THREE.PointsMaterial({
      size: 0.55,
      map: makeSprite(),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.85,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // --- LIGHTING (multi-hue for cinematic color grading) ---
    scene.add(new THREE.AmbientLight(0x141a2a, 0.75));
    const key = new THREE.DirectionalLight(0xbfe2ff, 1.35); // cool key
    key.position.set(-9, 11, 12);
    scene.add(key);
    const warm = new THREE.PointLight(0xffb27a, 2.0, 70); // warm amber rim
    warm.position.set(16, -4, 8);
    scene.add(warm);
    const iris = new THREE.PointLight(0xa78bfa, 1.6, 60); // violet fill
    iris.position.set(-14, 6, -2);
    scene.add(iris);
    const teal = new THREE.PointLight(0x2dd4bf, 1.1, 55); // teal kick
    teal.position.set(-4, -10, 6);
    scene.add(teal);

    // --- BIGGER SOLID OBJECTS (crystalline cloud-forms) ---
    // Multi-hued, each ROAMING freely: drifting toward wander-targets with
    // eased velocity, gently oscillating rotation, and reacting to the pointer.
    const solids = [];
    // roaming bounds — shapes wander across this whole volume (fills the page)
    const BOUND = { x: 20, y: 13, z: 8 };

    const randTarget = () => new THREE.Vector3(
      (Math.random() * 2 - 1) * BOUND.x,
      (Math.random() * 2 - 1) * BOUND.y,
      (Math.random() * 2 - 1) * BOUND.z - 3
    );

    const addSolid = (geometry, opts) => {
      const baseColor = new THREE.Color(opts.color);
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshStandardMaterial({
          color: baseColor.clone(),
          emissive: new THREE.Color(opts.color),
          emissiveIntensity: 0.0,
          metalness: 0.45,
          roughness: 0.32,
          transparent: true,
          opacity: opts.opacity ?? 0.94,
          flatShading: true,
        })
      );
      const wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry),
        new THREE.LineBasicMaterial({
          color: opts.edge ?? 0xbfe2ff,
          transparent: true,
          opacity: 0.22,
        })
      );
      mesh.add(wire);
      mesh.position.set(opts.x, opts.y, opts.z);
      mesh.userData = {
        vel: new THREE.Vector3(0, 0, 0),
        target: randTarget(),
        // slow per-shape roam speed (units/sec-ish, scaled in loop)
        speed: opts.speed,
        // oscillating rotation: base drift + sine wobble → never monotonous
        rotAxis: new THREE.Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1
        ).normalize(),
        rotPhase: Math.random() * Math.PI * 2,
        rotSpeed: opts.rotSpeed, // radians/sec baseline (slow)
        rotWobbleF: 0.25 + Math.random() * 0.25, // how fast it eases in/out
        pulse: opts.pulse ?? 0.05,
        pulseF: opts.pulseF ?? 0.35,
        pulsePhase: Math.random() * Math.PI * 2,
        depth: opts.depth ?? 1, // pointer-parallax weight
        radius: opts.radius, // for mouse-hover proximity
        baseColor,
        glow: 0, // eased hover-glow amount
      };
      scene.add(mesh);
      solids.push(mesh);
      return mesh;
    };

    addSolid(new THREE.IcosahedronGeometry(4.6, 0), {
      color: 0x2563eb, edge: 0x93c5fd, x: 13, y: 1, z: -3,
      speed: 1.1, rotSpeed: 0.09, pulse: 0.05, depth: 1.3, radius: 4.6,
    });
    addSolid(new THREE.OctahedronGeometry(2.7, 0), {
      color: 0xf59e0b, edge: 0xfcd9a0, x: -14, y: 5, z: -6, // warm amber
      speed: 1.5, rotSpeed: 0.13, pulse: 0.07, depth: 1.0, radius: 2.7,
    });
    addSolid(new THREE.DodecahedronGeometry(2.3, 0), {
      color: 0x8b5cf6, edge: 0xc4b5fd, x: -10, y: -7, z: 2, // violet
      speed: 1.3, rotSpeed: 0.11, pulse: 0.06, depth: 1.6, radius: 2.3,
    });
    addSolid(new THREE.TorusGeometry(3.2, 0.55, 18, 64), {
      color: 0x14b8a6, edge: 0x99f6e4, x: 9, y: -8, z: -10, opacity: 0.9, // teal
      speed: 1.0, rotSpeed: 0.10, pulse: 0.05, depth: 0.9, radius: 3.7,
    });
    addSolid(new THREE.TetrahedronGeometry(1.7, 0), {
      color: 0x38bdf8, edge: 0xbae6fd, x: 4, y: 8, z: -12, // sky accent
      speed: 1.7, rotSpeed: 0.15, pulse: 0.08, depth: 2.0, radius: 1.7,
    });

    // faint large wireframe shell enveloping the scene for depth
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(16, 1),
      new THREE.MeshBasicMaterial({
        color: 0x334155,
        wireframe: true,
        transparent: true,
        opacity: 0.06,
      })
    );
    scene.add(shell);

    // --- interaction state ---
    let mouseX = 0,
      mouseY = 0,
      scrollY = 0,
      running = true,
      pointerActive = false;

    // pointer projected onto the z=0 plane in world space (for repulsion/hover)
    const pointerWorld = new THREE.Vector3();
    const ndc = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const planeZ0 = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const updatePointerWorld = () => {
      raycaster.setFromCamera(ndc, camera);
      raycaster.ray.intersectPlane(planeZ0, pointerWorld);
    };

    window.addEventListener(
      "mousemove",
      (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
        ndc.y = -((e.clientY / window.innerHeight) * 2 - 1);
        pointerActive = true;
      },
      { passive: true }
    );
    window.addEventListener("mouseleave", () => { pointerActive = false; });
    window.addEventListener(
      "scroll",
      () => {
        scrollY = window.scrollY;
      },
      { passive: true }
    );

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // pause when tab hidden
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running) {
        last = performance.now(); // don't count hidden time as a frame delta
        loop();
      }
    });

    let t = 0;
    let last = performance.now();
    let rafId = null;
    const pos = geo.attributes.position.array;
    const tmp = new THREE.Vector3();
    const qDelta = new THREE.Quaternion();
    const MOUSE_RADIUS = 9; // world units of hover/repulsion influence

    const loop = () => {
      if (!running) { rafId = null; return; }
      if (rafId !== null) cancelAnimationFrame(rafId); // never run two chains
      rafId = requestAnimationFrame(loop);

      // delta time (seconds), clamped so tab-switches don't jolt the scene
      const now = performance.now();
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.05) dt = 0.05;
      t += dt;

      // gentle upward drift + wrap (particles)
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += speeds[i] * 0.012;
        if (pos[i * 3 + 1] > 20) pos[i * 3 + 1] = -20;
      }
      geo.attributes.position.needsUpdate = true;

      if (pointerActive) updatePointerWorld();

      // scroll-linked camera drift (subtle)
      const camTargetY = -(scrollY * 0.0016);
      camera.position.y += (camTargetY - camera.position.y) * 0.05;
      camera.position.x += (mouseX * 1.6 - camera.position.x) * 0.02;
      camera.lookAt(0, camera.position.y * 0.4, 0);

      points.rotation.y += dt * 0.02;

      // --- ROAMING SOLIDS ---
      solids.forEach((m) => {
        const d = m.userData;

        // 1) pick a new wander target once we get close to the current one
        if (m.position.distanceTo(d.target) < 2.2) d.target = randTarget();

        // 2) accelerate gently toward the target, with strong damping →
        //    smooth, slow, never-jerky drift that covers the whole volume
        tmp.copy(d.target).sub(m.position).normalize().multiplyScalar(d.speed);
        d.vel.lerp(tmp, 1 - Math.pow(0.0016, dt)); // ease velocity toward desired
        d.vel.clampLength(0, d.speed * 1.4);

        // 3) mouse interaction: repel from pointer + light up on proximity
        let targetGlow = 0;
        if (pointerActive) {
          tmp.copy(m.position).sub(pointerWorld);
          const dist = tmp.length();
          if (dist < MOUSE_RADIUS) {
            const f = (1 - dist / MOUSE_RADIUS); // 0..1, stronger up close
            tmp.normalize().multiplyScalar(f * f * 14 * dt); // soft push
            d.vel.add(tmp);
            targetGlow = f; // brighten as pointer nears
          }
        }
        // ease the hover-glow (emissive) in/out smoothly
        d.glow += (targetGlow - d.glow) * (1 - Math.pow(0.02, dt));
        m.material.emissiveIntensity = d.glow * 0.5;

        // 4) integrate position, then keep shapes inside the roam volume
        m.position.addScaledVector(d.vel, dt);
        if (Math.abs(m.position.x) > BOUND.x) { m.position.x = Math.sign(m.position.x) * BOUND.x; d.vel.x *= -0.6; }
        if (Math.abs(m.position.y) > BOUND.y) { m.position.y = Math.sign(m.position.y) * BOUND.y; d.vel.y *= -0.6; }
        if (m.position.z > BOUND.z || m.position.z < -BOUND.z - 6) d.vel.z *= -0.6;

        // 5) OSCILLATING rotation — base slow spin, modulated by a sine so it
        //    eases, slows, and reverses. Not "round and round" at fixed speed.
        const wob = Math.sin(t * d.rotWobbleF * Math.PI + d.rotPhase);
        const ang = d.rotSpeed * wob * dt; // can go negative → reverses direction
        qDelta.setFromAxisAngle(d.rotAxis, ang);
        m.quaternion.multiply(qDelta);

        // 6) subtle scale-breathing
        const s = 1 + Math.sin(t * d.pulseF * Math.PI + d.pulsePhase) * d.pulse;
        m.scale.set(s, s, s);
      });

      shell.rotation.y += dt * 0.01;
      shell.rotation.x += dt * 0.005;

      renderer.render(scene, camera);
    };
    loop();
  };

  if (document.readyState === "complete") initCloud();
  else window.addEventListener("load", initCloud);
})();

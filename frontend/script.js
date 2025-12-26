document.addEventListener("DOMContentLoaded", () => {

  const chat = document.getElementById("chat");
  const optionsDiv = document.getElementById("options");
  const progress = document.getElementById("progress");

  const categorySelect = document.getElementById("category");
  const categoryWrapper = document.getElementById("category-wrapper");

  let user = {};

  /* ---------- Helper functions ---------- */

  function add(text, cls) {
    const div = document.createElement("div");
    div.className = cls;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  function showOptions(options, handler) {
    optionsDiv.innerHTML = "";
    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerText = opt.label;
      btn.onclick = () => handler(opt);
      optionsDiv.appendChild(btn);
    });
  }

  /* ---------- STEP 1 : CATEGORY (DROPDOWN ONLY) ---------- */

  progress.innerText = "Step 1 of 4";

  categorySelect.addEventListener("change", () => {
    if (!categorySelect.value) return;

    user.category = categorySelect.value;

    // Hide dropdown smoothly
    categoryWrapper.classList.add("category-hide");

    setTimeout(() => {
      categoryWrapper.style.display = "none";
      askIncome();   // move to step 2
    }, 400);
  });

  /* ---------- STEP 2 : INCOME ---------- */

  function askIncome() {
    progress.innerText = "Step 2 of 4";
    add("Select your annual family income:", "bot");

    showOptions(
      [
        { label: "Below ₹1 Lakh", value: 100000 },
        { label: "₹1 – 2.5 Lakh", value: 250000 },
        { label: "₹2.5 – 4 Lakh", value: 400000 },
        { label: "₹4 – 6 Lakh", value: 600000 },
        { label: "Above ₹6 Lakh", value: 1000000 }
      ],
      selectIncome
    );
  }

  function selectIncome(opt) {
    user.income = opt.value;
    add(opt.label, "user");
    askEducation();
  }

  /* ---------- STEP 3 : EDUCATION LEVEL ---------- */

  function askEducation() {
    progress.innerText = "Step 3 of 4";
    add("Select your current education level:", "bot");

    showOptions(
      [
        { label: "Class 10 Student", value: "10" },
        { label: "Class 12 Student", value: "12" },
        { label: "Graduation (After Class 12)", value: "GRAD" }
      ],
      selectEducation
    );
  }

  function selectEducation(opt) {
    user.education = opt.value;
    add(opt.label, "user");

    // Marks logic based on previous class
    if (opt.value === "10") {
      askMarks("Class 10");
    } else {
      askMarks("Previous Class");
    }
  }

  /* ---------- STEP 4 : MARKS ---------- */

  function askMarks(type) {
    progress.innerText = "Step 4 of 4";
    add(`Select your ${type} percentage range:`, "bot");

    showOptions(
      [
        { label: "Below 50%", value: 45 },
        { label: "50 – 60%", value: 55 },
        { label: "60 – 70%", value: 65 },
        { label: "70 – 80%", value: 75 },
        { label: "Above 80%", value: 85 }
      ],
      selectMarks
    );
  }

  function selectMarks(opt) {
    user.marks = opt.value;
    add(opt.label, "user");
    optionsDiv.innerHTML = "";
    submitData();
  }

  /* ---------- SUBMIT + PAGE TRANSITION ---------- */

  function submitData() {
    fetch("http://127.0.0.1:5000/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("scholarshipResult", JSON.stringify(data));

      // Smooth exit animation
      document.querySelector(".app-card").classList.add("page-exit");

      setTimeout(() => {
        window.location.href = "result.html";
      }, 500);
    })
    .catch(() => {
      add("Unable to connect to server. Please try again.", "bot");
    });
  }

});

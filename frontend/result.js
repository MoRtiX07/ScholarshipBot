const resultDiv = document.getElementById("result");
const summaryDiv = document.getElementById("summary");
const raw = localStorage.getItem("scholarshipResult");

function daysLeft(deadline) {
  const today = new Date();
  const d = new Date(deadline);
  return Math.ceil((d - today) / (1000 * 60 * 60 * 24));
}

if (!raw) {
  resultDiv.innerHTML = "<p>No result data found. Please restart.</p>";
} else {
  const data = JSON.parse(raw);

  let eligibleCount = 0;
  let notEligibleCount = 0;

  data.forEach(s => {
    if (s.status === "Eligible") eligibleCount++;
    else notEligibleCount++;
  });

  /* ---------- SUMMARY ---------- */
  summaryDiv.innerHTML = `
    <div class="summary-item">
      <span class="good">${eligibleCount}</span>
      <p>Eligible</p>
    </div>
    <div class="summary-item">
      <span class="bad">${notEligibleCount}</span>
      <p>Not Eligible</p>
    </div>
    <button class="btn-secondary" onclick="window.print()">Download / Print</button>
  `;

  /* ---------- RESULT CARDS ---------- */
  data.forEach(s => {
    const card = document.createElement("div");
    card.className = "card";

    /* ===== ELIGIBLE ===== */
    if (s.status === "Eligible") {

      const left = daysLeft(s.deadline);
      const deadlineText = left < 0 ? "Deadline Passed" : `${left} days left`;

      let deadlineClass = "deadline-green";
      if (left <= 7) deadlineClass = "deadline-red";
      else if (left <= 30) deadlineClass = "deadline-orange";

      card.innerHTML = `
        <h4>${s.name}</h4>

        <div class="row">
          <span>Status</span>
          <span class="status-ok">Eligible</span>
        </div>

        <div class="row">
          <span>Authority</span>
          <span>${s.authority}</span>
        </div>

        <div class="row">
          <span>Amount</span>
          <span>₹${s.amount}</span>
        </div>

        <div class="row ${deadlineClass}">
          <span>Deadline</span>
          <span>${s.deadline} (${deadlineText})</span>
        </div>

       <div class="row">
  <span>Apply Link</span>
  <span>
    ${s.apply_link
      ? `<a href="${s.apply_link}" target="_blank" class="apply-link">
           Apply on Official Portal
         </a>`
      : `<span style="color:#dc2626;font-weight:600">
           Link not available
         </span>`
    }
  </span>
</div>

      `;

    } 
    /* ===== NOT ELIGIBLE ===== */
    else {

      let reasons = [];
      if (s.reason.toLowerCase().includes("category")) reasons.push("Category does not match");
      if (s.reason.toLowerCase().includes("income")) reasons.push("Income exceeds limit");
      if (s.reason.toLowerCase().includes("marks")) reasons.push("Marks below requirement");

      card.innerHTML = `
        <h4>${s.name}</h4>

        <div class="row">
          <span>Status</span>
          <span class="status-no">Not Eligible</span>
        </div>

        <div class="reason-box">
          <p class="section-title">Reasons</p>
          ${reasons.map(r => `<div class="reason-item">${r}</div>`).join("")}
        </div>

        <div class="suggest-box">
          <p class="section-title">Suggestions</p>
          <div class="suggest-item">Check eligibility for other schemes</div>
          <div class="suggest-item">Improve marks for merit-based scholarships</div>
          <div class="suggest-item">Ensure correct income and category certificates</div>
        </div>
      `;
    }

    resultDiv.appendChild(card);
  });
}

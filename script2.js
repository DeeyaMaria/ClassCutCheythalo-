const attendance = {
  "OS LAB": { present: 11, total: 12 },
  "OS": { present: 10, total: 12 },
  "DBMS": { present: 4, total: 12 },
  "MATHS": { present: 80, total: 100 },
  "EE": { present: 9, total: 12 },
  "HON": { present: 9, total: 12 }
};

const MIN = 75;

// create floating hover menu
const menu = document.createElement("div");
menu.className = "context-menu";
document.body.appendChild(menu);

// attach hover listeners
document.querySelectorAll("[data-subject]").forEach(cell => {

  cell.addEventListener("mouseenter", e => {
    const subject = cell.dataset.subject;
    const data = attendance[subject];
    if (!data) return;

    const percentage = Math.round((data.present / data.total) * 100);
    const canSkip = percentage >= MIN;

    menu.innerHTML = `
      <h4>${subject}</h4>
      <p>Present: ${data.present}</p>
      <p>Total: ${data.total}</p>
      <p>Attendance: ${percentage}%</p>
      <span class="status ${canSkip ? "ok" : "no"}">
        ${canSkip ? "CAN SKIP" : "CANNOT SKIP"}
      </span>
    `;

    const rect = cell.getBoundingClientRect();
    menu.style.left = `${rect.left + rect.width / 2}px`;
    menu.style.top = `${rect.top - 10}px`;
    menu.style.transform = "translate(-50%, -100%)";
    menu.style.display = "block";
  });

  cell.addEventListener("mouseleave", () => {
    menu.style.display = "none";
  });
});


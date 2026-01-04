async function fillFullWeeklyTable() {
    const API_URL = "https://jess-seamy-manifoldly.ngrok-free.dev/tt";
    
    try {
        const response = await fetch(API_URL, {
            headers: { "ngrok-skip-browser-warning": "true" }
        });
        const fullData = await response.json();

        const dayRows = {
            "monday": document.querySelectorAll("tr")[1], // Second row
            "tuesday": document.querySelectorAll("tr")[2],
            "wednesday": document.querySelectorAll("tr")[3],
            "thursday": document.querySelectorAll("tr")[4],
            "friday": document.querySelectorAll("tr")[5]
        };

        Object.keys(dayRows).forEach(day => {
            const row = dayRows[day];
            const cells = row.querySelectorAll("span[data-subject]");
            const schedule = fullData[day];

            if (schedule) {
                cells.forEach((cell, i) => {
                    cell.textContent = schedule[i];
                    cell.setAttribute("data-subject", schedule[i]);
                });
            }
        });
    } catch (err) {
        console.error("Full table sync failed:", err);
    }
}

window.onload = fillFullWeeklyTable;

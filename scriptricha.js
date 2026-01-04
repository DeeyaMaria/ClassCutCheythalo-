const letters = document.querySelectorAll(".coolors-text span");

const palette = [
  "#FBF8CC", // lemon-chiffon
  "#FDE4CF", // powder-petal
  "#FFCFD2", // cotton-rose
  "#F1C0E8", // pink-orchid
  "#CFBAF0", // mauve
  "#A3C4F3", // baby-blue-ice
  "#90DBF4", // frosted-blue
  "#8EECF5", // electric-aqua
  "#98F5E1", // aquamarine
  "#B9FBC0"  // celadon
];


let colorIndex = 0;

letters.forEach(letter => {
  letter.addEventListener("mouseenter", () => {
    const color = palette[colorIndex];
    colorIndex = (colorIndex + 1) % palette.length;

    letter.style.color = color;

    // Restart animation
    letter.classList.remove("active");
    void letter.offsetWidth;
    letter.classList.add("active");

    setTimeout(() => {
      letter.classList.remove("active");
      letter.style.color = "#7c3aed";
    }, 2800);
  });
});

const victoryBtn = document.getElementById('victory-btn');
const tableHeaders = document.querySelectorAll('.timetable th:not(.break-col)');

victoryBtn.addEventListener('change', () => {
  if (victoryBtn.checked) {
    // APPLY: Attended all
    tableHeaders.forEach(header => {
      header.classList.remove('state-red', 'state-pink');
      header.classList.add('state-green');
    });
  } else {
    // UNDO: Reset everything
    tableHeaders.forEach(header => {
      header.classList.remove(
        'state-green',
        'state-red',
        'state-pink',
        'attended'
      );
    });
  }
});


let selectedColor = 'green'; // Default

// 1. Handle Palette Selection
const tools = document.querySelectorAll('.color-tool');
tools.forEach(tool => {
  tool.addEventListener('click', () => {
    // UI Update
    tools.forEach(t => t.classList.remove('active'));
    tool.classList.add('active');
    
    // Set Logic
    selectedColor = tool.getAttribute('data-color');
  });
});

// 2. Handle Table "Painting"
const headers = document.querySelectorAll('.timetable th:not(.break-col)');
headers.forEach(header => {
  header.addEventListener('click', () => {
    // Remove old states
    header.classList.remove('state-green', 'state-red', 'state-pink');
    
    // Apply new state
    header.classList.add(`state-${selectedColor}`);
    
    // Optional: Add a subtle click animation
    header.style.transform = 'scale(0.95)';
    setTimeout(() => header.style.transform = 'scale(1)', 100);
  });
});

const dateInput = document.getElementById('date');
const dayTag = document.querySelector('.day-tag');

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// Update day when date changes
dateInput.addEventListener('change', () => {
  const selectedDate = new Date(dateInput.value);

  if (!isNaN(selectedDate)) {
    const dayName = days[selectedDate.getDay()];
    dayTag.textContent = dayName;
  }
});

// 🔁 Set correct day on page load (important)
window.addEventListener('load', () => {
  if (dateInput.value) {
    const today = new Date(dateInput.value);
    dayTag.textContent = days[today.getDay()];
  }
});

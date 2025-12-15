function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatTime(d) {
  let h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())} ${ampm}`;
}

function formatDate(d) {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildMiniCalendar(container, titleEl, now) {
  const year = now.getFullYear();
  const month = now.getMonth();

  const monthName = now.toLocaleDateString(undefined, { month: "long" });
  titleEl.textContent = `${monthName} ${year}`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = firstDay.getDay(); // 0=Sun..6=Sat
  const daysInMonth = lastDay.getDate();

  const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  let html = `<div class="mini-cal-grid">`;
  weekdayLabels.forEach(w => {
    html += `<div class="mini-cal-head">${w}</div>`;
  });

  // blanks before the 1st
  for (let i = 0; i < startWeekday; i++) {
    html += `<div class="mini-cal-cell mini-cal-empty"></div>`;
  }

  const todayY = now.getFullYear();
  const todayM = now.getMonth();
  const todayD = now.getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = (year === todayY && month === todayM && day === todayD);
    html += `<div class="mini-cal-cell ${isToday ? "mini-cal-today" : ""}">${day}</div>`;
  }

  html += `</div>`;
  container.innerHTML = html;
}

function initLiveOps() {
  const timeEl = document.getElementById("live-time");
  const dateEl = document.getElementById("live-date");
  const calEl = document.getElementById("mini-cal");
  const calTitleEl = document.getElementById("mini-cal-title");

  if (!timeEl || !dateEl || !calEl || !calTitleEl) return;

  const tick = () => {
    const now = new Date();
    timeEl.textContent = formatTime(now);
    dateEl.textContent = formatDate(now);
  };

  // calendar updates once on load
  buildMiniCalendar(calEl, calTitleEl, new Date());

  tick();
  setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", initLiveOps);


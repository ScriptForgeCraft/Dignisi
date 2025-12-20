import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const canvas = document.getElementById("salesChart");
const ctx = canvas.getContext("2d");
let chartInstance = null;

const values = [
  12049, 7930, 15301, 10879, 11049, 13912, 14967, 16116, 12099, 15093, 12715,
  13021, 10933, 12795, 12823, 14008, 13131, 13824, 14404, 16427, 12484, 14346,
  15164, 0,
];

const min = Math.min(...values.filter((v) => v > 0));
const max = Math.max(...values);

function getColor(value) {
  if (value === 0) return "rgba(190,160,110,0.2)";
  const t = (value - min) / (max - min);
  const base = { r: 190, g: 160, b: 110 };
  const r = base.r + (255 - base.r) * (1 - t);
  const g = base.g + (255 - base.g) * (1 - t);
  const b = base.b + (255 - base.b) * (1 - t);
  return `rgb(${r}, ${g}, ${b})`;
}

const colors = values.map((v) => getColor(v));

const yearSeparators = [4, 8, 12, 16, 20];

const verticalLinesPlugin = {
  id: "verticalLines",
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    ctx.save();
    ctx.strokeStyle = "#ffffff4b";
    ctx.lineWidth = 1;

    const bars = chart.getDatasetMeta(0).data;

    yearSeparators.forEach((index) => {
      if (!bars[index] || !bars[index - 1]) return;
      const prevX = bars[index - 1].x;
      const nextX = bars[index].x;
      const x = prevX + (nextX - prevX) / 2;

      ctx.beginPath();
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.stroke();
    });

    ctx.restore();
  },
};

function createChart() {
  if (chartInstance) return;

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Q1",
        "Q2",
        "Q3",
        "Q4",
        "Q1",
        "Q2",
        "Q3",
        "Q4",
        "Q1",
        "Q2",
        "Q3",
        "Q4",
        "Q1",
        "Q2",
        "Q3",
        "Q4",
        "Q1",
        "Q2",
        "Q3",
        "Q4",
        "Q1",
        "Q2",
        "Q3",
        "Q4",
      ],
      datasets: [
        {
          label: "Transactions",
          data: values,
          backgroundColor: colors,
          borderRadius: 3,
          maxBarThickness: 20,
        },
      ],
    },

    plugins: [ChartDataLabels, verticalLinesPlugin],

    options: {
      responsive: true,
      maintainAspectRatio: false,

      animation: {
        duration: 2400,
        easing: "easeOutCubic",
      },

      plugins: {
        legend: { display: false },

        tooltip: {
          backgroundColor: "rgb(0,0,0)",
          titleColor: "#fff",
          bodyColor: "#fff",
          displayColors: false,
          borderWidth: 0,
          shadowBlur: 0,
          shadowColor: "transparent",

          callbacks: {
            title(ctx) {
              const index = ctx[0].dataIndex;
              const year = 2020 + Math.floor(index / 4);
              const quarter = ["Q1", "Q2", "Q3", "Q4"][index % 4];
              return `${year} ${quarter}`;
            },
            label(ctx) {
              return ctx.raw.toLocaleString() + " Sales";
            },
          },
        },

        datalabels: {
          color: "#fff",
          anchor: "end",
          align: "end",
          font: { size: 9 },
          offset: -4,
          formatter: (value) => value || "",
        },
      },

      scales: {
        x: {
          ticks: { color: "#aaa", font: { size: 12 } },
          grid: { display: false },
        },
        y: {
          ticks: {
            color: "#777",
            callback: (v) => (v >= 1000 ? v / 1000 + "k" : v),
          },
          grid: { color: "#333", lineWidth: 1 },
          border: { display: false },
        },
      },
    },
  });
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight * 0.8 &&
    rect.bottom > window.innerHeight * 0.2
  );
}

function initChartOnce() {
  if (!chartInstance) createChart();
}

if (isInViewport(canvas)) {
  initChartOnce();
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initChartOnce();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(canvas);
}

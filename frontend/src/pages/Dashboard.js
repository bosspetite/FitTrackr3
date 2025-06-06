import React from "react";
import NavBar from "../components/NavBar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const MOTIVATIONAL_QUOTES = [
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "The body achieves what the mind believes.",
  "Sweat is just fat crying.",
  "Train insane or remain the same.",
];

function getRandomQuote() {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Minutes Active",
      data: [30, 45, 60, 50, 40, 70, 30],
      fill: false,
      borderColor: "rgba(13,110,253,1)",
      backgroundColor: "rgba(13,110,253,0.1)",
      tension: 0.4,
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { beginAtZero: true, ticks: { stepSize: 10 } },
  },
};

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <div className="container py-5">
        <div className="mb-4 text-center">
          <h1 className="fw-bold text-primary">Welcome to Your FitTrackr Dashboard</h1>
          <p className="fs-5 fst-italic text-success">
            "{getRandomQuote()}"
          </p>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-primary text-center shadow">
              <div className="card-body">
                <h2 className="fw-bold text-primary">7 🔥</h2>
                <div className="fw-semibold">Day Streak</div>
              </div>
              <div className="card-footer bg-transparent">
                <small>Keep up the momentum!</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-success text-center shadow">
              <div className="card-body">
                <h2 className="fw-bold text-success">42</h2>
                <div className="fw-semibold">Total Workouts</div>
              </div>
              <div className="card-footer bg-transparent">
                <small>Awesome dedication!</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-warning text-center shadow">
              <div className="card-body">
                <h2 className="fw-bold text-warning">5</h2>
                <div className="fw-semibold">Goals Achieved</div>
              </div>
              <div className="card-footer bg-transparent">
                <small>You're smashing it!</small>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Your Weekly Activity</h5>
              <Line data={data} options={options} height={80} />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Recent Activities</h5>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>🏃‍♂️ Running</span><span>30 min</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>🚴‍♀️ Cycling</span><span>45 min</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>🏋️‍♂️ Gym</span><span>60 min</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Current Goals</h5>
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className="fw-bold">Run 20km this week</span>
                    <div className="progress mt-2">
                      <div className="progress-bar bg-success" role="progressbar" style={{width: "75%"}}>75%</div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Bike 40km this month</span>
                    <div className="progress mt-2">
                      <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}}>50%</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
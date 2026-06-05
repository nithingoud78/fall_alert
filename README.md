<p align="center">
  <img src="docs/Banner/Banner.png" alt="FallAlert Banner" width="100%">
</p>

<h1 align="center">FallAlert</h1>

<p align="center">
  Intelligent Wearable Fall Detection and Emergency Alert System
</p>

<p align="center">
  ESP32 • MPU6050 • IoT • Machine Learning • React • MongoDB
</p>

---

# Overview

FallAlert is an intelligent wearable safety system designed to detect fall incidents in real time and immediately notify caregivers or monitoring systems.

The device continuously monitors body motion using an MPU6050 accelerometer and gyroscope connected to an ESP32 microcontroller. By analyzing acceleration magnitude and sudden movement variations, FallAlert can identify potential fall events and automatically trigger emergency actions.

Once a fall is detected, the system:

* Activates a local buzzer alert
* Sends cloud-based emergency notifications
* Stores incident information in MongoDB
* Updates a React monitoring dashboard
* Sends sensor data to a Machine Learning API for further analysis

The primary objective of the project is to reduce emergency response time and improve safety for elderly individuals, patients, and other vulnerable users.

---

# Features

✅ Real-Time Fall Detection

✅ Motion Analysis using MPU6050

✅ ESP32 Edge Processing

✅ Emergency Cloud Alerts

✅ Machine Learning Integration

✅ MongoDB Event Storage

✅ React Monitoring Dashboard

✅ Local Buzzer Alarm

✅ REST API Communication

✅ Expandable IoT Architecture

---

# System Architecture

<p align="center">
  <img src="docs/Architecture/System Architecture.png" width="900">
</p>

---

# Working Principle

## Motion Data Acquisition

The MPU6050 continuously captures accelerometer and gyroscope readings.

Collected sensor values:

* Ax
* Ay
* Az
* Gx
* Gy
* Gz

---

## Acceleration Magnitude Calculation

The ESP32 calculates motion intensity using:

Magnitude = √(Ax² + Ay² + Az²)

This provides a single value representing overall body movement.

---

## Motion Change Detection

The system compares current magnitude with the previous reading.

Difference = Current Magnitude − Previous Magnitude

A potential fall is detected when:

* Magnitude > 2.3
* Difference > 0.4
* Cooldown period > 5 seconds

These thresholds reduce false positives generated during normal activities.

---

## Fall Event Response

When a fall is detected:

1. Buzzer activates
2. Cloud alert is transmitted
3. Sensor data is sent to the Machine Learning API
4. Event is stored in MongoDB
5. Dashboard updates in real time

---

# Detection Workflow

<p align="center">
  <img src="docs/diagrams/workflow.png" width="800">
</p>

---

# Hardware Components

| Component       | Purpose                    |
| --------------- | -------------------------- |
| ESP32 Dev Board | Main Controller            |
| MPU6050         | Accelerometer & Gyroscope  |
| SIM800 / SIM900 | GSM Communication          |
| Buzzer          | Local Alert                |
| Li-ion Battery  | Portable Power             |
| NEO-6M GPS      | Optional Location Tracking |

---

# Technology Stack

## Embedded Systems

* ESP32
* Arduino Framework
* C++

## Machine Learning

* Python
* TensorFlow Lite
* Scikit-learn

## Backend

* Node.js
* Express.js
* MongoDB

## Frontend

* React
* Axios
* Socket.IO

---

# Project Structure

```text
Fall Detection System
│
├── backend/
├── frontend/
├── esp32/
├── machine-learning/
├── docs/
│
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
└── .gitignore
```

---

# Dashboard Preview

## Main Dashboard

![Dashboard](docs/screenshots/Dashboard Home.png)

---

## Alert Monitoring

![Alerts](docs/screenshots/Alerts Page.png)

---

## Fall History

![Device Status](docs/screenshots/Fall History.png)

---

## Circuit Image

![Circuit](Docs\Diagrams\Circuit image.png)

---

## Data Flow 

![Circuit](Docs\Diagrams\Dataflow.png)

---


# Installation

## Backend

```bash
cd backend
npm install
npm start
```

## Frontend

```bash
cd frontend
npm install
npm start
```

## ESP32 Firmware

1. Install Arduino IDE
2. Install ESP32 Board Package
3. Install MPU6050 Library
4. Configure Wi-Fi Credentials
5. Upload Firmware

---

# Applications

* Elderly Care
* Hospitals
* Rehabilitation Centers
* Smart Healthcare
* Personal Safety Monitoring
* IoT Healthcare Solutions

---

# Future Enhancements

* Live GPS Tracking
* SMS Notifications
* WhatsApp Alerts
* Mobile Application
* Battery Monitoring
* Multi-Device Management
* AI Activity Recognition

---

# Results

The system successfully detects high-impact fall events using onboard motion analysis and cloud-assisted processing.

The architecture demonstrates how embedded systems, IoT communication, cloud services, and machine learning can be integrated into a practical healthcare monitoring solution.

---

# Author

## K Nithin KUMAR Goud

Bachelor of Engineering

Embedded Systems • IoT • Machine Learning

---

# License

This project is licensed under the MIT License.

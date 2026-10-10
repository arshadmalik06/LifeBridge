# LifeBridge Local Setup & Development Guide

## Prerequisites
1. **JDK 21** installed and configured.
2. **Android Studio** (Koala / Ladybug or newer) or Android SDK with platform 34 installed for running the Android app on an emulator/device.

## Running the Backend Locally
From the project root:
```bash
cd backend
# On Windows PowerShell
.\gradlew.bat run

# On Linux / macOS
./gradlew run
```
The server will start on `http://0.0.0.0:8080`.
Verify in your browser or with curl:
```bash
curl http://localhost:8080/api/v1/health
```

## Running Backend Automated Tests
```bash
cd backend
.\gradlew.bat test
```

## Running the Android App Locally
1. Open the project in Android Studio by selecting the `android-app` folder.
2. Allow Gradle to sync.
3. Start an Android Virtual Device (AVD).
4. Run the app (`Shift + F10`).
5. In the app, click **"Check backend connection"**.
   - For an **Android Emulator**, the app connects to `http://10.0.2.2:8080/api/v1/health` by default.
   - For a **Physical Android Device** connected to the same Wi-Fi network, enter your computer's local LAN IP (e.g., `http://192.168.1.50:8080/api/v1/health`).

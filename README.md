# LifeBridge — The AI Life-Admin Agent

> **Turn confusing paperwork into clear, verified, actionable steps in a language the user understands.**

LifeBridge is a full-stack, mobile-first life-administration platform built for a Kotlin-focused ecosystem. It ingests complex notices, circulars, and bills, explains them simply, and turns them into scheduled tasks and verified actions.

---

## Repository Structure

```
shipathon/
├── android-app/          # Native Android application (Kotlin + Jetpack Compose)
│   ├── app/              # UI, ViewModels, Themes, Ktor Client
│   ├── gradle/           # Version catalog & Gradle wrapper
│   └── gradlew.bat       # Android build script
├── backend/              # Hosted backend (Kotlin + Ktor 3.x)
│   ├── src/main/kotlin/  # Ktor routes, health endpoints, models
│   ├── src/test/kotlin/  # Automated integration & health tests
│   └── gradlew.bat       # Backend build script
├── docs/                 # Architecture & setup documentation
│   ├── architecture.md
│   └── setup.md
├── fixtures/             # Fictional sample documents for testing
│   └── sample_scholarship_notice.txt
├── docker-compose.yml    # Development PostgreSQL service (Stage 3+)
└── README.md             # This document
```

---

## Stage 1 Foundation Status

### 1. Backend (`backend/`)
- **Technology:** Kotlin 2.0.21, Ktor 3.0.0 (Netty engine), Logback, JUnit 5.
- **Endpoints:**
  - `GET /api/v1/health` — returns service name, version, status, and ISO timestamp.
- **Verification:** Tested locally and verified via standalone integration tests (`HealthRouteTest`, `ConnectivityTest`) without requiring Docker, external databases, or AI credentials.

#### Running Backend Locally
```bash
cd backend
.\gradlew.bat run
```
By default, the server starts on `http://0.0.0.0:8080`.
Verify:
```bash
curl http://localhost:8080/api/v1/health
```

#### Running Backend Tests
```bash
cd backend
.\gradlew.bat test
```

---

### 2. Android App (`android-app/`)
- **Technology:** Kotlin 2.0.21, Jetpack Compose (Material 3), ViewModel, StateFlow, Ktor Client 3.0.0.
- **Initial Flow:** Connection check screen with LifeBridge branding, status cards, loading states, and customizable backend endpoint.
- **Network Security:** Development-scoped cleartext traffic configuration allowing `10.0.2.2`, `127.0.0.1`, and `localhost`, while keeping production traffic strictly HTTPS-only.

#### Running on Android Studio
1. Open Android Studio and open `shipathon/android-app`.
2. Allow Gradle to sync.
3. Start an Android Virtual Device (AVD).
4. Run the app (`Shift + F10`).
5. In the app, tap **Check Backend Connection**.
   - **Emulator:** `http://10.0.2.2:8080/api/v1/health` connects directly to the host backend.
   - **Physical Device:** Update the URL to your local Wi-Fi IP (e.g., `http://192.168.1.X:8080/api/v1/health`).

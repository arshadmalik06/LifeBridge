# LifeBridge Architecture — Stage 1 Foundation

## System Overview
LifeBridge is an AI-powered life-administration agent that turns complex paperwork into clear, actionable, verified tasks.

In Stage 1, the foundation is established with:
1. **Monorepo Architecture**:
   - `android-app/`: Native Android application built with Kotlin, Jetpack Compose, Material 3, ViewModel, and Ktor HTTP Client.
   - `backend/`: Scalable server application built with Kotlin and Ktor (Netty engine).
2. **Predictable Health Check Protocol**:
   - `GET /api/v1/health` provides an unambiguous JSON status check (`healthy`, version, ISO timestamp, service name).
3. **Android Connection Verification**:
   - A reactive UI in Jetpack Compose testing real HTTP connectivity between the mobile client and the backend server.
   - Clean handling of local network addresses (`10.0.2.2` for emulator, local IP for physical devices).
4. **Environment-Isolated Foundation**:
   - No external database (PostgreSQL), AI credentials, or Docker containers are required to run and test Stage 1.

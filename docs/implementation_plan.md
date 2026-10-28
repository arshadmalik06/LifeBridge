# LifeBridge — Full Implementation Roadmap

This implementation roadmap transitions LifeBridge from a Stage 1 foundation (health checks & interactive web prototype) into a fully functional, end-to-end AI document intelligence & life-admin system.

---

## 🏗️ Architecture & Component Flow

```
[ Android Client / Jetpack Compose ]
       │
       ▼ (Document capture / PDF pick / Voice query)
[ Ktor Backend (Kotlin 2.0 + Netty) ]
       │
       ├── Document Store (PostgreSQL / Exposed / Local Files)
       ├── AI Processing Engine (Gemini 1.5 Pro / Flash)
       │     ├── 1. Structured Data Extractor (JSON Schema)
       │     ├── 2. Deadline & Action Checklist Generator
       │     └── 3. Multilingual Vernacular Explainer (Hindi/Marathi/etc.)
       └── Notification & Sync Service (Calendar Sync / Alarms)
```

---

## Phase 1: Backend Domain Models & AI Document Extraction (Ktor) [COMPLETED]

### 1.1 Core Domain Models (`backend/src/main/kotlin/com/lifebridge/models/`) [DONE]
- `DocumentDetail`: ID, title, originalText, category (`EDUCATION`, `TAX`, `HEALTHCARE`, etc.), uploadedAt, deadlines.
- `ActionItem`: ID, documentId, stepNumber, title, description, requiredDocument, dueDate, isCompleted, externalUrl.
- `MultilingualSummary`: summaryText, language (`en`, `hi`, `mr`), keyPoints, warnings.

### 1.2 Document Intelligence Engine (`backend/src/main/kotlin/com/lifebridge/service/`) [DONE]
- Implemented `DocumentAnalysisService` with structured deadline parser, authority extractor, category classifier, and contextual conversational Q&A engine.
- Implemented `DocumentRepository` pre-seeded with test circular fixtures.

### 1.3 REST Endpoints (`backend/src/main/kotlin/com/lifebridge/routes/`) [DONE]
- `GET /api/v1/documents`: List user's processed documents.
- `GET /api/v1/documents/{id}`: Full document breakdown + action steps + multilingual summaries.
- `POST /api/v1/documents/analyze`: Analyze raw document text into structured tasks and summaries.
- `POST /api/v1/documents/{id}/chat`: Contextual Q&A on the document ("When is the deadline?", "What proofs are needed?").
- `PATCH /api/v1/documents/{id}/tasks/{taskId}/toggle`: Check off checklist tasks.
- **Verification**: Fully covered and verified with automated integration tests (`DocumentRoutesTest`, `HealthRouteTest`).

---

## Phase 2: Android App Feature Implementation (Jetpack Compose) [COMPLETED]

### 2.1 Navigation & Screens Architecture (`android-app/`) [DONE]
- Implemented `DocumentApi` and `DocumentDtos` with Ktor Client for Android.
- Built `MainAppViewModel` managing document list, selection, task toggling, language toggle, and chat flow.
- Built complete Jetpack Compose user experience (`LifeBridgeApp.kt`):
  - **Home Dashboard**: Urgent deadlines banner, metric badges, and recent circulars feed.
  - **Document Vault**: Category-based list of documents.
  - **Action Checklist**: Progress indicators and step-by-step checklist.
  - **Document Detail View**: Multilingual AI plain-language summaries (English, Hindi, Marathi) and grounded chat assistant.
- Connected `LifeBridgeApp` into `MainActivity.kt`.

### 2.2 Local Persistence (Offline-First)
- Integrate **Room Database** or **SQLDelight** in `android-app`:
  - Cache documents and tasks locally so users can access their paperwork without internet.
  - Background worker to sync actions when online.

---

## Phase 3: Hardware & System Integration

1. **Android Calendar & Reminders Integration**:
   - Export extracted deadlines directly to `CalendarContract.Events` with reminder alarms before due dates.
2. **CameraX & ML Kit Text Recognition**:
   - On-device text recognition with Google ML Kit Text Recognition for fast offline preview before server AI refinement.

---

## Phase 4: Production Readiness & Testing

1. **Backend Integration Tests**: Unit tests for document parser, Gemini prompt schema validation, and task state management.
2. **Compose UI Tests**: Robot-pattern UI tests for the checklist and vault screens.
3. **Docker Compose Environment**: Deploy backend with PostgreSQL on Railway/Render/Docker.

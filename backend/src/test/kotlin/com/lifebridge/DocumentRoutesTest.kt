package com.lifebridge

import com.lifebridge.models.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.testing.*
import kotlinx.serialization.json.Json
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class DocumentRoutesTest {

    private val json = Json { ignoreUnknownKeys = true }

    @Test
    fun `GET documents returns seeded documents`() = testApplication {
        application {
            module()
        }

        val response = client.get("/api/v1/documents")
        assertEquals(HttpStatusCode.OK, response.status)

        val documents = json.decodeFromString<List<DocumentSummaryCard>>(response.bodyAsText())
        assertTrue(documents.isNotEmpty())
        assertEquals("doc-scholarship-2026", documents.first().id)
        assertEquals(DocumentCategory.EDUCATION, documents.first().category)
    }

    @Test
    fun `GET single document returns full breakdown with summaries and actions`() = testApplication {
        application {
            module()
        }

        val response = client.get("/api/v1/documents/doc-scholarship-2026")
        assertEquals(HttpStatusCode.OK, response.status)

        val doc = json.decodeFromString<DocumentDetail>(response.bodyAsText())
        assertEquals("doc-scholarship-2026", doc.id)
        assertTrue(doc.summaries.any { it.languageCode == "en" })
        assertTrue(doc.summaries.any { it.languageCode == "hi" })
        assertTrue(doc.actions.isNotEmpty())
    }

    @Test
    fun `PATCH toggle task updates completion status`() = testApplication {
        application {
            module()
        }

        val response = client.patch("/api/v1/documents/doc-scholarship-2026/tasks/task-1/toggle") {
            contentType(ContentType.Application.Json)
            setBody("""{"isCompleted": true}""")
        }

        assertEquals(HttpStatusCode.OK, response.status)
        val updated = json.decodeFromString<ActionItem>(response.bodyAsText())
        assertTrue(updated.isCompleted)
    }

    @Test
    fun `POST chat returns contextual answer from notice`() = testApplication {
        application {
            module()
        }

        val response = client.post("/api/v1/documents/doc-scholarship-2026/chat") {
            contentType(ContentType.Application.Json)
            setBody("""{"question": "When is the deadline?", "language": "en"}""")
        }

        assertEquals(HttpStatusCode.OK, response.status)
        val chatResp = json.decodeFromString<ChatQueryResponse>(response.bodyAsText())
        assertNotNull(chatResp.answer)
        assertTrue(chatResp.answer.contains("deadline", ignoreCase = true))
    }
}

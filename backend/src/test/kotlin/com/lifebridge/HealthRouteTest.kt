package com.lifebridge

import com.lifebridge.models.HealthResponse
import io.ktor.client.request.get
import io.ktor.client.statement.bodyAsText
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.contentType
import io.ktor.server.testing.testApplication
import kotlinx.serialization.json.Json
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class HealthRouteTest {

    @Test
    fun `health endpoint returns 200 OK and healthy status`() = testApplication {
        application {
            module()
        }

        val response = client.get("/api/v1/health")

        assertEquals(HttpStatusCode.OK, response.status)
        assertTrue(response.contentType()?.match(ContentType.Application.Json) == true)

        val json = Json { ignoreUnknownKeys = true }
        val health = json.decodeFromString<HealthResponse>(response.bodyAsText())

        assertEquals("healthy", health.status)
        assertEquals("LifeBridge Backend", health.service)
        assertEquals("1.0.0", health.version)
        assertNotNull(health.timestamp)
        assertTrue(health.timestamp.isNotEmpty())
    }

    @Test
    fun `unknown endpoint returns 404 Not Found`() = testApplication {
        application {
            module()
        }

        val response = client.get("/api/v1/non-existent")
        assertEquals(HttpStatusCode.NotFound, response.status)
    }
}

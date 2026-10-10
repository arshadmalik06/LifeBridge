package com.lifebridge

import io.ktor.client.request.get
import io.ktor.http.HttpStatusCode
import io.ktor.server.testing.testApplication
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class ConnectivityTest {

    @Test
    fun `server boots and responds to local connectivity test without external databases or credentials`() = testApplication {
        application {
            module()
        }

        val response = client.get("/api/v1/health")
        assertEquals(HttpStatusCode.OK, response.status)
    }
}

package com.lifebridge.routes

import com.lifebridge.models.HealthResponse
import io.ktor.http.HttpStatusCode
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import java.time.Instant

fun Route.healthRoute() {
    get("/api/v1/health") {
        val env = System.getenv("ENV") ?: System.getenv("ENVIRONMENT") ?: "development"
        val response = HealthResponse(
            status = "healthy",
            service = "LifeBridge Backend",
            version = "1.0.0",
            timestamp = Instant.now().toString(),
            environment = env
        )
        call.respond(HttpStatusCode.OK, response)
    }
}

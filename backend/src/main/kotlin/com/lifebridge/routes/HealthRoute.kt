package com.lifebridge.routes

import com.lifebridge.models.HealthResponse
import com.lifebridge.models.DocumentAnalyzeRequest
import com.lifebridge.models.ChatQueryRequest
import com.lifebridge.models.TaskToggleRequest
import com.lifebridge.service.DocumentAnalysisService
import com.lifebridge.service.DocumentRepository
import io.ktor.http.HttpStatusCode
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.patch
import io.ktor.server.routing.route
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

fun Route.documentRoutes(
    repository: DocumentRepository,
    analysisService: DocumentAnalysisService
) {
    route("/api/v1/documents") {
        get {
            val list = repository.getAllDocuments()
            call.respond(list)
        }

        post("/analyze") {
            val request = call.receive<DocumentAnalyzeRequest>()
            if (request.text.isBlank()) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Document text cannot be empty"))
                return@post
            }
            val analyzed = analysisService.analyzeDocument(request)
            repository.saveDocument(analyzed)
            call.respond(HttpStatusCode.Created, analyzed)
        }

        get("/{id}") {
            val id = call.parameters["id"]
            if (id == null) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Missing id"))
                return@get
            }
            val doc = repository.getDocumentById(id)
            if (doc != null) {
                call.respond(doc)
            } else {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to "Document not found"))
            }
        }

        post("/{id}/chat") {
            val id = call.parameters["id"]
            if (id == null) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Missing id"))
                return@post
            }
            val doc = repository.getDocumentById(id)
            if (doc == null) {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to "Document not found"))
                return@post
            }
            val request = call.receive<ChatQueryRequest>()
            val answer = analysisService.answerQuestion(doc, request.question, request.language)
            call.respond(answer)
        }

        patch("/{id}/tasks/{taskId}/toggle") {
            val id = call.parameters["id"]
            val taskId = call.parameters["taskId"]
            if (id == null || taskId == null) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Missing document or task ID"))
                return@patch
            }
            val request = call.receive<TaskToggleRequest>()
            val updatedTask = repository.toggleTask(id, taskId, request.isCompleted)
            if (updatedTask != null) {
                call.respond(updatedTask)
            } else {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to "Task or document not found"))
            }
        }
    }
}

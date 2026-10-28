package com.lifebridge.android.network

import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.patch
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.statement.HttpResponse
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.contentType
import java.io.IOException

object DocumentApi {

    private fun baseUrl(serverHost: String): String {
        val clean = serverHost.trimEnd('/')
        return if (clean.startsWith("http")) clean else "http://$clean"
    }

    suspend fun getDocuments(serverHost: String): Result<List<DocumentSummaryCardDto>> {
        return runCatching {
            val url = "${baseUrl(serverHost)}/api/v1/documents"
            val response: HttpResponse = HealthApi.client.get(url)
            if (response.status == HttpStatusCode.OK) {
                response.body<List<DocumentSummaryCardDto>>()
            } else {
                throw IOException("Server returned HTTP ${response.status.value}")
            }
        }
    }

    suspend fun getDocumentDetail(serverHost: String, id: String): Result<DocumentDetailDto> {
        return runCatching {
            val url = "${baseUrl(serverHost)}/api/v1/documents/$id"
            val response: HttpResponse = HealthApi.client.get(url)
            if (response.status == HttpStatusCode.OK) {
                response.body<DocumentDetailDto>()
            } else {
                throw IOException("Server returned HTTP ${response.status.value}")
            }
        }
    }

    suspend fun toggleTask(serverHost: String, documentId: String, taskId: String, isCompleted: Boolean): Result<ActionItemDto> {
        return runCatching {
            val url = "${baseUrl(serverHost)}/api/v1/documents/$documentId/tasks/$taskId/toggle"
            val response: HttpResponse = HealthApi.client.patch(url) {
                contentType(ContentType.Application.Json)
                setBody(TaskToggleRequestDto(isCompleted = isCompleted))
            }
            if (response.status == HttpStatusCode.OK) {
                response.body<ActionItemDto>()
            } else {
                throw IOException("Failed to toggle task: HTTP ${response.status.value}")
            }
        }
    }

    suspend fun askDocumentQuestion(serverHost: String, documentId: String, question: String, language: String = "en"): Result<ChatQueryResponseDto> {
        return runCatching {
            val url = "${baseUrl(serverHost)}/api/v1/documents/$documentId/chat"
            val response: HttpResponse = HealthApi.client.post(url) {
                contentType(ContentType.Application.Json)
                setBody(ChatQueryRequestDto(question = question, language = language))
            }
            if (response.status == HttpStatusCode.OK) {
                response.body<ChatQueryResponseDto>()
            } else {
                throw IOException("Chat query failed: HTTP ${response.status.value}")
            }
        }
    }

    suspend fun analyzeDocument(serverHost: String, text: String, language: String = "en"): Result<DocumentDetailDto> {
        return runCatching {
            val url = "${baseUrl(serverHost)}/api/v1/documents/analyze"
            val response: HttpResponse = HealthApi.client.post(url) {
                contentType(ContentType.Application.Json)
                setBody(DocumentAnalyzeRequestDto(text = text, preferredLanguage = language))
            }
            if (response.status == HttpStatusCode.Created || response.status == HttpStatusCode.OK) {
                response.body<DocumentDetailDto>()
            } else {
                throw IOException("Analyze failed: HTTP ${response.status.value}")
            }
        }
    }
}

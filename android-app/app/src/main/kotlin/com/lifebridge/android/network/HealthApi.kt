package com.lifebridge.android.network

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.android.Android
import io.ktor.client.plugins.HttpTimeout
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.get
import io.ktor.client.statement.HttpResponse
import io.ktor.http.HttpStatusCode
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json
import java.io.IOException
import java.net.ConnectException
import java.net.SocketTimeoutException
import java.net.UnknownHostException

object HealthApi {

    val client: HttpClient by lazy {
        HttpClient(Android) {
            install(ContentNegotiation) {
                json(Json {
                    ignoreUnknownKeys = true
                    isLenient = true
                })
            }
            install(HttpTimeout) {
                requestTimeoutMillis = 5000
                connectTimeoutMillis = 5000
                socketTimeoutMillis = 5000
            }
        }
    }

    suspend fun checkHealth(url: String): Result<HealthDto> {
        return runCatching {
            val response: HttpResponse = client.get(url)
            if (response.status == HttpStatusCode.OK) {
                response.body<HealthDto>()
            } else {
                throw IOException("Server returned HTTP ${response.status.value}: ${response.status.description}")
            }
        }.recoverCatching { throwable ->
            when (throwable) {
                is ConnectException -> throw IOException("Cannot connect to server. Ensure the backend is running on port 8080.", throwable)
                is SocketTimeoutException -> throw IOException("Connection timed out after 5 seconds.", throwable)
                is UnknownHostException -> throw IOException("Unable to resolve host: $url", throwable)
                is kotlinx.serialization.SerializationException -> throw IOException("Invalid response format received from server.", throwable)
                else -> throw IOException(throwable.message ?: "An unexpected network error occurred.", throwable)
            }
        }
    }
}

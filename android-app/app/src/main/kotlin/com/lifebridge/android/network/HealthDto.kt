package com.lifebridge.android.network

import kotlinx.serialization.Serializable

@Serializable
data class HealthDto(
    val status: String,
    val service: String,
    val version: String,
    val timestamp: String,
    val environment: String
)

package com.lifebridge.android.network

import kotlinx.serialization.Serializable

@Serializable
enum class DocumentCategory {
    EDUCATION,
    TAX,
    HEALTHCARE,
    UTILITIES,
    GOVERNMENT,
    LEGAL,
    GENERAL
}

@Serializable
enum class UrgencyLevel {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}

@Serializable
data class ActionItemDto(
    val id: String,
    val documentId: String,
    val stepNumber: Int,
    val title: String,
    val description: String,
    val requiredDocument: String? = null,
    val dueDate: String? = null,
    val isCompleted: Boolean = false,
    val externalUrl: String? = null,
    val urgency: UrgencyLevel = UrgencyLevel.MEDIUM
)

@Serializable
data class MultilingualSummaryDto(
    val languageCode: String,
    val languageName: String,
    val summary: String,
    val keyPoints: List<String> = emptyList(),
    val warnings: List<String> = emptyList()
)

@Serializable
data class DocumentDetailDto(
    val id: String,
    val title: String,
    val category: DocumentCategory,
    val issuingAuthority: String,
    val referenceNumber: String? = null,
    val rawText: String,
    val summaries: List<MultilingualSummaryDto>,
    val actions: List<ActionItemDto>,
    val deadlines: List<String> = emptyList(),
    val primaryDeadline: String? = null,
    val urgency: UrgencyLevel = UrgencyLevel.MEDIUM,
    val createdAt: String
)

@Serializable
data class DocumentSummaryCardDto(
    val id: String,
    val title: String,
    val category: DocumentCategory,
    val issuingAuthority: String,
    val primaryDeadline: String? = null,
    val urgency: UrgencyLevel = UrgencyLevel.MEDIUM,
    val totalTasks: Int = 0,
    val completedTasks: Int = 0,
    val createdAt: String
)

@Serializable
data class DocumentAnalyzeRequestDto(
    val text: String,
    val fileName: String? = null,
    val preferredLanguage: String = "en"
)

@Serializable
data class TaskToggleRequestDto(
    val isCompleted: Boolean
)

@Serializable
data class ChatQueryRequestDto(
    val question: String,
    val language: String = "en"
)

@Serializable
data class ChatQueryResponseDto(
    val answer: String,
    val sources: List<String> = emptyList(),
    val confidence: String = "HIGH"
)

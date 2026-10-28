package com.lifebridge.models

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
data class ActionItem(
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
data class MultilingualSummary(
    val languageCode: String, // "en", "hi", "mr", etc.
    val languageName: String,
    val summary: String,
    val keyPoints: List<String> = emptyList(),
    val warnings: List<String> = emptyList()
)

@Serializable
data class DocumentDetail(
    val id: String,
    val title: String,
    val category: DocumentCategory,
    val issuingAuthority: String,
    val referenceNumber: String? = null,
    val rawText: String,
    val summaries: List<MultilingualSummary>,
    val actions: List<ActionItem>,
    val deadlines: List<String> = emptyList(),
    val primaryDeadline: String? = null,
    val urgency: UrgencyLevel = UrgencyLevel.MEDIUM,
    val createdAt: String
)

@Serializable
data class DocumentSummaryCard(
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
data class DocumentAnalyzeRequest(
    val text: String,
    val fileName: String? = null,
    val preferredLanguage: String = "en"
)

@Serializable
data class TaskToggleRequest(
    val isCompleted: Boolean
)

@Serializable
data class ChatQueryRequest(
    val question: String,
    val language: String = "en"
)

@Serializable
data class ChatQueryResponse(
    val answer: String,
    val sources: List<String> = emptyList(),
    val confidence: String = "HIGH"
)

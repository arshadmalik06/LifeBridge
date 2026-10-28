package com.lifebridge.android.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.lifebridge.android.network.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

sealed interface DocumentUiState {
    data object Loading : DocumentUiState
    data class Success(val documents: List<DocumentSummaryCardDto>) : DocumentUiState
    data class Error(val message: String) : DocumentUiState
}

sealed interface DocumentDetailUiState {
    data object Idle : DocumentDetailUiState
    data object Loading : DocumentDetailUiState
    data class Success(val document: DocumentDetailDto) : DocumentDetailUiState
    data class Error(val message: String) : DocumentDetailUiState
}

class MainAppViewModel : ViewModel() {

    private val _serverUrl = MutableStateFlow("http://10.0.2.2:8080")
    val serverUrl: StateFlow<String> = _serverUrl.asStateFlow()

    private val _documentsState = MutableStateFlow<DocumentUiState>(DocumentUiState.Loading)
    val documentsState: StateFlow<DocumentUiState> = _documentsState.asStateFlow()

    private val _selectedDocumentState = MutableStateFlow<DocumentDetailUiState>(DocumentDetailUiState.Idle)
    val selectedDocumentState: StateFlow<DocumentDetailUiState> = _selectedDocumentState.asStateFlow()

    private val _selectedLanguage = MutableStateFlow("en")
    val selectedLanguage: StateFlow<String> = _selectedLanguage.asStateFlow()

    private val _chatMessages = MutableStateFlow<List<Pair<String, Boolean>>>(emptyList()) // Pair<Text, isUser>
    val chatMessages: StateFlow<List<Pair<String, Boolean>>> = _chatMessages.asStateFlow()

    init {
        loadDocuments()
    }

    fun setServerUrl(url: String) {
        _serverUrl.value = url
        loadDocuments()
    }

    fun setLanguage(lang: String) {
        _selectedLanguage.value = lang
    }

    fun loadDocuments() {
        viewModelScope.launch {
            _documentsState.value = DocumentUiState.Loading
            DocumentApi.getDocuments(_serverUrl.value)
                .onSuccess { docs ->
                    _documentsState.value = DocumentUiState.Success(docs)
                }
                .onFailure { err ->
                    _documentsState.value = DocumentUiState.Error(err.message ?: "Failed to connect to backend")
                }
        }
    }

    fun selectDocument(id: String) {
        viewModelScope.launch {
            _selectedDocumentState.value = DocumentDetailUiState.Loading
            DocumentApi.getDocumentDetail(_serverUrl.value, id)
                .onSuccess { doc ->
                    _selectedDocumentState.value = DocumentDetailUiState.Success(doc)
                    _chatMessages.value = listOf(
                        "Hello! I am your LifeBridge AI assistant. Ask me anything about this notice, such as deadlines, eligibility, or required forms." to false
                    )
                }
                .onFailure { err ->
                    _selectedDocumentState.value = DocumentDetailUiState.Error(err.message ?: "Failed to load document")
                }
        }
    }

    fun clearSelectedDocument() {
        _selectedDocumentState.value = DocumentDetailUiState.Idle
    }

    fun toggleTask(documentId: String, taskId: String, isCompleted: Boolean) {
        viewModelScope.launch {
            DocumentApi.toggleTask(_serverUrl.value, documentId, taskId, isCompleted)
                .onSuccess {
                    // Refresh detail
                    selectDocument(documentId)
                }
        }
    }

    fun sendChatMessage(documentId: String, question: String) {
        if (question.isBlank()) return
        val current = _chatMessages.value.toMutableList()
        current.add(question to true)
        _chatMessages.value = current

        viewModelScope.launch {
            DocumentApi.askDocumentQuestion(_serverUrl.value, documentId, question, _selectedLanguage.value)
                .onSuccess { res ->
                    val updated = _chatMessages.value.toMutableList()
                    updated.add(res.answer to false)
                    _chatMessages.value = updated
                }
                .onFailure { err ->
                    val updated = _chatMessages.value.toMutableList()
                    updated.add("Error: ${err.message ?: "Could not query AI"}" to false)
                    _chatMessages.value = updated
                }
        }
    }
}

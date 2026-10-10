package com.lifebridge.android.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.lifebridge.android.BuildConfig
import com.lifebridge.android.network.HealthApi
import com.lifebridge.android.network.HealthDto
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

sealed interface ConnectionUiState {
    data object Idle : ConnectionUiState
    data object Loading : ConnectionUiState
    data class Success(val health: HealthDto) : ConnectionUiState
    data class Error(val message: String) : ConnectionUiState
}

class ConnectionViewModel : ViewModel() {

    private val _uiState = MutableStateFlow<ConnectionUiState>(ConnectionUiState.Idle)
    val uiState: StateFlow<ConnectionUiState> = _uiState.asStateFlow()

    private val _serverUrl = MutableStateFlow(BuildConfig.DEFAULT_BACKEND_URL)
    val serverUrl: StateFlow<String> = _serverUrl.asStateFlow()

    fun updateServerUrl(url: String) {
        _serverUrl.value = url
    }

    fun checkBackendConnection() {
        viewModelScope.launch {
            _uiState.value = ConnectionUiState.Loading
            val result = HealthApi.checkHealth(_serverUrl.value.trim())
            result.fold(
                onSuccess = { health ->
                    _uiState.value = ConnectionUiState.Success(health)
                },
                onFailure = { error ->
                    _uiState.value = ConnectionUiState.Error(
                        error.message ?: "Failed to connect to backend service"
                    )
                }
            )
        }
    }
}

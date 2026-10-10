package com.lifebridge.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import com.lifebridge.android.theme.LifeBridgeTheme
import com.lifebridge.android.ui.ConnectionCheckScreen
import com.lifebridge.android.ui.ConnectionViewModel

class MainActivity : ComponentActivity() {

    private val connectionViewModel: ConnectionViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            LifeBridgeTheme {
                ConnectionCheckScreen(viewModel = connectionViewModel)
            }
        }
    }
}

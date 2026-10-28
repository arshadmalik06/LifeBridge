package com.lifebridge.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import com.lifebridge.android.theme.LifeBridgeTheme
import com.lifebridge.android.ui.LifeBridgeApp
import com.lifebridge.android.ui.MainAppViewModel

class MainActivity : ComponentActivity() {

    private val mainAppViewModel: MainAppViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            LifeBridgeTheme {
                LifeBridgeApp(viewModel = mainAppViewModel)
            }
        }
    }
}

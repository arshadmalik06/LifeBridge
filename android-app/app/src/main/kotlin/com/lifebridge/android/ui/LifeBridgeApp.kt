package com.lifebridge.android.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.lifebridge.android.network.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LifeBridgeApp(
    viewModel: MainAppViewModel,
    modifier: Modifier = Modifier
) {
    val documentsState by viewModel.documentsState.collectAsState()
    val detailState by viewModel.selectedDocumentState.collectAsState()
    var selectedTab by remember { mutableIntStateOf(0) } // 0: Home, 1: Vault, 2: Tasks, 3: AI Ask

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.size(32.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Icon(
                                    Icons.Default.Description,
                                    contentDescription = null,
                                    tint = Color.White,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Text(
                            "LifeBridge",
                            fontWeight = FontWeight.Bold,
                            fontSize = 20.sp
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Surface(
                            color = MaterialTheme.colorScheme.primaryContainer,
                            shape = RoundedCornerShape(4.dp)
                        ) {
                            Text(
                                "AI OS",
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onPrimaryContainer,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                    }
                },
                actions = {
                    IconButton(onClick = { viewModel.loadDocuments() }) {
                        Icon(Icons.Default.Refresh, contentDescription = "Refresh")
                    }
                }
            )
        },
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    selected = selectedTab == 0,
                    onClick = {
                        selectedTab = 0
                        viewModel.clearSelectedDocument()
                    },
                    icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                    label = { Text("Home") }
                )
                NavigationBarItem(
                    selected = selectedTab == 1,
                    onClick = {
                        selectedTab = 1
                        viewModel.clearSelectedDocument()
                    },
                    icon = { Icon(Icons.Default.Folder, contentDescription = "Vault") },
                    label = { Text("Vault") }
                )
                NavigationBarItem(
                    selected = selectedTab == 2,
                    onClick = {
                        selectedTab = 2
                    },
                    icon = { Icon(Icons.Default.Checklist, contentDescription = "Tasks") },
                    label = { Text("Tasks") }
                )
            }
        },
        modifier = modifier
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (val currentDetail = detailState) {
                is DocumentDetailUiState.Success -> {
                    DocumentDetailScreen(
                        document = currentDetail.document,
                        viewModel = viewModel,
                        onBack = { viewModel.clearSelectedDocument() }
                    )
                }
                is DocumentDetailUiState.Loading -> {
                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator()
                    }
                }
                else -> {
                    when (selectedTab) {
                        0 -> HomeScreen(
                            state = documentsState,
                            onSelectDoc = { viewModel.selectDocument(it) },
                            onRefresh = { viewModel.loadDocuments() }
                        )
                        1 -> VaultScreen(
                            state = documentsState,
                            onSelectDoc = { viewModel.selectDocument(it) }
                        )
                        2 -> TasksScreen(
                            state = documentsState,
                            onSelectDoc = { viewModel.selectDocument(it) }
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun HomeScreen(
    state: DocumentUiState,
    onSelectDoc: (String) -> Unit,
    onRefresh: () -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(vertical = 16.dp)
    ) {
        // Urgent Deadline Card
        item {
            Card(
                colors = CardDefaults.cardColors(
                    containerColor = Color(0xFFFEF3C7)
                ),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(CircleShape)
                            .background(Color(0xFFF59E0B)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.Default.Warning,
                            contentDescription = null,
                            tint = Color.White
                        )
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            "Upcoming Deadlines This Week",
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF92400E),
                            fontSize = 15.sp
                        )
                        Text(
                            "State Merit Scholarship Annexure 4B & Tehsildar Income Certificate",
                            fontSize = 12.sp,
                            color = Color(0xFFB45309)
                        )
                    }
                }
            }
        }

        // Stats Row
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                StatCard(
                    title = "Documents",
                    value = "1",
                    icon = Icons.Default.Description,
                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                    modifier = Modifier.weight(1f)
                )
                StatCard(
                    title = "Pending Tasks",
                    value = "3",
                    icon = Icons.Default.AssignmentLate,
                    containerColor = MaterialTheme.colorScheme.secondaryContainer,
                    modifier = Modifier.weight(1f)
                )
                StatCard(
                    title = "Urgent",
                    value = "2",
                    icon = Icons.Default.Timer,
                    containerColor = MaterialTheme.colorScheme.errorContainer,
                    modifier = Modifier.weight(1f)
                )
            }
        }

        // Section Title
        item {
            Text(
                "Active Circulars & Documents",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold
            )
        }

        when (state) {
            is DocumentUiState.Loading -> {
                item {
                    Box(modifier = Modifier.fillMaxWidth().padding(32.dp), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator()
                    }
                }
            }
            is DocumentUiState.Error -> {
                item {
                    Card(
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Text("Connection Notice", fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onErrorContainer)
                            Text(state.message, fontSize = 13.sp, color = MaterialTheme.colorScheme.onErrorContainer)
                            Spacer(modifier = Modifier.height(8.dp))
                            Button(onClick = onRefresh) { Text("Retry") }
                        }
                    }
                }
            }
            is DocumentUiState.Success -> {
                items(state.documents) { doc ->
                    DocumentCardItem(doc = doc, onClick = { onSelectDoc(doc.id) })
                }
            }
        }
    }
}

@Composable
fun StatCard(
    title: String,
    value: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    containerColor: Color,
    modifier: Modifier = Modifier
) {
    Card(
        colors = CardDefaults.cardColors(containerColor = containerColor),
        shape = RoundedCornerShape(12.dp),
        modifier = modifier
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Icon(icon, contentDescription = null, modifier = Modifier.size(20.dp))
            Spacer(modifier = Modifier.height(8.dp))
            Text(value, fontSize = 20.sp, fontWeight = FontWeight.Bold)
            Text(title, fontSize = 11.sp, maxLines = 1)
        }
    }
}

@Composable
fun DocumentCardItem(
    doc: DocumentSummaryCardDto,
    onClick: () -> Unit
) {
    Card(
        onClick = onClick,
        shape = RoundedCornerShape(14.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Surface(
                    color = MaterialTheme.colorScheme.primaryContainer,
                    shape = RoundedCornerShape(6.dp)
                ) {
                    Text(
                        doc.category.name,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                    )
                }
                Surface(
                    color = Color(0xFFFFEDD5),
                    shape = RoundedCornerShape(6.dp)
                ) {
                    Text(
                        doc.urgency.name,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFFC2410C),
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(10.dp))
            Text(doc.title, fontWeight = FontWeight.SemiBold, fontSize = 16.sp)
            Spacer(modifier = Modifier.height(4.dp))
            Text(doc.issuingAuthority, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)

            Spacer(modifier = Modifier.height(12.dp))
            HorizontalDivider()
            Spacer(modifier = Modifier.height(8.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        Icons.Default.Event,
                        contentDescription = null,
                        modifier = Modifier.size(14.dp),
                        tint = MaterialTheme.colorScheme.error
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        doc.primaryDeadline?.take(16) ?: "No deadline",
                        fontSize = 11.sp,
                        color = MaterialTheme.colorScheme.error,
                        fontWeight = FontWeight.Medium
                    )
                }

                Text(
                    "${doc.completedTasks}/${doc.totalTasks} Done",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
        }
    }
}

@Composable
fun VaultScreen(
    state: DocumentUiState,
    onSelectDoc: (String) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Document Vault", fontSize = 22.sp, fontWeight = FontWeight.Bold)
        Text("All processed circulars, bills, and tax notices", fontSize = 13.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Spacer(modifier = Modifier.height(16.dp))

        when (state) {
            is DocumentUiState.Success -> {
                LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    items(state.documents) { doc ->
                        DocumentCardItem(doc = doc, onClick = { onSelectDoc(doc.id) })
                    }
                }
            }
            else -> {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator()
                }
            }
        }
    }
}

@Composable
fun TasksScreen(
    state: DocumentUiState,
    onSelectDoc: (String) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Action Checklist", fontSize = 22.sp, fontWeight = FontWeight.Bold)
        Text("Pending steps required to avoid penalties or loss of benefits", fontSize = 13.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Spacer(modifier = Modifier.height(16.dp))

        when (state) {
            is DocumentUiState.Success -> {
                LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    items(state.documents) { doc ->
                        Card(
                            onClick = { onSelectDoc(doc.id) },
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Text(doc.title, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                                Spacer(modifier = Modifier.height(6.dp))
                                Text("Deadline: ${doc.primaryDeadline}", fontSize = 12.sp, color = MaterialTheme.colorScheme.error)
                                Spacer(modifier = Modifier.height(8.dp))
                                LinearProgressIndicator(
                                    progress = { if (doc.totalTasks > 0) doc.completedTasks.toFloat() / doc.totalTasks else 0f },
                                    modifier = Modifier.fillMaxWidth().height(6.dp).clip(RoundedCornerShape(3.dp))
                                )
                            }
                        }
                    }
                }
            }
            else -> {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator()
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DocumentDetailScreen(
    document: DocumentDetailDto,
    viewModel: MainAppViewModel,
    onBack: () -> Unit
) {
    val selectedLanguage by viewModel.selectedLanguage.collectAsState()
    val chatMessages by viewModel.chatMessages.collectAsState()
    var questionInput by remember { mutableStateOf("") }

    val activeSummary = document.summaries.firstOrNull { it.languageCode == selectedLanguage }
        ?: document.summaries.firstOrNull()

    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        // Top Header
        Surface(
            tonalElevation = 2.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 8.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = onBack) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                }
                Text(
                    "Document Analysis",
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    modifier = Modifier.weight(1f)
                )

                // Language buttons
                Row {
                    listOf("en" to "EN", "hi" to "हिन्दी", "mr" to "मराठी").forEach { (code, label) ->
                        FilterChip(
                            selected = selectedLanguage == code,
                            onClick = { viewModel.setLanguage(code) },
                            label = { Text(label, fontSize = 11.sp) },
                            modifier = Modifier.padding(horizontal = 2.dp)
                        )
                    }
                }
            }
        }

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .weight(1f)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
            contentPadding = PaddingValues(vertical = 16.dp)
        ) {
            // Header Card
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            document.title,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            document.issuingAuthority,
                            fontSize = 13.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        if (document.referenceNumber != null) {
                            Text(
                                "Ref: ${document.referenceNumber}",
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.primary
                            )
                        }
                    }
                }
            }

            // AI Plain Language Summary
            item {
                Card(
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(14.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.AutoAwesome, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("AI Plain-Language Summary", fontWeight = FontWeight.Bold)
                        }
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(
                            activeSummary?.summary ?: "No summary available in selected language.",
                            fontSize = 14.sp,
                            lineHeight = 20.sp
                        )

                        if (!activeSummary?.keyPoints.isNullOrEmpty()) {
                            Spacer(modifier = Modifier.height(12.dp))
                            Text("Key Highlights:", fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                            activeSummary?.keyPoints?.forEach { pt ->
                                Text("• $pt", fontSize = 13.sp, modifier = Modifier.padding(vertical = 2.dp))
                            }
                        }
                    }
                }
            }

            // Action Checklist
            item {
                Text(
                    "Step-by-Step Action Plan",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            items(document.actions) { action ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        verticalAlignment = Alignment.Top
                    ) {
                        Checkbox(
                            checked = action.isCompleted,
                            onCheckedChange = { checked ->
                                viewModel.toggleTask(document.id, action.id, checked)
                            }
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                "Step ${action.stepNumber}: ${action.title}",
                                fontWeight = FontWeight.SemiBold,
                                fontSize = 14.sp
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                action.description,
                                fontSize = 12.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                            if (action.dueDate != null) {
                                Spacer(modifier = Modifier.height(4.dp))
                                Text(
                                    "Due: ${action.dueDate.take(16)}",
                                    fontSize = 11.sp,
                                    color = MaterialTheme.colorScheme.error,
                                    fontWeight = FontWeight.Medium
                                )
                            }
                        }
                    }
                }
            }

            // Grounded Q&A Assistant Header
            item {
                Text("Ask Questions About This Notice", fontSize = 16.sp, fontWeight = FontWeight.Bold)
            }

            items(chatMessages) { (text, isUser) ->
                Box(
                    modifier = Modifier.fillMaxWidth(),
                    contentAlignment = if (isUser) Alignment.CenterEnd else Alignment.CenterStart
                ) {
                    Surface(
                        color = if (isUser) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surfaceVariant,
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.widthIn(max = 280.dp)
                    ) {
                        Text(
                            text,
                            color = if (isUser) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurfaceVariant,
                            fontSize = 13.sp,
                            modifier = Modifier.padding(10.dp)
                        )
                    }
                }
            }
        }

        // Chat Input Bar
        Surface(
            tonalElevation = 3.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                TextField(
                    value = questionInput,
                    onValueChange = { questionInput = it },
                    placeholder = { Text("Ask about deadlines, proofs...", fontSize = 13.sp) },
                    modifier = Modifier.weight(1f),
                    colors = TextFieldDefaults.colors(
                        unfocusedContainerColor = Color.Transparent,
                        focusedContainerColor = Color.Transparent
                    )
                )
                IconButton(
                    onClick = {
                        val q = questionInput.trim()
                        if (q.isNotEmpty()) {
                            viewModel.sendChatMessage(document.id, q)
                            questionInput = ""
                        }
                    }
                ) {
                    Icon(Icons.Default.Send, contentDescription = "Send", tint = MaterialTheme.colorScheme.primary)
                }
            }
        }
    }
}

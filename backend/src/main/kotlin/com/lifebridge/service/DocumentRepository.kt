package com.lifebridge.service

import com.lifebridge.models.*
import java.time.Instant
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

class DocumentRepository {
    private val documents = ConcurrentHashMap<String, DocumentDetail>()

    init {
        // Seed with sample notice from fixtures
        seedSampleNotice()
    }

    fun getAllDocuments(): List<DocumentSummaryCard> {
        return documents.values.map { doc ->
            DocumentSummaryCard(
                id = doc.id,
                title = doc.title,
                category = doc.category,
                issuingAuthority = doc.issuingAuthority,
                primaryDeadline = doc.primaryDeadline,
                urgency = doc.urgency,
                totalTasks = doc.actions.size,
                completedTasks = doc.actions.count { it.isCompleted },
                createdAt = doc.createdAt
            )
        }.sortedByDescending { it.createdAt }
    }

    fun getDocumentById(id: String): DocumentDetail? {
        return documents[id]
    }

    fun saveDocument(document: DocumentDetail): DocumentDetail {
        documents[document.id] = document
        return document
    }

    fun toggleTask(documentId: String, taskId: String, isCompleted: Boolean): ActionItem? {
        val doc = documents[documentId] ?: return null
        var updatedItem: ActionItem? = null
        val updatedActions = doc.actions.map { action ->
            if (action.id == taskId) {
                action.copy(isCompleted = isCompleted).also { updatedItem = it }
            } else {
                action
            }
        }
        if (updatedItem != null) {
            documents[documentId] = doc.copy(actions = updatedActions)
        }
        return updatedItem
    }

    private fun seedSampleNotice() {
        val docId = "doc-scholarship-2026"
        val sampleDoc = DocumentDetail(
            id = docId,
            title = "State Post-Matriculation Merit-cum-Means Financial Assistance 2026",
            category = DocumentCategory.EDUCATION,
            issuingAuthority = "Directorate of Higher Education, Maharashtra",
            referenceNumber = "DHE/SCHOL/2026/UG-8821",
            rawText = """
                DEPARTMENT OF HIGHER EDUCATION & SCHOLARSHIPS
                STATE GOVERNMENT OF MAHARASHTRA
                NOTIFICATION REF: DHE/SCHOL/2026/UG-8821
                SUBJECT: State Post-Matriculation Merit-cum-Means Financial Assistance 2026-2027
                Applications are hereby invited from eligible 2nd-year undergraduate degree candidates for financial assistance under Scheme 4B.
                CRITICAL DEADLINES:
                - Online application submission deadline: 31st October 2026, 11:59 PM IST.
                - Institutional verification deadline: 15th November 2026.
                ELIGIBILITY:
                - Candidate must be enrolled full-time in an affiliated university.
                - Annual family income must not exceed INR 3,50,000 as certified by the competent revenue authority.
                - Candidate must have secured minimum 70% aggregate marks in preceding academic year.
                MANDATORY DOCUMENTS REQUIRED:
                - Duly attested Income Certificate issued by Tehsildar (valid for FY 2025-2026).
                - Official 1st-year academic grade sheet/transcript.
                - Domicile certificate of Maharashtra state.
                - Scanned copy of Nationalized Bank Passbook (linked with Aadhaar).
                - Annexure Form 4B (must be downloaded from the state portal, stamped by College Dean).
            """.trimIndent(),
            summaries = listOf(
                MultilingualSummary(
                    languageCode = "en",
                    languageName = "English",
                    summary = "State merit-cum-means scholarship for 2nd-year undergraduate students with family income under ₹3.5 Lakh and at least 70% marks. Must be submitted online before October 31, 2026.",
                    keyPoints = listOf(
                        "For 2nd-year UG students with >= 70% marks",
                        "Income threshold: ≤ ₹3,50,000 / year",
                        "Strict final deadline: 31st October 2026",
                        "Online portal only; no physical copies accepted"
                    ),
                    warnings = listOf(
                        "Tehsildar income certificate must be attested for FY 2025-2026",
                        "Bank account MUST be seeded with Aadhaar"
                    )
                ),
                MultilingualSummary(
                    languageCode = "hi",
                    languageName = "हिन्दी (Hindi)",
                    summary = "महाराष्ट्र राज्य सरकार द्वारा दूसरे वर्ष के स्नातक (UG) छात्रों के लिए मेरिट-कम-मीन्स छात्रवृत्ति। पारिवारिक आय ₹3.5 लाख से कम और 70% अंक आवश्यक हैं। आवेदन की अंतिम तिथि 31 अक्टूबर 2026 है।",
                    keyPoints = listOf(
                        "दूसरे वर्ष के छात्रों के लिए न्यूनतम 70% अंक आवश्यक",
                        "पारिवारिक आय ₹3,50,000 से कम होनी चाहिए",
                        "ऑनलाइन आवेदन की अंतिम तिथि 31 अक्टूबर 2026 है",
                        "तहसीलदार द्वारा जारी आय प्रमाण पत्र अनिवार्य है"
                    ),
                    warnings = listOf(
                        "बैंक खाता आधार कार्ड से लिंक होना अनिवार्य है",
                        "एनेक्सचर 4B कॉलेज डीन द्वारा हस्ताक्षरित होना चाहिए"
                    )
                ),
                MultilingualSummary(
                    languageCode = "mr",
                    languageName = "मराठी (Marathi)",
                    summary = "महाराष्ट्र राज्य उच्च शिक्षण संचालनालयाकडून पदवीच्या द्वितीय वर्षाच्या विद्यार्थ्यांसाठी गुणवत्ता शिष्यवृत्ती. कौटुंबिक उत्पन्न ₹३.५ लाखांपेक्षा कमी व ७०% गुण आवश्यक. अंतिम मुदत ३१ ऑक्टोबर २०२६.",
                    keyPoints = listOf(
                        "पदवी द्वितीय वर्ष, किमान ७०% गुण आवश्यक",
                        "वार्षिक उत्पन्न मर्यादा: कमाल ₹३,५०,०००",
                        "ऑनलाइन अर्ज अंतिम तारीख: ३१ ऑक्टोबर २०२६",
                        "महाडीबीटी पोर्टलद्वारेच अर्ज भरणे बंधनकारक"
                    ),
                    warnings = listOf(
                        "बँक पासबुक आधारशी जोडलेले असणे आवश्यक आहे",
                        "तहसीलदारांचा वैध उत्पन्न दाखला सोबत जोडावा"
                    )
                )
            ),
            actions = listOf(
                ActionItem(
                    id = "task-1",
                    documentId = docId,
                    stepNumber = 1,
                    title = "Download Annexure Form 4B from State Portal",
                    description = "Download the official scheme 4B template and get it physically stamped and signed by your College Dean.",
                    requiredDocument = "Annexure Form 4B",
                    dueDate = "2026-10-18T18:00:00Z",
                    isCompleted = false,
                    externalUrl = "https://mahadbt.maharashtra.gov.in/scholarships",
                    urgency = UrgencyLevel.HIGH
                ),
                ActionItem(
                    id = "task-2",
                    documentId = docId,
                    stepNumber = 2,
                    title = "Obtain Attested Tehsildar Income Certificate",
                    description = "Visit the local Tehsildar office / MahaOnline centre to obtain the certified income certificate under ₹3.5L for FY 2025-2026.",
                    requiredDocument = "Income Certificate (Tehsildar)",
                    dueDate = "2026-10-22T17:00:00Z",
                    isCompleted = false,
                    urgency = UrgencyLevel.HIGH
                ),
                ActionItem(
                    id = "task-3",
                    documentId = docId,
                    stepNumber = 3,
                    title = "Verify Aadhaar Seeding with Bank Account",
                    description = "Ensure that your Nationalized Bank account is linked with Aadhaar NPCI mapper for Direct Benefit Transfer (DBT).",
                    requiredDocument = "Bank Passbook with Aadhaar Link",
                    dueDate = "2026-10-25T17:00:00Z",
                    isCompleted = true,
                    urgency = UrgencyLevel.MEDIUM
                ),
                ActionItem(
                    id = "task-4",
                    documentId = docId,
                    stepNumber = 4,
                    title = "Submit Final Online Application on MahaDBT",
                    description = "Upload scanned transcripts, income certificate, signed Annexure 4B, and submit application before deadline.",
                    dueDate = "2026-10-31T23:59:00Z",
                    isCompleted = false,
                    externalUrl = "https://mahadbt.maharashtra.gov.in/scholarships",
                    urgency = UrgencyLevel.CRITICAL
                )
            ),
            deadlines = listOf("2026-10-31T23:59:00Z", "2026-11-15T18:00:00Z"),
            primaryDeadline = "2026-10-31T23:59:00Z",
            urgency = UrgencyLevel.HIGH,
            createdAt = Instant.now().toString()
        )
        documents[docId] = sampleDoc
    }
}

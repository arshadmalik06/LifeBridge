plugins {
    kotlin("jvm") version "2.0.21"
    kotlin("plugin.serialization") version "2.0.21"
    application
}

group = "com.lifebridge"
version = "1.0.0"

application {
    mainClass.set("com.lifebridge.ApplicationKt")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm:3.0.0")
    implementation("io.ktor:ktor-server-netty-jvm:3.0.0")
    implementation("io.ktor:ktor-server-content-negotiation-jvm:3.0.0")
    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm:3.0.0")
    implementation("io.ktor:ktor-server-cors-jvm:3.0.0")
    implementation("io.ktor:ktor-server-status-pages-jvm:3.0.0")
    implementation("ch.qos.logback:logback-classic:1.5.11")

    testImplementation("io.ktor:ktor-server-test-host-jvm:3.0.0")
    testImplementation("io.ktor:ktor-client-content-negotiation-jvm:3.0.0")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5:2.0.21")
    testImplementation("org.junit.jupiter:junit-jupiter:5.11.2")
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(21)
}

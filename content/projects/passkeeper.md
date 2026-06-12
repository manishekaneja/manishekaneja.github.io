---
slug: passkeeper
title: PassKeeper
order: 2
featured: false
draft: false

thumbnail:
  src: /projects/passkeeper/thumbnail.svg
  alt: PassKeeper app thumbnail — teal gradient with lock-shield icon
hero:
  src: /projects/passkeeper/hero.svg
  alt: PassKeeper hero — Android app screenshot showing the vault screen with card entries
gallery:
  - src: /projects/passkeeper/gallery-1.svg
    alt: PassKeeper password generator screen with entropy visualisation
  - src: /projects/passkeeper/gallery-2.svg
    alt: PassKeeper biometric unlock flow with fingerprint prompt

techStack:
  - Kotlin
  - Jetpack Compose
  - Room
  - AES-256-GCM

blurb: An Android password manager built with Jetpack Compose and AES-256-GCM local encryption — all data stays on-device, no cloud sync, no telemetry.

highlights:
  - "**AES-256-GCM** encryption with hardware-backed Android Keystore key derivation"
  - "Biometric unlock via **BiometricPrompt API** — no master-password fallback by design"
  - "**Offline-first** — zero network permission in the manifest"
  - "Compose UI with **Material 3** dynamic colour and dark-mode support"

role: Solo engineer
year: "2023"

repoUrl: https://github.com/manishekaneja/passkeeper
---

## Overview

PassKeeper is a local-only Android password manager built as a learning exercise in applied cryptography and Jetpack Compose. The app has no cloud backend, no analytics SDK, and requests zero network permissions — the only data pathway is the Android `ContentProvider` export used for encrypted backups.

## Security model

Each credential entry is encrypted at rest with AES-256-GCM. The symmetric key never leaves the Android Keystore; it is derived once on first launch and thereafter only materialised inside a hardware-backed security context. Biometric authentication gates every unlock — the app deliberately omits a master-password fallback to avoid a weaker authentication path being used as a workaround.

## Architecture

The data layer is Room with a single `CredentialEntity` table. Encryption and decryption are handled by a `CryptoRepository` that wraps the `Cipher` lifecycle; the DAO never sees plaintext. The UI layer is pure Jetpack Compose with a unidirectional `ViewModel → StateFlow → Composable` data flow. Material 3 dynamic colour adapts the palette automatically to the device's wallpaper on Android 12+.

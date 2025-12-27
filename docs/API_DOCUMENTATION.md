# API Documentation
## PreRecoveryPath South Africa

**Version:** 1.0  
**Base URL:** `https://api.prerecoverypath.org.za/v1`

---

## 1. Overview

The PreRecoveryPath SA API is designed with **privacy, consent, and ethics** as core principles. All endpoints respect user autonomy and require appropriate consent before data access.

### 1.1 Core Principles

- **Privacy-Preserving:** Minimal data collection, user control
- **Consent-Gated:** Granular consent required for each data type
- **Rate-Limited:** Prevents excessive use (anti-addiction)
- **Transparent:** Clear error messages, no black boxes
- **POPIA Compliant:** South African data protection law

---

## 2. Authentication

### 2.1 OAuth 2.0

**Endpoint:** `/auth/token`

**Method:** POST

**Request:**
```json
{
  "grant_type": "password",
  "username": "user@example.com",
  "password": "secure_password",
  "client_id": "prerecovery_app"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGhpc19pc19hX3JlZnJlc2g...",
  "scope": "read write"
}
```

**Security:**
- HTTPS required (TLS 1.3)
- Tokens expire after 1 hour
- Refresh tokens valid for 30 days
- Optional 2FA (TOTP)

---

## 3. User Management

### 3.1 Create User Account

**Endpoint:** `/users`

**Method:** POST

**Request:**
```json
{
  "phone": "+27821234567",
  "password": "secure_password",
  "language_preference": "zu",
  "province": "KZN",
  "age_range": "25-34",
  "consent": {
    "essential": true,
    "personalization": false,
    "research": false,
    "community": false
  }
}
```

**Response:**
```json
{
  "user_id": "usr_abc123",
  "created_at": "2025-12-27T10:00:00Z",
  "message": "Account created successfully"
}
```

**Data Minimization:**
- Phone number (for login/recovery)
- Age range (not exact birthdate)
- Province (not exact location)
- Language preference
- Consent choices

**What We DON'T Collect:**
- Real name (optional alias only)
- Exact location
- Contacts
- Social media profiles

### 3.2 Get User Profile

**Endpoint:** `/users/{user_id}`

**Method:** GET

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "user_id": "usr_abc123",
  "alias": "Thabo",
  "language_preference": "zu",
  "province": "KZN",
  "age_range": "25-34",
  "recovery_phase": "early",
  "vulnerability_flags": ["early_recovery"],
  "account_created": "2025-12-27T10:00:00Z"
}
```

### 3.3 Update User Profile

**Endpoint:** `/users/{user_id}`

**Method:** PATCH

**Request:**
```json
{
  "language_preference": "en",
  "alias": "Thabo M"
}
```

**Response:**
```json
{
  "user_id": "usr_abc123",
  "updated_at": "2025-12-27T11:00:00Z",
  "message": "Profile updated successfully"
}
```

### 3.4 Delete User Account (POPIA Right)

**Endpoint:** `/users/{user_id}`

**Method:** DELETE

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "message": "Account and all data deleted successfully",
  "deleted_at": "2025-12-27T12:00:00Z"
}
```

**Action:** Permanent deletion of all user data within 24 hours

---

## 4. Consent Management

### 4.1 Get Current Consent

**Endpoint:** `/users/{user_id}/consent`

**Method:** GET

**Response:**
```json
{
  "user_id": "usr_abc123",
  "consent": {
    "essential": {
      "granted": true,
      "purpose": "Platform functionality",
      "granted_at": "2025-12-27T10:00:00Z"
    },
    "personalization": {
      "granted": false,
      "purpose": "Personalized support recommendations",
      "granted_at": null
    },
    "research": {
      "granted": false,
      "purpose": "Anonymized research and improvement",
      "granted_at": null
    },
    "community": {
      "granted": false,
      "purpose": "Connect with peer support (privacy-preserved)",
      "granted_at": null
    }
  }
}
```

### 4.2 Update Consent

**Endpoint:** `/users/{user_id}/consent`

**Method:** PATCH

**Request:**
```json
{
  "personalization": true,
  "research": false
}
```

**Response:**
```json
{
  "message": "Consent preferences updated",
  "updated_at": "2025-12-27T13:00:00Z"
}
```

**Audit Trail:** All consent changes logged with timestamp

---

## 5. Support and Recommendations

### 5.1 Request Support

**Endpoint:** `/support/request`

**Method:** POST

**Headers:**
```
Authorization: Bearer {access_token}
X-Session-Time: 15 (minutes since session start)
```

**Request:**
```json
{
  "user_id": "usr_abc123",
  "context": "feeling_triggered",
  "urgency": "medium"
}
```

**Response (Ethics Circuit Breaker Approved):**
```json
{
  "recommendation": {
    "suggestion": "Consider calling your sponsor or attending your weekly AA meeting",
    "reasoning": "You mentioned feeling triggered. Connecting with your support person can help (45% personal history factor). Your weekly AA meeting is tomorrow evening, which provides structure (30% routine factor). You've successfully managed similar situations by reaching out before (25% past success factor).",
    "factors": {
      "personal_history": {
        "weight": 0.45,
        "description": "Past experience with triggers and support"
      },
      "routine": {
        "weight": 0.30,
        "description": "Structured support meetings beneficial"
      },
      "past_success": {
        "weight": 0.25,
        "description": "Previously effective coping strategy"
      }
    },
    "alternatives": [
      "Call your sponsor now: [Phone]",
      "Practice your breathing exercise (3 minutes)",
      "Write in your recovery journal",
      "Take a walk outside (15 minutes)"
    ],
    "confidence": 0.85,
    "opt_out": "You always have choice in how you respond"
  },
  "session_info": {
    "time_remaining": "15 minutes until break suggestion",
    "today_usage": "8 minutes",
    "daily_limit": "30 minutes"
  }
}
```

**Response (Ethics Circuit Breaker Blocked):**
```json
{
  "error": "session_limit_exceeded",
  "message": "You've reached your daily 30-minute limit. This helps you build real-world skills.",
  "suggestions": [
    "Call your support person",
    "Attend an AA/NA meeting",
    "Contact SANCA: 0861 472 622",
    "Call crisis line if urgent: SADAG 0800 567 567"
  ],
  "next_session": "2025-12-28T00:00:00Z"
}
```

### 5.2 Crisis Detection

**Endpoint:** `/crisis/assess`

**Method:** POST

**Request:**
```json
{
  "user_id": "usr_abc123",
  "message": "I don't know if I can keep going..."
}
```

**Response (High Risk Detected):**
```json
{
  "risk_level": "high",
  "immediate_action": true,
  "resources": {
    "sadag_crisis_line": {
      "name": "SADAG 24/7 Crisis Line",
      "phone": "0800 567 567",
      "available": "24/7"
    },
    "lifeline": {
      "name": "Lifeline South Africa",
      "phone": "0861 322 322",
      "available": "24/7"
    },
    "emergency": {
      "name": "Emergency Services",
      "phone": "10111 or 112",
      "available": "24/7"
    }
  },
  "counselor_notified": true,
  "message": "Your safety is priority. Please call one of these numbers now. A counselor has been notified and will reach out within 15 minutes."
}
```

**Action:** Human escalation triggered immediately

---

## 6. Community and Resources

### 6.1 Find Local Meetings

**Endpoint:** `/resources/meetings`

**Method:** GET

**Query Parameters:**
```
?province=KZN&municipality=eThekwini&type=AA&language=zu
```

**Response:**
```json
{
  "meetings": [
    {
      "name": "Durban Central AA",
      "type": "AA",
      "language": "English, isiZulu",
      "address": "123 West Street, Durban",
      "meeting_times": [
        {"day": "Monday", "time": "19:00"},
        {"day": "Wednesday", "time": "19:00"},
        {"day": "Saturday", "time": "10:00"}
      ],
      "contact": "0831234567",
      "accessibility": "Wheelchair accessible"
    },
    {
      "name": "Umlazi NA",
      "type": "NA",
      "language": "isiZulu, English",
      "address": "Umlazi Community Center",
      "meeting_times": [
        {"day": "Tuesday", "time": "18:00"},
        {"day": "Friday", "time": "18:00"}
      ],
      "contact": "0829876543"
    }
  ],
  "count": 2
}
```

### 6.2 Get SANCA Branches

**Endpoint:** `/resources/sanca`

**Method:** GET

**Query Parameters:**
```
?province=KZN
```

**Response:**
```json
{
  "branches": [
    {
      "name": "SANCA Durban",
      "province": "KZN",
      "municipality": "eThekwini",
      "address": "45 Dorothy Nyembe Street, Durban",
      "phone": "031 301 2844",
      "email": "durban@sanca.org.za",
      "services": [
        "Outpatient counseling",
        "Inpatient treatment",
        "Family support",
        "Aftercare"
      ]
    }
  ]
}
```

---

## 7. Usage Monitoring (User View)

### 7.1 Get My Usage Stats

**Endpoint:** `/users/{user_id}/usage`

**Method:** GET

**Response:**
```json
{
  "user_id": "usr_abc123",
  "period": "past_7_days",
  "statistics": {
    "daily_average_minutes": 12,
    "total_sessions": 14,
    "trend": "decreasing",
    "ai_sessions": 8,
    "human_connections": 6
  },
  "wellness_message": "Great! Your usage is decreasing while you build real-world support. This is exactly what we want to see.",
  "flags": []
}
```

**Response (Excessive Use Detected):**
```json
{
  "user_id": "usr_abc123",
  "period": "past_7_days",
  "statistics": {
    "daily_average_minutes": 35,
    "total_sessions": 42,
    "trend": "increasing",
    "ai_sessions": 40,
    "human_connections": 2
  },
  "wellness_message": "We noticed you've been using the platform more than recommended. This might be a sign to connect with human support.",
  "flags": ["excessive_use", "low_human_connection"],
  "suggestions": [
    "Schedule a counselor check-in",
    "Attend an AA/NA meeting this week",
    "Call your support person",
    "Consider taking a platform break (healthy!)"
  ]
}
```

---

## 8. Data Export (POPIA Right)

### 8.1 Request Data Export

**Endpoint:** `/users/{user_id}/export`

**Method:** POST

**Response:**
```json
{
  "export_id": "exp_xyz789",
  "status": "processing",
  "message": "Your data export will be ready within 30 days (POPIA requirement)",
  "estimated_ready": "2025-01-26T10:00:00Z"
}
```

### 8.2 Download Data Export

**Endpoint:** `/users/{user_id}/export/{export_id}`

**Method:** GET

**Response:** JSON file download containing all user data

```json
{
  "user_profile": { ... },
  "usage_history": [ ... ],
  "consent_history": [ ... ],
  "interactions": [ ... ],
  "generated_at": "2025-01-26T10:00:00Z"
}
```

---

## 9. Rate Limiting (Anti-Addiction)

### 9.1 Rate Limit Headers

**Every Response Includes:**
```
X-RateLimit-Limit: 30 (requests per hour)
X-RateLimit-Remaining: 25
X-RateLimit-Reset: 1735300800 (Unix timestamp)
X-Daily-Minutes-Used: 15
X-Daily-Minutes-Limit: 30
```

### 9.2 Rate Limit Exceeded

**Response (429 Too Many Requests):**
```json
{
  "error": "rate_limit_exceeded",
  "message": "You've exceeded your hourly request limit. This helps prevent excessive platform use.",
  "retry_after": 1800,
  "suggestions": [
    "Take a break",
    "Practice an offline coping skill",
    "Connect with your support network"
  ]
}
```

---

## 10. Error Handling

### 10.1 Standard Error Response

```json
{
  "error": "error_code",
  "message": "Human-readable error message in user's language",
  "details": "Additional context if helpful",
  "support": "Contact support@prerecoverypath.org.za if you need help"
}
```

### 10.2 Common Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| `unauthorized` | 401 | Invalid or missing authentication |
| `forbidden` | 403 | Insufficient permissions or consent |
| `not_found` | 404 | Resource not found |
| `session_limit_exceeded` | 429 | Daily 30-minute limit reached |
| `rate_limit_exceeded` | 429 | Too many requests per hour |
| `consent_required` | 451 | User consent needed for this action |
| `ethics_violation` | 422 | Request blocked by ethics circuit breaker |

### 10.3 User-Friendly Error Messages

**Example (in isiZulu for Zulu-speaking user):**
```json
{
  "error": "session_limit_exceeded",
  "message": "Ufinyelele umkhawulo wakho wosuku lonke wamaminithi angama-30. Lokhu kukusiza ukwakha amakhono empilo yangempela.",
  "suggestions": [
    "Shayela umuntu wakho wokusekela",
    "Hamba emhlanganweni we-AA/NA",
    "Xhumana ne-SANCA: 0861 472 622"
  ]
}
```

---

## 11. Webhooks (For Authorized Partners)

### 11.1 Crisis Event Webhook

**Sent To:** Authorized counselors/partners (with user consent)

**Payload:**
```json
{
  "event": "crisis_detected",
  "user_id": "usr_abc123",
  "risk_level": "high",
  "timestamp": "2025-12-27T15:00:00Z",
  "context": "User expressed suicidal ideation",
  "action_required": "immediate_contact",
  "user_consent": "emergency_contact_authorized"
}
```

**Security:** HTTPS, signed with HMAC-SHA256

---

## 12. API Versioning

### 12.1 Current Version: v1

**Base URL:** `https://api.prerecoverypath.org.za/v1`

### 12.2 Versioning Policy

- Major version changes (breaking): URL path change (`/v2`)
- Minor version changes (additive): Header-based
- Deprecation notice: 6 months minimum
- Sunset date: Clearly communicated

---

## 13. SDKs and Client Libraries

### 13.1 Official SDKs

**Available:**
- JavaScript/TypeScript (Node.js, browser)
- Python
- React Native (mobile)

**Coming Soon:**
- Java (Android)
- Swift (iOS)

**Installation (npm):**
```bash
npm install @prerecoverypath/sdk
```

**Usage Example:**
```javascript
import PreRecoveryPath from '@prerecoverypath/sdk';

const client = new PreRecoveryPath({
  accessToken: 'your_access_token',
  language: 'zu',
  ethicsMode: 'strict' // Enforces client-side ethics checks
});

const support = await client.support.request({
  context: 'feeling_triggered',
  urgency: 'medium'
});

console.log(support.recommendation.suggestion);
console.log(support.recommendation.reasoning); // Transparent!
```

---

## 14. Testing and Development

### 14.1 Sandbox Environment

**Base URL:** `https://sandbox.api.prerecoverypath.org.za/v1`

**Features:**
- Test data only
- No rate limits (for testing)
- Ethics circuit breaker in audit mode (logs but doesn't block)

### 14.2 Test Users

**Pre-created test users for different scenarios:**
- `test_early_recovery@example.com` (early recovery phase)
- `test_stable@example.com` (stable recovery phase)
- `test_crisis@example.com` (triggers crisis detection for testing)

**Password:** `TestPassword123!` (all test users)

---

## 15. API Security Best Practices

### 15.1 For Developers

**Do:**
- Use HTTPS only (TLS 1.3)
- Store access tokens securely (not in code)
- Implement token refresh logic
- Respect rate limits
- Handle errors gracefully
- Display transparent reasoning to users

**Don't:**
- Store tokens in localStorage (use secure cookies or memory)
- Log sensitive user data
- Share access tokens
- Bypass ethics circuit breaker responses
- Hide error messages from users

### 15.2 Vulnerability Reporting

**Security Issues:**
- Email: security@prerecoverypath.org.za
- PGP Key available at: https://prerecoverypath.org.za/pgp
- Responsible disclosure: 90 days
- Bug bounty program (coming soon)

---

## 16. API Changelog

### v1.0.0 (December 2025)
- Initial release
- User management
- Consent management
- Support recommendations
- Crisis detection
- Resource finder
- Usage monitoring
- Data export (POPIA compliance)

---

## 17. Support and Resources

**Documentation:** https://docs.prerecoverypath.org.za

**API Status:** https://status.prerecoverypath.org.za

**Developer Forum:** https://forum.prerecoverypath.org.za

**Email Support:** api@prerecoverypath.org.za

**Ethics Board Contact:** ethics@prerecoverypath.org.za

---

## Conclusion

This API is designed to be **privacy-first, consent-based, and ethically bounded**. Every endpoint respects user autonomy and is subject to ethics circuit breaker evaluation.

**Core Commitment:** We will never prioritize API usage metrics over user wellbeing.

---

*Version 1.0 | December 2025*  
*PreRecoveryPath SA Technical Team*

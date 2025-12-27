# System Architecture
## PreRecoveryPath South Africa

**Version:** 1.0  
**Last Updated:** December 2025

---

## 1. Architecture Overview

PreRecoveryPath SA is designed with **ethics as infrastructure**, not an afterthought. The Ethics Circuit Breaker is the first layer of the system, blocking any request that violates ethical principles before it reaches users.

### 1.1 Core Design Principles

1. **Ethics-First Architecture:** Ethics circuit breaker evaluates every recommendation
2. **Privacy by Design:** Data minimization and user control built into every component
3. **Autonomy Preservation:** User-initiated interactions, transparent reasoning
4. **Human-First:** AI supplements human support, never replaces
5. **Cultural Adaptation:** SA-specific context throughout
6. **Offline-First:** Works without constant connectivity
7. **Accessibility:** Feature phone support, low bandwidth optimization

---

## 2. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                           │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │ Autonomy         │  │ Consent          │  │ Mobile App    │ │
│  │ Interface (Web)  │  │ Dashboard        │  │ (Progressive) │ │
│  │ - No infinite    │  │ - Data control   │  │ - Offline     │ │
│  │   scroll         │  │ - Export/delete  │  │   capable     │ │
│  │ - Visible timer  │  │ - Granular       │  │ - Low         │ │
│  │ - "I'm Done" btn │  │   consent        │  │   bandwidth   │ │
│  └──────────────────┘  └──────────────────┘  └───────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  ETHICS CIRCUIT BREAKER (LAYER 1)                │
│  Every request evaluated for ethical compliance                  │
│  ✓ Autonomy preservation  ✓ Manipulation detection              │
│  ✓ Session limits         ✓ Cultural appropriateness            │
│  ✓ Vulnerability protection                                      │
│  BLOCKS requests that violate principles                         │
└─────────────────────────────────────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CORE APPLICATION LAYER                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │ Autonomy     │  │ Empowerment  │  │ Usage Monitor      │    │
│  │ Engine       │  │ Engine       │  │ - Track patterns   │    │
│  │ - User       │  │ - Build      │  │ - Flag excessive   │    │
│  │   control    │  │   capability │  │ - Weekly audits    │    │
│  │ - Break      │  │ - Decrease   │  │                    │    │
│  │   suggestions│  │   dependency │  │                    │    │
│  └──────────────┘  └──────────────┘  └────────────────────┘    │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │ Explainable  │  │ Cultural     │  │ Crisis Detection   │    │
│  │ AI           │  │ Adapter      │  │ - Risk assessment  │    │
│  │ - Transparent│  │ - 11 langs   │  │ - Human escalation │    │
│  │   reasoning  │  │ - 9 provinces│  │ - Emergency connect│    │
│  └──────────────┘  └──────────────┘  └────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA & PRIVACY LAYER                       │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │ Ethical Data │  │ Consent      │  │ POPIA Compliance   │    │
│  │ Governance   │  │ Manager      │  │ - Data subject     │    │
│  │ - Minimization│  │ - Granular   │  │   rights           │    │
│  │ - Hashing    │  │ - Revocable  │  │ - Export/delete    │    │
│  │ - Time limits│  │ - Audit trail│  │ - Breach protocol  │    │
│  └──────────────┘  └──────────────┘  └────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       COMMUNITY LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │ Community    │  │ Human        │  │ Vulnerability      │    │
│  │ Integration  │  │ Connection   │  │ Protection         │    │
│  │ - SANCA      │  │ Facilitator  │  │ - Early recovery   │    │
│  │ - AA/NA      │  │ - Local      │  │ - Youth            │    │
│  │ - Traditional│  │   meetings   │  │ - Elderly          │    │
│  │   healers    │  │ - Counselors │  │ - Low literacy     │    │
│  └──────────────┘  └──────────────┘  └────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL INTEGRATIONS                         │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │ SANCA API    │  │ SADAG        │  │ Municipal Services │    │
│  │ - Referrals  │  │ - Crisis     │  │ - Health centers   │    │
│  │ - Resources  │  │   hotline    │  │ - Social dev       │    │
│  └──────────────┘  └──────────────┘  └────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Descriptions

### 3.1 User Interface Layer

#### Autonomy Interface
**Purpose:** Anti-addiction UI that respects user time and autonomy

**Features:**
- No infinite scroll (finite content)
- Prominent "I'm Done" button (large, accessible)
- Visible session timer
- Break suggestions after 10 minutes
- No auto-play or auto-advance
- Natural stopping points

**Technology:** React.js with accessibility features

#### Consent Dashboard
**Purpose:** User control center for privacy and data

**Features:**
- View all collected data
- Granular consent toggles
- Export data (JSON, CSV)
- Delete account and all data
- Consent history and audit trail
- Plain language explanations

**Technology:** React.js with POPIA compliance

#### Mobile Application
**Purpose:** Accessible, offline-capable mobile experience

**Features:**
- Progressive Web App (works on any device)
- Offline functionality (service workers)
- Low bandwidth mode (<100KB per session)
- Feature phone support (USSD fallback)
- Works on 2G networks

**Technology:** Progressive Web App (PWA)

### 3.2 Ethics Circuit Breaker

**Purpose:** First line of defense against ethical violations

**Checks Performed:**
1. **Autonomy Preservation:**
   - Is user in control?
   - Are exits clear?
   - Is reasoning transparent?

2. **Manipulation Detection:**
   - Engagement vs. prevention ratio check
   - No variable rewards
   - No FOMO patterns

3. **Session Limits:**
   - Has user exceeded 30 min/day?
   - More than 5 sessions today?
   - Time for mandatory break?

4. **Cultural Appropriateness:**
   - Culturally sensitive for user's context?
   - Language appropriate?
   - Respects local norms?

5. **Vulnerability Protection:**
   - Extra safeguards for vulnerable users
   - Lower thresholds if early recovery
   - Age-appropriate protections

**Action on Violation:**
- Block the recommendation
- Provide alternative that complies
- Log incident for ethics board review
- Alert usage monitor

**Technology:** Node.js middleware, evaluates every request

### 3.3 Core Application Components

#### Autonomy Engine
**Responsibility:** Preserve user control and autonomy

**Functions:**
- User-initiated interactions only (no push)
- Provide transparent reasoning for all recommendations
- Suggest breaks after 10 minutes
- Enforce 30-minute daily limit
- Weekly autonomy audits per user

**Technology:** Node.js service

#### Empowerment Engine
**Responsibility:** Build user capability, reduce platform dependency

**Functions:**
- Personalize support by recovery phase:
  - Phase 1: Early recovery (high support)
  - Phase 2: Building confidence (moderate)
  - Phase 3: Stable recovery (minimal, safety net only)
- Celebrate decreasing usage
- Measure success by real-world outcomes
- Track platform independence metrics

**Technology:** Node.js service with ML models

#### Explainable AI
**Responsibility:** Transparent AI recommendations

**Output Format:**
```javascript
{
  suggestion: "Consider attending an AA meeting this week",
  reasoning: "I suggest this because you mentioned feeling isolated (40% weight) and haven't connected with your support group in 2 weeks (35% weight). AA meetings in your area are available on Tuesday and Thursday evenings (25% location factor).",
  factors: {
    socialIsolation: { weight: 0.40, description: "Recent reports of loneliness" },
    supportGap: { weight: 0.35, description: "No group meeting in 2 weeks" },
    localAvailability: { weight: 0.25, description: "Accessible meetings nearby" }
  },
  alternatives: [
    "Call your sponsor",
    "Attend virtual meeting",
    "Connect with peer counselor"
  ],
  confidence: 0.85,
  optOut: "You can always choose a different approach"
}
```

**Technology:** Python ML models with SHAP explainability

#### Cultural Adapter
**Responsibility:** Adapt content for SA's 11 languages and 9 provinces

**Data:**
- Cultural models for each language group
- Provincial norms and preferences
- Traditional healing integration
- Faith community approaches
- Local idioms and metaphors

**Functions:**
- Adapt communication style (formal vs. informal)
- Use culturally appropriate metaphors
- Integrate traditional healing concepts
- Localize success stories
- Respect collectivism vs. individualism

**Technology:** Node.js service with cultural database

#### Crisis Detection System
**Responsibility:** Identify crisis signals and escalate to humans

**Risk Levels:**
- Immediate (>0.95): Instant human intervention
- High (0.80-0.94): Counselor contact within 24 hours
- Medium (0.60-0.79): Check-in suggested
- Low (<0.60): Normal monitoring

**Signals Analyzed:**
- Text sentiment and content (suicidal ideation, despair)
- Behavioral patterns (isolation, erratic usage)
- Temporal patterns (3am distress)
- Explicit crisis declarations

**Actions:**
- Display crisis resources immediately
- Alert on-call counselor
- Contact emergency support network (with consent)
- Schedule 15-minute follow-up
- Document for continuity of care

**Technology:** Python NLP with rule-based overrides for safety

#### Usage Monitor
**Responsibility:** Track usage patterns and flag excessive use

**Metrics Tracked:**
- Daily minutes
- Session count per day
- Time of day patterns
- AI vs. human support ratio
- Feature usage
- Trend over time (increasing or decreasing)

**Flags:**
- Yellow: >20 min/day for 3 days → Suggest break
- Orange: >30 min/day or >5 sessions/day → Human review
- Red: Sustained excessive use → Ethics board + counselor

**Good Signs:**
- Decreasing usage over time
- More human support, less AI
- Longer gaps between sessions
- Successful disengagement

**Technology:** Node.js service with time-series analysis

### 3.4 Data & Privacy Layer

#### Ethical Data Governance
**Principle:** Collect only essential data with user control

**Prohibited Data:**
- Exact GPS locations (municipality level only via hashing)
- Contact lists without explicit consent
- Background activity monitoring
- Keystroke logging
- Facial recognition
- Third-party tracking

**Allowed Data (with consent):**
- Municipality (hashed)
- Age range (not exact birthdate)
- Language preference
- Recovery-relevant information user chooses to share
- Anonymized usage statistics

**Retention:**
- 90-day default with auto-deletion
- User can request earlier deletion
- Export available anytime
- Anonymized research data (separate consent)

**Technology:** PostgreSQL with encryption at rest, TLS in transit

#### Consent Manager
**Functionality:**
- Granular consent per data type
- Plain language explanations (8th grade level)
- Visual indicators of what's shared
- Easy revocation (one click)
- Consent version control and audit trail
- Annual re-consent prompts

**Consent Types:**
- Essential (platform functionality)
- Optional (personalization)
- Research (anonymized analysis)
- Community (peer connections)

**Technology:** Node.js service with consent database

#### POPIA Compliance
**Requirements Met:**
- Lawfulness of processing (consent, legitimate interest)
- Purpose specification (clear, explicit)
- Data minimization (only essential)
- Storage limitation (time-limited)
- Data subject rights (access, rectification, erasure, portability, objection)
- Information officer designated
- Breach notification (within 24 hours)

**User Rights:**
- Access all data (within 30 days)
- Rectify incorrect data
- Erase data ("right to be forgotten")
- Export data (portable format)
- Object to processing
- Lodge complaint with regulator

**Technology:** Node.js compliance layer with POPIA audit trail

### 3.5 Community Layer

#### Community Integration
**Purpose:** Human-first support connections

**Integrations:**
- **SANCA:** Referral pathways, resource access
- **AA/NA:** Meeting finder by municipality
- **Traditional Healers:** Respectful partnership, referral options
- **Faith Communities:** Church/mosque/temple support groups
- **Peer Counselors:** Trained peers with lived experience
- **Licensed Counselors:** Affordable counseling access

**Priority:**
1. In-person human connection (local meetings, counselors)
2. Virtual human connection (video calls, phone)
3. AI companion (only when human support unavailable)

**Technology:** Resource database with API integrations

#### Human Connection Facilitator
**Functions:**
- Find local AA/NA meetings (by municipality)
- Match with peer counselors (similar background, with consent)
- Connect to SANCA branch
- Identify affordable counselors
- Faith community referrals
- Traditional healer network (with respect)

**After 3 AI Sessions:** Platform requires user to connect with human support before continuing AI access

**Technology:** Node.js matching service

#### Vulnerability Protection
**Protected Groups:**
- Early recovery (<90 days)
- Youth (18-25)
- Elderly (>65)
- Low literacy
- High manipulation vulnerability

**Protections:**
- Simplified UI (elderly, low literacy)
- Lower crisis thresholds (early recovery)
- No gamification (youth)
- More human check-ins (early recovery)
- Large text, audio options (elderly, low literacy)
- Screen time warnings (youth)

**Technology:** User profile-based protection rules

---

## 4. Data Flow

### 4.1 User Interaction Flow

```
User requests support
    ↓
Ethics Circuit Breaker evaluates request
    ↓ (if approved)
Autonomy Engine checks session limits
    ↓ (if within limits)
Cultural Adapter localizes content
    ↓
Explainable AI generates recommendation with reasoning
    ↓
Crisis Detection evaluates for risk
    ↓ (if low/medium risk)
Empowerment Engine personalizes by phase
    ↓
Usage Monitor logs interaction
    ↓
Response returned to user with:
    - Transparent reasoning
    - Alternatives
    - Exit option
    - Session time remaining
```

### 4.2 Crisis Detection Flow

```
User interaction analyzed
    ↓
Crisis Detection System evaluates risk
    ↓ (if risk > 0.95)
Immediate human intervention triggered:
    ↓
- Display crisis resources (SADAG, SANCA, Lifeline)
- Alert on-call counselor
- Offer emergency services contact
- Document for follow-up
- Schedule 15-minute check-in
    ↓
Human takes over (AI steps back)
```

### 4.3 Data Privacy Flow

```
Data collection request
    ↓
Check if consent exists
    ↓ (if yes)
Minimize data collected (only essential)
    ↓
Geographic hashing (no exact location)
    ↓
Encrypt data at rest
    ↓
Store on SA servers
    ↓
Auto-delete after 90 days (unless user extends)
    ↓
User can export/delete anytime
```

---

## 5. South African Integration Points

### 5.1 Government Services
- **Department of Social Development:** Referral pathways
- **Department of Health:** Public health center integration
- **SAPS:** Emergency services coordination

### 5.2 NGOs and Support Organizations
- **SANCA:** Treatment referrals, resources
- **SADAG:** Mental health support, crisis line
- **Lifeline:** Crisis intervention
- **Local NGOs:** Community-specific services

### 5.3 Traditional and Faith-Based
- **Traditional Healers:** Respectful integration, referral network
- **Faith Communities:** Support groups, spiritual support
- **Community Elders:** Cultural guidance

### 5.4 Healthcare
- **Public Clinics:** Primary healthcare integration
- **Community Health Workers:** Outreach and referral
- **Mental Health Services:** Specialist care
- **Rehabilitation Facilities:** Treatment programs

---

## 6. Technology Stack

### 6.1 Backend
- **Runtime:** Node.js 18 LTS
- **Framework:** Express.js
- **AI/ML:** Python 3.10 (scikit-learn, TensorFlow)
- **Database:** PostgreSQL 15 (encrypted)
- **Cache:** Redis (session management)
- **API:** RESTful with rate limiting

### 6.2 Frontend
- **Framework:** React 18
- **State Management:** Redux
- **PWA:** Service workers for offline
- **Styling:** TailwindCSS (accessible)
- **i18n:** react-i18next (11 languages)

### 6.3 Infrastructure
- **Hosting:** South African servers (data sovereignty)
- **CDN:** CloudFlare (with SA edge locations)
- **SSL/TLS:** Let's Encrypt
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK Stack (anonymized)

### 6.4 Security
- **Encryption:** AES-256 at rest, TLS 1.3 in transit
- **Authentication:** OAuth 2.0 + TOTP 2FA (optional)
- **Authorization:** RBAC with principle of least privilege
- **Secrets Management:** HashiCorp Vault
- **POPIA Compliance:** Built into every component

### 6.5 DevOps
- **Version Control:** Git
- **CI/CD:** GitHub Actions
- **Containerization:** Docker
- **Orchestration:** Kubernetes (optional, for scale)
- **IaC:** Terraform

---

## 7. Deployment Considerations

### 7.1 Scalability
- Horizontal scaling for API servers
- Database replication (read replicas)
- CDN for static assets
- Load balancing
- Expect: 10,000 users initially, scale to 100,000+

### 7.2 Reliability
- 99.5% uptime target (allows for maintenance)
- Automatic failover
- Database backups (daily, encrypted)
- Disaster recovery plan
- Graceful degradation

### 7.3 Performance
- API response time: <500ms (p95)
- Page load time: <3s on 3G
- Offline functionality (PWA)
- Low bandwidth optimization
- Feature phone support (USSD)

### 7.4 Accessibility
- WCAG 2.1 Level AA compliance
- Screen reader compatible
- Keyboard navigation
- High contrast mode
- Large text options
- Audio alternatives

---

## 8. Monitoring and Observability

### 8.1 Technical Monitoring
- Server health (CPU, memory, disk)
- API performance (latency, errors)
- Database performance
- Security events

### 8.2 Ethics Monitoring
- Usage patterns (daily aggregates)
- Session limit violations
- Crisis event frequency
- Ethics circuit breaker blocks
- User autonomy metrics

### 8.3 Outcome Monitoring
- Real-world outcome proxies
- Platform independence trends
- User satisfaction
- Cultural appropriateness scores

---

## 9. Security Architecture

### 9.1 Threat Model
- **Threats:** Data breaches, unauthorized access, DDoS, account takeover
- **Assets:** User data (sensitive), platform integrity
- **Mitigations:** Encryption, authentication, rate limiting, monitoring

### 9.2 Security Layers
1. **Network:** Firewall, DDoS protection, VPN
2. **Application:** Input validation, CSRF tokens, XSS prevention
3. **Data:** Encryption at rest and in transit, access controls
4. **Authentication:** Strong passwords, 2FA, session management
5. **Authorization:** RBAC, principle of least privilege

### 9.3 Incident Response
- Detection: Monitoring and alerts
- Containment: Isolate affected systems
- Investigation: Root cause analysis
- Recovery: Restore from backups
- Notification: Users and regulators (24 hours per POPIA)
- Post-mortem: Learn and improve

---

## 10. Future Enhancements

### 10.1 Planned Features (Ethics Board Approval Required)
- SMS/USSD fallback for feature phones
- Voice interface for low literacy
- Integration with more traditional healer networks
- Expanded language support (sign languages)
- Community peer matching (privacy-preserving)

### 10.2 Research Directions
- Effectiveness studies
- Cultural adaptation validation
- Platform independence metrics research
- Vulnerable population protection evaluation

---

## Conclusion

This architecture prioritizes ethics, privacy, and user autonomy at every layer. The Ethics Circuit Breaker is not an optional add-on—it's the foundation that ensures the platform serves users, not metrics.

**Core Commitment:** No request reaches users without passing ethical evaluation.

---

*Version 1.0 | December 2025*  
*PreRecoveryPath SA Technical Team*

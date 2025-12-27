# 🛡️ Ethical AI Framework for PreRecoveryPath SA

## Executive Summary

PreRecoveryPath SA is a **prevention-first, autonomy-preserving** platform for substance abuse support in South Africa. This framework establishes non-negotiable ethical principles that prioritize user autonomy over engagement, human connection over AI, and real-world outcomes over platform metrics.

**Core Commitment:** We design the platform to help users need it LESS over time, not MORE.

---

## 1. Foundational Principles

### 1.1 User Autonomy Always Primary

**Principle:** Users maintain full control over their experience at all times.

**Implementation:**
- **User-Initiated Interactions Only**: Platform never pushes content; users initiate all interactions
- **Transparent AI Reasoning**: Every recommendation includes plain-language explanation of why it was made
- **Prominent Exit Options**: Large, accessible "I'm Done" buttons on every screen
- **Weekly Autonomy Audits**: System monitors usage patterns and flags potential dependency
- **Session Limits**: 10-minute break suggestions, 30-minute daily maximum (enforced)
- **Override Capability**: Users can reject any AI suggestion without penalty

**Prohibited:**
- Push notifications designed to pull users back
- Hidden or difficult-to-find exit options
- Recommendations without explanations
- Penalizing users who ignore suggestions

### 1.2 Human Connection Over AI

**Principle:** AI is supplementary support, never primary. Human connection is essential for recovery.

**Implementation:**
- **AI as Bridge**: AI companion available only when human support unavailable (e.g., 3am crisis)
- **Required Human Connection**: After 3 consecutive AI sessions, platform requires user to connect with human support
- **Crisis Escalation**: Any crisis signal triggers immediate human intervention pathway
- **Integration with Human Services**: Direct connections to SANCA, AA/NA, traditional healers, counselors, faith communities

**Prohibited:**
- Positioning AI as replacement for human support
- Creating emotional dependency on AI companion
- Allowing indefinite AI-only usage

### 1.3 Data Minimization & POPIA Compliance

**Principle:** Collect only essential data with granular consent. Users own their data.

**Implementation:**
- **Minimal Collection**: Only data essential for support services
- **Geographic Hashing**: Municipality-level only, no exact locations
- **Granular Consent**: Separate consent for each data type with clear purpose
- **Time-Limited Retention**: 90-day default with auto-deletion
- **User Data Rights**: Export, modify, or delete all data anytime
- **POPIA Compliance**: Full compliance with South African Protection of Personal Information Act

**Prohibited Data Collection:**
- Exact GPS locations
- Contact lists or social graphs without explicit consent
- Background activity monitoring
- Keystroke logging or screen recording
- Facial recognition or biometric data
- Data sharing with third parties without explicit consent

### 1.4 Full Transparency

**Principle:** No black boxes. Users understand how and why the system works.

**Implementation:**
- **Explainable Recommendations**: Every suggestion includes:
  - Plain-language reasoning
  - Factor weights (e.g., "35% based on your personal history")
  - Alternatives always provided
  - Confidence level shown
- **Algorithm Transparency**: Documentation of how AI makes decisions
- **Data Usage Transparency**: Clear explanation of what data is collected and why
- **Open Source**: Core algorithms published for community review

**Prohibited:**
- Unexplained recommendations
- Hidden algorithms or "secret sauce"
- Opaque data practices

### 1.5 Real-World Outcomes Over Engagement

**Principle:** Success is measured by life improvement, not platform usage.

**Primary Success Metrics:**
- Substance-free days (increasing)
- Quality of life scores (improving)
- Social connections (strengthening)
- Employment/education stability (improving)
- Mental health indicators (improving)

**Anti-Metrics (Should DECREASE):**
- Time spent on platform
- Session frequency
- AI interaction count

**Success Definition:** A user who needed the platform daily in early recovery but now only checks in weekly is a SUCCESS STORY, not a failure of engagement.

### 1.6 Cultural Humility

**Principle:** Respect and adapt to South Africa's diverse cultures, languages, and traditions.

**Implementation:**
- **11 Official Languages**: Full support for all South African languages
- **Provincial Adaptation**: Cultural customization for all 9 provinces
- **Traditional Healing Integration**: Respectful partnership with traditional healers
- **Faith Community Integration**: Support for faith-based recovery approaches
- **Community Governance**: Local communities have input on platform features
- **Cultural Metaphors**: Use culturally appropriate storytelling and communication styles

**Prohibited:**
- One-size-fits-all Western approaches
- Cultural appropriation or disrespect
- Ignoring traditional healing practices
- Language imperialism (English-only)

### 1.7 Anti-Platform Dependency

**Principle:** Platform design actively prevents addiction to the platform itself.

**Prohibited Design Patterns:**
- ❌ Infinite scroll
- ❌ Auto-play videos
- ❌ Variable reward schedules
- ❌ FOMO triggers ("5 people are viewing this")
- ❌ Notification bombardment
- ❌ Streak mechanics ("Don't break your 30-day streak!")
- ❌ Leaderboards or public comparison
- ❌ Gamification by default
- ❌ Artificial urgency ("Limited time offer!")

**Required Design Patterns:**
- ✅ Finite content (ends naturally)
- ✅ Prominent exit options
- ✅ Break suggestions
- ✅ Session timers (visible)
- ✅ Offline alternatives suggested
- ✅ Natural stopping points

### 1.8 Vulnerability Protection

**Principle:** Extra safeguards for vulnerable populations.

**Protected Groups:**
- **Early Recovery** (<90 days): More human oversight, AI not primary support, lower crisis thresholds
- **Youth** (<25 years): No gamification, parental options, screen time warnings, developmental considerations
- **Elderly** (>65 years): Simplified UI, large text, scam protection, accessibility features
- **Low Literacy**: Plain language, visual aids, audio support, no shaming
- **High Manipulation Vulnerability**: Enhanced monitoring, circuit breaker protections

**Enhanced Protections:**
- Lower crisis detection thresholds
- More frequent human check-ins required
- Stricter session limits
- Additional privacy safeguards
- Simplified consent processes

---

## 2. Ethical Risks Identified

### 2.1 Platform Addiction Risk

**Risk:** Using addictive design patterns to "engage" vulnerable populations creates new addiction.

**Mitigation:**
- Complete prohibition of known addictive design patterns
- Anti-addiction safeguards in code (ethics circuit breaker)
- Usage monitoring with automatic intervention
- Success metrics prioritize decreasing usage

### 2.2 Manipulation Risk

**Risk:** AI optimizes for engagement rather than genuine support.

**Mitigation:**
- Ethics circuit breaker evaluates all recommendations
- Engagement cannot exceed prevention goals by >1.5x
- Transparent reasoning prevents hidden manipulation
- Ethics board oversight of algorithm changes

### 2.3 Privacy Violations

**Risk:** Collecting unnecessary sensitive data about vulnerable individuals.

**Mitigation:**
- Data minimization principle enforced in code
- Granular consent required
- Geographic hashing instead of exact locations
- User can delete all data anytime
- POPIA compliance verified

### 2.4 Cultural Harm

**Risk:** Imposing Western recovery models on diverse South African cultures.

**Mitigation:**
- Cultural adaptation for all 11 languages and 9 provinces
- Integration with traditional healing
- Community governance structure
- Local success stories and role models
- Respect for collectivist vs individualist approaches

### 2.5 Inequity and Exclusion

**Risk:** Platform only accessible to privileged populations with smartphones and data.

**Mitigation:**
- Free at point of use
- Low-bandwidth optimization
- Offline functionality
- SMS/USSD fallback options
- Feature phone compatibility
- Available at community centers

### 2.6 False Sense of Support

**Risk:** Users rely on AI during crisis when human intervention needed.

**Mitigation:**
- Crisis detection triggers immediate human escalation
- After 3 AI sessions, require human connection
- AI positioned as bridge, not destination
- Prominent crisis hotline access

---

## 3. Required Safeguards

### 3.1 Ethics Circuit Breaker

**Purpose:** Automatically block recommendations that violate ethical principles.

**Checks:**
1. **Autonomy Preservation**: Does recommendation respect user control?
2. **Manipulation Detection**: Is engagement exceeding prevention by >1.5x?
3. **Excessive Engagement**: Is user exceeding 30 min/day or 5 sessions/day?
4. **Cultural Appropriateness**: Is recommendation culturally sensitive?
5. **Vulnerability Protection**: Are extra safeguards applied for vulnerable users?

**Action:** Block recommendation and provide alternative if any check fails.

### 3.2 Usage Monitoring

**Triggers:**
- **Yellow Flag**: >20 minutes/day average over 3 days → Suggest break
- **Orange Flag**: >30 minutes/day or >5 sessions/day → Human review required
- **Red Flag**: Sustained excessive use (3+ days) → Ethics board notification + mandatory counselor check-in

**Good Sign:** Decreasing usage over time while outcomes improve

### 3.3 Consent Management

**Requirements:**
- Granular consent for each data type
- Plain language (8th-grade reading level)
- Option to limit, anonymize, or decline
- Easy revocation process
- Consent audit trail
- Annual re-consent

### 3.4 Vulnerability Protection System

**Automatic Detection:**
- Early recovery indicators (<90 days)
- Age-based vulnerabilities (youth, elderly)
- Low literacy indicators
- High manipulation susceptibility patterns

**Protections Applied:**
- Simplified interfaces
- More human oversight
- Stricter time limits
- Lower crisis thresholds
- Enhanced privacy

---

## 4. South African Context

### 4.1 Nine Provinces

1. **Gauteng**: Urban, diverse, economic hub (Johannesburg, Pretoria)
2. **Western Cape**: Urban coastal, Afrikaans/English (Cape Town)
3. **KwaZulu-Natal**: Zulu culture, traditional strong (Durban, Pietermaritzburg)
4. **Eastern Cape**: Rural, Xhosa culture, traditional healing prominent
5. **Limpopo**: Rural, traditional practices, multiple languages
6. **Mpumalanga**: Mixed urban/rural, diverse cultures
7. **North West**: Tswana culture, mining communities
8. **Free State**: Farming communities, Sesotho culture
9. **Northern Cape**: Sparse population, diverse languages

### 4.2 Eleven Official Languages

1. **isiZulu** (24% speakers): KwaZulu-Natal, Gauteng
2. **isiXhosa** (16%): Eastern Cape, Western Cape
3. **Afrikaans** (13%): Western Cape, Northern Cape
4. **English** (10%): Universal secondary language
5. **Sepedi** (9%): Limpopo, Gauteng
6. **Setswana** (8%): North West, Northern Cape
7. **Sesotho** (8%): Free State, Gauteng
8. **Xitsonga** (4%): Limpopo, Mpumalanga
9. **siSwati** (3%): Mpumalanga
10. **Tshivenda** (2%): Limpopo
11. **isiNdebele** (2%): Mpumalanga, Gauteng

### 4.3 Integration Points

**Government:**
- Department of Social Development
- Department of Health
- South African Police Service (SAPS)

**NGOs:**
- **SANCA** (South African National Council on Alcoholism and Drug Dependence)
- **SADAG** (South African Depression and Anxiety Group)
- **Lifeline South Africa**

**Community:**
- AA/NA meetings (listings by municipality)
- Traditional healers (with respectful partnership)
- Faith communities (churches, mosques, temples)
- Community health workers

**Healthcare:**
- Public hospitals and clinics
- Community health centers
- Mental health services
- Rehabilitation facilities

### 4.4 Socioeconomic Considerations

**Digital Divide:**
- Feature phone support
- SMS/USSD fallback
- Offline functionality
- Low-bandwidth optimization
- Free data bundles (partnerships)

**Accessibility:**
- Available at libraries and community centers
- No cost at point of use
- Multiple language support
- Low literacy accommodations

---

## 5. Governance Structure

### 5.1 Ethics Board Composition (28 Members)

**Clinical Experts (4):**
- 2 addiction specialists
- 2 clinical psychologists (substance abuse specialization)

**Ethics Experts (3):**
- 1 bioethicist
- 1 AI ethics researcher
- 1 digital rights advocate

**Lived Experience (3):**
- 3 people in recovery (diverse backgrounds)

**Cultural Representatives (9):**
- 1 representative from each province

**Traditional/Spiritual (5):**
- 2 traditional healers
- 3 faith leaders (diverse traditions)

**Regulatory (2):**
- 1 POPIA compliance officer
- 1 legal advisor

**Age Diversity (2):**
- 1 youth representative (18-25)
- 1 elder representative (65+)

**Total: 28 members**

### 5.2 Ethics Board Powers

**Veto Authority:**
- Can block any feature or algorithm change
- Can require modifications before launch
- Can suspend operations if principles violated

**Review Requirements:**
- Quarterly audits of platform usage patterns
- Review all algorithm changes
- Approve new features before implementation
- Investigate ethical incidents

**Transparency:**
- Public reporting of decisions
- Anonymized case studies
- Annual ethics report

### 5.3 Accountability Mechanisms

**Quarterly Audits:**
- Usage pattern review (looking for platform addiction)
- Outcome metrics review
- Privacy compliance check
- Cultural sensitivity assessment

**Transparency Reports:**
- Published quarterly
- Include: usage statistics, ethical concerns, board decisions, outcome metrics
- Anonymized user feedback

**Incident Reporting:**
- Clear process for users, staff, and board
- Investigation within 72 hours
- Public summary of resolution
- Changes implemented to prevent recurrence

---

## 6. Research Ethics

### 6.1 IRB Requirements

**Required Approvals:**
- University IRB (UCT, Wits, or Stellenbosch recommended)
- Community advisory board approval
- Ethics board approval

**Key Considerations:**
- Risk of platform dependency must be disclosed
- Vulnerable population protections
- Ongoing monitoring protocol
- Data protection (POPIA compliance)

### 6.2 Pilot Protocol

**Phase 1: Small Pilot (N=200)**
- 6-month duration
- Weekly usage audits
- Monthly ethics board review
- Real-world outcome tracking
- User feedback sessions

**Inclusion Criteria:**
- Adults 18+ (with separate youth protocol if needed)
- South Africa residents
- Seeking substance abuse support
- Informed consent provided

**Exclusion Criteria:**
- Active psychosis
- Immediate crisis (referred to emergency services)
- Unable to provide informed consent

**Monitoring:**
- Weekly usage pattern review
- Red flags trigger immediate review
- User wellbeing check-ins (monthly)

### 6.3 Publication Commitment

**Transparency Pledge:**
- Publish results regardless of outcome
- Include negative findings
- Open data (anonymized, with consent)
- Peer-reviewed publication
- Community report (accessible language)

---

## 7. References and Research Base

### Academic Research on Addictive Algorithms

1. **Algorithmic Addiction by Design** (arXiv, 2025)
   - https://arxiv.org/abs/2505.00054
   - Documents design patterns that create digital addiction

2. **Regulating Addictive Algorithms** (Frontiers in Psychology, 2025)
   - https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1579604/full
   - Policy approaches to preventing algorithmic addiction

3. **Dark Patterns and Addictive Designs** (Weizenbaum Journal, 2024)
   - https://ojs.weizenbaum-institut.de/index.php/wjds/article/view/5_3_2/189
   - Catalog of manipulative design patterns

4. **Addictive Algorithms and Digital Fairness Act** (Harvard, 2025)
   - https://petrieflom.law.harvard.edu/2025/08/20/addictive-algorithms-and-the-digital-fairness-act-a-new-chapter-in-eu-public-health-policy/
   - Legal framework for algorithm regulation

### South African Context

5. **POPIA Act** (Protection of Personal Information Act, 2013)
   - https://popia.co.za/
   - South African data protection law

6. **National Drug Master Plan** (2019-2024)
   - South African government strategy on substance abuse

7. **Traditional Healing Practice Act** (2007)
   - Legal framework for traditional healing in SA

---

## 8. Continuous Improvement

This framework is a living document. Updates require:
- Ethics board approval
- Community consultation
- Transparent change log
- User notification

**Review Schedule:**
- Annual comprehensive review
- Quarterly check-ins
- Ad-hoc reviews for incidents

**Feedback Channels:**
- User feedback form
- Ethics board submissions
- Community forums
- Academic partnerships

---

## Conclusion

This ethical framework is our commitment to doing AI responsibly for vulnerable populations. **We will not sacrifice user wellbeing for growth metrics.** Success is measured by real-world recovery outcomes, not platform engagement.

Every technical decision must be filtered through these ethical principles. When in doubt, we choose autonomy, transparency, and human connection over convenience or engagement.

**This is not just code—it's a commitment to ethical AI in healthcare.**

---

*Version 1.0 | December 2025*
*PreRecoveryPath SA Ethics Committee*

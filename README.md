# 🛡️ PreRecoveryPath SA
## Ethical AI-Powered Substance Abuse Prevention for South Africa

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Ethics First](https://img.shields.io/badge/Ethics-First-green.svg)](docs/ETHICS_FRAMEWORK.md)
[![POPIA Compliant](https://img.shields.io/badge/POPIA-Compliant-blue.svg)](docs/ETHICS_FRAMEWORK.md#data-minimization--popia-compliance)

---

## 🌟 Our Commitment

**We help users need the platform LESS over time, not MORE.**

PreRecoveryPath SA is fundamentally different from typical AI platforms. We do not optimize for engagement, screen time, or user retention. Instead, we measure success by **real-world recovery outcomes** while users **decrease** their platform usage as they build independence.

### Core Ethical Principles (Non-Negotiable)

1. **User Autonomy Always Primary** - Users initiate, control, and can exit anytime
2. **Human Connection Over AI** - AI supplements, never replaces human support
3. **Data Minimization & POPIA Compliance** - Collect only essential data with granular consent
4. **Full Transparency** - Every recommendation includes plain-language reasoning
5. **Real-World Outcomes Over Engagement** - Success = life improvement + decreasing usage
6. **Cultural Humility** - Respect for SA's 11 languages, 9 provinces, diverse traditions
7. **Anti-Platform Dependency** - No infinite scroll, auto-play, streaks, or other addictive patterns
8. **Vulnerability Protection** - Extra safeguards for early recovery, youth, elderly, low literacy

**📖 Read Full Ethics Framework:** [`docs/ETHICS_FRAMEWORK.md`](docs/ETHICS_FRAMEWORK.md)

---

## 🎯 What Makes Us Different

### ❌ What We DON'T Do

- **No addictive algorithms** (no infinite scroll, auto-play, variable rewards, FOMO triggers)
- **No engagement optimization** (we want you to use us LESS as you grow)
- **No surveillance** (minimal data, geographic hashing, no exact locations)
- **No manipulation** (transparent reasoning, prominent exits, user control)
- **No cultural imposition** (11 languages, provincial adaptation, traditional healing respect)

### ✅ What We DO

- **Ethics Circuit Breaker** as first layer - blocks any recommendation violating ethical principles
- **Session Limits** - 10-minute warnings, 30-minute daily maximum (enforced)
- **Human-First Design** - After 3 AI sessions, require human connection
- **Transparent AI** - Every recommendation includes reasoning and alternatives
- **Success = Independence** - Celebrate users needing platform LESS
- **Community Integration** - SANCA, AA/NA, traditional healers, faith communities
- **POPIA Compliant** - User data rights, consent, export/delete anytime

---

## 🇿🇦 South African Context

### Languages Supported (All 11 Official)
isiZulu • isiXhosa • Afrikaans • English • Sepedi • Setswana • Sesotho • Xitsonga • siSwati • Tshivenda • isiNdebele

### Provincial Adaptation (All 9 Provinces)
Gauteng • Western Cape • KwaZulu-Natal • Eastern Cape • Limpopo • Mpumalanga • North West • Free State • Northern Cape

### Integration Points
- 🏥 **SANCA** (South African National Council on Alcoholism and Drug Dependence)
- 🤝 **AA/NA** meetings (by municipality)
- 🌿 **Traditional Healers** (respectful partnership)
- ⛪ **Faith Communities** (churches, mosques, temples)
- 📞 **Crisis Lines** (SADAG, Lifeline, Emergency Services)

**📖 Read SA Cultural Guide:** [`docs/SA_CULTURAL_GUIDE.md`](docs/SA_CULTURAL_GUIDE.md)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────┐
│  ETHICS CIRCUIT BREAKER (Layer 1)      │
│  Every request evaluated - blocks      │
│  ethical violations before reaching     │
│  users                                  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  CORE ENGINES                           │
│  • Autonomy Engine (user control)      │
│  • Empowerment Engine (build capacity) │
│  • Usage Monitor (flag excessive use)  │
│  • Anti-Addiction Safeguards           │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  AI & COMMUNITY                         │
│  • Explainable AI (transparent)        │
│  • Cultural Adapter (11 langs/9 prov)  │
│  • Crisis Detection (human escalation) │
│  • Community Integration (SANCA/AA/NA) │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  DATA & PRIVACY                         │
│  • Ethical Data Governance             │
│  • Consent Manager (granular)          │
│  • POPIA Compliance                    │
└─────────────────────────────────────────┘
```

**📖 Read Full Architecture:** [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ LTS
- PostgreSQL 15+
- npm 9+

### Installation

```bash
# Clone repository
git clone https://github.com/Akgosil3/PreRecoveryPath-SA.git
cd PreRecoveryPath-SA

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your settings
nano .env

# Set up database
npm run db:setup

# Load SA provinces and resources
npm run setup:provinces

# Start development server
npm run dev
```

### Environment Variables

See [`.env.example`](.env.example) for full configuration. Key settings:

```env
# Ethics Configuration
MAX_DAILY_MINUTES=30
MAX_SESSION_MINUTES=10
CRISIS_THRESHOLD=0.95

# POPIA Compliance
POPIA_MODE=strict
DATA_RETENTION_DAYS=90
```

---

## 📚 Documentation

### Ethics & Governance
- **[Ethics Framework](docs/ETHICS_FRAMEWORK.md)** - Foundational ethical principles
- **[Ethics Board Charter](docs/ETHICS_BOARD_CHARTER.md)** - 28-member board with veto power
- **[Community Consultation Guide](docs/COMMUNITY_CONSULTATION_GUIDE.md)** - 9-province listening tour
- **[Code of Conduct](docs/CODE_OF_CONDUCT.md)** - Community standards

### Technical
- **[Architecture](docs/ARCHITECTURE.md)** - System design with ethics as infrastructure
- **[API Documentation](docs/API_DOCUMENTATION.md)** - Privacy-preserving API
- **[Contributing Guidelines](docs/CONTRIBUTING.md)** - Ethics-first contribution process

### Cultural
- **[SA Cultural Guide](docs/SA_CULTURAL_GUIDE.md)** - 11 languages, 9 provinces, cultural norms

### Research
- **[IRB Application Template](docs/IRB_APPLICATION_TEMPLATE.md)** - University ethics review template

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Ethics tests (CRITICAL - must pass)
npm run test:ethics

# Coverage report
npm run test:coverage
```

### Ethics Test Suite
Tests that:
- Session limits are enforced
- Prohibited patterns are blocked
- Consent is required
- User can delete data
- Crisis detection triggers human intervention

---

## 🤝 Contributing

**We welcome contributions that uphold our ethical principles!**

Before contributing:
1. Read [`docs/ETHICS_FRAMEWORK.md`](docs/ETHICS_FRAMEWORK.md)
2. Read [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md)
3. Follow [`docs/CODE_OF_CONDUCT.md`](docs/CODE_OF_CONDUCT.md)

**Key Points:**
- Ethics Board approval required for new features
- No addictive patterns accepted
- Cultural sensitivity required
- User wellbeing > all else

---

## 📊 Success Metrics

**We measure success differently:**

### Primary Metrics (Should INCREASE)
- ✅ Substance-free days
- ✅ Quality of life scores
- ✅ Social connection strength
- ✅ Real-world coping skills

### Anti-Metrics (Should DECREASE)
- 📉 Platform usage time
- 📉 Session frequency
- 📉 AI interaction ratio

**Success Story:** A user who needed daily support in early recovery but now only checks in monthly is a SUCCESS, not a loss.

---

## 🛡️ Ethics Board

**28-member board with veto power** including:
- 2 addiction specialists
- 2 psychologists
- 3 people in recovery
- 9 provincial representatives
- 2 traditional healers
- 3 faith leaders
- 1 AI ethics researcher
- 1 digital rights advocate
- 1 POPIA officer
- Youth and elder representatives

**Power:** Can block any feature or algorithm change. User wellbeing > organizational interests.

---

## 📞 Crisis Resources

**If you or someone you know needs immediate help:**

- **SADAG 24/7 Crisis Line:** 0800 567 567
- **SANCA National:** 0861 472 622
- **Lifeline SA:** 0861 322 322
- **Emergency Services:** 10111 or 112

---

## 📄 License

MIT License - See [LICENSE](LICENSE)

**Note:** While code is open source, ethical principles are non-negotiable. Any fork must maintain ethics-first approach.

---

## 🌍 Languages / Izilimi / Tale

This README is available in:
- English (current)
- isiZulu (coming soon)
- isiXhosa (coming soon)
- Afrikaans (coming soon)
- [All 11 SA languages coming soon]

---

## 💬 Contact

- **General Inquiries:** info@prerecoverypath.org.za
- **Ethics Questions:** ethics@prerecoverypath.org.za
- **Security Issues:** security@prerecoverypath.org.za
- **Community Support:** support@prerecoverypath.org.za

---

## 🙏 Acknowledgments

This platform exists because of:
- People in recovery who shared their stories
- Communities across SA's 9 provinces
- Traditional healers who partner with us
- SANCA, SADAG, Lifeline, and AA/NA SA
- Ethics board members who hold us accountable
- Contributors who prioritize user wellbeing

---

**This is not just code—it's a commitment to doing AI ethically for vulnerable populations.**

**Ubuntu:** *Umuntu ngumuntu ngabantu* (A person is a person through other people)

---

*Version 1.0 | December 2025*

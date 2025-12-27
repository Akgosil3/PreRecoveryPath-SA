# Contributing to PreRecoveryPath SA
## Ethics-First Contribution Guidelines

**Welcome!** We're grateful for your interest in contributing to PreRecoveryPath SA. This platform serves vulnerable populations affected by substance abuse, so we have extra responsibilities to ensure our work is ethical, safe, and helpful.

---

## 🛡️ Ethics First

**Before you contribute anything, understand:**

1. **User Wellbeing > All Else:** No feature or optimization is worth harming users
2. **Ethics Board Approval Required:** Major features must be approved before implementation
3. **Autonomous Users:** We help users need the platform LESS, not MORE
4. **Transparent Always:** No black boxes, no manipulation, no hidden patterns
5. **Cultural Humility:** South Africa's diversity is central, not an afterthought

**If you're not comfortable with these principles, this may not be the right project for you.**

---

## 📋 Table of Contents

1. [How to Contribute](#how-to-contribute)
2. [Types of Contributions](#types-of-contributions)
3. [Ethics Review Process](#ethics-review-process)
4. [Development Setup](#development-setup)
5. [Code Standards](#code-standards)
6. [Testing Requirements](#testing-requirements)
7. [Documentation](#documentation)
8. [Pull Request Process](#pull-request-process)
9. [Community Guidelines](#community-guidelines)

---

## How to Contribute

### 1. Read the Ethics Framework

**Before contributing ANYTHING, read:**
- `docs/ETHICS_FRAMEWORK.md` - Core principles
- `docs/ETHICS_BOARD_CHARTER.md` - Governance structure
- `docs/CODE_OF_CONDUCT.md` - Community standards

**Understand:** We're building something fundamentally different from engagement-driven platforms.

### 2. Check Existing Issues

Browse [GitHub Issues](https://github.com/Akgosil3/PreRecoveryPath-SA/issues) to find:
- `good first issue` - Beginner-friendly tasks
- `help wanted` - Need contributors
- `ethics review needed` - Awaiting ethics board
- `documentation` - Documentation improvements
- `translation` - Language support needs

### 3. Discuss Before Building

**For Significant Changes:**
- Open an issue describing your proposal
- Wait for maintainer/ethics board feedback
- Get approval before investing significant time

**Why?** 
- Avoid wasted effort if proposal conflicts with ethics principles
- Ensure alignment with project direction
- Coordinate with others who may be working on related features

### 4. Fork, Branch, Code

```bash
# Fork the repository on GitHub

# Clone your fork
git clone https://github.com/YOUR_USERNAME/PreRecoveryPath-SA.git
cd PreRecoveryPath-SA

# Add upstream remote
git remote add upstream https://github.com/Akgosil3/PreRecoveryPath-SA.git

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes, commit, push
git add .
git commit -m "feat: descriptive commit message"
git push origin feature/your-feature-name
```

### 5. Open Pull Request

**When ready, open a PR with:**
- Clear description of changes
- Reference to related issue (#123)
- Ethics justification (why this serves users)
- Cultural considerations (if applicable)
- Testing completed
- Screenshots (if UI change)

---

## Types of Contributions

### 💻 Code Contributions

**We Welcome:**
- Bug fixes
- Performance improvements (that don't compromise ethics)
- New features (with ethics board approval)
- Test coverage improvements
- Accessibility enhancements
- Security improvements

**We DON'T Accept:**
- Addictive design patterns (infinite scroll, auto-play, variable rewards, etc.)
- Privacy violations or unnecessary data collection
- Features that prioritize engagement over wellbeing
- Culturally insensitive implementations
- Gamification that creates dependency
- Black-box algorithms without explainability

### 📚 Documentation Contributions

**Always Welcome:**
- Typo and grammar fixes
- Clarity improvements
- Translation (all 11 SA languages)
- Examples and tutorials
- Architecture documentation
- Cultural guide additions (with cultural expertise)

**Process:**
- Small fixes: Just open PR
- Large additions: Discuss in issue first
- Translations: Must be by native speaker or professional translator

### 🌍 Translation Contributions

**Critical Need:** Authentic translations in all 11 SA languages

**Requirements:**
- Native speaker OR professional translator
- Cultural adaptation, not just word-for-word
- Review by second native speaker
- Plain language (8th-grade reading level)
- Respectful and appropriate terminology

**Languages Needed:**
isiZulu, isiXhosa, Afrikaans, English, Sepedi, Setswana, Sesotho, Xitsonga, siSwati, Tshivenda, isiNdebele

**What to Translate:**
- UI strings
- Documentation (key documents)
- User-facing messages
- Crisis resources
- Help content

### 🎨 Design Contributions

**We Welcome:**
- Accessibility improvements (WCAG 2.1 AA+)
- Anti-addiction UI patterns
- Cultural adaptations for visual design
- Iconography improvements
- Low-bandwidth optimization

**Design Principles:**
- No infinite scroll
- Prominent exit options
- Visible session timers
- Natural stopping points
- Plain language labels
- High contrast options
- Large touch targets

### 🧪 Testing Contributions

**We Need:**
- Unit tests
- Integration tests
- **Ethics tests** (test that prohibited patterns are blocked)
- Accessibility tests
- Cultural appropriateness tests
- Performance tests

**Priority:**
- Ethics circuit breaker tests
- Session limit enforcement
- Crisis detection accuracy
- Consent management
- Data privacy protections

### 📊 Data and Research Contributions

**We Welcome:**
- SA substance abuse resources (SANCA, AA/NA, traditional healers, etc.)
- Cultural insights (with cultural authority)
- Outcome metrics suggestions
- Research on ethical AI
- Usability research

**Requirements:**
- Cite sources
- Respect privacy (no identifiable data)
- Cultural consultation for cultural content
- Ethics board review for research protocols

---

## Ethics Review Process

### When Ethics Review Required

**Mandatory Ethics Board Review:**
- New features (any)
- Algorithm changes
- Data collection modifications
- UI patterns that could affect engagement
- Integration with third-party services
- Changes to consent processes

**Automatic (No Review Needed):**
- Bug fixes (no feature change)
- Documentation improvements
- Translation (faithful to original)
- Performance optimizations (no behavior change)
- Test additions

### How to Request Ethics Review

1. **Label PR/Issue:** `ethics-review-needed`
2. **Complete Ethics Checklist:**
   ```markdown
   ## Ethics Checklist
   
   ### User Autonomy
   - [ ] Users maintain full control
   - [ ] Exit options clear and accessible
   - [ ] No manipulation or dark patterns
   
   ### Transparency
   - [ ] Reasoning is explainable
   - [ ] No hidden behaviors
   - [ ] Users understand what's happening
   
   ### Data Privacy
   - [ ] Minimal data collection
   - [ ] Consent appropriately obtained
   - [ ] User can access/delete data
   
   ### Cultural Sensitivity
   - [ ] Culturally appropriate across SA contexts
   - [ ] No cultural imposition
   - [ ] Consultation completed (if needed)
   
   ### Anti-Addiction
   - [ ] Does not use prohibited patterns
   - [ ] Encourages platform independence
   - [ ] Respects session limits
   
   ### Vulnerability Protection
   - [ ] Safeguards for vulnerable users
   - [ ] No exploitation risk
   - [ ] Enhanced protections applied
   ```

3. **Wait for Board Review:** May take 2-4 weeks for quarterly board meetings

### Ethics Board Decision

**Possible Outcomes:**
- ✅ **Approved:** Proceed with implementation
- 🔄 **Approved with Modifications:** Make requested changes, then proceed
- ⏸️ **Deferred:** Need more information or consultation
- ❌ **Rejected:** Conflicts with ethics principles, cannot proceed

**Appeal:** If you believe decision is incorrect, you may appeal to full board with justification.

---

## Development Setup

### Prerequisites

- **Node.js** 18+ LTS
- **npm** 9+
- **PostgreSQL** 15+ (for local database)
- **Git**
- **Python** 3.10+ (for AI/ML components)

### Setup Steps

```bash
# Clone repository
git clone https://github.com/Akgosil3/PreRecoveryPath-SA.git
cd PreRecoveryPath-SA

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your local settings
nano .env

# Set up database
npm run db:setup

# Load SA provinces and resources data
npm run setup:provinces

# Start development server
npm run dev
```

### Project Structure

```
PreRecoveryPath-SA/
├── docs/                    # Documentation
├── src/                     # Source code
│   ├── core/               # Core engines (autonomy, empowerment, ethics)
│   ├── data/               # Data management (privacy, consent, POPIA)
│   ├── ai/                 # AI components (explainable, cultural, crisis)
│   ├── community/          # Community integration
│   ├── protection/         # Vulnerability protection
│   ├── ui/                 # User interface components
│   └── utils/              # Utilities (provinces, languages, resources)
├── config/                  # Configuration files
├── tests/                   # Test suites
│   └── ethics/             # Ethics-specific tests
├── research/                # Research protocols and IRB materials
└── ethics/                  # Ethics governance documents
```

---

## Code Standards

### JavaScript/TypeScript

**Style:**
- ES6+ features
- 2-space indentation
- Single quotes for strings
- Semicolons required
- Meaningful variable names

**Linting:**
```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix where possible
```

**Example:**
```javascript
// Good
const userName = getUserName();
if (userName) {
  console.log(`Hello, ${userName}`);
}

// Bad
var user_name=getUserName()
if(user_name){console.log("Hello, "+user_name)}
```

### Ethical Code Principles

**1. Transparency in Code**
```javascript
// Good - Transparent reasoning
function suggestSupport(userContext) {
  const factors = analyzeFactors(userContext);
  return {
    suggestion: '...',
    reasoning: `Based on ${factors.primary} (${factors.weights.primary}%)...`,
    alternatives: ['...']
  };
}

// Bad - Black box
function suggestSupport(userContext) {
  return magicAlgorithm(userContext); // No transparency
}
```

**2. User Autonomy in Code**
```javascript
// Good - User control
function displayRecommendation(rec) {
  return {
    content: rec,
    exitButton: true,
    optOutOption: true,
    timeRemaining: getSessionTimeRemaining()
  };
}

// Bad - Forced engagement
function displayRecommendation(rec) {
  return rec; // No exit, no control
}
```

**3. No Addictive Patterns**
```javascript
// Good - Finite content
function getContent(userId) {
  const content = fetchContent(userId);
  return {
    content: content,
    hasMore: false, // Explicit end
    nextAction: 'Take a break or exit'
  };
}

// Bad - Infinite scroll
function getContent(userId, offset) {
  return {
    content: fetchContent(userId, offset),
    hasMore: true, // Infinite
    loadMore: () => getContent(userId, offset + 10) // Auto-loads
  };
}
```

### Comments

**When to Comment:**
- Ethical justifications
- Complex logic
- Cultural considerations
- Security considerations
- Workarounds or non-obvious code

**Example:**
```javascript
// Ethics: Lower crisis threshold for early recovery (<90 days)
// to ensure more frequent human check-ins and support
if (userProfile.recoveryDays < 90) {
  crisisThreshold = 0.70; // Lower than standard 0.80
}
```

---

## Testing Requirements

### Test Coverage Goals

- **Core Components:** 90%+ coverage
- **Ethics Circuit Breaker:** 100% coverage (critical)
- **Crisis Detection:** 100% coverage (safety)
- **Consent Management:** 95%+ coverage (legal)

### Test Types

**1. Unit Tests**
```bash
npm run test:unit
```

**2. Integration Tests**
```bash
npm run test:integration
```

**3. Ethics Tests (CRITICAL)**
```bash
npm run test:ethics
```

**Ethics Test Examples:**
```javascript
describe('Ethics Circuit Breaker', () => {
  it('should block recommendations that exceed session limits', async () => {
    const user = mockUser({ minutesToday: 30 });
    const recommendation = await requestSupport(user);
    
    expect(recommendation.blocked).toBe(true);
    expect(recommendation.reason).toBe('session_limit_exceeded');
  });
  
  it('should block infinite scroll patterns', async () => {
    const content = { hasMore: true, autoLoad: true };
    const result = ethicsCircuitBreaker.evaluate(content);
    
    expect(result.allowed).toBe(false);
    expect(result.violation).toBe('infinite_scroll_prohibited');
  });
});
```

**4. Accessibility Tests**
```bash
npm run test:a11y
```

### Running Tests

```bash
# All tests
npm test

# Watch mode (during development)
npm run test:watch

# Coverage report
npm run test:coverage

# Ethics tests only (before PR)
npm run test:ethics
```

### Test Requirements for PRs

**All PRs Must:**
- Pass all existing tests
- Add tests for new functionality
- Maintain or improve coverage
- Pass ethics tests (if applicable)
- Pass accessibility tests (if UI change)

---

## Documentation

### Documentation Requirements

**All New Features Must Include:**
- Code comments (inline, where complex)
- Function/class documentation (JSDoc)
- User-facing documentation (if applicable)
- Ethics justification (why this serves users)
- Cultural considerations (if applicable)

### JSDoc Example

```javascript
/**
 * Evaluates user request against ethical boundaries
 * 
 * @param {Object} request - User support request
 * @param {string} request.userId - User identifier
 * @param {string} request.context - Request context
 * @param {number} request.urgency - Urgency level (0-1)
 * @returns {Object} Ethical evaluation result
 * @returns {boolean} returns.allowed - Whether request is ethically permitted
 * @returns {string} returns.reason - Explanation of decision (transparent)
 * @returns {Array<string>} returns.alternatives - Alternative actions
 * 
 * @example
 * const result = await ethicsCircuitBreaker.evaluate({
 *   userId: 'usr_123',
 *   context: 'feeling_triggered',
 *   urgency: 0.7
 * });
 */
async function evaluate(request) {
  // Implementation
}
```

---

## Pull Request Process

### Before Opening PR

**Checklist:**
- [ ] Code follows style guide
- [ ] All tests pass
- [ ] New tests added for new functionality
- [ ] Documentation updated
- [ ] Ethics considerations addressed
- [ ] Cultural sensitivity reviewed (if applicable)
- [ ] Accessibility checked (if UI change)
- [ ] Commit messages are clear and descriptive

### PR Template

When opening PR, fill out:

```markdown
## Description
Brief description of changes

## Related Issue
Closes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature (ethics board approval required)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Ethics Checklist
- [ ] User autonomy maintained
- [ ] No addictive patterns introduced
- [ ] Data privacy respected
- [ ] Transparent reasoning provided
- [ ] Cultural sensitivity considered

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Ethics tests pass
- [ ] Accessibility tests pass (if UI)

## Screenshots (if UI change)
[Attach screenshots]

## Additional Notes
Any other context or considerations
```

### Review Process

1. **Automated Checks:** CI/CD runs tests, linting
2. **Code Review:** Maintainer reviews code quality
3. **Ethics Review:** If needed, ethics board review
4. **Cultural Review:** If applicable, cultural consultant review
5. **Approval:** 1+ maintainer approval required
6. **Merge:** Squash and merge to main branch

### After Merge

- PR is closed
- Branch can be deleted
- Changes deployed to staging for testing
- Production deployment after staging validation

---

## Community Guidelines

### Communication Channels

- **GitHub Issues:** Bug reports, feature proposals
- **GitHub Discussions:** General questions, ideas
- **Email:** ethics@prerecoverypath.org.za (ethics questions)

### Be Respectful

- Read and follow `CODE_OF_CONDUCT.md`
- Be patient with contributors of all skill levels
- Assume good intentions
- Give constructive feedback
- Celebrate contributions

### Ask for Help

**If You're Stuck:**
- Check existing documentation
- Search closed issues/PRs
- Ask in GitHub Discussions
- Reach out to maintainers
- **No question is too basic!**

---

## Recognition

**We Value All Contributions:**
- Code contributors listed in `CONTRIBUTORS.md`
- Significant contributions acknowledged in release notes
- Community awards for outstanding contributions
- Speaking opportunities at community events

**Types of Recognition:**
- First-time contributor badge
- Ethics champion (for ethics-focused contributions)
- Cultural bridge-builder (for cultural adaptation work)
- Testing hero (for significant test contributions)

---

## Questions?

**Have Questions About Contributing?**
- **General:** Open a GitHub Discussion
- **Ethics:** ethics@prerecoverypath.org.za
- **Code:** Open an issue with `question` label
- **Security:** security@prerecoverypath.org.za

---

## Thank You!

Thank you for considering contributing to PreRecoveryPath SA. Your work helps vulnerable individuals affected by substance abuse while upholding the highest ethical standards.

**Remember:** We're not just building software—we're building a platform that could genuinely help people recover and build better lives. That's a privilege and a responsibility.

**Let's build something ethical together.**

---

*Version 1.0 | December 2025*  
*PreRecoveryPath SA Community*

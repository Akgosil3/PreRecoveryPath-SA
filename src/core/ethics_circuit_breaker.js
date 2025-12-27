/**
 * Ethics Circuit Breaker
 * 
 * CRITICAL COMPONENT: First line of defense against ethical violations
 * Every recommendation and UI pattern must pass through this before reaching users
 * 
 * This is not optional middleware - it's the foundation of the platform
 */

class EthicsCircuitBreaker {
  constructor() {
    // Prohibited addictive patterns (NEVER allow)
    this.prohibitedPatterns = {
      infiniteScroll: {
        name: 'Infinite Scroll',
        description: 'Endless content that never stops',
        harm: 'Creates mindless scrolling addiction',
        alternatives: ['Finite pages with clear end', 'Natural stopping points']
      },
      autoPlay: {
        name: 'Auto-Play',
        description: 'Automatically playing next content',
        harm: 'Removes user agency, creates passive consumption',
        alternatives: ['User must explicitly choose to continue']
      },
      variableRewards: {
        name: 'Variable Reward Schedules',
        description: 'Unpredictable rewards (like slot machines)',
        harm: 'Hijacks dopamine system, creates compulsive checking',
        alternatives: ['Predictable, transparent outcomes']
      },
      fomoTriggers: {
        name: 'FOMO Triggers',
        description: '"5 people viewing", "Limited time", "Don\'t miss out"',
        harm: 'Creates artificial urgency and anxiety',
        alternatives: ['Calm, pressure-free interface']
      },
      notificationBombardment: {
        name: 'Notification Bombardment',
        description: 'Frequent push notifications to pull users back',
        harm: 'Disrupts life, creates dependency',
        alternatives: ['User-controlled notifications only']
      },
      streakMechanics: {
        name: 'Streak Mechanics',
        description: '"Don\'t break your 30-day streak!"',
        harm: 'Creates guilt and compulsion to engage',
        alternatives: ['Celebrate progress without manipulation']
      },
      leaderboards: {
        name: 'Public Leaderboards',
        description: 'Competitive rankings',
        harm: 'Creates unhealthy comparison, pressure to engage more',
        alternatives: ['Personal progress tracking only']
      },
      artificialUrgency: {
        name: 'Artificial Urgency',
        description: 'Fake scarcity or time pressure',
        harm: 'Manipulates decision-making',
        alternatives: ['Honest, transparent communication']
      }
    };

    // Required ethical elements
    this.requiredElements = {
      exitButton: {
        name: 'Prominent Exit Button',
        requirement: 'Large, accessible "I\'m Done" button',
        purpose: 'User can leave anytime without friction'
      },
      transparentReasoning: {
        name: 'Transparent Reasoning',
        requirement: 'Plain-language explanation for all recommendations',
        purpose: 'User understands why they see what they see'
      },
      sessionTimer: {
        name: 'Visible Session Timer',
        requirement: 'User can see how long they\'ve been engaged',
        purpose: 'Time transparency'
      },
      alternatives: {
        name: 'Alternative Options',
        requirement: 'Always provide 2+ alternative actions',
        purpose: 'User choice and autonomy'
      }
    };

    // Ethical thresholds
    this.thresholds = {
      maxDailyMinutes: 30,
      maxSessionMinutes: 10,
      maxDailySessions: 5,
      engagementPreventionRatio: 1.5, // Engagement can't exceed prevention by more than 1.5x
      crisisThreshold: 0.95
    };
  }

  /**
   * Evaluate recommendation for ethical compliance
   * BLOCKS recommendation if any ethical boundary violated
   * 
   * @param {Object} recommendation - Recommendation to evaluate
   * @param {Object} userContext - User context for evaluation
   * @returns {Promise<Object>} Evaluation result (allowed/blocked + reasoning)
   */
  async evaluate(recommendation, userContext) {
    const violations = [];

    // Check 1: Autonomy Preservation
    const autonomyCheck = this.checkAutonomyPreservation(recommendation);
    if (!autonomyCheck.passed) {
      violations.push(autonomyCheck);
    }

    // Check 2: Manipulation Detection
    const manipulationCheck = this.checkManipulation(recommendation, userContext);
    if (!manipulationCheck.passed) {
      violations.push(manipulationCheck);
    }

    // Check 3: Excessive Engagement
    const engagementCheck = this.checkExcessiveEngagement(userContext);
    if (!engagementCheck.passed) {
      violations.push(engagementCheck);
    }

    // Check 4: Cultural Appropriateness
    const culturalCheck = await this.checkCulturalAppropriateness(recommendation, userContext);
    if (!culturalCheck.passed) {
      violations.push(culturalCheck);
    }

    // Check 5: Vulnerability Protection
    const vulnerabilityCheck = this.checkVulnerabilityProtection(recommendation, userContext);
    if (!vulnerabilityCheck.passed) {
      violations.push(vulnerabilityCheck);
    }

    // Determine if recommendation is allowed
    const allowed = violations.length === 0;

    if (!allowed) {
      // BLOCK and provide alternative
      return {
        allowed: false,
        blocked: true,
        violations,
        alternative: this.provideEthicalAlternative(recommendation, violations, userContext),
        message: 'This recommendation was blocked by ethics circuit breaker',
        reason: violations.map(v => v.violation).join(', '),
        
        // Log for ethics board review
        loggedForReview: true,
        timestamp: new Date().toISOString()
      };
    }

    // ALLOW - passes all checks
    return {
      allowed: true,
      blocked: false,
      message: 'Recommendation passes ethical evaluation',
      checks: {
        autonomy: autonomyCheck,
        manipulation: manipulationCheck,
        engagement: engagementCheck,
        cultural: culturalCheck,
        vulnerability: vulnerabilityCheck
      }
    };
  }

  /**
   * Check 1: Autonomy Preservation
   * User must maintain control at all times
   * 
   * @param {Object} recommendation - Recommendation to check
   * @returns {Object} Check result
   */
  checkAutonomyPreservation(recommendation) {
    const issues = [];

    // Must have prominent exit option
    if (!recommendation.exitButton || !recommendation.exitButton.prominent) {
      issues.push('Missing prominent exit button');
    }

    // Must have transparent reasoning
    if (!recommendation.reasoning || !recommendation.reasoning.explanation) {
      issues.push('Missing transparent reasoning');
    }

    // Must provide alternatives (user choice)
    if (!recommendation.alternatives || recommendation.alternatives.length < 2) {
      issues.push('Insufficient alternatives provided (need 2+)');
    }

    // Must allow user override
    if (recommendation.override === false) {
      issues.push('User override not allowed');
    }

    // Check for hidden or manipulative UI patterns
    if (recommendation.ui) {
      if (recommendation.ui.exitDifficult === true) {
        issues.push('Exit is intentionally difficult');
      }
      if (recommendation.ui.darkPatterns === true) {
        issues.push('Dark patterns detected');
      }
    }

    return {
      check: 'autonomy_preservation',
      passed: issues.length === 0,
      issues,
      violation: issues.length > 0 ? 'autonomy_violation' : null,
      severity: issues.length > 0 ? 'critical' : null
    };
  }

  /**
   * Check 2: Manipulation Detection
   * Detect if engagement is prioritized over genuine support
   * 
   * @param {Object} recommendation - Recommendation to check
   * @param {Object} userContext - User context
   * @returns {Object} Check result
   */
  checkManipulation(recommendation, userContext) {
    const issues = [];

    // Check for prohibited addictive patterns
    for (const [pattern, info] of Object.entries(this.prohibitedPatterns)) {
      if (recommendation[pattern] === true || 
          (recommendation.ui && recommendation.ui[pattern] === true)) {
        issues.push({
          pattern,
          name: info.name,
          harm: info.harm,
          severity: 'critical'
        });
      }
    }

    // Check engagement vs prevention ratio
    if (recommendation.metrics) {
      const { engagementScore, preventionScore } = recommendation.metrics;
      if (engagementScore > preventionScore * this.thresholds.engagementPreventionRatio) {
        issues.push({
          pattern: 'engagement_over_prevention',
          detail: `Engagement (${engagementScore}) exceeds prevention (${preventionScore}) by more than ${this.thresholds.engagementPreventionRatio}x`,
          severity: 'critical'
        });
      }
    }

    // Check for hidden persuasion
    if (recommendation.persuasionTechniques && recommendation.persuasionTechniques.length > 0) {
      issues.push({
        pattern: 'persuasion_techniques',
        techniques: recommendation.persuasionTechniques,
        severity: 'high'
      });
    }

    return {
      check: 'manipulation_detection',
      passed: issues.length === 0,
      issues,
      violation: issues.length > 0 ? 'manipulation_detected' : null,
      severity: issues.some(i => i.severity === 'critical') ? 'critical' : 'high'
    };
  }

  /**
   * Check 3: Excessive Engagement
   * User exceeding healthy usage limits
   * 
   * @param {Object} userContext - User context with usage data
   * @returns {Object} Check result
   */
  checkExcessiveEngagement(userContext) {
    const { usageToday, sessionsToday, sessionMinutes } = userContext;
    const issues = [];

    // Check daily time limit
    if (usageToday >= this.thresholds.maxDailyMinutes) {
      issues.push({
        limit: 'daily_minutes',
        current: usageToday,
        max: this.thresholds.maxDailyMinutes,
        message: `User has reached daily ${this.thresholds.maxDailyMinutes}-minute limit`,
        severity: 'critical'
      });
    }

    // Check session frequency
    if (sessionsToday >= this.thresholds.maxDailySessions) {
      issues.push({
        limit: 'daily_sessions',
        current: sessionsToday,
        max: this.thresholds.maxDailySessions,
        message: `User has ${sessionsToday} sessions today (max ${this.thresholds.maxDailySessions})`,
        severity: 'high'
      });
    }

    // Check current session length
    if (sessionMinutes >= this.thresholds.maxSessionMinutes) {
      issues.push({
        limit: 'session_minutes',
        current: sessionMinutes,
        max: this.thresholds.maxSessionMinutes,
        message: `Current session ${sessionMinutes} minutes (suggest break at ${this.thresholds.maxSessionMinutes} minutes)`,
        severity: 'medium'
      });
    }

    return {
      check: 'excessive_engagement',
      passed: issues.filter(i => i.severity === 'critical').length === 0,
      issues,
      violation: issues.length > 0 ? 'excessive_use' : null,
      severity: issues.some(i => i.severity === 'critical') ? 'critical' : 'medium'
    };
  }

  /**
   * Check 4: Cultural Appropriateness
   * Ensure recommendation respects user's cultural context
   * 
   * @param {Object} recommendation - Recommendation to check
   * @param {Object} userContext - User context with cultural info
   * @returns {Promise<Object>} Check result
   */
  async checkCulturalAppropriateness(recommendation, userContext) {
    const { language, province, culturalBackground } = userContext;
    const issues = [];

    // Check language appropriateness
    if (recommendation.language && recommendation.language !== language) {
      issues.push({
        issue: 'language_mismatch',
        expected: language,
        provided: recommendation.language,
        severity: 'high'
      });
    }

    // Check for cultural sensitivity flags
    if (recommendation.culturalWarnings && recommendation.culturalWarnings.length > 0) {
      issues.push({
        issue: 'cultural_sensitivity',
        warnings: recommendation.culturalWarnings,
        severity: 'high'
      });
    }

    // Check if content is culturally appropriate
    // (Would integrate with CulturalAdapter in full implementation)
    if (recommendation.requiresCulturalReview === true) {
      issues.push({
        issue: 'cultural_review_needed',
        message: 'This content requires cultural consultant review',
        severity: 'medium'
      });
    }

    return {
      check: 'cultural_appropriateness',
      passed: issues.filter(i => i.severity === 'high').length === 0,
      issues,
      violation: issues.length > 0 ? 'cultural_inappropriateness' : null,
      severity: issues.some(i => i.severity === 'high') ? 'high' : 'low'
    };
  }

  /**
   * Check 5: Vulnerability Protection
   * Extra safeguards for vulnerable users
   * 
   * @param {Object} recommendation - Recommendation to check
   * @param {Object} userContext - User context with vulnerability info
   * @returns {Object} Check result
   */
  checkVulnerabilityProtection(recommendation, userContext) {
    const { vulnerabilityFlags } = userContext;
    const issues = [];

    if (!vulnerabilityFlags || vulnerabilityFlags.length === 0) {
      return { check: 'vulnerability_protection', passed: true, issues: [] };
    }

    // Check each vulnerability flag
    for (const flag of vulnerabilityFlags) {
      switch (flag) {
        case 'early_recovery':
          // Lower crisis threshold, more human oversight
          if (!recommendation.humanOversight === true) {
            issues.push({
              vulnerability: 'early_recovery',
              issue: 'Human oversight required for early recovery',
              severity: 'high'
            });
          }
          break;

        case 'youth':
          // No gamification, screen time warnings
          if (recommendation.gamification === true) {
            issues.push({
              vulnerability: 'youth',
              issue: 'Gamification not allowed for youth',
              severity: 'critical'
            });
          }
          break;

        case 'elderly':
          // Simplified UI, scam protection
          if (recommendation.complexity === 'high') {
            issues.push({
              vulnerability: 'elderly',
              issue: 'Recommendation too complex for elderly user',
              severity: 'medium'
            });
          }
          break;

        case 'low_literacy':
          // Plain language, visual aids
          if (recommendation.readingLevel && recommendation.readingLevel > 8) {
            issues.push({
              vulnerability: 'low_literacy',
              issue: 'Content above 8th-grade reading level',
              severity: 'high'
            });
          }
          break;
      }
    }

    return {
      check: 'vulnerability_protection',
      passed: issues.filter(i => i.severity === 'critical' || i.severity === 'high').length === 0,
      issues,
      violation: issues.length > 0 ? 'vulnerability_protection_inadequate' : null,
      severity: issues.some(i => i.severity === 'critical') ? 'critical' : 'medium'
    };
  }

  /**
   * Provide ethical alternative when recommendation is blocked
   * 
   * @param {Object} original - Original blocked recommendation
   * @param {Array} violations - List of violations
   * @param {Object} userContext - User context
   * @returns {Object} Alternative recommendation
   */
  provideEthicalAlternative(original, violations, userContext) {
    // Analyze violations
    const hasAutonomyViolation = violations.some(v => v.check === 'autonomy_preservation');
    const hasManipulationViolation = violations.some(v => v.check === 'manipulation_detection');
    const hasExcessiveUse = violations.some(v => v.check === 'excessive_engagement');

    // If excessive use, suggest break
    if (hasExcessiveUse) {
      return {
        type: 'break_suggestion',
        message: 'Time to take a break and practice offline skills',
        alternatives: [
          'Take a 15-minute walk',
          'Call your support person',
          'Practice a coping skill',
          'Attend an in-person meeting'
        ],
        crisisSupport: {
          message: 'If this is urgent:',
          resources: [
            { name: 'SADAG Crisis Line', phone: '0800 567 567' },
            { name: 'SANCA', phone: '0861 472 622' }
          ]
        }
      };
    }

    // If manipulation detected, provide transparent alternative
    if (hasManipulationViolation) {
      return {
        type: 'transparent_support',
        message: 'Here\'s support without manipulation',
        recommendations: [
          {
            action: 'Connect with human support',
            reason: 'Human connection is more powerful than AI',
            options: ['Call sponsor', 'Attend meeting', 'Contact counselor']
          },
          {
            action: 'Practice a coping skill',
            reason: 'Build your personal toolkit',
            options: ['Deep breathing', 'Journaling', 'Meditation']
          }
        ],
        transparency: 'We blocked a recommendation because it didn\'t meet our ethical standards'
      };
    }

    // If autonomy violation, emphasize user control
    if (hasAutonomyViolation) {
      return {
        type: 'user_controlled_options',
        message: 'Here are some options - you choose what\'s right for you',
        options: [
          { action: 'Talk to someone', benefit: 'Human support' },
          { action: 'Practice self-care', benefit: 'Build your skills' },
          { action: 'Take a break', benefit: 'Rest and reflect' },
          { action: 'Exit for now', benefit: 'Come back when you need to' }
        ],
        userControl: 'You\'re in control. Choose what works for you, or choose none of these.'
      };
    }

    // Default: Simple, honest alternatives
    return {
      type: 'simple_alternatives',
      message: 'Some suggestions that might help',
      options: [
        'Connect with your support network',
        'Practice a coping skill you know',
        'Take a break and try again later',
        'Contact human support if you need it'
      ]
    };
  }

  /**
   * Check if ethical boundaries are being respected systemwide
   * Used for ethics board reporting
   * 
   * @param {Object} systemMetrics - System-wide metrics
   * @returns {Object} System ethics evaluation
   */
  checkEthicalBoundaries(systemMetrics) {
    const concerns = [];

    // Check average usage patterns
    if (systemMetrics.averageDailyMinutes > this.thresholds.maxDailyMinutes) {
      concerns.push({
        concern: 'high_average_usage',
        value: systemMetrics.averageDailyMinutes,
        threshold: this.thresholds.maxDailyMinutes,
        severity: 'high',
        message: 'Average user spending more than daily limit'
      });
    }

    // Check if usage is trending up (should trend down!)
    if (systemMetrics.usageTrend === 'increasing') {
      concerns.push({
        concern: 'increasing_usage_trend',
        trend: systemMetrics.usageTrend,
        severity: 'critical',
        message: 'Usage increasing across users (should decrease as they gain independence)'
      });
    }

    // Check engagement vs prevention ratio
    if (systemMetrics.engagementScore > systemMetrics.preventionScore * this.thresholds.engagementPreventionRatio) {
      concerns.push({
        concern: 'engagement_over_prevention',
        ratio: systemMetrics.engagementScore / systemMetrics.preventionScore,
        threshold: this.thresholds.engagementPreventionRatio,
        severity: 'critical',
        message: 'System prioritizing engagement over prevention'
      });
    }

    // Check violation rate
    if (systemMetrics.ethicsViolationRate > 0.05) {
      concerns.push({
        concern: 'high_violation_rate',
        rate: systemMetrics.ethicsViolationRate,
        severity: 'high',
        message: 'More than 5% of recommendations being blocked'
      });
    }

    return {
      healthy: concerns.filter(c => c.severity === 'critical').length === 0,
      concerns,
      recommendActions: this.recommendSystemActions(concerns),
      ethicsBoardNotification: concerns.some(c => c.severity === 'critical')
    };
  }

  /**
   * Recommend system-level actions based on concerns
   * 
   * @param {Array} concerns - List of concerns
   * @returns {Array} Recommended actions
   */
  recommendSystemActions(concerns) {
    const actions = [];

    for (const concern of concerns) {
      switch (concern.concern) {
        case 'high_average_usage':
          actions.push('Strengthen session limits and break suggestions');
          actions.push('Increase human connection requirements');
          break;

        case 'increasing_usage_trend':
          actions.push('CRITICAL: Review all new features for addictive patterns');
          actions.push('Strengthen empowerment engine (reduce dependency)');
          actions.push('Ethics board emergency review');
          break;

        case 'engagement_over_prevention':
          actions.push('CRITICAL: Audit algorithm priorities');
          actions.push('Refocus metrics on real-world outcomes');
          actions.push('Ethics board review of recommendation system');
          break;

        case 'high_violation_rate':
          actions.push('Review and strengthen ethical guidelines');
          actions.push('Additional developer training on ethics');
          break;
      }
    }

    return [...new Set(actions)]; // Remove duplicates
  }

  /**
   * Log violation for ethics board review
   * 
   * @param {Object} violation - Violation details
   * @param {Object} context - Context of violation
   */
  async logViolation(violation, context) {
    // In production, this would write to secure log
    // accessible only to ethics board
    const logEntry = {
      timestamp: new Date().toISOString(),
      violation: violation.violation,
      severity: violation.severity,
      context: {
        userId: context.userId ? 'anonymized' : null, // Anonymize for privacy
        recommendation: violation.recommendation,
        checks: violation.checks
      },
      blocked: true,
      alternativeProvided: true
    };

    // TODO: Implement secure logging to ethics board dashboard
    console.warn('[ETHICS VIOLATION LOGGED]', logEntry);

    return logEntry;
  }
}

module.exports = EthicsCircuitBreaker;

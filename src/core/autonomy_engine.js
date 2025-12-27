/**
 * Autonomy Preserving AI Engine
 * 
 * Core principle: User autonomy is ALWAYS primary.
 * This engine ensures users maintain control, receive transparent reasoning,
 * and are encouraged to build independence, not platform dependency.
 */

class AutonomyPreservingAI {
  constructor() {
    this.principles = {
      userControl: 'ALWAYS_PRIMARY',
      transparency: 'FULL_EXPLAINABILITY',
      exitDesign: 'EASY_TO_LEAVE',
      timeRespect: 'ENCOURAGE_BREVITY'
    };

    // Prohibited patterns that violate autonomy
    this.prohibitedPatterns = [
      'infinite_scroll',
      'auto_play',
      'variable_rewards',
      'fomo_triggers',
      'notification_bombardment',
      'streak_mechanics',
      'leaderboards',
      'artificial_urgency',
      'hidden_exits',
      'forced_continuity'
    ];

    // Session limits (minutes)
    this.limits = {
      sessionWarning: 10, // Suggest break
      dailyMaximum: 30,   // Hard limit
      sessionsBetweenHumanRequired: 3 // After 3 AI sessions, require human
    };
  }

  /**
   * Provide support in response to user-initiated request
   * NEVER push unsolicited content
   * 
   * @param {Object} userRequest - User's support request
   * @param {string} userRequest.userId - User identifier
   * @param {string} userRequest.context - What user is asking for
   * @param {Object} userRequest.sessionState - Current session information
   * @returns {Object} Support response with full transparency
   */
  async provideSupport(userRequest) {
    const { userId, context, sessionState } = userRequest;

    // Check session limits FIRST (autonomy protection)
    const sessionCheck = this.checkSessionLimits(userId, sessionState);
    if (!sessionCheck.allowed) {
      return this.suggestBreakOrExit(userId, sessionCheck);
    }

    // Generate support recommendation (would integrate with ExplainableAI)
    const recommendation = await this.generateRecommendation(context, userId);

    // Package with autonomy-preserving elements
    return {
      support: recommendation,
      
      // Transparent reasoning (REQUIRED)
      reasoning: recommendation.reasoning,
      
      // Time information (transparency about session)
      sessionInfo: {
        currentMinutes: sessionState.minutesThisSession,
        todayTotal: sessionState.minutesToday,
        dailyLimit: this.limits.dailyMaximum,
        timeUntilBreakSuggestion: this.limits.sessionWarning - sessionState.minutesThisSession,
        timeRemaining: this.limits.dailyMaximum - sessionState.minutesToday
      },

      // Always provide alternatives (user choice)
      alternatives: recommendation.alternatives || [],

      // Prominent exit option
      exitOptions: {
        mainButton: 'I\'m Done',
        secondaryActions: [
          'Take a Break (10 min)',
          'Call Support Person',
          'Exit for Today'
        ]
      },

      // Transparency about AI vs human
      aiNotice: 'This is AI support. Human connection is important too.',
      humanConnectionSuggestion: this.shouldSuggestHuman(userId, sessionState),

      // User can override any suggestion
      overrideOption: true,
      overrideMessage: 'You always have choice in what works for you'
    };
  }

  /**
   * Check if user has exceeded session limits
   * Autonomy protection: prevent excessive use
   * 
   * @param {string} userId - User identifier
   * @param {Object} sessionState - Current session state
   * @returns {Object} Whether user can continue, and why
   */
  checkSessionLimits(userId, sessionState) {
    const { minutesThisSession, minutesToday, sessionsToday, aiSessionsWithoutHuman } = sessionState;

    // Hard limit: 30 minutes per day
    if (minutesToday >= this.limits.dailyMaximum) {
      return {
        allowed: false,
        reason: 'daily_limit_reached',
        message: 'You\'ve reached your daily 30-minute limit. This helps you build real-world skills.',
        encouragement: 'Taking breaks is healthy! See you tomorrow.'
      };
    }

    // Require human connection after 3 AI-only sessions
    if (aiSessionsWithoutHuman >= this.limits.sessionsBetweenHumanRequired) {
      return {
        allowed: false,
        reason: 'human_connection_required',
        message: 'You\'ve had 3 AI sessions. Time to connect with a person for real support.',
        humanOptions: ['Call your sponsor', 'Attend AA/NA meeting', 'Contact SANCA counselor']
      };
    }

    // Soft limit: Suggest break after 10 minutes
    if (minutesThisSession >= this.limits.sessionWarning) {
      return {
        allowed: true,
        suggestBreak: true,
        message: 'You\'ve been here 10 minutes. Consider taking a break.',
        breakOptions: ['Take a 10-minute walk', 'Call a support person', 'Practice breathing exercise']
      };
    }

    return { allowed: true };
  }

  /**
   * Suggest break or exit when limits approached/reached
   * Core autonomy principle: Encourage users to engage with real world
   * 
   * @param {string} userId - User identifier
   * @param {Object} sessionCheck - Result from checkSessionLimits
   * @returns {Object} Break/exit suggestion response
   */
  suggestBreakOrExit(userId, sessionCheck) {
    return {
      limitReached: true,
      reason: sessionCheck.reason,
      message: sessionCheck.message,
      
      // Offline alternatives (build real-world skills)
      offlineAlternatives: [
        {
          action: 'Take a walk',
          duration: '15-20 minutes',
          benefit: 'Physical activity helps clear your mind'
        },
        {
          action: 'Call your support person',
          benefit: 'Human connection is more powerful than AI'
        },
        {
          action: 'Practice a coping skill',
          examples: ['Deep breathing', 'Journaling', 'Meditation'],
          benefit: 'Build your personal toolkit'
        },
        {
          action: 'Attend a meeting',
          type: 'AA/NA or support group',
          benefit: 'Community support is essential'
        }
      ],

      // Crisis resources always available
      crisisSupport: {
        available: true,
        message: 'If this is a crisis, these resources are always available:',
        resources: [
          { name: 'SADAG 24/7 Crisis Line', phone: '0800 567 567' },
          { name: 'SANCA', phone: '0861 472 622' },
          { name: 'Lifeline SA', phone: '0861 322 322' }
        ]
      },

      // When they can come back
      nextAvailable: sessionCheck.reason === 'daily_limit_reached' 
        ? 'Tomorrow (00:00)' 
        : 'After connecting with human support',

      encouragement: sessionCheck.encouragement || 'Taking care of yourself offline is success!'
    };
  }

  /**
   * Generate support recommendation (would integrate with ExplainableAI)
   * This is a simplified version - full implementation would use ML
   * 
   * @param {string} context - User's request context
   * @param {string} userId - User identifier
   * @returns {Object} Recommendation with transparent reasoning
   */
  async generateRecommendation(context, userId) {
    // Placeholder - actual implementation would:
    // 1. Call ExplainableAI for ML-based recommendation
    // 2. Call CulturalAdapter for cultural appropriateness
    // 3. Call EthicsCircuitBreaker for approval
    // 4. Return with full transparency

    return {
      suggestion: 'Consider attending your weekly AA meeting',
      reasoning: 'Based on your context and past success with structured support',
      alternatives: [
        'Call your sponsor',
        'Practice breathing exercise',
        'Write in recovery journal'
      ],
      confidence: 0.85,
      factors: {
        personalHistory: { weight: 0.4, description: 'Past success with meetings' },
        currentContext: { weight: 0.35, description: 'Need for structured support' },
        localAvailability: { weight: 0.25, description: 'Meeting available tonight' }
      }
    };
  }

  /**
   * Determine if user should be encouraged toward human connection
   * 
   * @param {string} userId - User identifier
   * @param {Object} sessionState - Current session state
   * @returns {Object|null} Human connection suggestion or null
   */
  shouldSuggestHuman(userId, sessionState) {
    const { aiSessionsWithoutHuman, minutesToday } = sessionState;

    // After 2 AI sessions, start suggesting human connection
    if (aiSessionsWithoutHuman >= 2) {
      return {
        suggest: true,
        urgency: aiSessionsWithoutHuman >= 3 ? 'required' : 'recommended',
        message: 'Human connection is more powerful than AI for recovery. Consider connecting with a person.',
        options: [
          'Call your sponsor or support person',
          'Attend an AA/NA meeting',
          'Contact a SANCA counselor',
          'Reach out to your faith community'
        ]
      };
    }

    // If using platform heavily today, suggest offline activities
    if (minutesToday > 20) {
      return {
        suggest: true,
        urgency: 'recommended',
        message: 'You\'ve been engaging well today. Time to practice your skills offline.',
        options: [
          'Take a walk and reflect',
          'Call a friend or family member',
          'Attend an in-person support activity'
        ]
      };
    }

    return null;
  }

  /**
   * Weekly autonomy audit for user
   * Flag if user shows signs of platform dependency
   * 
   * @param {string} userId - User identifier
   * @param {Object} weeklyStats - Usage stats for past 7 days
   * @returns {Object} Audit result with recommendations
   */
  weeklyAutonomyAudit(userId, weeklyStats) {
    const { dailyAverageMinutes, totalSessions, trend, humanConnectionRatio } = weeklyStats;

    const concerns = [];
    const recommendations = [];

    // Concern: Exceeding 30 min/day average
    if (dailyAverageMinutes > 30) {
      concerns.push({
        type: 'excessive_use',
        severity: 'high',
        detail: `Average ${dailyAverageMinutes} min/day (limit is 30 min/day)`
      });
      recommendations.push('Consider setting usage limits or reminders');
      recommendations.push('Schedule regular offline support activities');
    }

    // Concern: Usage increasing over time (we want decreasing)
    if (trend === 'increasing') {
      concerns.push({
        type: 'increasing_dependency',
        severity: 'medium',
        detail: 'Platform usage is increasing (should decrease as you build skills)'
      });
      recommendations.push('Focus on building real-world coping skills');
      recommendations.push('Increase human support connections');
    }

    // Concern: Too few human connections
    if (humanConnectionRatio < 0.3) {
      concerns.push({
        type: 'insufficient_human_connection',
        severity: 'high',
        detail: `Only ${Math.round(humanConnectionRatio * 100)}% of your support is human (should be majority)`
      });
      recommendations.push('Prioritize human support over AI');
      recommendations.push('Schedule weekly counselor or group meeting');
    }

    // Positive: Decreasing usage (SUCCESS!)
    if (trend === 'decreasing' && dailyAverageMinutes < 20) {
      return {
        status: 'excellent',
        message: 'Excellent! Your usage is decreasing while you build independence. This is exactly what we want to see.',
        encouragement: 'You\'re building real-world skills and needing the platform less. Keep it up!',
        concerns: []
      };
    }

    // Return audit result
    return {
      status: concerns.length > 0 ? 'needs_attention' : 'good',
      concerns,
      recommendations,
      message: concerns.length > 0 
        ? 'We noticed some patterns that might indicate platform dependency. Let\'s adjust.'
        : 'Your usage patterns look healthy. Keep building those real-world skills!',
      
      // Offer support adjustments
      suggestedActions: [
        'Schedule check-in with counselor',
        'Adjust usage limits',
        'Increase offline activities',
        'Review notification settings'
      ],

      // Next audit
      nextAudit: '7 days'
    };
  }

  /**
   * Validate that UI pattern is autonomy-preserving
   * Used by EthicsCircuitBreaker
   * 
   * @param {Object} uiPattern - UI pattern to validate
   * @returns {Object} Validation result
   */
  validateUIPattern(uiPattern) {
    const violations = [];

    // Check for prohibited patterns
    for (const prohibited of this.prohibitedPatterns) {
      if (uiPattern[prohibited] === true) {
        violations.push({
          pattern: prohibited,
          severity: 'critical',
          message: `Prohibited pattern "${prohibited}" detected`
        });
      }
    }

    // Check for required autonomy elements
    if (!uiPattern.exitButton || !uiPattern.exitButton.prominent) {
      violations.push({
        pattern: 'exit_design',
        severity: 'critical',
        message: 'Prominent exit button required'
      });
    }

    if (!uiPattern.sessionTimer || !uiPattern.sessionTimer.visible) {
      violations.push({
        pattern: 'time_transparency',
        severity: 'high',
        message: 'Visible session timer required for transparency'
      });
    }

    if (!uiPattern.reasoning || !uiPattern.reasoning.displayed) {
      violations.push({
        pattern: 'transparency',
        severity: 'critical',
        message: 'Transparent reasoning must be displayed'
      });
    }

    return {
      valid: violations.length === 0,
      violations,
      message: violations.length === 0 
        ? 'UI pattern respects user autonomy' 
        : `${violations.length} autonomy violation(s) detected`
    };
  }
}

module.exports = AutonomyPreservingAI;

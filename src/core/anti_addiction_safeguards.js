/**
 * Anti-Addiction Safeguards
 * 
 * Actively prevents platform addiction through prohibited pattern enforcement
 * and healthy usage encouragement
 */

class AntiAddictionSafeguards {
  constructor() {
    // Prohibited patterns that create addiction
    this.prohibitedPatterns = {
      infiniteScroll: false,
      autoPlay: false,
      variableRewards: false,
      artificialUrgency: false,
      fomoTriggers: false,
      notificationBombardment: false,
      streakMechanics: false,
      leaderboards: false,
      hiddenExits: false,
      darkPatterns: false
    };

    // Session limits (minutes)
    this.sessionLimits = {
      warningAt: 10,  // Suggest break
      hardLimit: 30    // Daily maximum
    };

    // Healthy patterns we encourage
    this.healthyPatterns = {
      finiteContent: true,
      clearEnd: true,
      prominentExits: true,
      breakSuggestions: true,
      offlineAlternatives: true,
      humanConnectionEmphasis: true
    };
  }

  /**
   * Enforce session limits
   * Prevent excessive use through time-based restrictions
   * 
   * @param {Object} sessionData - Current session data
   * @returns {Object} Session enforcement result
   */
  enforceSessionLimits(sessionData) {
    const { minutesThisSession, minutesToday, userId } = sessionData;

    // 10-minute warning (soft limit)
    if (minutesThisSession >= this.sessionLimits.warningAt && minutesThisSession < this.sessionLimits.hardLimit) {
      return {
        type: 'warning',
        message: 'You\'ve been here 10 minutes. Consider taking a break.',
        timeRemaining: this.sessionLimits.hardLimit - minutesToday,
        suggestions: this.getBreakSuggestions(),
        allowContinue: true
      };
    }

    // 30-minute hard limit (daily)
    if (minutesToday >= this.sessionLimits.hardLimit) {
      return {
        type: 'limit_reached',
        message: 'You\'ve reached your daily 30-minute limit.',
        explanation: 'This helps you build real-world skills, not platform dependency.',
        alternatives: this.getOfflineBehaviors(),
        allowContinue: false,
        nextAvailable: 'Tomorrow at 00:00'
      };
    }

    // Normal - continue
    return {
      type: 'normal',
      minutesUsed: minutesToday,
      minutesRemaining: this.sessionLimits.hardLimit - minutesToday,
      allowContinue: true
    };
  }

  /**
   * Get break suggestions for users
   * Encourage offline, real-world activities
   * 
   * @returns {Array<Object>} Break suggestions
   */
  getBreakSuggestions() {
    return [
      {
        action: 'Take a walk',
        duration: '15-20 minutes',
        benefit: 'Physical activity clears your mind',
        category: 'physical'
      },
      {
        action: 'Call your support person',
        duration: '10-15 minutes',
        benefit: 'Human connection is more powerful than AI',
        category: 'social'
      },
      {
        action: 'Practice a coping skill',
        duration: '5-10 minutes',
        benefit: 'Build your personal toolkit',
        examples: ['Deep breathing', 'Meditation', 'Journaling'],
        category: 'skill'
      },
      {
        action: 'Drink water and stretch',
        duration: '5 minutes',
        benefit: 'Take care of your body',
        category: 'self_care'
      }
    ];
  }

  /**
   * Encourage offline behaviors
   * When user hits limits or needs break
   * 
   * @returns {Array<Object>} Offline alternatives
   */
  encourageOfflineBehavior() {
    return {
      message: 'Time to practice your recovery offline!',
      alternatives: [
        {
          action: 'Attend an AA/NA meeting',
          why: 'In-person community support is essential',
          urgency: 'high'
        },
        {
          action: 'Call or text your sponsor',
          why: 'Human connection beats AI every time',
          urgency: 'high'
        },
        {
          action: 'Do something you enjoy',
          why: 'Build a meaningful life beyond recovery',
          examples: ['Exercise', 'Hobby', 'Time with family', 'Creative activity'],
          urgency: 'medium'
        },
        {
          action: 'Practice mindfulness',
          why: 'Build your own coping capacity',
          examples: ['Meditation', 'Breathing exercises', 'Journaling', 'Prayer'],
          urgency: 'medium'
        },
        {
          action: 'Rest',
          why: 'Recovery includes taking care of yourself',
          urgency: 'low'
        }
      ],
      reminder: 'The goal is to need this platform LESS as you build real-world skills'
    };
  }

  /**
   * Get offline behaviors to suggest
   * 
   * @returns {Array<Object>} Offline activities
   */
  getOfflineBehaviors() {
    return [
      'Take a walk outside',
      'Call a friend or family member',
      'Attend an in-person support meeting',
      'Practice a hobby',
      'Exercise or physical activity',
      'Rest and self-care'
    ];
  }

  /**
   * Validate UI component for addictive patterns
   * Block any UI that uses prohibited patterns
   * 
   * @param {Object} uiComponent - UI component to validate
   * @returns {Object} Validation result
   */
  validateUIComponent(uiComponent) {
    const violations = [];

    // Check each prohibited pattern
    for (const [pattern, prohibited] of Object.entries(this.prohibitedPatterns)) {
      if (prohibited === false && uiComponent[pattern] === true) {
        violations.push({
          pattern,
          severity: 'critical',
          message: `Prohibited pattern "${pattern}" detected in UI component`
        });
      }
    }

    // Check for required healthy patterns
    for (const [pattern, required] of Object.entries(this.healthyPatterns)) {
      if (required === true && uiComponent[pattern] === false) {
        violations.push({
          pattern,
          severity: 'high',
          message: `Required healthy pattern "${pattern}" missing from UI component`
        });
      }
    }

    return {
      valid: violations.length === 0,
      violations,
      message: violations.length === 0 
        ? 'UI component free from addictive patterns' 
        : `${violations.length} violation(s) detected`
    };
  }

  /**
   * Check if notification is appropriate
   * Prevent notification bombardment
   * 
   * @param {Object} notification - Proposed notification
   * @param {Object} userContext - User context
   * @returns {Object} Notification approval
   */
  checkNotification(notification, userContext) {
    const { notificationsToday, lastNotificationTime, userPreferences } = userContext;

    // Check user preferences first (autonomy)
    if (!userPreferences.notificationsEnabled) {
      return {
        allowed: false,
        reason: 'user_disabled',
        message: 'User has disabled notifications'
      };
    }

    // Limit notifications per day (no bombardment)
    const maxDailyNotifications = 2;
    if (notificationsToday >= maxDailyNotifications) {
      return {
        allowed: false,
        reason: 'daily_limit',
        message: `Maximum ${maxDailyNotifications} notifications per day`
      };
    }

    // Minimum time between notifications (no spam)
    const minHoursBetween = 4;
    if (lastNotificationTime) {
      const hoursSince = (Date.now() - lastNotificationTime) / (1000 * 60 * 60);
      if (hoursSince < minHoursBetween) {
        return {
          allowed: false,
          reason: 'too_frequent',
          message: `Minimum ${minHoursBetween} hours between notifications`
        };
      }
    }

    // Only allow for specific, helpful purposes
    const allowedTypes = ['crisis_support', 'meeting_reminder', 'check_in'];
    if (!allowedTypes.includes(notification.type)) {
      return {
        allowed: false,
        reason: 'inappropriate_type',
        message: 'Notification type not allowed'
      };
    }

    // NEVER for engagement purposes
    if (notification.purpose === 'engagement') {
      return {
        allowed: false,
        reason: 'prohibited_purpose',
        message: 'Notifications for engagement are prohibited'
      };
    }

    // Allow appropriate notification
    return {
      allowed: true,
      message: 'Notification serves user need'
    };
  }

  /**
   * Generate anti-addiction report for ethics board
   * 
   * @param {Object} systemMetrics - System metrics
   * @returns {Object} Anti-addiction report
   */
  generateReport(systemMetrics) {
    const {
      averageDailyMinutes,
      usageTrend,
      sessionLimitViolations,
      notificationsSent,
      prohibitedPatternDetections
    } = systemMetrics;

    const concerns = [];

    // Check if average usage is healthy (should trend down)
    if (averageDailyMinutes > 20) {
      concerns.push({
        metric: 'average_daily_minutes',
        value: averageDailyMinutes,
        concern: 'Users spending more than recommended time',
        action: 'Review support personalization - increase human connection emphasis'
      });
    }

    // Usage should decrease over time
    if (usageTrend === 'increasing') {
      concerns.push({
        metric: 'usage_trend',
        value: usageTrend,
        concern: 'CRITICAL: Platform usage increasing (should decrease)',
        action: 'Emergency review of all features for addictive patterns'
      });
    }

    // Check if prohibited patterns are being detected
    if (prohibitedPatternDetections > 0) {
      concerns.push({
        metric: 'prohibited_patterns',
        value: prohibitedPatternDetections,
        concern: 'Prohibited addictive patterns detected',
        action: 'Developer training on anti-addiction principles'
      });
    }

    return {
      status: concerns.length === 0 ? 'healthy' : 'needs_attention',
      concerns,
      recommendations: this.generateRecommendations(concerns),
      safeguardsWorking: sessionLimitViolations === 0 && prohibitedPatternDetections === 0,
      ethicsBoardAlert: concerns.some(c => c.concern.includes('CRITICAL'))
    };
  }

  /**
   * Generate recommendations based on concerns
   * 
   * @param {Array} concerns - List of concerns
   * @returns {Array<string>} Recommendations
   */
  generateRecommendations(concerns) {
    const recommendations = new Set();

    for (const concern of concerns) {
      recommendations.add(concern.action);
    }

    // Always include these reminders
    recommendations.add('Monitor decreasing usage as success metric');
    recommendations.add('Celebrate users who need platform less');
    recommendations.add('Prioritize human connection over AI interaction');

    return Array.from(recommendations);
  }
}

module.exports = AntiAddictionSafeguards;

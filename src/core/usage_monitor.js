/**
 * Usage Monitor
 * 
 * Track usage patterns and flag excessive use
 * Success = decreasing usage over time (platform independence)
 */

class UsageMonitor {
  constructor() {
    // Usage thresholds
    this.thresholds = {
      dailyMinutes: {
        yellow: 20,  // Suggest break
        orange: 30,  // Human review
        red: 35      // Sustained excessive (impossible but for tracking violations)
      },
      dailySessions: {
        yellow: 3,
        orange: 5,
        red: 7
      },
      weeklyAverage: {
        yellow: 140,  // minutes (20/day)
        orange: 210,  // minutes (30/day)
        red: 245      // minutes (35/day)
      }
    };

    // Trend analysis periods
    this.periods = {
      week: 7,
      month: 30,
      quarter: 90
    };
  }

  /**
   * Track usage for a user session
   * 
   * @param {string} userId - User identifier
   * @param {Object} sessionData - Session information
   * @returns {Object} Usage tracking result
   */
  async trackUsage(userId, sessionData) {
    const {
      sessionId,
      startTime,
      endTime,
      durationMinutes,
      interactions,
      aiVsHumanRatio
    } = sessionData;

    // Store session (would go to database)
    const session = {
      userId,
      sessionId,
      startTime,
      endTime,
      durationMinutes,
      interactions,
      aiVsHumanRatio,
      timestamp: new Date().toISOString()
    };

    // Get user's usage statistics
    const stats = await this.getUserStats(userId);

    // Check for flags
    const flags = this.checkForFlags(stats);

    return {
      session,
      currentStats: stats,
      flags,
      action: flags.length > 0 ? this.determineAction(flags) : null
    };
  }

  /**
   * Get user's usage statistics
   * 
   * @param {string} userId - User identifier
   * @returns {Object} Usage statistics
   */
  async getUserStats(userId) {
    // In production, this would query database
    // For now, returning mock structure

    return {
      today: {
        minutes: 0,
        sessions: 0,
        aiInteractions: 0,
        humanConnections: 0
      },
      week: {
        totalMinutes: 0,
        averageMinutes: 0,
        sessions: 0,
        trend: 'stable' // 'increasing', 'decreasing', 'stable'
      },
      month: {
        totalMinutes: 0,
        averageMinutes: 0,
        trend: 'stable'
      },
      overall: {
        accountAge: 30, // days
        usageTrend: 'decreasing', // Ideal!
        platformIndependence: 0.7 // 0-1, higher is better
      }
    };
  }

  /**
   * Check for excessive use flags
   * 
   * @param {Object} stats - User statistics
   * @returns {Array<Object>} Flags
   */
  checkForFlags(stats) {
    const flags = [];

    // Daily minutes check
    if (stats.today.minutes >= this.thresholds.dailyMinutes.red) {
      flags.push({
        type: 'daily_minutes',
        level: 'red',
        value: stats.today.minutes,
        threshold: this.thresholds.dailyMinutes.red,
        message: `User exceeded daily limit (${stats.today.minutes} min)`
      });
    } else if (stats.today.minutes >= this.thresholds.dailyMinutes.orange) {
      flags.push({
        type: 'daily_minutes',
        level: 'orange',
        value: stats.today.minutes,
        threshold: this.thresholds.dailyMinutes.orange,
        message: `User approaching/at daily limit (${stats.today.minutes} min)`
      });
    } else if (stats.today.minutes >= this.thresholds.dailyMinutes.yellow) {
      flags.push({
        type: 'daily_minutes',
        level: 'yellow',
        value: stats.today.minutes,
        threshold: this.thresholds.dailyMinutes.yellow,
        message: `User in high usage range (${stats.today.minutes} min)`
      });
    }

    // Daily sessions check
    if (stats.today.sessions >= this.thresholds.dailySessions.orange) {
      flags.push({
        type: 'daily_sessions',
        level: 'orange',
        value: stats.today.sessions,
        threshold: this.thresholds.dailySessions.orange,
        message: `High session frequency (${stats.today.sessions} sessions today)`
      });
    }

    // Weekly average check
    if (stats.week.averageMinutes * 7 >= this.thresholds.weeklyAverage.orange) {
      flags.push({
        type: 'weekly_average',
        level: 'orange',
        value: stats.week.averageMinutes,
        message: `High weekly average (${stats.week.averageMinutes} min/day average)`
      });
    }

    // Trend check (CRITICAL - usage should decrease!)
    if (stats.overall.usageTrend === 'increasing') {
      flags.push({
        type: 'increasing_trend',
        level: 'orange',
        message: 'Usage increasing over time (should decrease)',
        concern: 'Potential platform dependency developing'
      });
    }

    // AI vs Human ratio check
    const aiRatio = stats.today.aiInteractions / (stats.today.aiInteractions + stats.today.humanConnections);
    if (aiRatio > 0.7) {
      flags.push({
        type: 'low_human_connection',
        level: 'yellow',
        value: aiRatio,
        message: 'Heavily relying on AI over human support'
      });
    }

    return flags;
  }

  /**
   * Flag excessive use for human review
   * 
   * @param {string} userId - User identifier
   * @param {Array<Object>} flags - Usage flags
   * @returns {Object} Flagging result
   */
  flagExcessiveUse(userId, flags) {
    const redFlags = flags.filter(f => f.level === 'red');
    const orangeFlags = flags.filter(f => f.level === 'orange');

    // Red flags: Immediate action
    if (redFlags.length > 0) {
      return {
        flagged: true,
        severity: 'high',
        action: 'immediate_human_review',
        message: 'User has exceeded safe usage limits',
        flags: redFlags,
        recommendations: [
          'Counselor check-in required',
          'Review support plan',
          'Increase human connection emphasis',
          'Consider temporary platform break'
        ]
      };
    }

    // Orange flags: Schedule review
    if (orangeFlags.length > 0) {
      return {
        flagged: true,
        severity: 'medium',
        action: 'scheduled_human_review',
        message: 'User showing concerning usage patterns',
        flags: orangeFlags,
        recommendations: [
          'Schedule counselor check-in within 3 days',
          'Send usage awareness message',
          'Suggest offline alternatives'
        ]
      };
    }

    // Yellow flags: Notify user
    if (flags.length > 0) {
      return {
        flagged: true,
        severity: 'low',
        action: 'user_notification',
        message: 'User awareness recommended',
        flags,
        recommendations: [
          'Send gentle usage awareness message',
          'Suggest break',
          'Highlight offline alternatives'
        ]
      };
    }

    return {
      flagged: false,
      message: 'Usage within healthy limits'
    };
  }

  /**
   * Determine action based on flags
   * 
   * @param {Array<Object>} flags - Usage flags
   * @returns {Object} Recommended action
   */
  determineAction(flags) {
    const hasRed = flags.some(f => f.level === 'red');
    const hasOrange = flags.some(f => f.level === 'orange');

    if (hasRed) {
      return {
        type: 'immediate_intervention',
        message: 'User needs immediate human support',
        actions: [
          'Block further AI interactions',
          'Require human counselor contact',
          'Ethics board notification'
        ]
      };
    }

    if (hasOrange) {
      return {
        type: 'human_review',
        message: 'Schedule human review within 24 hours',
        actions: [
          'Suggest strong break',
          'Highlight human connection resources',
          'Flag for counselor follow-up'
        ]
      };
    }

    return {
      type: 'awareness',
      message: 'Gentle user awareness',
      actions: [
        'Suggest break',
        'Show usage stats',
        'Encourage offline activities'
      ]
    };
  }

  /**
   * Measure platform independence
   * SUCCESS METRIC: Users needing platform LESS over time
   * 
   * @param {string} userId - User identifier
   * @param {Object} historicalData - Historical usage data
   * @returns {Object} Independence measurement
   */
  measurePlatformIndependence(userId, historicalData) {
    const { weeklyUsage, monthlyUsage, recoveryDays } = historicalData;

    // Calculate trend (decreasing is GOOD!)
    const trend = this.calculateTrend(weeklyUsage);

    // Calculate independence score (0-1, higher is better)
    const independenceScore = this.calculateIndependenceScore({
      currentUsage: weeklyUsage[weeklyUsage.length - 1],
      trend,
      recoveryDays,
      humanConnectionRatio: historicalData.humanConnectionRatio
    });

    // Determine independence level
    let level, message;
    if (independenceScore > 0.8) {
      level = 'high';
      message = 'Excellent! You\'re highly independent from the platform.';
    } else if (independenceScore > 0.6) {
      level = 'moderate';
      message = 'Good progress toward platform independence.';
    } else if (independenceScore > 0.4) {
      level = 'developing';
      message = 'Building independence. Keep focusing on real-world connections.';
    } else {
      level = 'low';
      message = 'Let\'s work on building more independence. More human support would help.';
    }

    return {
      independenceScore,
      level,
      message,
      trend,
      strengths: this.identifyIndependenceStrengths(historicalData, trend),
      growthAreas: this.identifyIndependenceGrowthAreas(historicalData, trend),
      celebration: trend === 'decreasing' ? {
        message: '🎉 Your usage is decreasing - you\'re building independence!',
        detail: 'Needing the platform less is a sign of your growing strength.'
      } : null
    };
  }

  /**
   * Calculate usage trend
   * 
   * @param {Array<number>} weeklyUsage - Weekly usage in minutes
   * @returns {string} Trend ('increasing', 'decreasing', 'stable')
   */
  calculateTrend(weeklyUsage) {
    if (weeklyUsage.length < 2) return 'stable';

    const recent = weeklyUsage.slice(-4); // Last 4 weeks
    const older = weeklyUsage.slice(-8, -4); // 4 weeks before that

    const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    const olderAvg = older.reduce((sum, val) => sum + val, 0) / older.length;

    const change = (recentAvg - olderAvg) / olderAvg;

    if (change < -0.1) return 'decreasing'; // 10%+ decrease (GOOD!)
    if (change > 0.1) return 'increasing';  // 10%+ increase (CONCERNING)
    return 'stable';
  }

  /**
   * Calculate independence score
   * 
   * @param {Object} factors - Factors for independence
   * @returns {number} Score 0-1
   */
  calculateIndependenceScore(factors) {
    const { currentUsage, trend, recoveryDays, humanConnectionRatio } = factors;

    // Lower usage = higher score (after initial period)
    let usageScore;
    if (recoveryDays < 30) {
      // Early recovery: usage doesn't penalize as much
      usageScore = 0.7;
    } else {
      // Established recovery: lower usage is better
      usageScore = Math.max(0, 1 - (currentUsage / 300)); // Normalize to 0-1
    }

    // Trend score (decreasing is BEST)
    const trendScore = trend === 'decreasing' ? 0.3 :
                      trend === 'stable' ? 0.15 :
                      0; // increasing gets no bonus

    // Human connection score
    const humanScore = humanConnectionRatio * 0.2;

    return Math.min(1, usageScore + trendScore + humanScore);
  }

  /**
   * Identify independence strengths
   * 
   * @param {Object} data - Historical data
   * @param {string} trend - Usage trend
   * @returns {Array<string>} Strengths
   */
  identifyIndependenceStrengths(data, trend) {
    const strengths = [];

    if (trend === 'decreasing') {
      strengths.push('Usage decreasing over time - excellent independence growth');
    }

    if (data.humanConnectionRatio > 0.6) {
      strengths.push('Strong human connection ratio - prioritizing people over AI');
    }

    if (data.offlineActivities > 0.7) {
      strengths.push('High offline activity engagement - building real-world life');
    }

    return strengths;
  }

  /**
   * Identify independence growth areas
   * 
   * @param {Object} data - Historical data
   * @param {string} trend - Usage trend
   * @returns {Array<string>} Growth areas
   */
  identifyIndependenceGrowthAreas(data, trend) {
    const areas = [];

    if (trend === 'increasing') {
      areas.push('Usage increasing - focus on building offline coping skills');
    }

    if (data.humanConnectionRatio < 0.4) {
      areas.push('Low human connection - prioritize in-person meetings and counseling');
    }

    if (data.offlineActivities < 0.5) {
      areas.push('Limited offline engagement - build meaningful activities outside platform');
    }

    return areas;
  }

  /**
   * Generate weekly usage report for user
   * Transparent about usage patterns
   * 
   * @param {string} userId - User identifier
   * @returns {Object} Weekly report
   */
  async generateWeeklyReport(userId) {
    const stats = await this.getUserStats(userId);
    const flags = this.checkForFlags(stats);

    return {
      period: 'past_7_days',
      usage: {
        totalMinutes: stats.week.totalMinutes,
        averageMinutes: stats.week.averageMinutes,
        sessions: stats.week.sessions,
        trend: stats.week.trend
      },
      independence: this.measurePlatformIndependence(userId, stats),
      healthStatus: flags.length === 0 ? 'healthy' : 'needs_attention',
      flags,
      recommendations: this.generateUserRecommendations(stats, flags),
      celebration: stats.week.trend === 'decreasing' ? {
        message: 'Great progress! Your usage is decreasing.',
        encouragement: 'You\'re building real-world independence!'
      } : null
    };
  }

  /**
   * Generate recommendations for user
   * 
   * @param {Object} stats - Usage statistics
   * @param {Array<Object>} flags - Usage flags
   * @returns {Array<string>} Recommendations
   */
  generateUserRecommendations(stats, flags) {
    const recommendations = [];

    if (stats.week.trend === 'increasing') {
      recommendations.push('Your usage is increasing. Consider: What\'s happening that you need more support?');
      recommendations.push('Schedule time with your counselor or support group');
    }

    if (stats.today.humanConnections < 1) {
      recommendations.push('Connect with a person today - call your sponsor or attend a meeting');
    }

    if (flags.some(f => f.type === 'daily_minutes' && f.level === 'orange')) {
      recommendations.push('Take a break - you\'ve been using the platform a lot today');
    }

    // Always include positive suggestions
    recommendations.push('Practice an offline coping skill you\'ve learned');
    recommendations.push('Engage in a meaningful activity outside recovery');

    return recommendations;
  }
}

module.exports = UsageMonitor;

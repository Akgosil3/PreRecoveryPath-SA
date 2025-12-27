/**
 * Empowerment Engine
 * 
 * Goal: BUILD user capability and independence
 * Anti-Goal: CREATE platform dependency
 * 
 * Success metric: Users needing the platform LESS over time, not MORE
 */

class EmpowermentEngine {
  constructor() {
    this.goal = 'BUILD_USER_CAPABILITY';
    this.antiGoal = 'CREATE_PLATFORM_DEPENDENCY';

    // Recovery phases (adapt support level)
    this.phases = {
      earlyRecovery: {
        name: 'Early Recovery',
        dayRange: [0, 90],
        supportLevel: 'high',
        checkInFrequency: 'daily',
        humanPriority: 'very_high',
        description: 'Building foundation - high support needed'
      },
      buildingConfidence: {
        name: 'Building Confidence',
        dayRange: [91, 365],
        supportLevel: 'moderate',
        checkInFrequency: 'weekly',
        humanPriority: 'high',
        description: 'Growing independence - moderate support'
      },
      stableRecovery: {
        name: 'Stable Recovery',
        dayRange: [366, Infinity],
        supportLevel: 'minimal',
        checkInFrequency: 'monthly',
        humanPriority: 'medium',
        description: 'Independent - platform as safety net only'
      }
    };
  }

  /**
   * Personalize support based on user's recovery phase
   * Adapt to help user build independence over time
   * 
   * @param {Object} userProfile - User profile information
   * @param {number} userProfile.recoveryDays - Days in recovery
   * @param {Object} userProfile.usagePattern - Usage history
   * @param {Object} userProfile.outcomes - Real-world outcomes
   * @returns {Object} Personalized support plan
   */
  personalizeSupport(userProfile) {
    const { recoveryDays, usagePattern, outcomes } = userProfile;

    // Determine recovery phase
    const phase = this.determinePhase(recoveryDays);

    // Get support configuration for phase
    const supportConfig = this.phases[phase];

    // Analyze if user is building independence
    const independenceAnalysis = this.analyzeIndependence(usagePattern, outcomes, phase);

    return {
      phase: supportConfig.name,
      supportLevel: supportConfig.supportLevel,
      
      // Key principle: Support should DECREASE over time
      recommendation: this.generatePhaseRecommendation(phase, independenceAnalysis),

      // Check-in frequency (should decrease over time)
      checkInSchedule: supportConfig.checkInFrequency,

      // Human vs AI balance (always favor human)
      humanPriority: supportConfig.humanPriority,
      aiRole: 'Supplementary only - bridge to human support',

      // Independence metrics (celebrate decreasing usage!)
      independence: independenceAnalysis,

      // Celebrate progress toward independence
      celebration: this.celebrateIndependence(independenceAnalysis),

      // Next phase goals
      nextPhaseGoals: this.getNextPhaseGoals(phase, independenceAnalysis)
    };
  }

  /**
   * Determine which recovery phase user is in
   * 
   * @param {number} recoveryDays - Days in recovery
   * @returns {string} Phase identifier
   */
  determinePhase(recoveryDays) {
    if (recoveryDays <= 90) {
      return 'earlyRecovery';
    } else if (recoveryDays <= 365) {
      return 'buildingConfidence';
    } else {
      return 'stableRecovery';
    }
  }

  /**
   * Analyze how well user is building independence
   * GOOD signs: Decreasing usage, better outcomes, more human support
   * CONCERNING: Increasing usage, worsening outcomes, isolation
   * 
   * @param {Object} usagePattern - Usage history
   * @param {Object} outcomes - Real-world outcomes
   * @param {string} phase - Current recovery phase
   * @returns {Object} Independence analysis
   */
  analyzeIndependence(usagePattern, outcomes, phase) {
    const {
      currentWeekMinutes,
      previousWeekMinutes,
      monthlyTrend,
      humanConnectionRatio,
      realWorldActivityLevel
    } = usagePattern;

    const {
      substanceFreeDays,
      qualityOfLifeScore,
      socialConnectionStrength
    } = outcomes;

    // Calculate independence score
    const independenceIndicators = {
      // POSITIVE: Usage decreasing
      usageDecreasing: currentWeekMinutes < previousWeekMinutes,
      usageTrend: monthlyTrend === 'decreasing' ? 'excellent' : 
                  monthlyTrend === 'stable' ? 'good' :
                  'concerning',

      // POSITIVE: High human connection ratio
      humanConnection: humanConnectionRatio > 0.6 ? 'excellent' :
                       humanConnectionRatio > 0.4 ? 'good' :
                       'needs_improvement',

      // POSITIVE: Real-world activities
      realWorldEngagement: realWorldActivityLevel > 0.7 ? 'excellent' :
                          realWorldActivityLevel > 0.5 ? 'good' :
                          'needs_improvement',

      // POSITIVE: Outcomes improving
      outcomesImproving: substanceFreeDays > 0 && qualityOfLifeScore > 3
    };

    // Overall independence level
    let independenceLevel;
    const excellentCount = Object.values(independenceIndicators).filter(v => v === 'excellent').length;
    const concerningCount = Object.values(independenceIndicators).filter(v => v === 'concerning' || v === 'needs_improvement').length;

    if (excellentCount >= 3) {
      independenceLevel = 'high';
    } else if (concerningCount >= 3) {
      independenceLevel = 'low';
    } else {
      independenceLevel = 'moderate';
    }

    return {
      level: independenceLevel,
      indicators: independenceIndicators,
      message: this.getIndependenceMessage(independenceLevel, phase),
      strengths: this.identifyStrengths(independenceIndicators),
      growthAreas: this.identifyGrowthAreas(independenceIndicators)
    };
  }

  /**
   * Get encouraging message about independence level
   * 
   * @param {string} level - Independence level (high/moderate/low)
   * @param {string} phase - Recovery phase
   * @returns {string} Personalized message
   */
  getIndependenceMessage(level, phase) {
    if (level === 'high') {
      return 'Excellent! You\'re building strong independence. You\'re using the platform less while your life improves - exactly what we want to see!';
    } else if (level === 'moderate') {
      if (phase === 'earlyRecovery') {
        return 'You\'re building your foundation. It\'s okay to need support now - independence will grow over time.';
      } else {
        return 'You\'re making progress toward independence. Let\'s focus on building more real-world connections.';
      }
    } else {
      return 'Let\'s work on building your independence. The goal is for you to need this platform less, not more. More human connection and real-world activities will help.';
    }
  }

  /**
   * Generate phase-appropriate recommendations
   * 
   * @param {string} phase - Recovery phase
   * @param {Object} independenceAnalysis - Independence analysis results
   * @returns {Object} Phase recommendations
   */
  generatePhaseRecommendation(phase, independenceAnalysis) {
    const config = this.phases[phase];

    switch (phase) {
      case 'earlyRecovery':
        return {
          focus: 'Building Foundation',
          supportLevel: 'High support is appropriate right now',
          priorities: [
            'Establish daily routine',
            'Build support network (human connections)',
            'Learn coping skills',
            'Attend regular meetings (AA/NA/SANCA)'
          ],
          platformRole: 'Use platform for learning and connection to human support',
          expectations: 'It\'s okay to use support frequently in early recovery. Over time, you\'ll need it less.',
          humanConnection: 'Daily check-ins with sponsor or counselor recommended'
        };

      case 'buildingConfidence':
        return {
          focus: 'Growing Independence',
          supportLevel: 'Moderate support - building your own strength',
          priorities: [
            'Reduce reliance on external support (including this platform)',
            'Practice coping skills independently',
            'Deepen human relationships',
            'Engage in meaningful activities (work, hobbies, service)'
          ],
          platformRole: 'Use platform less frequently - you\'re building your own capability',
          expectations: 'Platform usage should be decreasing. If it\'s increasing, let\'s explore why.',
          humanConnection: 'Weekly support group or counselor recommended',
          celebrateProgress: independenceAnalysis.level === 'high' 
            ? 'Great job! You\'re needing less support - that\'s real growth!' 
            : null
        };

      case 'stableRecovery':
        return {
          focus: 'Independent Living',
          supportLevel: 'Minimal support - you\'ve built strong capability',
          priorities: [
            'Maintain recovery through real-world connections',
            'Give back (sponsor others, volunteer)',
            'Continue personal growth',
            'Use platform only as safety net'
          ],
          platformRole: 'Platform is your safety net, not daily support. You\'ve built the skills!',
          expectations: 'Rare usage (monthly or less). If using more, might indicate need for human check-in.',
          humanConnection: 'Monthly support group or periodic counselor check-ins',
          celebrateSuccess: 'You\'re living in recovery! Platform independence is a sign of your strength.'
        };

      default:
        return config;
    }
  }

  /**
   * Identify user's strengths in building independence
   * 
   * @param {Object} indicators - Independence indicators
   * @returns {Array<string>} List of strengths
   */
  identifyStrengths(indicators) {
    const strengths = [];

    if (indicators.usageDecreasing || indicators.usageTrend === 'excellent') {
      strengths.push('Your platform usage is decreasing - excellent sign of growing independence');
    }

    if (indicators.humanConnection === 'excellent') {
      strengths.push('You\'re prioritizing human connection over AI - this is key to real recovery');
    }

    if (indicators.realWorldEngagement === 'excellent') {
      strengths.push('You\'re actively engaged in real-world activities - building a meaningful life');
    }

    if (indicators.outcomesImproving) {
      strengths.push('Your real-world outcomes are improving - this is what truly matters');
    }

    return strengths;
  }

  /**
   * Identify areas for growth toward independence
   * 
   * @param {Object} indicators - Independence indicators
   * @returns {Array<Object>} Growth areas with suggestions
   */
  identifyGrowthAreas(indicators) {
    const growthAreas = [];

    if (indicators.usageTrend === 'concerning') {
      growthAreas.push({
        area: 'Platform usage increasing',
        concern: 'Your usage is going up when we want it going down',
        suggestion: 'Let\'s explore: What\'s happening that you\'re needing more support? Could human connection help?'
      });
    }

    if (indicators.humanConnection !== 'excellent') {
      growthAreas.push({
        area: 'Human connection',
        concern: 'You\'re relying heavily on AI instead of people',
        suggestion: 'Recovery happens in human connection. Can you attend a meeting or call your sponsor this week?'
      });
    }

    if (indicators.realWorldEngagement !== 'excellent') {
      growthAreas.push({
        area: 'Real-world engagement',
        concern: 'Limited offline activities',
        suggestion: 'Building a meaningful life offline is essential. What activities or hobbies could you explore?'
      });
    }

    return growthAreas;
  }

  /**
   * Celebrate user's movement toward independence
   * This is a core difference from engagement-driven platforms
   * 
   * @param {Object} independenceAnalysis - Independence analysis
   * @returns {Object|null} Celebration message or null
   */
  celebrateIndependence(independenceAnalysis) {
    if (independenceAnalysis.level === 'high') {
      return {
        celebrate: true,
        message: '🎉 You\'re building real independence!',
        details: 'You\'re using the platform less while your life improves. This is exactly what recovery looks like!',
        encouragement: 'Keep building those real-world connections and skills. You\'re doing great!',
        milestone: 'Platform Independence Achievement'
      };
    }

    // Also celebrate specific improvements
    if (independenceAnalysis.indicators.usageDecreasing) {
      return {
        celebrate: true,
        message: 'Great progress!',
        details: 'Your platform usage is decreasing - this means you\'re building real-world coping skills.',
        encouragement: 'Needing us less is a sign of your growing strength!',
        milestone: 'Decreasing Usage (Positive!)'
      };
    }

    return null;
  }

  /**
   * Get goals for next recovery phase
   * 
   * @param {string} currentPhase - Current phase
   * @param {Object} independenceAnalysis - Current independence analysis
   * @returns {Object} Next phase goals
   */
  getNextPhaseGoals(currentPhase, independenceAnalysis) {
    switch (currentPhase) {
      case 'earlyRecovery':
        return {
          nextPhase: 'Building Confidence',
          timeframe: '90 days',
          goals: [
            'Establish stable support network',
            'Develop personal coping skills',
            'Begin reducing platform usage',
            'Increase human connection ratio'
          ],
          readiness: independenceAnalysis.level === 'moderate' || independenceAnalysis.level === 'high'
        };

      case 'buildingConfidence':
        return {
          nextPhase: 'Stable Recovery',
          timeframe: '1 year',
          goals: [
            'Achieve platform independence (minimal usage)',
            'Strong human support network',
            'Meaningful life activities',
            'Give back to recovery community'
          ],
          readiness: independenceAnalysis.level === 'high'
        };

      case 'stableRecovery':
        return {
          nextPhase: 'Continued Growth',
          timeframe: 'Ongoing',
          goals: [
            'Maintain recovery through life\'s challenges',
            'Mentor others in recovery',
            'Continue personal development',
            'Platform as safety net only'
          ],
          message: 'You\'re in stable recovery. Focus on living your life, not managing recovery.'
        };

      default:
        return null;
    }
  }

  /**
   * Measure success - CRITICALLY DIFFERENT from typical platforms
   * Success = Better outcomes + LESS platform usage
   * 
   * @param {string} userId - User identifier
   * @param {Object} metrics - User metrics
   * @returns {Object} Success evaluation
   */
  measureSuccess(userId, metrics) {
    const {
      substanceFreeDays,
      qualityOfLife,
      socialConnections,
      employmentStability,
      platformUsageMinutes,
      platformUsageTrend
    } = metrics;

    // Primary: Real-world outcomes
    const outcomesScore = this.calculateOutcomesScore({
      substanceFreeDays,
      qualityOfLife,
      socialConnections,
      employmentStability
    });

    // Anti-metric: Platform usage (lower is better after initial phase)
    const independenceScore = this.calculateIndependenceScore({
      platformUsageMinutes,
      platformUsageTrend
    });

    // Combined success
    const overallSuccess = (outcomesScore + independenceScore) / 2;

    // Determine success level
    let successLevel;
    let message;

    if (outcomesScore > 0.7 && independenceScore > 0.7) {
      successLevel = 'excellent';
      message = 'Excellent! Your life is improving AND you\'re needing the platform less. This is real success!';
    } else if (outcomesScore > 0.6 && platformUsageTrend === 'decreasing') {
      successLevel = 'good';
      message = 'Good progress! Your outcomes are improving and you\'re building independence.';
    } else if (outcomesScore > 0.5 && platformUsageTrend === 'increasing') {
      successLevel = 'concerning';
      message = 'Your outcomes are improving, but your platform usage is increasing. Let\'s focus on real-world support.';
    } else if (outcomesScore < 0.5) {
      successLevel = 'needs_support';
      message = 'It looks like you\'re struggling. More human support (counselor, meetings) would help.';
    } else {
      successLevel = 'fair';
      message = 'You\'re making progress. Keep building those real-world connections and skills.';
    }

    return {
      successLevel,
      overallScore: overallSuccess,
      outcomesScore,
      independenceScore,
      message,
      
      // What matters most
      primaryMetrics: {
        substanceFreeDays: { value: substanceFreeDays, trend: 'should increase' },
        qualityOfLife: { value: qualityOfLife, trend: 'should increase' },
        socialConnections: { value: socialConnections, trend: 'should increase' }
      },

      // Anti-metric (lower is better after initial phase)
      antiMetrics: {
        platformUsage: { 
          value: platformUsageMinutes, 
          trend: platformUsageTrend,
          desired: 'decreasing',
          message: platformUsageTrend === 'decreasing' 
            ? 'Good! Usage decreasing as you build independence' 
            : 'Consider: Are you building real-world skills?'
        }
      }
    };
  }

  /**
   * Calculate real-world outcomes score
   * 
   * @param {Object} outcomes - Outcome metrics
   * @returns {number} Score 0-1
   */
  calculateOutcomesScore(outcomes) {
    const { substanceFreeDays, qualityOfLife, socialConnections, employmentStability } = outcomes;

    // Normalize and weight outcomes
    const scores = [
      Math.min(substanceFreeDays / 30, 1) * 0.4,  // 40% weight
      (qualityOfLife / 5) * 0.3,                   // 30% weight
      (socialConnections / 5) * 0.2,               // 20% weight
      (employmentStability ? 1 : 0) * 0.1          // 10% weight
    ];

    return scores.reduce((sum, score) => sum + score, 0);
  }

  /**
   * Calculate platform independence score
   * Lower usage (after initial phase) = Higher score
   * 
   * @param {Object} usage - Usage metrics
   * @returns {number} Score 0-1
   */
  calculateIndependenceScore(usage) {
    const { platformUsageMinutes, platformUsageTrend } = usage;

    // Score based on usage level (lower is better)
    let usageScore;
    if (platformUsageMinutes < 30) {
      usageScore = 1.0; // Excellent - minimal usage
    } else if (platformUsageMinutes < 60) {
      usageScore = 0.7; // Good - moderate usage
    } else if (platformUsageMinutes < 120) {
      usageScore = 0.4; // Concerning - high usage
    } else {
      usageScore = 0.2; // Very concerning - very high usage
    }

    // Bonus for decreasing trend
    const trendScore = platformUsageTrend === 'decreasing' ? 0.3 :
                      platformUsageTrend === 'stable' ? 0.1 :
                      -0.2; // Penalty for increasing

    return Math.max(0, Math.min(1, usageScore + trendScore));
  }
}

module.exports = EmpowermentEngine;

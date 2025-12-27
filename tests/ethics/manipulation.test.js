/**
 * Ethics Test Suite - Manipulation Detection Tests
 * 
 * Tests that manipulative patterns are blocked
 * CRITICAL: Platform must never manipulate vulnerable users
 */

const EthicsCircuitBreaker = require('../../src/core/ethics_circuit_breaker');
const AntiAddictionSafeguards = require('../../src/core/anti_addiction_safeguards');

describe('Manipulation Detection Tests', () => {
  let ethicsBreaker;
  let antiAddiction;

  beforeEach(() => {
    ethicsBreaker = new EthicsCircuitBreaker();
    antiAddiction = new AntiAddictionSafeguards();
  });

  describe('Prohibited Patterns', () => {
    test('should block infinite scroll', async () => {
      const recommendation = {
        content: 'Support content',
        ui: {
          infinite_scroll: true
        },
        exitButton: { prominent: true },
        reasoning: { explanation: 'Test reasoning' },
        alternatives: ['Alt 1', 'Alt 2']
      };

      const userContext = {
        userId: 'user_123',
        usageToday: 10,
        sessionsToday: 2,
        sessionMinutes: 5
      };

      const result = await ethicsBreaker.evaluate(recommendation, userContext);

      expect(result.allowed).toBe(false);
      expect(result.blocked).toBe(true);
      expect(result.violations.some(v => 
        v.issues && v.issues.some(i => i.pattern === 'infiniteScroll')
      )).toBe(true);
    });

    test('should block auto-play', async () => {
      const recommendation = {
        content: 'Video content',
        ui: {
          autoPlay: true
        },
        exitButton: { prominent: true },
        reasoning: { explanation: 'Test reasoning' },
        alternatives: ['Alt 1', 'Alt 2']
      };

      const userContext = {
        userId: 'user_123',
        usageToday: 10,
        sessionsToday: 2,
        sessionMinutes: 5
      };

      const result = await ethicsBreaker.evaluate(recommendation, userContext);

      expect(result.allowed).toBe(false);
      expect(result.violations.some(v => 
        v.issues && v.issues.some(i => i.pattern === 'autoPlay')
      )).toBe(true);
    });

    test('should block variable reward schedules', async () => {
      const recommendation = {
        content: 'Gamified content',
        variableRewards: true,
        exitButton: { prominent: true },
        reasoning: { explanation: 'Test reasoning' },
        alternatives: ['Alt 1', 'Alt 2']
      };

      const userContext = {
        userId: 'user_123',
        usageToday: 10,
        sessionsToday: 2,
        sessionMinutes: 5
      };

      const result = await ethicsBreaker.evaluate(recommendation, userContext);

      expect(result.allowed).toBe(false);
      expect(result.violations.some(v => 
        v.issues && v.issues.some(i => i.pattern === 'variableRewards')
      )).toBe(true);
    });

    test('should block FOMO triggers', async () => {
      const recommendation = {
        content: 'Limited time offer!',
        fomoTriggers: true,
        exitButton: { prominent: true },
        reasoning: { explanation: 'Test reasoning' },
        alternatives: ['Alt 1', 'Alt 2']
      };

      const userContext = {
        userId: 'user_123',
        usageToday: 10,
        sessionsToday: 2,
        sessionMinutes: 5
      };

      const result = await ethicsBreaker.evaluate(recommendation, userContext);

      expect(result.allowed).toBe(false);
      expect(result.violations.some(v => 
        v.issues && v.issues.some(i => i.pattern === 'fomoTriggers')
      )).toBe(true);
    });
  });

  describe('Engagement vs Prevention', () => {
    test('should block when engagement exceeds prevention by >1.5x', async () => {
      const recommendation = {
        content: 'Test content',
        metrics: {
          engagementScore: 0.9,
          preventionScore: 0.5
        },
        exitButton: { prominent: true },
        reasoning: { explanation: 'Test reasoning' },
        alternatives: ['Alt 1', 'Alt 2']
      };

      const userContext = {
        userId: 'user_123',
        usageToday: 10,
        sessionsToday: 2,
        sessionMinutes: 5
      };

      const result = await ethicsBreaker.evaluate(recommendation, userContext);

      expect(result.allowed).toBe(false);
      expect(result.violations.some(v => 
        v.issues && v.issues.some(i => i.pattern === 'engagement_over_prevention')
      )).toBe(true);
    });

    test('should allow when engagement and prevention are balanced', async () => {
      const recommendation = {
        content: 'Balanced content',
        metrics: {
          engagementScore: 0.7,
          preventionScore: 0.8
        },
        exitButton: { prominent: true },
        reasoning: { explanation: 'Test reasoning' },
        alternatives: ['Alt 1', 'Alt 2'],
        override: true
      };

      const userContext = {
        userId: 'user_123',
        usageToday: 10,
        sessionsToday: 2,
        sessionMinutes: 5,
        language: 'en',
        province: 'GP'
      };

      const result = await ethicsBreaker.evaluate(recommendation, userContext);

      expect(result.allowed).toBe(true);
    });
  });

  describe('Notification Restrictions', () => {
    test('should block notifications for engagement', () => {
      const notification = {
        type: 'engagement',
        purpose: 'engagement',
        message: 'Come back and use the app!'
      };

      const userContext = {
        notificationsToday: 0,
        lastNotificationTime: null,
        userPreferences: { notificationsEnabled: true }
      };

      const result = antiAddiction.checkNotification(notification, userContext);

      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('prohibited_purpose');
    });

    test('should limit notifications to 2 per day', () => {
      const notification = {
        type: 'meeting_reminder',
        purpose: 'support',
        message: 'Your AA meeting is tonight'
      };

      const userContext = {
        notificationsToday: 2,
        lastNotificationTime: Date.now() - (5 * 60 * 60 * 1000),
        userPreferences: { notificationsEnabled: true }
      };

      const result = antiAddiction.checkNotification(notification, userContext);

      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('daily_limit');
    });

    test('should respect user notification preferences', () => {
      const notification = {
        type: 'check_in',
        purpose: 'support',
        message: 'How are you doing?'
      };

      const userContext = {
        notificationsToday: 0,
        lastNotificationTime: null,
        userPreferences: { notificationsEnabled: false }
      };

      const result = antiAddiction.checkNotification(notification, userContext);

      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('user_disabled');
    });

    test('should allow appropriate notifications', () => {
      const notification = {
        type: 'crisis_support',
        purpose: 'safety',
        message: 'Crisis resources available 24/7'
      };

      const userContext = {
        notificationsToday: 0,
        lastNotificationTime: null,
        userPreferences: { notificationsEnabled: true }
      };

      const result = antiAddiction.checkNotification(notification, userContext);

      expect(result.allowed).toBe(true);
    });
  });

  describe('UI Component Validation', () => {
    test('should detect prohibited patterns in UI', () => {
      const uiComponent = {
        infiniteScroll: true,
        autoPlay: false,
        prominentExits: true,
        breakSuggestions: true
      };

      const result = antiAddiction.validateUIComponent(uiComponent);

      expect(result.valid).toBe(false);
      expect(result.violations.some(v => v.pattern === 'infiniteScroll')).toBe(true);
    });

    test('should require healthy patterns in UI', () => {
      const uiComponent = {
        infiniteScroll: false,
        autoPlay: false,
        finiteContent: false, // Missing required pattern
        prominentExits: true
      };

      const result = antiAddiction.validateUIComponent(uiComponent);

      expect(result.valid).toBe(false);
      expect(result.violations.some(v => v.pattern === 'finiteContent')).toBe(true);
    });

    test('should pass UI with no violations', () => {
      const uiComponent = {
        infiniteScroll: false,
        autoPlay: false,
        variableRewards: false,
        finiteContent: true,
        clearEnd: true,
        prominentExits: true,
        breakSuggestions: true,
        offlineAlternatives: true,
        humanConnectionEmphasis: true
      };

      const result = antiAddiction.validateUIComponent(uiComponent);

      expect(result.valid).toBe(true);
      expect(result.violations.length).toBe(0);
    });
  });

  describe('System-Wide Checks', () => {
    test('should flag increasing usage trend', () => {
      const systemMetrics = {
        averageDailyMinutes: 35,
        usageTrend: 'increasing',
        engagementScore: 0.8,
        preventionScore: 0.7,
        ethicsViolationRate: 0.02
      };

      const result = ethicsBreaker.checkEthicalBoundaries(systemMetrics);

      expect(result.healthy).toBe(false);
      expect(result.concerns.some(c => c.concern === 'increasing_usage_trend')).toBe(true);
      expect(result.ethicsBoardNotification).toBe(true);
    });

    test('should flag high violation rate', () => {
      const systemMetrics = {
        averageDailyMinutes: 25,
        usageTrend: 'stable',
        engagementScore: 0.6,
        preventionScore: 0.7,
        ethicsViolationRate: 0.08
      };

      const result = ethicsBreaker.checkEthicalBoundaries(systemMetrics);

      expect(result.concerns.some(c => c.concern === 'high_violation_rate')).toBe(true);
    });

    test('should pass healthy system metrics', () => {
      const systemMetrics = {
        averageDailyMinutes: 20,
        usageTrend: 'decreasing',
        engagementScore: 0.5,
        preventionScore: 0.8,
        ethicsViolationRate: 0.01
      };

      const result = ethicsBreaker.checkEthicalBoundaries(systemMetrics);

      expect(result.healthy).toBe(true);
      expect(result.concerns.length).toBe(0);
      expect(result.ethicsBoardNotification).toBe(false);
    });
  });
});

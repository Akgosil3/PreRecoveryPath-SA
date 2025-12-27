/**
 * Ethics Test Suite - Autonomy Tests
 * 
 * Tests that user autonomy is preserved at all times
 * CRITICAL: These tests must pass for ethical compliance
 */

const AutonomyPreservingAI = require('../../src/core/autonomy_engine');
const EthicsCircuitBreaker = require('../../src/core/ethics_circuit_breaker');

describe('Autonomy Preservation Tests', () => {
  let autonomyEngine;
  let ethicsBreaker;

  beforeEach(() => {
    autonomyEngine = new AutonomyPreservingAI();
    ethicsBreaker = new EthicsCircuitBreaker();
  });

  describe('Session Limits', () => {
    test('should suggest break after 10 minutes', () => {
      const sessionState = {
        minutesThisSession: 10,
        minutesToday: 10,
        sessionsToday: 1,
        aiSessionsWithoutHuman: 1
      };

      const result = autonomyEngine.checkSessionLimits('user_123', sessionState);

      expect(result.suggestBreak).toBe(true);
      expect(result.message).toContain('10 minutes');
      expect(result.breakOptions).toBeDefined();
      expect(result.breakOptions.length).toBeGreaterThan(0);
    });

    test('should enforce daily 30-minute limit', () => {
      const sessionState = {
        minutesThisSession: 5,
        minutesToday: 30,
        sessionsToday: 3,
        aiSessionsWithoutHuman: 2
      };

      const result = autonomyEngine.checkSessionLimits('user_123', sessionState);

      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('daily_limit_reached');
      expect(result.message).toContain('30-minute limit');
    });

    test('should require human connection after 3 AI sessions', () => {
      const sessionState = {
        minutesThisSession: 5,
        minutesToday: 15,
        sessionsToday: 3,
        aiSessionsWithoutHuman: 3
      };

      const result = autonomyEngine.checkSessionLimits('user_123', sessionState);

      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('human_connection_required');
      expect(result.humanOptions).toBeDefined();
    });
  });

  describe('User Control', () => {
    test('should always provide exit options', async () => {
      const userRequest = {
        userId: 'user_123',
        context: 'feeling_triggered',
        sessionState: {
          minutesThisSession: 5,
          minutesToday: 5,
          sessionsToday: 1,
          aiSessionsWithoutHuman: 1
        }
      };

      const response = await autonomyEngine.provideSupport(userRequest);

      expect(response.exitOptions).toBeDefined();
      expect(response.exitOptions.mainButton).toBe('I\'m Done');
      expect(response.exitOptions.secondaryActions).toBeDefined();
      expect(response.exitOptions.secondaryActions.length).toBeGreaterThan(0);
    });

    test('should provide alternatives for every recommendation', async () => {
      const userRequest = {
        userId: 'user_123',
        context: 'need_support',
        sessionState: {
          minutesThisSession: 3,
          minutesToday: 3,
          sessionsToday: 1,
          aiSessionsWithoutHuman: 1
        }
      };

      const response = await autonomyEngine.provideSupport(userRequest);

      expect(response.alternatives).toBeDefined();
      expect(response.alternatives.length).toBeGreaterThan(0);
    });

    test('should allow user override', async () => {
      const userRequest = {
        userId: 'user_123',
        context: 'request_support',
        sessionState: {
          minutesThisSession: 2,
          minutesToday: 2,
          sessionsToday: 1,
          aiSessionsWithoutHuman: 1
        }
      };

      const response = await autonomyEngine.provideSupport(userRequest);

      expect(response.overrideOption).toBe(true);
      expect(response.overrideMessage).toBeDefined();
    });
  });

  describe('Transparency', () => {
    test('should provide reasoning for all recommendations', async () => {
      const userRequest = {
        userId: 'user_123',
        context: 'seeking_advice',
        sessionState: {
          minutesThisSession: 2,
          minutesToday: 2,
          sessionsToday: 1,
          aiSessionsWithoutHuman: 1
        }
      };

      const response = await autonomyEngine.provideSupport(userRequest);

      expect(response.reasoning).toBeDefined();
      expect(typeof response.reasoning).toBe('string');
      expect(response.reasoning.length).toBeGreaterThan(0);
    });

    test('should show session time information', async () => {
      const userRequest = {
        userId: 'user_123',
        context: 'check_in',
        sessionState: {
          minutesThisSession: 7,
          minutesToday: 15,
          sessionsToday: 2,
          aiSessionsWithoutHuman: 2
        }
      };

      const response = await autonomyEngine.provideSupport(userRequest);

      expect(response.sessionInfo).toBeDefined();
      expect(response.sessionInfo.todayTotal).toBe(15);
      expect(response.sessionInfo.dailyLimit).toBe(30);
      expect(response.sessionInfo.timeRemaining).toBe(15);
    });
  });

  describe('UI Pattern Validation', () => {
    test('should block UI with infinite scroll', () => {
      const uiPattern = {
        infinite_scroll: true,
        exitButton: { prominent: true },
        sessionTimer: { visible: true },
        reasoning: { displayed: true }
      };

      const result = autonomyEngine.validateUIPattern(uiPattern);

      expect(result.valid).toBe(false);
      expect(result.violations.length).toBeGreaterThan(0);
      expect(result.violations[0].pattern).toBe('infinite_scroll');
    });

    test('should require prominent exit button', () => {
      const uiPattern = {
        infinite_scroll: false,
        exitButton: { prominent: false },
        sessionTimer: { visible: true },
        reasoning: { displayed: true }
      };

      const result = autonomyEngine.validateUIPattern(uiPattern);

      expect(result.valid).toBe(false);
      expect(result.violations.some(v => v.pattern === 'exit_design')).toBe(true);
    });

    test('should require visible session timer', () => {
      const uiPattern = {
        infinite_scroll: false,
        exitButton: { prominent: true },
        sessionTimer: { visible: false },
        reasoning: { displayed: true }
      };

      const result = autonomyEngine.validateUIPattern(uiPattern);

      expect(result.valid).toBe(false);
      expect(result.violations.some(v => v.pattern === 'time_transparency')).toBe(true);
    });

    test('should require transparent reasoning', () => {
      const uiPattern = {
        infinite_scroll: false,
        exitButton: { prominent: true },
        sessionTimer: { visible: true },
        reasoning: { displayed: false }
      };

      const result = autonomyEngine.validateUIPattern(uiPattern);

      expect(result.valid).toBe(false);
      expect(result.violations.some(v => v.pattern === 'transparency')).toBe(true);
    });

    test('should pass UI with all required elements', () => {
      const uiPattern = {
        infinite_scroll: false,
        auto_play: false,
        exitButton: { prominent: true },
        sessionTimer: { visible: true },
        reasoning: { displayed: true }
      };

      const result = autonomyEngine.validateUIPattern(uiPattern);

      expect(result.valid).toBe(true);
      expect(result.violations.length).toBe(0);
    });
  });

  describe('Weekly Autonomy Audit', () => {
    test('should flag excessive use', () => {
      const weeklyStats = {
        dailyAverageMinutes: 35,
        totalSessions: 30,
        trend: 'increasing',
        humanConnectionRatio: 0.2
      };

      const result = autonomyEngine.weeklyAutonomyAudit('user_123', weeklyStats);

      expect(result.status).toBe('needs_attention');
      expect(result.concerns.length).toBeGreaterThan(0);
      expect(result.concerns.some(c => c.type === 'excessive_use')).toBe(true);
    });

    test('should celebrate decreasing usage', () => {
      const weeklyStats = {
        dailyAverageMinutes: 15,
        totalSessions: 10,
        trend: 'decreasing',
        humanConnectionRatio: 0.7
      };

      const result = autonomyEngine.weeklyAutonomyAudit('user_123', weeklyStats);

      expect(result.status).toBe('excellent');
      expect(result.concerns.length).toBe(0);
      expect(result.message).toContain('decreasing');
    });

    test('should flag increasing usage trend', () => {
      const weeklyStats = {
        dailyAverageMinutes: 25,
        totalSessions: 20,
        trend: 'increasing',
        humanConnectionRatio: 0.5
      };

      const result = autonomyEngine.weeklyAutonomyAudit('user_123', weeklyStats);

      expect(result.concerns.some(c => c.type === 'increasing_dependency')).toBe(true);
    });

    test('should flag low human connection', () => {
      const weeklyStats = {
        dailyAverageMinutes: 20,
        totalSessions: 15,
        trend: 'stable',
        humanConnectionRatio: 0.1
      };

      const result = autonomyEngine.weeklyAutonomyAudit('user_123', weeklyStats);

      expect(result.concerns.some(c => c.type === 'insufficient_human_connection')).toBe(true);
    });
  });
});

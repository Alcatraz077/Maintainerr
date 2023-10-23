import { TestBed } from '@automock/jest';
import { RulePossibility } from '../constants/rules.constants';
import { RuleExecutorService } from '../rule-executor.service';
import { PlexApiService } from '../../api/plex-api/plex-api.service';
import { CollectionsService } from '../../collections/collections.service';
import { SettingsService } from '../../settings/settings.service';
import { TasksService } from '../../tasks/tasks.service';
import { ValueGetterService } from '../getter/getter.service';
import { RulesService } from '../rules.service';

describe('RuleExecutorService', () => {
  let ruleExecutorService: RuleExecutorService;

  beforeEach(async () => {
    const { unit } = TestBed.create(RuleExecutorService)
      .mock(RulesService)
      .using({ getRuleGroups: jest.fn().mockResolvedValue([]) })
      .mock(ValueGetterService)
      .using({ get: jest.fn() })
      .mock(PlexApiService)
      .using({})
      .mock(CollectionsService)
      .using({})
      .mock(TasksService)
      .using({})
      .mock(SettingsService)
      .using({})
      .compile();

    ruleExecutorService = unit;
  });

  describe('doRuleAction', () => {
    it('should return true when comparing two strings with action EQUALS', () => {
      const val1 = 'abc';
      const val2 = 'abc';
      const action = RulePossibility.EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing strings with action EQUALS and value is an empty string', () => {
      const val1 = 'abc';
      const val2 = '';
      const action = RulePossibility.EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });


    it('should return false when comparing two strings with action EQUALS and value is undefined', () => {
      const val1 = 'abc';
      const val2 = undefined;
      const action = RulePossibility.EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return false when comparing two strings with action EQUALS', () => {
      const val1 = 'abc';
      const val2 = 'abd';
      const action = RulePossibility.EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return false when comparing two strings with action NOT_EQUALS', () => {
      const val1 = 'abc';
      const val2 = 'abc';
      const action = RulePossibility.NOT_EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing two strings with action NOT_EQUALS', () => {
      const val1 = 'abc';
      const val2 = 'abd';
      const action = RulePossibility.NOT_EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return true when comparing an array of strings with action EQUALS', () => {
      const val1 = ['abc', 'def'];
      const val2 = ['abc', 'def'];
      const action = RulePossibility.EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing a faulty array of strings with action EQUALS', () => {
      const val1 = ['abc', 'def'];
      const val2 = ['abc', 'cde'];
      const action = RulePossibility.EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return false when comparing an array of strings with action NOT_EQUALS', () => {
      const val1 = ['abc', 'def'];
      const val2 = ['abc', 'def'];
      const action = RulePossibility.NOT_EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing a faulty array of strings with action NOT_EQUALS', () => {
      const val1 = ['abc', 'def'];
      const val2 = ['abc', 'cde'];
      const action = RulePossibility.NOT_EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return true when comparing two dates with action EQUALS', () => {
      const val1 = new Date('2022-01-01');
      const val2 = new Date('2022-01-01');
      const action = RulePossibility.EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing two dates with action EQUALS', () => {
      const val1 = new Date('2022-01-01');
      const val2 = new Date('2022-01-02');
      const action = RulePossibility.EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return false when comparing two dates with action NOT_EQUALS', () => {
      const val1 = new Date('2022-01-01');
      const val2 = new Date('2022-01-01');
      const action = RulePossibility.NOT_EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing two dates with action NOT_EQUALS', () => {
      const val1 = new Date('2022-01-01');
      const val2 = new Date('2022-01-02');
      const action = RulePossibility.NOT_EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return true when comparing two numbers with action EQUALS', () => {
      const val1 = 5;
      const val2 = 5;
      const action = RulePossibility.EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing two numbers with action EQUALS', () => {
      const val1 = 5;
      const val2 = 4;
      const action = RulePossibility.EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return false when comparing two numbers with action NOT_EQUALS', () => {
      const val1 = 5;
      const val2 = 5;
      const action = RulePossibility.NOT_EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing two numbers with action NOT_EQUALS', () => {
      const val1 = 5;
      const val2 = 4;
      const action = RulePossibility.NOT_EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return true when comparing an array of strings with action CONTAINS', () => {
      const val1 = ['abc', 'def'];
      const val2 = ['abc'];
      const action = RulePossibility.CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing an array of strings with action CONTAINS and value is an empty string', () => {
      const val1 = ['abc', 'def'];
      const val2 = [''];
      const action = RulePossibility.CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return false when comparing an array of strings with action CONTAINS and value contains undefined', () => {
      const val1 = ['abc', 'def'];
      const val2 = ['ral', undefined, 'rel'];
      const action = RulePossibility.CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing an array of strings with action CONTAINS and value contains undefined', () => {
      const val1 = ['abc', 'def'];
      const val2 = ['ral', undefined, 'abc'];
      const action = RulePossibility.CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing an array of strings with action CONTAINS', () => {
      const val1 = ['abc', 'def'];
      const val2 = ['ghi'];
      const action = RulePossibility.CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing an array of strings with action NOT_CONTAINS', () => {
      const val1 = ['abc', 'def'];
      const val2 = ['ghi'];
      const action = RulePossibility.NOT_CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing an array of strings with action NOT_CONTAINS', () => {
      const val1 = ['abc', 'def'];
      const val2 = ['abc'];
      const action = RulePossibility.NOT_CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing an array of numbers with action CONTAINS', () => {
      const val1 = ['abc', 'def'];
      const val2 = ['abc'];
      const action = RulePossibility.CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing an array of numbers against 1 value with action CONTAINS', () => {
      const val1 = [1, 2, 3, 4];
      const val2 = [6];
      const action = RulePossibility.CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing an array of numbers against 1 value with action NOT_CONTAINS', () => {
      const val1 = [1, 2, 3, 4];
      const val2 = [6];
      const action = RulePossibility.NOT_CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return true when comparing an array of numbers against 1 value with action NOT_CONTAINS and value contains undefined', () => {
      const val1 = [1, 2, 3, 4];
      const val2 = [5, undefined, 6];
      const action = RulePossibility.NOT_CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return true when comparing an array of numbers against 1 value with action CONTAINS', () => {
      const val1 = [1, 2, 3, 4];
      const val2 = [3];
      const action = RulePossibility.CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing an array of numbers against 1 value with action NOT_CONTAINS', () => {
      const val1 = [1, 2, 3, 4];
      const val2 = [3];
      const action = RulePossibility.NOT_CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return false when comparing 2 arrays of multiple numbers with action CONTAINS', () => {
      const val1 = [1, 2, 3, 4];
      const val2 = [6, 5];
      const action = RulePossibility.CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing an array of multiple numbers with action CONTAINS', () => {
      const val1 = [1, 2, 3, 4];
      const val2 = [3, 1];
      const action = RulePossibility.CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing an array of multiple numbers with action NOT_CONTAINS', () => {
      const val1 = [1, 2, 3, 4];
      const val2 = [3, 5];
      const action = RulePossibility.NOT_CONTAINS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing two numbers with action BIGGER', () => {
      const val1 = 5;
      const val2 = 3;
      const action = RulePossibility.BIGGER;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing two numbers with action SMALLER', () => {
      const val1 = 5;
      const val2 = 3;
      const action = RulePossibility.SMALLER;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return false when comparing two numbers with action SMALLER and value is undefined', () => {
      const val1 = 5;
      const val2 = undefined;
      const action = RulePossibility.SMALLER;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing two numbers with action EQUALS', () => {
      const val1 = 5;
      const val2 = 5;
      const action = RulePossibility.EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing two numbers with action NOT_EQUALS', () => {
      const val1 = 5;
      const val2 = 5;
      const action = RulePossibility.NOT_EQUALS;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing two dates with action BEFORE', () => {
      const val1 = new Date('2022-01-01');
      const val2 = new Date('2022-01-02');
      const action = RulePossibility.BEFORE;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing two dates with action BEFORE and value is undefined', () => {
      const val1 = new Date('2022-01-01');
      const val2 = undefined;
      const action = RulePossibility.BEFORE;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return false when comparing two dates with action BEFORE', () => {
      const val1 = new Date('2022-01-03');
      const val2 = new Date('2022-01-02');
      const action = RulePossibility.BEFORE;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing two dates with action AFTER', () => {
      const val1 = new Date('2022-01-03');
      const val2 = new Date('2022-01-02');
      const action = RulePossibility.AFTER;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing two dates with action AFTER', () => {
      const val1 = new Date('2022-01-01');
      const val2 = new Date('2022-01-02');
      const action = RulePossibility.AFTER;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return false when comparing two dates with action AFTER and value is undefined', () => {
      const val1 = new Date('2022-01-01');
      const val2 = undefined;
      const action = RulePossibility.AFTER;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing a date with action IN_LAST', () => {
      const val1 = new Date(Date.now() - 1000); // One second ago
      const val2 = new Date(new Date().getTime() - +3600 * 1000); // 1 hour in seconds
      const action = RulePossibility.IN_LAST;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing a date with action IN_LAST', () => {
      const val1 = new Date(Date.now() - 3600 * 2000); // More than 1 hour ago
      const val2 = new Date(new Date().getTime() - +3600 * 1000);
      const action = RulePossibility.IN_LAST;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return false when comparing a date with action IN_LAST and value is undefined', () => {
      const val1 = new Date(Date.now() - 3600 * 2000); // More than 1 hour ago
      const val2 = undefined;
      const action = RulePossibility.IN_LAST;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return true when comparing a date with action IN_NEXT', () => {
      const val1 = new Date(new Date().getTime() + +432000 * 1000); // 5 days from now
      const val2 = new Date(new Date().getTime() + +864000 * 1000); // 10 days from now
      const action = RulePossibility.IN_NEXT;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(true);
    });

    it('should return false when comparing a date with action IN_NEXT', () => {
      const val1 = new Date(new Date().getTime() + +865000 * 1000); // More than 10 days from now
      const val2 = new Date(new Date().getTime() + +864000 * 1000); // 10 days from now
      const action = RulePossibility.IN_NEXT;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });

    it('should return false when comparing a date with action IN_NEXT and value is undefined', () => {
      const val1 = new Date(new Date().getTime() + +865000 * 1000); // More than 10 days from now
      const val2 = undefined; // 10 days from now
      const action = RulePossibility.IN_NEXT;
      const result = ruleExecutorService['doRuleAction'](val1, val2, action);
      expect(result).toBe(false);
    });
  });
});

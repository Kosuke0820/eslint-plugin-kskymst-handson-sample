import { RuleTester } from 'eslint';
import { rule } from '../no-snakecase';

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

tester.run('no-snakecase', rule, {
  valid: [
    `const testVariable = 'test'`,
    `const TEST_VARIABLE = 'test'`,
    `const _testVariable = 'test'`,
  ],
  invalid: [
    {
      code: `const test_variable = 'test'`,
      errors: [
        {
          message: 'camelcaseで定義してください',
        },
      ],
    },
  ],
});

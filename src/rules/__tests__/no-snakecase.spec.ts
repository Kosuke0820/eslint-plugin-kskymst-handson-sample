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
    `function testFunc(firstArg){}`,
    `function testFunc(firstArg, secondArg){}`,
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
    {
      code: `function testFunc(first_arg){}`,
      errors: [
        {
          message: 'camelcaseで定義してください',
        },
      ],
    },
    {
      code: `function testFunc(first_arg, second_arg){}`,
      errors: [
        {
          message: 'camelcaseで定義してください',
        },
        {
          message: 'camelcaseで定義してください',
        },
      ],
    },
  ],
});

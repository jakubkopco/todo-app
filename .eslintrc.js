module.exports = {
  root: true,
  plugins: ['@angular-eslint', 'eslint-plugin-import', '@typescript-eslint'],
  ignorePatterns: ['src/app/shared/model/database.ts', 'src/app/shared/model/supabase.ts'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true
      },
      extends: ['plugin:@angular-eslint/recommended', 'plugin:@angular-eslint/template/process-inline-templates'],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase'
          }
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case'
          }
        ],
        '@angular-eslint/no-output-on-prefix': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'no-public'
          }
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase', 'UPPER_CASE', 'snake_case'],
            leadingUnderscore: 'allow',
            filter: {
              regex: '[0-4]',
              match: false
            }
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case']
          },
          {
            selector: 'typeLike',
            format: ['PascalCase']
          },
          {
            selector: 'enumMember',
            format: null
          }
        ],
        '@typescript-eslint/no-inferrable-types': [
          'error',
          {
            ignoreParameters: true,
            ignoreProperties: false
          }
        ],
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-shadow': [
          'error',
          {
            hoist: 'all'
          }
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowTernary: true
          }
        ],
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        complexity: 'error',
        'constructor-super': 'error',
        eqeqeq: [
          'error',
          'always',
          {
            null: 'ignore'
          }
        ],
        'guard-for-in': 'error',
        'id-blacklist': ['error', 'any', 'Number', 'number', 'String', 'string', 'Boolean', 'boolean', 'Undefined', 'undefined'],
        'id-match': 'error',
        'import/no-deprecated': 'warn',
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object'],
            pathGroupsExcludedImportTypes: [],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc'
            }
          }
        ],
        'max-classes-per-file': 'error',
        'max-depth': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-console': [
          'error',
          {
            allow: ['warn', 'error']
          }
        ],
        'no-eval': 'error',
        'no-new-wrappers': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        'no-unreachable': 'error',
        'no-use-before-define': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        radix: 'error',
        'arrow-body-style': 'error',
        curly: 'error',
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['lodash', 'lodash-es'],
                message: 'Please import local wrapper'
              }
            ]
          }
        ]
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        '@angular-eslint/template/eqeqeq': [
          'error',
          {
            allowNullOrUndefined: true
          }
        ]
      }
    }
  ]
};

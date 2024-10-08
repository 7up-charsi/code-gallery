const capitalize = (/** @type {string} */ str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const camelCase = (/** @type {string} */ str) => {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
};

/**
 *
 * @param {import('plop').NodePlopAPI} api
 */
export default function plop(api) {
  api.setHelper('transform-name', (/** @type {string} */ text) =>
    text
      .split('-')
      .map((ele) => ele[0].toUpperCase() + ele.slice(1))
      .join(' '),
  );

  api.setHelper('capitalize', (text) => capitalize(camelCase(text)));

  api.setHelper('camelCase', camelCase);

  api.setGenerator('front-end skill', {
    description: 'Generate fron-end skill',
    prompts: [
      {
        type: 'input',
        name: 'skill-name',
        message: 'Skill name :',
        validate: (
          /** @type {string} */
          answer,
        ) => {
          if (/\s+/.test(answer))
            return 'Skill name must be dashed case';

          if (/[A-Z]+/.test(answer))
            return 'Skill name must be lowercase';

          return true;
        },
      },
      {
        type: 'input',
        message: 'Skill description :',
        name: 'description',
        validate: (
          /** @type {string} */
          answer,
        ) => {
          if (!answer.length)
            return 'Skill description must be valid string';

          return true;
        },
      },
    ],
    actions: (data) => {
      return [
        {
          type: 'addMany',
          data,
          destination: './front-end/app/{{dashCase skill-name}}',
          templateFiles: './plop/front-end-skill/**',
          base: './plop/front-end-skill',
        },
      ];
    },
  });
}

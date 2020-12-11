export const surveyTree = {
  title: 'What do you work on?',
  name: 'domain',
  options: [
    {
      label: 'Frontend Development',
      value: 'frontend',
      next: {
        title: 'Which UI framework do you use?',
        name: 'uiFramework',
        options: [
          {
            label: 'React.js',
            value: 'reactjs',
          },
          {
            label: 'Vue.js',
            value: 'vuejs',
          },
          {
            label: 'Svelte.js',
            value: 'sveltejs',
          },
        ],
      },
    },
    {
      label: 'Backend Development',
      value: 'backend',
      next: {
        title: 'Which language do you use?',
        name: 'language',
        options: [
          {
            label: 'Ruby',
            value: 'ruby',
            next: {
              title: 'Which framework do you use?',
              name: 'httpFramework',
              options: [
                {
                  label: 'Ruby on Rails',
                  value: 'ror',
                },
                {
                  label: 'Sinatra',
                  value: 'sinatra',
                },
              ],
            },
          },
          {
            label: 'JavaScript',
            value: 'js',
            next: {
              title: 'Which api library do you use?',
              name: 'apiLibrary',
              options: [
                {
                  label: 'Fastify',
                  value: 'fastify',
                },
                {
                  label: 'Express',
                  value: 'express',
                },
              ],
            },
          },
        ],
      },
    },
  ],
};

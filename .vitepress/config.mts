import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Thinking Notes',
  description: 'Notes on algorithms, problem solving, and programming.',
  base: '/thinking-notes/',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Algorithms', link: '/algorithms/' },
      { text: 'Problem Solving', link: '/problem-solving/' },
      { text: 'Programming', link: '/programming/' },
    ],

    sidebar: {
      '/algorithms/': [
        {
          text: 'Algorithms',
          items: [
            { text: 'Overview', link: '/algorithms/' },
          ],
        },
      ],

      '/problem-solving/': [
        {
          text: 'Problem Solving',
          items: [
            { text: 'Overview', link: '/problem-solving/' },
          ],
        },
      ],

      '/programming/': [
        {
          text: 'Programming',
          items: [
            { text: 'Overview', link: '/programming/' },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/anh0701/thinking-notes',
      },
    ],
  },
})
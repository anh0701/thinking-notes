import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Thinking Notes',
  description: 'Notes on algorithms, problem solving, and programming.',
  base: '/thinking-notes/',

  locales: {
    root: {
      label: 'English',
      lang: 'en',
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
                {
                  text: 'Overview',
                  link: '/algorithms/',
                },
              ],
            },
          ],

          '/problem-solving/': [
            {
              text: 'Problem Solving',
              items: [
                {
                  text: 'Overview',
                  link: '/problem-solving/',
                },
                {
                  text: 'Power of Two',
                  link: '/problem-solving/power-of-two',
                },
              ],
            },
          ],

          '/programming/': [
            {
              text: 'Programming',
              items: [
                {
                  text: 'Overview',
                  link: '/programming/',
                },
              ],
            },
          ],
        },
      },
    },

    vi: {
      label: 'Tiếng Việt',
      lang: 'vi',
      link: '/vi/',
      themeConfig: {
        nav: [
          { text: 'Trang chủ', link: '/vi/' },
          { text: 'Thuật toán', link: '/vi/algorithms/' },
          { text: 'Giải quyết vấn đề', link: '/vi/problem-solving/' },
          { text: 'Lập trình', link: '/vi/programming/' },
        ],

        sidebar: {
          '/vi/algorithms/': [
            {
              text: 'Thuật toán',
              items: [
                {
                  text: 'Tổng quan',
                  link: '/vi/algorithms/',
                },
              ],
            },
          ],

          '/vi/problem-solving/': [
            {
              text: 'Giải quyết vấn đề',
              items: [
                {
                  text: 'Tổng quan',
                  link: '/vi/problem-solving/',
                },
                {
                  text: 'Kiểm tra lũy thừa của 2',
                  link: '/vi/problem-solving/power-of-two',
                },
              ],
            },
          ],

          '/vi/programming/': [
            {
              text: 'Lập trình',
              items: [
                {
                  text: 'Tổng quan',
                  link: '/vi/programming/',
                },
              ],
            },
          ],
        },
      },
    },
  },

  themeConfig: {

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/anh0701/thinking-notes',
      },
    ],
  },
})
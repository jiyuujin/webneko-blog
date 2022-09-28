import { ModuleOptions } from '@nuxt/content/dist/module'

type Content = { ['content']?: Partial<ModuleOptions> }

export const initContent = (): Content => {
  return {
    content: {
      navigation: {
        fields: ['reaction', 'date', 'category', 'tags'],
      },
      highlight: {
        theme: 'github-dark',
        preload: [
          'json',
          'js',
          'jsx',
          'ts',
          'tsx',
          'css',
          'scss',
          'sass',
          'java',
          'scala',
          'php',
          'go',
          'dart',
        ],
      },
    },
  }
}

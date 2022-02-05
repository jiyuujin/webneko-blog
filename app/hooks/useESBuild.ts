import { ESBuildMinifyPlugin } from 'esbuild-loader'

export const useESBuildMinify = (config, options?) => {
  const terserIndex = config.optimization.minimizer.findIndex(
    (minimizer) => minimizer.constructor.name === 'TerserPlugin',
  )
  if (terserIndex > -1) {
    config.optimization.minimizer.splice(terserIndex, 1, new ESBuildMinifyPlugin(options))
  }
}

export const useESBuildLoader = (config, options) => {
  const jsLoader = config.module.rules.find((rule) => rule.test && rule.test.test('.js'))

  const tsLoader = config.module.rules.find((rule) => rule.test && rule.test.test('.ts'))

  if (jsLoader || tsLoader) {
    jsLoader.use.loader = 'esbuild-loader'
    jsLoader.use.options = options
  }
}

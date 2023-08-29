module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          firefox: "64",
          chrome: "71",
        },
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ],
}

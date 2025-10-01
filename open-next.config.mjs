export default {
  default: {
    deploymentTarget: "cloudflare",
    outputDir: ".open-next",
    cloudflare: {
      worker: {
        name: "humtosong-web",
        compatibilityDate: "2024-12-20",
        compatibilityFlags: ["nodejs_compat"],
      },
      assets: {
        directory: "static",
      },
    },
  },
};

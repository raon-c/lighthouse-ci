module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/"],
      collect: {
        numberOfRuns: 5,
      },
    },
    upload: {
      startServerCommnad: "npm run start",
      target: "temporary-public-storage",
    },
    assert: {
      preset: "lighthouse:no-pwa",
    },
  },
};

module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start", // 서버를 키는 명령어
      url: ["http://localhost:3000"],
      collect: {
        numberOfRuns: 5, // Lighthouse 가 5번 실행됨
      },
    },
    upload: {
      target: "temporary-public-storage", // Lighthouse 서버에 결과가 업로드됨 명령어 실행 후 확인할 수 있는 link가 생성됨
    },
  },
};

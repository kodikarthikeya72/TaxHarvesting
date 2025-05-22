// src/api/capitalGainsApi.js
const mockCapitalGainsData = {
  capitalGains: {
    stcg: {
      profits: 70200.88,
      losses: 1548.53,
    },
    ltcg: {
      profits: 5020,
      losses: 3050,
    },
  },
}

export const fetchCapitalGains = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockCapitalGainsData)
    }, 300) // Simulate network delay
  })
}

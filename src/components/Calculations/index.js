export const calculateNetCapitalGains = (profits, losses) => profits - losses

export const calculateRealizedCapitalGains = (stcgNet, ltcgNet) =>
  stcgNet + ltcgNet

export const formatCurrency = amount => `₹${amount.toFixed(2)}`

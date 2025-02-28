export const formatContractData = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(formatContractData);
  }
  if (typeof data === 'bigint') {
    return data.toString();
  }
  if (typeof data === 'object' && data !== null) {
    const formatted: Record<string, any> = {};
    for (const key in data) {
      formatted[key] = formatContractData(data[key]);
    }
    return formatted;
  }
  return data;
};

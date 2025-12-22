export const getTokenImage = (symbol) => {
  const cleanSymbol = symbol.split('_')[0];
  return `/images/tokens/${cleanSymbol.toLowerCase()}.png`;
};

export const createValidators = (tokenData) => {
  const validateAddress = (value) => {
    const address = String(value || '');
    if (!address.trim()) return 'Address is required';
    if (address.length < 10) return 'Address is too short';
    return '';
  };

  const validateAmount = (value) => {
    const amountStr = String(value || '');
    if (!amountStr.trim()) return 'Amount is required';
    const numValue = parseFloat(amountStr);
    if (isNaN(numValue)) return 'Invalid amount';
    if (numValue <= 0) return 'Amount must be greater than 0';
    if (tokenData?.token_amount && numValue > tokenData.token_amount) {
      return 'Insufficient balance';
    }
    return '';
  };

  return {validateAddress, validateAmount};
};
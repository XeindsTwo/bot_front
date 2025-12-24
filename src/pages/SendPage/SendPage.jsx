import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '@/components/PageHeader/PageHeader';
import TokenHeader from './Components/TokenHeader.jsx';
import AddressInput from './Components/AddressInput.jsx';
import AmountInput from './Components/AmountInput.jsx';
import { getTokenImage, createValidators } from './utils';
import { usePersistentForm } from '@/hooks/usePersistentForm';
import './SendPage.scss';

const SendPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const originalTokenData = location.state?.tokenData || null;
  const preservedFormData = location.state?.preservedFormData || null;
  const from = location.state?.from || `/token/${symbol}`;

  const displaySymbol = originalTokenData?.symbol || symbol.toUpperCase().split('_')[0];
  const storageKey = `send_form_${symbol}`;

  const [formData, updateForm] = usePersistentForm(storageKey, {
    address: '',
    amount: ''
  });

  const [errors, setErrors] = useState({ address: '', amount: '' });
  const [touched, setTouched] = useState({ address: false, amount: false });
  const addressInputRef = useRef(null);
  const amountInputRef = useRef(null);

  const tokenData = originalTokenData || {
    symbol: displaySymbol,
    db_symbol: symbol,
    network: '',
    token_amount: 0,
    ...(preservedFormData ? {} : {})
  };

  const { validateAddress, validateAmount } = createValidators(tokenData);

  useEffect(() => {
    if (preservedFormData) {
      const { address, amount } = preservedFormData;
      updateForm({ address, amount });
      setTouched({ address: true, amount: true });
      setErrors({
        address: validateAddress(address),
        amount: validateAmount(amount)
      });
    }
  }, [preservedFormData]);

  useEffect(() => {
    if (!originalTokenData && !preservedFormData) {
      navigate(`/token/${symbol}`);
    }
  }, [originalTokenData, preservedFormData, symbol, navigate]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(`send_form_${symbol}`);
      console.log(`🗑️ Удалил send_form_${symbol}`);
    };
  }, [symbol]);

  const handleAddressChange = useCallback((value) => {
    updateForm({ address: value });
    if (touched.address) setErrors({ ...errors, address: validateAddress(value) });
  }, [touched.address, errors, validateAddress, updateForm]);

  const handleAmountChange = useCallback((value) => {
    updateForm({ amount: value });
    if (touched.amount) setErrors({ ...errors, amount: validateAmount(value) });
  }, [touched.amount, errors, validateAmount, updateForm]);

  const handleBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'address') {
      setErrors(prev => ({ ...prev, address: validateAddress(formData.address) }));
    } else if (field === 'amount') {
      setErrors(prev => ({ ...prev, amount: validateAmount(formData.amount) }));
    }
  }, [formData.address, formData.amount, validateAddress, validateAmount]);

  const handleMaxClick = useCallback(() => {
    const maxAmount = tokenData?.token_amount || 0;
    updateForm({ amount: maxAmount });
    setTouched(prev => ({ ...prev, amount: true }));
    setErrors(prev => ({ ...prev, amount: validateAmount(maxAmount) }));
  }, [tokenData, validateAmount, updateForm]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setTouched({ address: true, amount: true });

    const addressError = validateAddress(formData.address);
    const amountError = validateAmount(formData.amount);

    setErrors({ address: addressError, amount: amountError });

    if (!addressError && !amountError) {
      navigate(`/send/preview`, {
        state: {
          token: displaySymbol,
          db_symbol: tokenData?.db_symbol || symbol,
          amount: formData.amount,
          to: formData.address,
          network: tokenData?.network || tokenData?.token?.network || '',
          tokenData: tokenData,
          formData: formData,
          from: from
        }
      });
    }
  }, [formData, validateAddress, validateAmount, navigate, displaySymbol, tokenData, symbol, from]);

  const isFormValid = !errors.address && !errors.amount && formData.address && formData.amount;

  if (!originalTokenData && !preservedFormData) {
    return <PageHeader title="Loading..." backUrl={from} />;
  }

  const shouldShowNetworkBadge = (tokenSymbol, network) => {
    if (!network) return false;

    const token = tokenSymbol?.toUpperCase() || '';
    const networkLower = network.toLowerCase();

    const nativeMap = {
      'ETH': ['ethereum', 'eth'],
      'BTC': ['bitcoin', 'btc'],
      'BNB': ['bnb smart chain', 'bsc', 'bnb'],
      'MATIC': ['polygon', 'matic'],
      'POL': ['polygon', 'matic'],
      'TRX': ['tron', 'trx'],
      'TON': ['ton'],
      'SOL': ['solana', 'sol'],
      'TWT': ['bnb smart chain', 'bsc', 'bnb'],
    };

    const nativeNetworks = nativeMap[token];
    if (nativeNetworks) {
      return !nativeNetworks.some(native => networkLower.includes(native));
    }

    return true;
  };

  return (
    <>
      <PageHeader
        title={`Send ${displaySymbol}`}
        backUrl={from}
      />
      <TokenHeader
        symbol={displaySymbol}
        imageUrl={getTokenImage(displaySymbol)}
        network={tokenData?.network || tokenData?.token?.network || ''}
        showNetworkBadge={shouldShowNetworkBadge(displaySymbol, tokenData?.network || tokenData?.token?.network || '')}
      />
      <form className="send-form" onSubmit={handleSubmit}>
        <AddressInput
          value={formData.address}
          onChange={handleAddressChange}
          onBlur={() => handleBlur('address')}
          error={errors.address}
          touched={touched.address}
          inputRef={addressInputRef}
        />
        <AmountInput
          value={formData.amount}
          onChange={handleAmountChange}
          onBlur={() => handleBlur('amount')}
          error={errors.amount}
          touched={touched.amount}
          onMaxClick={handleMaxClick}
          balance={tokenData?.token_amount || 0}
          symbol={displaySymbol}
          inputRef={amountInputRef}
        />
        <button type="submit" className="btn" disabled={!isFormValid}>
          Preview
        </button>
      </form>
    </>
  );
};

export default SendPage;
import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import PageHeader from '@/components/PageHeader/PageHeader';
import TokenHeader from './components/TokenHeader/TokenHeader.jsx';
import DetailRow from './components/DetailRow/DetailRow.jsx';
import {
  getNetworkIconName,
  getNetworkIconNameFromFee,
  formatAddress
} from './components/utils';
import './TransactionPreview.scss';

const TransactionReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {token, db_symbol, amount, to, network} = location.state || {};

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [, setError] = useState('');

  const displaySymbol = token || '';
  const apiSymbol = db_symbol || token || '';

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setLoading(true);

        const response = await fetch('http://localhost:8000/api/send/preview', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            token: apiSymbol,
            amount: parseFloat(amount),
            to: to
          })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        if (data.success) {
          setPreviewData(data.preview);
        } else {
          throw new Error(data.detail || 'Ошибка расчета');
        }
      } catch (err) {
        setError(err.message || 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };

    if (apiSymbol && amount && to) {
      fetchPreview();
    } else {
      navigate('/send/' + (apiSymbol || 'ETH'));
    }
  }, [apiSymbol, amount, to, navigate]);

  const handleConfirm = async () => {
    try {
      setSending(true);

      const response = await fetch('http://localhost:8000/api/send/confirm', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token: apiSymbol,
          amount: parseFloat(amount),
          to: to,
          network_fee: previewData?.amounts?.network_fee || 0,
          total_usd: previewData?.amounts?.total_usd || 0
        })
      });

      if (!response.ok) throw new Error('Ошибка отправки');

      const data = await response.json();
      if (data.success) {
        navigate('/history', {
          state: {
            newTransaction: data.transaction,
            message: 'Transaction sent!'
          }
        });
      }
    } catch (err) {
      setError('Ошибка отправки транзакции');
      setSending(false);
    }
  };

  if (loading) {
    return (
        <>
          <PageHeader title="Confirm" backUrl={-1} showSettings={true}/>
        </>
    );
  }

  const networkIconName = getNetworkIconName(
      network || previewData?.network
  );

  const feeNetworkIconName = getNetworkIconNameFromFee(
      previewData?.amounts?.network_fee_currency
  );

  return (
      <>
        <PageHeader title="Confirm" backUrl={-1} showSettings={true}/>
        <TokenHeader
            displaySymbol={displaySymbol}
            amount={amount}
            previewData={previewData}
            networkIconName={networkIconName}
        />

        <div className="transaction-review__details">
          <div className="transaction-review__block">
            <DetailRow
                label="Token"
                value={displaySymbol}
            />
            <DetailRow
                label="From"
                value={formatAddress(previewData.addresses.from, 'medium')}
                isAddress={true}
            />
            <DetailRow
                label="To"
                value={formatAddress(previewData.addresses.to, 'medium')}
                isAddress={true}
            />
            <DetailRow
                label="Amount"
                value={`${amount} ${displaySymbol}`}
            />
            <DetailRow
                label="Network"
                value={previewData.network}
            />
          </div>

          {/* Второй блок: Комиссия */}
          {previewData.amounts.network_fee > 0 && (
              <div className="transaction-review__block transaction-review__block--fee">
                <DetailRow
                    label="Network Fee"
                    feeData={{
                      amount: previewData.amounts.network_fee,
                      currency: previewData.amounts.network_fee_currency,
                      networkIconName: feeNetworkIconName
                    }}
                />
              </div>
          )}

          {/* Третий блок: Итог */}
          <div className="transaction-review__block transaction-review__block--total">
            <DetailRow
                label="Total USD"
                value={`$${previewData.amounts.total_usd.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`}
                isTotal={true}
            />
          </div>
        </div>

        <button
            onClick={handleConfirm}
            disabled={sending}
            className="btn"
        >
          {sending ? 'Sending...' : 'Continue'}
        </button>
      </>
  );
};

export default TransactionReview;
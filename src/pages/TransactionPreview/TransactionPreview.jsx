import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import PageHeader from '@/components/PageHeader/PageHeader';
import TokenHeader from './components/TokenHeader/TokenHeader.jsx';
import DetailRow from './components/DetailRow/DetailRow.jsx';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  getNetworkIconName,
  isNativeCoin,
  getNetworkIconNameFromFee,
  formatAddress,
  normalizeTokenSymbol
} from './components/utils';
import FeeNextIcon from "../../assets/images/icons/fee-next.svg";
import InfoTransactionIcon from "../../assets/images/icons/info_transaction.svg";
import './TransactionPreview.scss';
import {API_BASE_URL} from "@/config/api.js";

const TransactionReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {token, db_symbol, amount, to, network, formData, tokenData} = location.state || {};

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [, setError] = useState('');

  const displaySymbol = token || '';
  const apiSymbol = db_symbol || token || '';
  const normalizedSymbol = normalizeTokenSymbol(displaySymbol);

  const handleBackWithFormData = () => {
    navigate(`/send/${db_symbol || token}`, {
      state: {
        tokenData: location.state?.tokenData,
        preservedFormData: formData || {address: to, amount: amount},
        from: location.state?.from || `/token/${token}`
      },
      replace: true
    });
  };

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_BASE_URL}/api/send/preview`, {
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

      const sendAmount = previewData?.amounts?.is_native
          ? previewData?.amounts?.final_send_amount
          : previewData?.amounts?.token_amount;

      const amountUsd = previewData?.amounts?.amount_usd || 0;

      const response = await fetch(`${API_BASE_URL}/api/send/confirm`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token: apiSymbol,
          amount: parseFloat(sendAmount || amount),
          to: to,
          network_fee: previewData?.amounts?.network_fee || 0,
          total_usd: previewData?.amounts?.total_usd || 0,
          is_native: previewData?.amounts?.is_native || false,
          amount_usd: amountUsd, // ← ДОБАВЬ ЭТО!
          original_amount: parseFloat(amount)
        })
      });

      if (!response.ok) throw new Error('Ошибка отправки');

      const data = await response.json();
      if (data.success) {
        localStorage.removeItem(`send_form_${apiSymbol}`);
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

  const networkName = network || previewData?.network_name || '';
  const networkIconName = getNetworkIconName(networkName);

  const shouldShowMainBadge =
      !isNativeCoin(displaySymbol, networkName) ||
      displaySymbol?.toUpperCase() === 'TWT';

  const feeCurrency = previewData?.amounts?.network_fee_currency || '';
  const feeIconName = getNetworkIconNameFromFee(feeCurrency) || normalizedSymbol;

  return (
      <SkeletonTheme baseColor="#4D4D4E" highlightColor="#6B6B6B" speed={1}>
        <>
          <PageHeader title="Confirm" backUrl={handleBackWithFormData} showSettings={true}/>

          <div className="transaction-review">
            <div className="transaction-review__wrapper">
              <img
                  src={`/images/tokens/${normalizedSymbol}.png`}
                  alt={displaySymbol}
                  onError={(e) => e.target.src = '/images/tokens/default.png'}
                  className="transaction-review__image"
                  width={36}
                  height={36}
              />
              {networkIconName && shouldShowMainBadge && (
                  <img
                      src={`/images/networks/${networkIconName}.png`}
                      alt="network"
                      className="transaction-review__badge"
                      width={16}
                      height={16}
                  />
              )}
            </div>
            <div className="transaction-review__amount">
              {loading ? (
                  <>
                    <Skeleton width={80} height={23}/>
                    <Skeleton width={80} height={17}/>
                  </>
              ) : (
                  <>
                    <p className="transaction-review__crypto">
                      {previewData?.amounts?.token_amount} {displaySymbol}
                    </p>
                    <p className="transaction-review__usd">
                      ≈ ${previewData?.amounts?.amount_usd?.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                    </p>
                  </>
              )}
            </div>
          </div>

          <div className="transaction-review__details">
            <div className="transaction-review__block">
              <DetailRow
                  label="Token"
                  value={displaySymbol}
              />

              <DetailRow
                  label="From"
                  value={formatAddress(to, 'medium')}
                  isAddress={true}
                  showExplorerIcon={true}
              />

              <DetailRow
                  label="To"
                  value={formatAddress(to, 'medium')}
                  isAddress={true}
                  showExplorerIcon={true}
              />

              <div className="detail-transaction-row">
                <span className="detail-transaction-row__label">Amount</span>
                {loading ? (
                    <Skeleton width={90} height={16}/>
                ) : (
                    <span className="detail-transaction-row__value">
                  {previewData?.amounts?.token_amount} {displaySymbol}
                </span>
                )}
              </div>

              <div className="detail-transaction-row">
                <span className="detail-transaction-row__label">Network</span>
                {loading ? (
                    <Skeleton width={90} height={16}/>
                ) : (
                    <span className="detail-transaction-row__value">
                  {previewData?.network_name || network}
                </span>
                )}
              </div>
            </div>

            <div className="transaction-review__block transaction-review__block--fee">
              <div className="detail-transaction-row">
                <span className="detail-transaction-row__label">Network Fee</span>
                {loading ? (
                    <div className="detail-transaction-row__fee-container">
                      <div className="detail-transaction-row__fee-section">
                        <div className="detail-transaction-row__fee-top">
                          <Skeleton width={90} height={15.2}/>
                        </div>
                        <div className="detail-transaction-row__fee-bottom">
                          <Skeleton width={90} height={15.6}/>
                        </div>
                      </div>
                      <FeeNextIcon/>
                    </div>
                ) : previewData?.amounts?.network_fee > 0 ? (
                    <div className="detail-transaction-row__fee-container">
                      <div className="detail-transaction-row__fee-section">
                        <div className="detail-transaction-row__fee-top">
                          <img
                              src={`/images/tokens/${feeIconName}.png`}
                              alt="network"
                              className="detail-transaction-row__network-icon"
                              width={16}
                              height={16}
                              onError={(e) => e.target.src = '/images/tokens/default.png'}
                          />
                          <span className="detail-transaction-row__fee-usd">
                        ${previewData.amounts.network_fee_usd}
                      </span>
                        </div>
                        <div className="detail-transaction-row__fee-bottom">
                      <span className="detail-transaction-row__fee-amount">
                        {previewData.amounts.network_fee} {previewData.amounts.network_fee_currency}
                      </span>
                        </div>
                      </div>
                      <FeeNextIcon/>
                    </div>
                ) : (
                    <span className="detail-transaction-row__value">Free</span>
                )}
              </div>
            </div>

            <div className="transaction-review__block">
              <div className="detail-transaction-row detail-transaction-row--total">
                <p className="detail-transaction-row__label">
                  Total USD
                  <InfoTransactionIcon/>
                </p>
                {loading ? (
                    <Skeleton width={120} height={17.19}/>
                ) : (
                    <span className="detail-transaction-row__value detail-transaction-row__value--total">
                      ${(
                        previewData?.amounts?.is_native
                            ? previewData?.amounts?.total_usd  // Для нативных как есть
                            : (previewData?.amounts?.amount_usd || 0) + (previewData?.amounts?.network_fee_usd || 0)  // Для токенов: сумма + комиссия
                    )?.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                    </span>
                )}
              </div>
            </div>
          </div>

          <button
              onClick={handleConfirm}
              disabled={sending || loading}
              className="btn bottom"
          >
            {sending ? (
                <div className="btn-spinner">
                  <div className="spinner"></div>
                </div>
            ) : loading ? (
                <div className="btn-spinner">
                  <div className="spinner"></div>
                </div>
            ) : (
                'Confirm'
            )}
          </button>
        </>
      </SkeletonTheme>
  );
};

export default TransactionReview;
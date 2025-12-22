import './CryptoList.scss'
import TokenItem from './TokenItem/TokenItem.jsx'
import TokenListTabs from './TokenListTabs/TokenListTabs.jsx'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CryptoList = ({tokens, loading}) => {
  return (
    <div className="crypto-list">
      <TokenListTabs/>

      <SkeletonTheme
        baseColor="#4D4D4E"
        highlightColor="#6B6B6B"
        speed={1}
      >
        {loading ? (
          <ul className="crypto-list__items">
            {Array.from({length: 6}).map((_, i) => (
              <li key={i} className="token-item-skeleton">
                <div className="token-item__left">
                  <Skeleton circle width={40} height={40}/>
                  <div className="token-item__info">
                    <div className="token-item__info-top">
                      <Skeleton width={80} height={20}/>
                      <Skeleton width={60} height={16} style={{marginLeft: '8px'}}/>
                    </div>
                    <Skeleton width={120} height={16}/>
                  </div>
                </div>
                <div className="token-item__right">
                  <Skeleton width={60} height={20}/>
                  <Skeleton width={80} height={16} style={{marginTop: '4px'}}/>
                </div>
              </li>
            ))}
          </ul>
        ) : tokens.length === 0 ? (
          <div className="crypto-list__empty">
            <p>No tokens found</p>
          </div>
        ) : (
          <ul className="crypto-list__items">
            {tokens.map((token) => (
              <TokenItem key={`${token.symbol}-${token.id}`} token={token}/>
            ))}
          </ul>
        )}
      </SkeletonTheme>

      <button className="crypto-list__manage" type="button">
        Manage crypto
      </button>
    </div>
  )
}

export default CryptoList
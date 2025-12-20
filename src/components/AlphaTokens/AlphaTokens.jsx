import './AlphaTokens.scss'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {useEffect, useState} from "react";

const AlphaTokens = () => {
  const [alphaTokens, setAlphaTokens] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState({})

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/alpha-tokens')
        const data = await res.json()

        const tokens = data.map(token => ({
          symbol: token.symbol,
          name: token.name,
          network: token.network,
          price: `$${token.price}`,
          change: token.change24h,
          marketCap: token.market_cap_formatted,
          image: token.image
        }))
        setAlphaTokens(tokens)
      } catch (err) {
        console.error('Ошибка загрузки токенов:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTokens()
  }, [])

  return (
    <div className="section">
      <h3 className="title-section">Alpha Tokens</h3>

      <SkeletonTheme
        baseColor="#4D4D4E"
        highlightColor="#6B6B6B"
        speed={1}
        variant="rectangular"
      >
        <ul className="alpha-slider">
          {isLoading
            ? Array.from({length: 6}).map((_, i) => (
              <li key={i} className="alpha-card">
                <Skeleton circle width={40} height={40}/>
                <div className="alpha-card__info">
                  <Skeleton width={70}/>
                  <Skeleton width={44}/>
                </div>
                <div className="alpha-card__changes">
                  <Skeleton width={33}/>
                  <Skeleton width={33}/>
                </div>
              </li>
            ))
            : alphaTokens.map((token, i) => {
              const imgLoaded = imagesLoaded[token.symbol] || false

              return (
                <li key={i} className="alpha-card">
                  <div className="alpha-card__left">
                    {!imgLoaded && <Skeleton circle width={40} height={40}/>}
                    <img
                      width={40}
                      height={40}
                      src={token.image || '/placeholder.png'}
                      alt={token.symbol}
                      className="alpha-image"
                      style={{display: imgLoaded ? 'block' : 'none'}}
                      onLoad={() => setImagesLoaded(prev => ({...prev, [token.symbol]: true}))}
                      onError={() => setImagesLoaded(prev => ({...prev, [token.symbol]: true}))}
                    />
                    <div className="alpha-card__info">
                      <span className="alpha-symbol">{token.symbol}</span>
                      <span className="alpha-marketcap">{token.marketCap}</span>
                    </div>
                  </div>
                  <div className="alpha-card__changes">
                    <span className="alpha-price">{token.price}</span>
                    <p className={`alpha-change ${token.change < 0 ? 'negative' : 'positive'}`}>
                      {token.change > 0 ? '+' : ''}{token.change.toFixed(2)}%
                    </p>
                  </div>
                </li>
              )
            })}
        </ul>
      </SkeletonTheme>
    </div>
  )
}

export default AlphaTokens
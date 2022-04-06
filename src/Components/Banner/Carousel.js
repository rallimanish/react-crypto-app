
import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import axios from "axios"
import {TrendingCoins} from "../../config/api"
import AliceCarousel from "react-alice-carousel" 
import { Link } from 'react-router-dom';

const useStyles = makeStyles( ()=>({
    carousel:{
        height:"50%",
        display:"flex",
        alignItems:"center",
    },
    carouselItem:{
        display:"flex",
        flexDirection:"column",
        color:"white",
        alignItems:"center",
        textTransform:"uppercase",
        cursor:"pointer"

    }
}))
const Carousel = () => {
    const classes = useStyles();
    const{currency,symbol} = CryptoState();

    const [trending,setTrending] = useState([])

    const fetchTrendingCoins = async ()=>{
        const {data} = await axios.get(TrendingCoins(currency))
        setTrending(data)
        // console.log(trending)
     }

     function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
     
     useEffect( ()=>{
         // eslint-disable-next-line react-hooks/exhaustive-deps
         fetchTrendingCoins();
     },[currency])

     const items = trending.map( (coin)=>{
         let profit = coin.price_change_percentage_24h>=0
         return (
             
             <Link className={classes.carouselItem} to = {`/coins/${coin.id}`}>
                 <img src= {coin.image} alt={coin.name} height="80"/>
                 <span>{coin.symbol} &nbsp; 
                    <span style={{
                        color:profit>0?"green":"red",
                        fontWeight:500
                    }}>
                        {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}
                    </span>
                 </span>
                 <span style={{fontSize:22,fontWeight:500}}>
                        {symbol}{numberWithCommas(coin.current_price.toFixed())}
                 </span>
             </Link>
         )
     } )

     console.log("&&&&&",items)

     const responsive = {
        0: {
            items: 1,
        },
        512: {
            items: 4
        }
      }
  return (
    <div className={classes.carousel}>
    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  </div>
  )
}

export default Carousel
import React, { useEffect } from 'react'
import {useState} from 'react';
import {CryptoState} from './../CryptoContext'
import { HistoricalChart } from '../config/api';
import axios from "axios";
import { createTheme, ThemeProvider,makeStyles,CircularProgress } from '@material-ui/core';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2'
import { chartDays } from '../config/data';
import SelectButton from './SelectButton'
ChartJS.register(...registerables);

const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

const CoinInfo = ({coin}) => {
   
    const [historicData,sethistoricData] = useState()
    const [ days,setDays] = useState(1);
    const {currency} = CryptoState();
    const classes = useStyles();

    const fetchHistoricData = async()=>{
        const {data} = await axios.get(HistoricalChart(coin.id,days,currency))
        sethistoricData(data.prices)
       
       
    }

    useEffect( ()=>{
        fetchHistoricData();
    },[currency,days])

   // console.log("@@@@",historicData)

    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type:"dark"
        }
    })

  return (
    <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>

        {
            (!historicData)?(
                <CircularProgress size={250} style={{color:"gold"}} thickness={1}  />
            ):(
                <>
                <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
                <div style={{display:"flex",marginTop:20,justifyContent:"space-around",width:"100%"}}>
                    {chartDays.map((obj)=>(
                        <SelectButton key={obj.value} onClick={()=>setDays(obj.value)} selected={obj.value===days}>{obj.label}</SelectButton>
                    ))}
                </div>
                </>
            )
        }

        </div>

    </ThemeProvider>
  )
}

export default CoinInfo
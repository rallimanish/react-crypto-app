import { AppBar, Container, makeStyles, MenuItem, Select, Toolbar, Typography ,createTheme, ThemeProvider} from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'


const useStyles  = makeStyles( ()=>({
  title:{
    flex:1,
    color:"gold",
    fontFamily:"Montserrat",
    fontWeight:"bold",
    cursor:"pointer"
  }
}))

const Header = () => {

  const classes = useStyles()
  const navigate = useNavigate()
  const {currency,setCurrency} = CryptoState()

  const darkTheme = createTheme({
    palette: {
     primary:{
       main:"#fff",
     },
     type:"dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar position='static' color="transparent">
      <Container>
        <Toolbar>

        <Typography onClick={ ()=>navigate("/")}className={classes.title}>CryptoApp</Typography>

        <Select  value={currency} onChange={(e)=>{setCurrency(e.target.value)}}variant="outlined" style={{height:40,width:100,marginRight:15}}>
          <MenuItem value={'USD'}>USD</MenuItem>
          <MenuItem value={'INR'}>INR</MenuItem>
        </Select>

        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header
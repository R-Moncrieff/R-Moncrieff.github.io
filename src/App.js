import React, { useState, useRef } from 'react';

import QRCode from 'qrcode.react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import './App.css';
import logo from './Google_logo.svg';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-144838754-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const AppSize = {
  width: 400,
  height: 600,
}

const useStyles = makeStyles({
  App: {
    margin: "auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    ...AppSize,
  },

  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },

  logo: {
    marginTop: "25%",
    width: 292,
    marginLeft: "auto",
    marginRight: "auto",
  },

  greeting: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "2em",
    color: "#4285F4",
  },

  qrcode: {
    margin: "20% auto -20% auto",
    padding: 8,
  },
  
  inputDiv: {
    margin: "auto",
    width: "100%",
  },

  input: {
    margin: "0.5em",
    width: "80%",
  },

  inputSelect: {
    margin: "0.5em",
    textAlign: "left",
    width: "80%",
  },

  outputDiv: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
    marginBottom: "15%",
    display: "inline-block"
  },

  outputLine: {
    lineHeight: 1,
    display: "flex",
    flexDirection: "row",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },

  text: {
    marginTop: "auto",
    marginBottom: "auto",
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: "'Roboto', sans-serif",
  },

  redDot: {
    marginTop: "auto",
    marginBottom: "auto",
    transform: "scale(0.4)",
    color: "red",
    width: "1.5rem",
    height: "1.5rem",
  },
  
  greenDot: {
    marginTop: "auto",
    marginBottom: "auto",
    transform: "scale(0.4)",
    color: "green",
    width: "1.5rem",
    height: "1.5rem",
  },
  blueDot: {
    marginTop: "auto",
    marginBottom: "auto",
    transform: "scale(0.4)",
    color: "blue",
    width: "1.5rem",
    height: "1.5rem",
  },
  noBr: {
    whiteSpace: "nowrap",
  },
  circle: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "0.5rem"
  },

});

function App() {
  const [hide, setHide] = useState(false);
  const classes = useStyles({ hide });

  const [linkedin, setLinkedin] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("Google");

  const handleChange = (setter) => { return (event) => {
      setter(event.target.value);
    }
  }

  const ref = useRef();

  const onDownload = () => {
    html2canvas(ref.current).then(canvas => {
      let dataUrl = canvas.toDataURL("image/png");
      saveAs(dataUrl, "G-Conference");

      // var link = document.createElement('a');
      // link.href = dataUrl;
      // link.download = 'G-Conference';
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      console.log("Done");
    });
  }

  return (
    <div className={classes.App}>
      <div ref={ref} className={classes.wrapper}>
        {hide && <QRCode className={classes.qrcode} value={linkedin} size={AppSize.width * 0.6} />}
        
        <img src={logo} alt="Google Logo" className={classes.logo}/>
        {!hide && <h1 className={classes.greeting}>G-Conference <span className={classes.noBr}>QR Generator</span></h1>}
        {!hide && <div className={classes.inputDiv}>
          <TextField
            className={classes.input}
            label="Linkedin URL"
            placeholder="https://www.linkedin.com/in/...."
            value={linkedin}
            onChange={handleChange(setLinkedin)}
          />
          <TextField
            className={classes.input}
            label="Name"
            placeholder=""
            value={name}
            onChange={handleChange(setName)}
          />
          <TextField
            className={classes.input}
            label="Title"
            placeholder=""
            value={title}
            onChange={handleChange(setTitle)}
          />
          <FormControl className={classes.inputSelect}>
            <Select
              value={region}
              onChange={handleChange(setRegion)}
              displayEmpty
              name="region"
              className={classes.selectEmpty}
            >
              <MenuItem value="Google">
                <em>Google</em>
              </MenuItem>
              <MenuItem value="Google EMEA">Google EMEA</MenuItem>
              <MenuItem value="Google APAC">Google APAC</MenuItem>
              <MenuItem value="Google US">Google US</MenuItem>
              <MenuItem value="Google LATAM">Google LATAM</MenuItem>
            </Select>

          </FormControl>
        </div>}
        {hide && <div className={classes.outputDiv}>
          {/* <div className={classes.outputLine}><p className={classes.redDot}>·</p> <p>{name}</p></div>
          <div className={classes.outputLine}><p className={classes.greenDot}>·</p> <p>{title}</p></div> */}

          <div className={classes.outputLine}><Circle className={classes.circle} color="red" /><p className={classes.text}>{name}&#8203;</p></div>
          <div className={classes.outputLine}><Circle className={classes.circle} color="green" /><p className={classes.text}>{title}&#8203;</p></div>
          <div className={classes.outputLine}><Circle className={classes.circle} color="blue" /><p className={classes.text}>{region}&#8203;</p></div>

        </div>}
      </div>
      <Button variant="contained" onClick={()=>{ setHide(hide => !hide) }}>
        {hide ? "Edit" : "Preview"}
      </Button>
      {hide && <Button variant="contained" onClick={onDownload}>
        Download
      </Button>}
    </div>
  );
}

function Circle({color, ...rest}) {
  return (
    <svg width="8" height="8" {...rest}>
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
}

export default App;

import React, { useEffect, useRef, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {  Slider, Radio, RadioGroup, FormControlLabel, FormLabel, 
          IconButton, InputLabel, MenuItem, FormControl, Select,
          Typography, Zoom, Tooltip } from '@mui/material';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ReplayIcon from '@mui/icons-material/Replay';

import BubbleSort from './Algorithms/BubbleSort';
import SelectionSort from './Algorithms/SelectionSort';
import InsertionSort from './Algorithms/InsertionSort';
import MergeSort from './Algorithms/MergeSort';
import QuickSort from './Algorithms/QuickSort';
import HeapSort from './Algorithms/HeapSort';
import RadixSort from './Algorithms/RadixSort';

import { handleAnimations, timeout } from './Utils/Utils';
import * as Styles from './Utils/MuiStyles';

import './App.css';

const MIN_VAL = 10;
const MAX_VAL = 150;

const App = () => {
  const containerRef = useRef();

  const [arr, setArr] = useState([]);
  const [arrCopy, setArrCopy] = useState([]);
  const [arrSize, setarrSize ]= useState(30);
  const [padding, setpadding] = useState('20px');
  const [delay, setDelay] = useState(50);
  const [animationfinished, setanimationfinished] = useState(false);
  const [isSorting, setisSorting] = useState(false);
  const [algo, setalgo] = useState("bubble");

  const disableButton = async() => {
    setisSorting(true);
  };

  const enableButton = async() => {
    setisSorting(false);
  };

  const handleSpeedChange = (event) => {
    setDelay(event.target.value);
    saveSettings(algo, event.target.value, arrSize);
  };

  const handleAlgoChange = (event) => {
    setalgo(event.target.value);
    saveSettings(event.target.value, delay, arrSize);
  };

  const handleSliderChange = (event, newValue) => {
    if (newValue !== arrSize){
      setarrSize(newValue);
      handleResize();
      randomArray(newValue);
      setanimationfinished(false);

      const arrayBars = containerRef.current.children;
      for (let i = 0 ; i < arrayBars.length; i++){
        arrayBars[i].firstChild.style.backgroundColor = 'white';
      }

      saveSettings(algo, delay, newValue);
    }
  };

  const saveSettings = ( alg, speed, size) => {
    localStorage.setItem('settings', JSON.stringify({sortAlgo: alg, sortSpeed: speed, arraySize: size}));
  };

  const loadSettings = () => {
    const settings = JSON.parse(localStorage.getItem('settings'));
    if (settings){
      setalgo(settings.sortAlgo);
      setDelay(settings.sortSpeed);
      setarrSize(settings.arraySize);
      return settings.arraySize;
    }
    return 30;
  }

  const startSort = async() => {
    await disableButton();
    setanimationfinished(false);
    const arrayBars = containerRef.current.children;

    for (let i = 0 ; i < arrayBars.length; i++){
      arrayBars[i].firstChild.style.backgroundColor = 'white';
    }

    let animations;

    switch(algo){
      case "bubble":
        animations = BubbleSort(arr);
        break;
      case "select":
        animations = SelectionSort(arr);
        break;
      case "insertion":
        animations = InsertionSort(arr);
        break;
      case "merge":
        animations = MergeSort(arr);
        break;
      case "quick":
        animations = QuickSort(arr);
        break;
      case "heap":
        animations = HeapSort(arr);
        break;
      case "radix":
        animations = RadixSort(arr);
        break;
      default:
        break;
    }

    await handleAnimations(animations, arrayBars, delay);
    await handleDone(arrayBars);
    setanimationfinished(true);
    await enableButton();
  };

  const handleRandomArray = () => {
    handleResize();
    randomArray(arrSize);
    setarrSize(arrSize);
    setanimationfinished(false);

    const arrayBars = containerRef.current.children;
    for (let i = 0 ; i < arrayBars.length; i++){
      arrayBars[i].firstChild.style.backgroundColor = 'white';
    };
  };

  const handleResetArray = () => {
    handleResize();
    setArr([...arrCopy]);
    setanimationfinished(false);

    const arrayBars = containerRef.current.children;
    for (let i = 0 ; i < arrayBars.length; i++){
      arrayBars[i].firstChild.style.backgroundColor = 'white';
    };
  };

  const handleDone = async(bars) => {
    for (let i = 0 ; i < bars.length; i++){
      bars[i].firstChild.style.backgroundColor = '#0cf50c';
      await timeout(15);
    }
  };

  const randomArray = (size) => {
    const arr = [];

    for (let i = 0; i < size; i++) {
      const rand_int = Math.floor(Math.random() * (MAX_VAL - MIN_VAL + 1) + MIN_VAL)
      arr.push(rand_int);
    }

    setArrCopy(JSON.parse(JSON.stringify(arr)));
    setArr(arr);
  };

  const handleResize = () => {
    let size = loadSettings();
    let { innerWidth: width } = window;
    setpadding(`${((width - 20) / size)/2}px`);
  };

  const setUpWindowListener = () => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', () => handleResize());
  };

  useEffect(() => {
    const size = loadSettings();
    randomArray(size);
    handleResize();
    setUpWindowListener();
  }, []);

  return (
    <>
      <div className="graph-container-wrapper">
        {animationfinished ? 
        <div className ="wrapper"> 
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> 
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> 
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>  
        </div>
        :
        <div className ="wrapper">
        </div>
        }
        <div className="graph-container" style={{paddingLeft:`${padding}`}} ref={containerRef}>
          {arr?.map( (el, index) => (
            <div className="bar-container" key={index}>
              <div className="bar" style={{height:`${el}px`}}>
                <div className="bar-text">
                  {el}
                </div>
              </div>
              <div style={{width:'100%'}}>
              </div>
            </div>
          ))}
        </div>
        <div className="graph-btn-bar">
          <Tooltip title="Reset" placement="bottom" arrow TransitionComponent={Zoom}>
            <IconButton disabled={isSorting} sx={Styles.replayIcon} onClick={handleResetArray}>
              <ReplayIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Shuffle" placement="bottom" arrow TransitionComponent={Zoom}>
            <IconButton disabled={isSorting} sx={Styles.shuffleIcon} onClick={handleRandomArray}>
              <ShuffleIcon/>
            </IconButton>
          </Tooltip>  
        </div>
      </div>
      <form className="settings-container" onSubmit={startSort}>
        <div className="settings-seperator">
          <FormControl fullWidth sx={Styles.width330}>
            <InputLabel sx={Styles.algoInputLabel}>Algorithm</InputLabel>
            <Select value={algo} label="Algorithm" onChange={handleAlgoChange} disabled={isSorting} sx={Styles.algoSelect}>
              <MenuItem value={"bubble"}>Bubble Sort</MenuItem>
              <MenuItem value={"select"}>Selection Sort</MenuItem>
              <MenuItem value={"insertion"}>Insertion Sort</MenuItem>
              <MenuItem value={"radix"}>Radix Sort</MenuItem>
              <MenuItem value={"merge"}>Merge Sort</MenuItem>
              <MenuItem value={"quick"}>Quick Sort</MenuItem>
              <MenuItem value={"heap"}>Heap Sort</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="settings-seperator">
          <Typography color="white" sx={Styles.settingsLabelText}>
            Sort Speed
          </Typography>
          <RadioGroup row value={delay} onChange={handleSpeedChange} sx={Styles.width330}> 
            <FormLabel disabled={isSorting} sx={Styles.colorWhite} >
            <FormControlLabel value={300} control={<Radio disabled={isSorting} sx={{color:'#1976d2'}} size="small"/>} label="Slow" sx={Styles.radioButtonLabel}/>
            <FormControlLabel value={50} control={<Radio disabled={isSorting} sx={{color:'#1976d2'}} size="small"/>} label="Default" sx={Styles.radioButtonLabel}/>
            <FormControlLabel value={5} control={<Radio disabled={isSorting} sx={{color:'#1976d2'}} size="small"/>} label="Fast" sx={Styles.radioButtonLabel}/>
            <FormControlLabel value={1} control={<Radio disabled={isSorting} sx={{color:'#1976d2'}} size="small"/>} label="Very Fast" sx={Styles.radioButtonLabel}/>
            </FormLabel>
          </RadioGroup>
        </div>
        <div className="settings-seperator">
          <Typography color="white" sx={Styles.settingsLabelText}>
            Array Size
          </Typography>
          <Slider value={arrSize} min={10} max={50} sx={Styles.width330} aria-label="Default" valueLabelDisplay="auto" onChange={handleSliderChange} disabled={isSorting} size="small"/>
        </div>
        <div className="settings-seperator">
          <LoadingButton type="submit" endIcon={<PlayCircleFilledWhiteIcon />} onClick={startSort} color="success" variant="contained" loadingPosition="end" loading={isSorting} sx={Styles.loadingButton}>
            {isSorting ? "Sorting..." : "Sort"}
          </LoadingButton>
        </div>
      </form>
    </>
  );
}

export default App;
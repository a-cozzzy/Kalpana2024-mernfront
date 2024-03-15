import { UseUserContext } from '../hooks/useUserContext';

import React, { useState, useEffect } from 'react';
import FirstWave from './firstWave';
import SecondWave from './secondWave';
import ThirdWave from './thirdWave';
import FourthWave from './fourthWave';


const QuestionPage = ({totalPoints,setTotalPoints}) => {
    const {user} = UseUserContext();

    const compStyle = {
      color:'whitesmoke',
      fontFamily:'SDRobot',
      fontSize:'7rem',
      justifyContent:'center',
      display:'flex',
      alignItems:'center',
      marginTop:'10rem'
    }

    const [currentComponent, setCurrentComponent] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    useEffect(() => {
        const targetFirstStart = new Date(currentTime);
        const month = targetFirstStart.getMonth() + 1;
        const day = targetFirstStart.getDate();
        targetFirstStart.setHours(10,0, 0, 0);
        const targetFirstEnd = new Date(currentTime);
        targetFirstEnd.setHours(10, 40, 0, 0);
    
        const targetSecondStart = new Date(currentTime);
        targetSecondStart.setHours(10, 45, 0, 0);
        const targetSecondEnd = new Date(currentTime);
        targetSecondEnd.setHours(11, 25, 0, 0);
    
        const targetThirdStart = new Date(currentTime);
        targetThirdStart.setHours(5, 0, 0, 0);
        const targetThirdEnd = new Date(currentTime);
        targetThirdEnd.setHours(5, 40, 0, 0);

        const targetFourthStart = new Date(currentTime);
        targetFourthStart.setHours(5, 45, 0, 0);
        const targetFourthEnd = new Date(currentTime);
        targetFourthEnd.setHours(6, 25, 0, 0);
        if (month === 3 && day === 15 && currentTime < targetFirstStart) {
            setCurrentComponent('Waiting')
        }
        else if (month === 3 && day === 15 && (currentTime >= targetFirstStart && currentTime < targetFirstEnd)) {
            setCurrentComponent('First');
        } else if (month === 3 && day === 15 && (currentTime >= targetFirstEnd && currentTime < targetSecondStart)) {
            setCurrentComponent('FreeTime');
        } else if (month === 3 && day === 15 && (currentTime >= targetSecondStart && currentTime < targetSecondEnd)) {
            setCurrentComponent('Second');
        } else if (month === 3 && day === 16 && (currentTime >= targetThirdStart && currentTime < targetThirdEnd)) {
          setCurrentComponent('Third');
      } else if (month === 3 && day === 16 && (currentTime >= targetThirdEnd && currentTime < targetFourthStart)) {
          setCurrentComponent('FreeTime');
      } else if (month === 3 && day === 16 && (currentTime >= targetFourthStart && currentTime < targetFourthEnd)) {
          setCurrentComponent('Fourth');
      }else if ((currentTime >= targetSecondEnd && currentTime < targetThirdStart)) {
            setCurrentComponent('FreeTime');  
        } 
        else if (month === 3 && day === 16 && (currentTime >= targetFourthEnd) ) {
            setCurrentComponent('Ended');
        }
        else {
            setCurrentComponent('NOT THE DAY');
        }
    }, [currentTime]);
  
    // Render the current component or "Waiting" or "Ended"
    const renderComponent = () => {
      switch (currentComponent) {
        case 'First':
          return <FirstWave user={user} totalPoints={totalPoints} setTotalPoints={setTotalPoints}/>;
        case 'Second':
          return <SecondWave user={user} totalPoints={totalPoints} setTotalPoints={setTotalPoints} />;
        case 'Third':
          return <ThirdWave user={user} totalPoints={totalPoints} setTotalPoints={setTotalPoints} />;
        case 'Fourth':
            return <FourthWave user={user} totalPoints={totalPoints} setTotalPoints={setTotalPoints} />;
        case 'FreeTime':
          return <div style={compStyle}>Break</div>;
        case 'Ended':
          return <div style={compStyle}>Ended</div>;
        case 'Waiting':
            return <div style={compStyle}>WILL BEGIN SHORTLY</div>;
        default:
          return <div style={compStyle}>NOT THE DAY BOI...</div>;
      }
    };
    return <div>{renderComponent()}</div>;
}

export default QuestionPage;
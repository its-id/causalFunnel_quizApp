import React, { useContext } from 'react'
import OverviewPanel from '../OverviewPanel/OverviewPanel'
import QCardComponent from '../QCardComponent/QCardComponent'
import AppContext from '@/context/AppContext';

const HomeLayout = () => {

  const { quizData, fetchQuizData } : any  = useContext(AppContext);

  return (
    <div className='flex flex-col'>
        <OverviewPanel />
        <QCardComponent />
    </div>
  )
}

export default HomeLayout
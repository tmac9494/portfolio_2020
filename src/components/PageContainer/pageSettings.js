import React from 'react';
import {ReactComponent as LargeRect} from '../../assets/rect-lg.svg';
import {ReactComponent as SmallRect} from '../../assets/rect-sm.svg';
import {ReactComponent as WorkLargeRect} from '../../assets/work-rect-lg.svg';
import {ReactComponent as WorkSmallRect} from '../../assets/work-rect-sm.svg';

export default {
  home: {
    color: '#160556, #5e0558',
    total: 3,
    svgs: <React.Fragment>
      <SmallRect key='tl1' id='home_sm_rect_1' className='small-rect-home' />
      <SmallRect key='tl2' id='home_sm_rect_2' className='small-rect-home' />
      <SmallRect key='l1' id='home_sm_rect_3' className='small-rect-home' />
      <SmallRect key='bl1' id='home_sm_rect_4' className='small-rect-home' />
      <SmallRect key='bl2' id='home_sm_rect_5' className='small-rect-home'/>
      <LargeRect key='br1' />
      <LargeRect key='br2' id='gradient_rect_lg_2' />
    </React.Fragment>
  },
  work: {
    floatingColor: '#16161C',
    color: '#0596D5, #00FF99',
    total: 2,
    svgs: <React.Fragment>
      <WorkLargeRect key='bl1' id='work_rect_lg_1' className='work-rect-lg' />
      <WorkLargeRect key='bl2' id='work_rect_lg_2' className='work-rect-lg' />
      <WorkLargeRect key='br2' id='work_rect_lg_3' className='work-rect-lg' />
      <WorkSmallRect key='tl1' id='work_rect_sm_1' className='work-rect-sm' />
      <WorkSmallRect key='tl2' id='work_rect_sm_2' className='work-rect-sm' />
      <WorkSmallRect key='tl3' id='work_rect_sm_3' className='work-rect-sm' />
      <WorkSmallRect key='tl4' id='work_rect_sm_4' className='work-rect-sm' />
    </React.Fragment>
  },
  skills: {
    floatingColor: '#16161C',
    color: '#FF005F, #FFD500',
    total: 4,
  },
  resume: {
    floatingColor: '#16161C',
    color: '#23EE04, #F2F208',
    total: 4,
  },
  contact: {
    floatingColor: '#16161C',
    color: '#23EE04, #F2F208',
    total: 2,
  }
}

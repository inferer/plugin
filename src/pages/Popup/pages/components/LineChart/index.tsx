import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { randomString } from '../../../utils';
import './index.scss'

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LineSeriesOption
>;

var option: EChartsOption;

const LineChartT: React.FC<{ lineData: EChartsOption }> = ({
  lineData
}) => {
  console.log(lineData, 1111111)
  const id = randomString()
  const [serieData, setSerieData] = useState<{ name: string, value: number }>({ name: '', value: 0 })
  const [tipPos, setTipPos] = useState<{ left: number | string, top: number, opacity: number }>({ left: 0, top: 0, opacity: 0 })
  const [overTip, setOverTip] = useState(false)
  const [dataIndex, setdataIndex] = useState(-1)
  const [eventPos, setEventPos] = useState<{ clientX: number, clientY: number }>({ clientX: 0, clientY: 0 })

  useEffect(() => {
    option = {
      grid: {
        left: 0,
        top: 0,
        bottom: 30,
        right: 0
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun'],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0,
          fontSize: '10px',
          color: '#7F8792'
        }
      },
      yAxis: {
        type: 'value',
        show: false,
        min: 120,
        max: 250
      },
      series: [

      ]
    };

    var chartDom = document.getElementById(id);
    if (chartDom) {
      var myChart = echarts.init(chartDom);
      option && myChart.setOption({ ...option, ...lineData });
      // myChart.getZr().on('mouseover', (params) => {
      //   console.log(params)
      // })
      myChart.on('mouseover', (params) => {
        console.log(params.event?.event)
        const originEvent = params.event?.event as any
        setEventPos({ clientX: originEvent.clientX, clientY: originEvent.clientY })
        setdataIndex(params.dataIndex)
        setSerieData({ name: params.name, value: Number(params.value) })
        const tipDom = document.querySelector('.chart-tip');
        const rect = tipDom?.getBoundingClientRect();
        if (rect) {
          setTipPos({ left: -(!rect.width ? 0 : rect?.width / 2), top: 12, opacity: 1 })
        }
      })
      // myChart.on('mouseout', (params) => {
      //   console.log(1111111)
      //   // console.log(params)
      //   // setTimeout(() => {
      //   //   console.log(overTip, 1111111)
      //   //   if (overTip) return
      //   //   setTipPos({ left: '-200%', top: 12, opacity: 0 })
      //   // }, 1000)
      // })

    }
  }, [lineData, overTip])

  return (
    <div className=' relative'
      onMouseOver={e => {
        // console.log(e)
        console.log(dataIndex, eventPos)
        if (dataIndex < 0) return
        if (Math.abs(e.clientX - eventPos.clientX) >= 5) {
          setdataIndex(-1)
          setTipPos({ left: '-200%', top: 12, opacity: 0 })
        }
      }}
    // onMouseLeave={e => {
    //   setTipPos({ left: '-200%', top: 12, opacity: 0 })
    // }}
    >
      <div id={id} className="" style={{ height: 56 }}></div>
      <div

        className='chart-tip'
        style={{ marginLeft: tipPos.left, opacity: tipPos.opacity }}>
        {`${serieData.name}: ${serieData.value} ETH`}
      </div>
    </div>
  )
}

export default LineChartT


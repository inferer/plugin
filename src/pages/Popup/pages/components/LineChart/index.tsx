import React, { useEffect, useRef, useState } from 'react';
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

const LineChartT: React.FC<{ lineData: any }> = ({
  lineData
}) => {
  const id = randomString()
  const chartWrapId = randomString()
  const chartTipId = randomString()
  const [serieData, setSerieData] = useState<{ name: string, value: number }>({ name: '', value: 0 })
  const [tipPos, setTipPos] = useState<{ left: number | string, top: number, opacity: number }>({ left: 0, top: 0, opacity: 0 })
  const [overTip, setOverTip] = useState(false)
  const [dataIndex, setdataIndex] = useState(-1)
  const [eventPos, setEventPos] = useState<{ clientX: number, clientY: number }>({ clientX: 0, clientY: 0 })

  const chartWrapRef = useRef<any>(null)
  const chartTipRef = useRef<any>(null)

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
          interval: 1,
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
      option && myChart.setOption({
        ...option,
        ...{ xAxis: { ...option.xAxis, data: lineData?.xAxis?.data || ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun'] } },
        series: lineData.series
      });
      // myChart.getZr().on('mouseover', (params) => {
      //   console.log(params)
      // })
      myChart.on('mouseover', (params) => {
        console.log(params.event?.event)
        const originEvent = params.event?.event as any
        setEventPos({ clientX: originEvent.clientX, clientY: originEvent.clientY })
        setdataIndex(params.dataIndex)
        setSerieData({ name: params.name, value: Number(params.value) })
        const tipDom = chartTipRef.current
        const rect = tipDom?.getBoundingClientRect();
        const chartDom = chartWrapRef.current
        const chartRect = chartDom?.getBoundingClientRect()
        if (rect && chartRect) {
          let left = 0
          left = originEvent.zrX - (rect?.width / 2)
          if (left < 0) {
            left = 0
          }
          if (left > chartRect?.width - rect?.width) {
            left = chartRect?.width - rect?.width
          }
          setTipPos({ left: left, top: originEvent.zrY - rect?.height / 2, opacity: 1 })
        }
      })

    }
  }, [lineData, overTip])

  return (
    <div
      ref={chartWrapRef}
      className='chart-wrap relative'
    >
      <div id={id} className="" style={{ height: 56 }}></div>
      <div
        ref={chartTipRef}
        onMouseLeave={e => {
          e.stopPropagation()
          setTipPos({ left: '-200%', top: 12, opacity: 0 })
        }}
        className='chart-tip'
        style={{ left: tipPos.left, top: tipPos.top, opacity: tipPos.opacity }}>
        {`${serieData.name}: ${serieData.value} ETH`}
      </div>
    </div>
  )
}

export default LineChartT


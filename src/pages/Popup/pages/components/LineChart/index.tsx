import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { randomString } from '../../../utils';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LineSeriesOption
>;

var option: EChartsOption;

const LineChartT = () => {
  const id = randomString()

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
        }
      },
      yAxis: {
        type: 'value',
        show: false,
        min: 120,
        max: 250
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147],
          type: 'line',
          color: 'rgba(93, 243, 170, 1)'
        }
      ]
    };

    var chartDom = document.getElementById(id);
    if (chartDom) {
      var myChart = echarts.init(chartDom);
      option && myChart.setOption(option);
    }
  }, [])

  return (
    <div id={id} className="" style={{ height: 100 }}>

    </div>
  )
}

export default LineChartT


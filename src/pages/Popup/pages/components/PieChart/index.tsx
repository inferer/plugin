import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { randomString } from '../../../utils';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

var option: EChartsOption;

const PieChartT = () => {
  const id = randomString()

  useEffect(() => {
    option = {
      color: ['#48AEF5', '#FE7B77', '#D080FF', '#FFB859'],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        show: false,
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['65%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 20,
            borderColor: '#fff',
            borderWidth: 4
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' }
          ]
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
    <div id={id} className="" style={{ height: 160, width: 160 }}>

    </div>
  )
}

export default PieChartT


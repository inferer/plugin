import React, { useEffect, useRef } from 'react';
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

const PieChartT = ({
  dataList
}: any) => {
  const id = randomString()
  const chartRef = useRef<any>(null)
  useEffect(() => {
    if (dataList.length <= 0) return

    const keys = Object.keys(dataList)
    const newData = keys.map(key => ({ value: Number(dataList[key]), name: key }))

    option = {
      color: ['#48AEF5', '#FE7B77', '#D080FF', '#FFB859'],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      tooltip: {
        show: false,
        trigger: 'item'
      },
      legend: {
        show: false,
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['75%', '95%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 20,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            scaleSize: 1,
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          // data: [
          //   { value: 1048, name: '1' },
          //   { value: 735, name: '2-3' },
          //   { value: 580, name: '4-10' },
          //   { value: 484, name: '>10' }
          // ]
          data: newData
        }
      ]
    };

    var chartDom = document.getElementById(id);
    if (chartDom) {
      !chartRef.current && (chartRef.current = echarts.init(chartDom));
      option && chartRef.current.setOption(option);
    }
  }, [dataList])

  return (
    <div id={id} className="" style={{ height: '70px', width: '70px' }}>

    </div>
  )
}

export default PieChartT


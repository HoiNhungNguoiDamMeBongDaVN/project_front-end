import { Options } from "highcharts";

export const areaChartOption: Options = {
    // chart: {
    //     styledMode: false,
    // },
    // plotOptions: {
    //     series: {
    //         marker: {
    //             enabled: false
    //         }
    //     }
    // },
    // legend: {
    //     enabled: false
    // },
    // credits: {
    //     enabled: false
    // },
    // title: {
    //     text: "title"
    // },
    // yAxis: {
    //     visible: false
    // },
    // xAxis: {
    //     visible: false,
    //     categories: [
    //         'Jan',
    //          'Feb', 
    //          'Mar', 
    //          'Apr', 
    //          'May', 
    //          'June', 
    //          'July', 
    //          'Aug', 
    //          'Sep', 
    //          'Oct', 
    //          'Nov', 
    //          'Dec'
    //     ]
    // },
    // defs: {
    //     gradient0: {
    //         tagName: 'linearGradient',
    //         id: 'gradient-0',
    //         x1: 0,
    //         y1: 0,
    //         x2: 0,
    //         y2: 1,
    //         children: [
    //             {
    //                 tagName: 'stop',
    //                 offset: 0
    //             },
    //             {
    //                 tagName: 'stop',
    //                 offset: 1
    //             }
    //         ]
    //     }
    // } as any,
    // series: [
    //     {
    //         color: '#333',
    //         type: 'areaspline',
    //         keys: ['y', 'selected'],
    //         data: [
    //             [7.9, false],
    //             [71.5, false],
    //             [106, false],
    //             [144.5, false],
    //             [176.0, false],
    //             [135.6, false],
    //             [148.5, false],
    //             [216.4, false],
    //             [194.1, false],
    //             [95.6, false],
    //             [10.4, false],
    //             [1,false]
    //         ]
    //     }
    // ]
    chart: {
        type: 'areaspline'
      },
      title: {
        text: 'Moose and deer hunting in Norway, 2000 - 2021',
        align: 'left'
      },
      subtitle: {
        text: 'Source: <a href="https://www.ssb.no/jord-skog-jakt-og-fiskeri/jakt" target="_blank">SSB</a>',
        align: 'left'
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 120,
        y: 70,
        floating: true,
        borderWidth: 1,
        backgroundColor:
           '#FFFFFF'
      },
      xAxis: {
        plotBands: [{ // Highlight the two last years
          from: 2019,
          to: 2020,
          color: 'rgba(68, 170, 213, .2)'
        }]
      },
      yAxis: {
        title: {
          text: 'Quantity'
        }
      },
      tooltip: {
        shared: true,
        headerFormat: '<b>Hunting season starting autumn {point.x}</b><br>'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          pointStart: 2000
        },
        areaspline: {
          fillOpacity: 0.5
        }
      },
      series: [
        {
            color: '#333',
            type: 'areaspline',
            keys: ['y', 'selected'],
            data: [
                [7.9, false],
                [71.5, false],
                [106, false],
                [144.5, false],
                [176.0, false],
                [135.6, false],
                [148.5, false],
                [216.4, false],
                [194.1, false],
                [95.6, false],
                [10.4, false],
                [1,false]
            ]
        },
        {
            color: 'green',
            type: 'areaspline',
            keys: ['y', 'selected'],
            data: [
                [7.9, false],
                [71.5, false],
                [110, false],
                [122.5, false],
                [176.0, false],
                [90.6, false],
                [140.5, false],
                [346.4, false],
                [144.1, false],
                [93.6, false],
                [6.4, false],
                [4,false]
            ]
        }
    ]
}


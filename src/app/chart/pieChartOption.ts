import { Options } from "highcharts/highmaps"
export const pieChartOption: Options = {
    chart: {
        type: 'pie',
        plotShadow: false
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        pie: {
            innerSize: '100%',
            borderWidth: 30,
            borderColor: '',
            slicedOffset: 10,
            dataLabels:{
                connectorWidth:0
            }
        }
    },
    title:{
        verticalAlign:'middle',
        floating:true,
        text:'5000'
    },
    legend:{
        enabled:false,
    },
    series:[
        {
            type:'pie',
            data:[
                {name:'Manager',y:1,color:'#1d41f5'},
                {name:'Custome',y:2,color:'#1dcaf5'},
                {name:'Product',y:3,color:'#546b7a'},
                {name:'Order',y:4,color:'#29bb6b'},
                {name:'Revenue',y:5,color:'#84a10e'}
            ]
        }
    ]
};
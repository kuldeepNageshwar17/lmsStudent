import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import axios from 'axios'


import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../../Auth/_redux/authRedux";
import { actions } from "../../Auth/_redux/authRedux";

import {
  useParams,
  useHistory
} from 'react-router'
import { ResponsiveBar  } from '@nivo/bar'
import { ResponsiveCalendar } from '@nivo/calendar'
import { ResponsivePie } from '@nivo/pie'
import { Line ,Doughnut , Scatter ,Bar} from 'react-chartjs-2';
import Chart from "react-google-charts";
import DatePicker from "react-datepicker";
import { registerLocale , setDefaultLocale } from "react-datepicker";
import { enUS } from 'date-fns/locale'


registerLocale("enUS", enUS); // register it with the name you want
setDefaultLocale("enUS");



 function Mydashboard () {

  const [data , setdata] = useState({
    chartjsData : [],
    charjsLabel : [],
    testName : ""
  })
  const [pie , setPie] = useState({
    DoughnutData : [],
    DoughnutLabel : [],
    DoughnutTestName : ""
  })
  const [ ScatterChart , setScatterChart] = useState([])
  const [BarChartData , setBarChartData] =  useState({
    BarData : [],
    BarLabel : [],
    BarColor : []
  })
  const [clickedDataset, setClickedDataset] = useState()
  useEffect(() => {
    
      axios
      .get('/api/graph/GetCourseTestResult/5f90078a13df2e0b38e24faf/5f900a6913df2e0b38e24fbf')
      .then(res => {
          console.log(res.data)
        setdata({...data , chartjsData : res.data.data , charjsLabel : res.data.label , testName : res.data.testName})
      })
      .catch(err => {
        console.log(err)
      })
      axios
      .get('/api/graph/getStudentCourseTestResultForPieChart/5f90078a13df2e0b38e24faf/5f900a6913df2e0b38e24fbf')
      .then(res => {
          console.log(res.data)
        setPie({...pie , DoughnutData : res.data.data ,  DoughnutLabel : res.data.label ,  DoughnutTestName : res.data.testName})
      })
      .catch(err => {
        console.log(err)
      })
      axios
      .get('/api/graph/getNumbersInTestBatchWise/5f900a6913df2e0b38e24fbf')
      .then(res => {
        setScatterChart(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      axios
      .get('/api/graph/getTestByTimeLeft/5f900a6913df2e0b38e24fbf')
      .then(res => {
        setBarChartData({...BarChartData , BarData : res.data.data ,BarLabel : res.data.label , BarColor : res.data.color})
      })
      .catch(err => {
        console.log(err)
      })
      
      

  } ,[])
   
  const ChartjsData = {
        labels: data.charjsLabel,
        datasets: [
          {
            label:  data.testName,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data.chartjsData
          }
        ]
      };
      const DoughnutChartData = {
        labels: pie.DoughnutLabel,
        datasets: [
          {
            label: pie.DoughnutTestName,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'hsl(174, 13%, 52%)',
            hoverBorderColor : "blue",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: pie.DoughnutData
          }
        ]
      };
      const ScatterChartData = {
        datasets: [
          {
            label: 'A dataset',
            data: ScatterChart,
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      }
        const ScatterChartOptions = {
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
          }],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }
        const BarData = {
          labels: BarChartData.BarLabel,
          datasets: [
            {
              label: '# of Votes',
              data: BarChartData.BarData,
              backgroundColor: BarChartData.BarColor,
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }
        
        const BarOptions = {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }
      const chartRef = React.useRef(null)
      const DoughnutRef = React.useRef(null)
      const getDatasetAtEvent = dataset => {
        if (!dataset.length) return
          var index ; 
          dataset.map((single) => {
            if(single.$previousStyle){
              index = single._index
            }
          })
        var showingData =  ScatterChartData.datasets[0].data[index]
        console.log("show" , showingData)
              setClickedDataset(showingData)
      }
  return (
   <>
   <Row>
     <Col>
     {data && data.chartjsData && data.chartjsData.length &&
        <div style={{width : "80%"  , borderColor : "green"}} >
        <h2>Single Test Analysis</h2>
        <Line ref={chartRef} data={ChartjsData} />
      </div>}
     </Col>
     <Col>
      { pie  && pie.DoughnutData && pie.DoughnutData.length && 
        <div> <h2>Pass/Fail in Single Test Analysis</h2>
            <Doughnut ref={DoughnutRef} data={DoughnutChartData} />
        </div>
      }</Col>
   </Row>
    
        
      <br></br>
      <br></br>
      <br></br>
      <hr></hr>
      <Row>
     <Col>
     {ScatterChart && ScatterChart.length && 
     <> 
     <div> <h2>Batch Wise Test Analysis</h2>
     <Scatter data={ScatterChartData} getDatasetAtEvent={getDatasetAtEvent} options={ScatterChartOptions} />
     </div>
     {clickedDataset && console.log(clickedDataset , clickedDataset.x , clickedDataset.y)}
     {clickedDataset && <><p>Marks : {clickedDataset.x}  ,No of Student :  {clickedDataset.y}</p> </> }
     </>
     }
     </Col>
     <Col>
     {BarChartData && BarChartData.BarLabel && BarChartData.BarLabel.length && <Bar data={BarData} options={BarOptions} />}
      </Col>
   </Row>
     
     
   
   
    </>
  )
}

export default Mydashboard;

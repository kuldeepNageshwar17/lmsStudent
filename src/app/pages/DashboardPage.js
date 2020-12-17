import React , { useState , useEffect } from 'react'
import { Col, Card ,Row , Button} from 'react-bootstrap'
import axios from 'axios'
import { useParams , useHistory } from 'react-router-dom'
import { ResponsiveBar } from '@nivo/bar'

export default function DashBoard () {

const [data , setdata] = useEffect()
  useEffect(() => {
    axios
    .get('/api/Examination/getLastResults')
    .then(res => {
      console.log("result" , res.data)
      setdata(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  } ,[])
  
return (
  <div>dfsfsdfa
    {/* {data && data.length && 
             <ResponsiveBar
            data={data}
            keys={[ 'attempt','right' ,'wrong','notattempt'  ]}
            indexBy="Test"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            // colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'white',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'white',
                    rotation: -45,
                    lineWidth: 2,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'notattempt'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'attempt'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'wrong'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'right'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Test',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Result',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
           
    } */}
    </div>
  )
  
}

import React,{useState, useEffect} from 'react';

import  {VictoryPie} from 'victory'
const PieChart = ({statisticsHistory}) => {
    const [statistics, setStatistics] = useState(statisticsHistory);

    useEffect(() => {
        statisticsHistory.map((item) => (
            item.amount = item.amount < 0 ? item.amount*-1 : item.amount
        ))
        setStatistics(statisticsHistory);
    }, [statisticsHistory]);



    return (
        <VictoryPie 
        
            data={statistics}
            colorScale={['#fa0f36','#fa1f36', '#fa2f36','#fa3f36','#fa4f36','#f5bf36' ]}
            x='mcc'
            y='amount'
            height={250}
            labelRadius={({ innerRadius }) => innerRadius +40 }
            style={{height:'400px',
                    labels: { fill: "white", fontSize: 7, fontWeight: "bold" },
                    data: { stroke: "#fff", strokeWidth: 1} }}
        />
    );
}

export default PieChart;

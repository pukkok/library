import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

function Statistic ({token, BASE_URL, admin}) {

    const [stat, setStat] = useState()

    const fetchStat = async () => {
        let endpoint = ''
        admin ? endpoint = '/admins/stat' : endpoint = '/history/stat'
        const stat = await fetch(`${BASE_URL}/api${endpoint}`, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        }).then(res => res.json())
        
        return setStat(stat)
    }

    useEffect(()=>{
        fetchStat()
    },[])

    useEffect(()=>{
        stat && displayChart('bar', stat)
    },[stat])

    function displayChart(type, group){
        const ctx = document.getElementById('myChart')
        
        const keys = Object.keys(group)
        const values = Object.values(group)

        new Chart(ctx, {
            type,
            data: {
              labels: keys,
              datasets: [{
                label: '# of Category',
                data: values,
                borderWidth: 1,
                backgroundColor: '#FFD700',
              }]
            },
            options: {
                // indexAxis: 'y', // 가로방향 그래프
                scales: {
                    y: {
                    beginAtZero: true
                    }
                },
                plugins: {
                    colors: {
                    enabled: true
                    }
                }
            }
        })
    }

    return(
        <div>
            <canvas id="myChart"></canvas>
        </div>

    )
}

export default Statistic
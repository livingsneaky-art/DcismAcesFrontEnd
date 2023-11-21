import React from 'react'
import { ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";
import { NavLink } from 'react-router-dom'

import './index.scss'

const ChartBox = (props) => {
    return (
        <div className='chartBox'>
            <div className='boxInfo'>
                <div className='title'>
                    <img src={props.icon} alt='icon' />
                    <span className='text-xl'>{props.title}</span>
                </div>
                <h1 className='text-4xl'>{props.number}</h1>
                <NavLink to={props.link} style={{ color: props.color }}>View All</NavLink>
            </div>
            <div className='chartInfo'>
                <div className='chart'>
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={props.chartData}>
                            <Tooltip
                                contentStyle={{ background: "transparent", border: "none" }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 30, y: 60 }}
                            />
                            <Line
                                type="monotone"
                                dataKey={props.dataKey}
                                stroke={props.color}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className='texts'>
                    <span className='percentage' style={{ color: props.percentage > 0 ? "limegreen" : "tomato" }}>{`${props.percentage}%`}</span>
                    <span className='duration'>of total users</span>
                </div>
            </div>
        </div>
    )
}

export default ChartBox
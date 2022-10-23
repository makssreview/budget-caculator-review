import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store";
import {TransactionType} from "../../store/slice";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import styled from "styled-components";


const formatDecimals = (item: number) => {
    return Number(item.toFixed(2))
}
type ArrayType = {
    date: string
    amount: number
}

export const RegularGraph = () => {
    const data = useSelector<AppRootStateType, Array<TransactionType>>(state => state.transaction.copyOfTransactions)


    const cashFlowArray = data.reduce((acc, current) => {
        const sumOfAmount = Math.abs(data.filter(el => el.date.toLocaleDateString() === current.date.toLocaleDateString()).map(el => el.amount)
            .reduce((acc, el) => acc + el, 0))
        const el ={date:current.date.toLocaleDateString(), amount:sumOfAmount}
        return [...acc, el]
        //need to filter results, don't need the same days displaying twice
    }, [] as Array<ArrayType> )

    const filteredArray= cashFlowArray.filter((thing, index, self) =>
        index === self.findIndex((t) => (
            t.date === thing.date
        )))

    const sortedArray = filteredArray.sort((a,b) =>
        Date.parse(a.date) - Date.parse(b.date))

    const graphData = sortedArray.map((el, index) => ({
        xAxis: el.date,
        expense: formatDecimals(el.amount),
    }))


    return (
        <div>
            {data.length > 0 &&
                <Container>
                    <BarChart width={430} height={250} data={graphData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey='xAxis' tick={{fontSize: 8}}/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey='expense' fill="#8884d8" name='Cash Flow' barSize={20}/>
                    </BarChart>
                </Container>
            }
        </div>
    );
}

const Container = styled.div`
  padding-top: 40px;
  width: 450px;
  height: 300px;
`

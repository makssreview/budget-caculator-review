import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store";
import {TransactionType} from "../../store/slice";
const formatDecimals = (item: number) => {
    return Number(item.toFixed(2))
}

export const IncomeExpenseTable = () => {
    const transactions = useSelector<AppRootStateType, Array<TransactionType>>(state => state.transaction.copyOfTransactions)
    const amounts = transactions.map(el=>el.amount)
    const expense =  formatDecimals(amounts.filter(el=>el < 0)
        .reduce((acc, el)=> (acc + el),0))
    const income =  formatDecimals(amounts.filter(el=>el > 0)
        .reduce((acc, el)=> (acc + el),0))
    const total = formatDecimals((Number(income) - Number(-expense)))

    return (

        <Container>
                <DivWrapper>
                    <IncomeWrapper>Inflow</IncomeWrapper>
                    <PlusWrapper>{income}$</PlusWrapper>
                </DivWrapper>
                <DivWrapper>
                    <IncomeWrapper>Outflow</IncomeWrapper>
                    <MinusWrapper>{expense}$</MinusWrapper>
                </DivWrapper>
                <DivWrapper>
                    <IncomeWrapper></IncomeWrapper>
                    <TotalWrapper>{total}$</TotalWrapper>
                </DivWrapper>
        </Container>

    );
};

const Container = styled.div`
  width: 450px;
  background: white;
  padding: 8px 0;
  flex-direction: column;
  box-sizing: border-box;
  display: block;
`
const DivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: #333;
  font-size: 16px;
  line-height: 16px;
  padding: 8px 16px;
  gap: 200px;
  position: relative;
  margin: 5px;
`
const IncomeWrapper = styled.div`
  justify-content: center;
  position: relative;
`
const PlusWrapper = styled.div`
  position: absolute;
  right: 16px;
  color: #039be5; 
`
const MinusWrapper = styled.div`
  position: absolute;
  right: 16px;
  color: #e51c23;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(118, 118, 118, 0.47);
`
const TotalWrapper=styled.div`
  color: #757575;
  position: absolute;
  right: 16px;
`

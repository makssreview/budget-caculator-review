import React from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store";
import {deleteTransaction, TransactionType} from "../../store/slice";

export interface ColorProps {
    amount: number
}

export const TransactionHistory = () => {
    const transactions = useSelector<AppRootStateType, Array<TransactionType>>(state => state.transaction.copyOfTransactions)
    const dispatch = useDispatch()
    return (
        <Container>
            {transactions.map((el) => {
                return (
                    <ListWrapper key={el.id}>
                        <DivWrapper>
                            <ImgWrapper src={el.category.src}
                                        onMouseOver={e => (e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/128/3687/3687412.png')}
                                        onMouseOut={e => (e.currentTarget.src = el.category.src)}
                                        onClick={() =>
                                            dispatch(deleteTransaction(el.id))}
                                       />
                            <ElementWrapper>
                                <div>{el.category.value}</div>
                                <DateWrapper>{el.date.toLocaleDateString('en-US')}</DateWrapper>
                            </ElementWrapper>
                            <TextWrapper>{el.text}</TextWrapper>
                            <SpanWrapper amount={el.amount}>{el.amount}$</SpanWrapper>

                        </DivWrapper>
                    </ListWrapper>

                )
            })}
        </Container>
    );
};

const Container = styled.ul`
  width: 450px;
  background: #f4f4f4;
  list-style-type: none;
  padding: 0;
`
const ListWrapper = styled.div`
  margin-top: 32px;
  height: 75px;
  background-color: #ffff;
  margin-left: 0;
  position: relative;
  display: block;
  margin-bottom: 32px;
`
const DivWrapper = styled.div`
  display: flex;
  padding: 20px 12px;
  gap: 10px;
`
const ElementWrapper = styled.div`
`
const DateWrapper = styled.div`
  font-size: 12px;
  color: #9e9e9e;
`
const TextWrapper = styled.div`
  font-size: 14px;
  padding: 12px 20px;
  opacity: 0.9;
  color: rgba(28, 108, 68, 0.68);
  position: absolute;
  left: 200px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`
const ImgWrapper = styled.img`
  width: 40px;
  height: 40px;
`
const SpanWrapper = styled.span<ColorProps>`
  justify-content: center;
  padding-top: 8px;
  position: absolute;
  right: 16px;
  color: ${props=>props.amount >0 ? '#039be5':'#e51c23'}
  
`
const ButtonWrapper = styled.button`
  cursor: pointer;
  background-color: rgba(255, 63, 101, 0.56);
  border: 0;
  color: #ffffff;
  font-size: 20px;
  line-height: 20px;
  padding: 2px 5px;
  position: absolute;
  top: 40%;
  left: 140px;
  opacity: 0.2;
  border-radius: 7px;
  &:hover {
    background-color: #039be5;
    color: white;
`

import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import {changePopUpCalendar, filterDateTransaction} from "../store/slice";
import {useDispatch} from "react-redux";
import styled from "styled-components";


export const FilterByDateRange = () => {

    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (start !== null && end !== null) {
            dispatch(filterDateTransaction({start, end}))
            dispatch(changePopUpCalendar(false))
        }}


    return (
            <Container>
                <DatePicker
                    id='box'
                    selected={null}
                    onChange={onChange}
                    placeholderText="Select Custom date"
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    monthsShown={1}
                    openToDate={new Date()}
                    inline
                />
            </Container>
        );

}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`
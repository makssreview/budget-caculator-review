import React, {useState} from 'react';
import {PieChartGraph} from "./PieChartGraph";
import {Chart} from "./Chart";

type PropsType={
    isPie:boolean
    isChart:boolean
}

export const Graphs = (props:PropsType) => {
    return (
        <div>
            {props.isPie
                ?<PieChartGraph/>
                :<Chart/>
            }

        </div>
    );
};

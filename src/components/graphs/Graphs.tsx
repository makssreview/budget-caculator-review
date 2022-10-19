import React from 'react';
import {PieGraph} from "./PieGraph";
import {RegularGraph} from "./RegularGraph";

type PropsType={
    isPie:boolean
}

export const Graphs = (props:PropsType) => {
    return (
        <div>
            {props.isPie
                ?<PieGraph/>
                :<RegularGraph/>
            }
        </div>
    );
};

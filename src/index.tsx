import React, { useRef, useState, useEffect } from 'react';
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition'
import { graphviz } from 'd3-graphviz'
import { easeLinear } from 'd3-ease'


const defaultOptions = {
    fit: true,
    height: 500,
    width: 500,
    zoom: false,
    useWorker: false,
};

export const ReactD3GraphViz = (props: any) => {
    const d3Container = useRef(null)
    useEffect(
        () => {
            const { dot, options, onClick } = props;

            if (dot && d3Container.current) {
                var t: any = transition()
                    .duration(750)
                    .ease(easeLinear);


                graphviz(d3Container.current, {
                    ...defaultOptions,
                    ...options || {},
                }).transition(t)
                    .renderDot(dot)
                    .on("end", interactive)

            }

            function interactive() {
                onClick && selectAll('.node').on("click", function () {
                    var title = select(this).selectAll('title').text().trim();
                    onClick && onClick(title)
                })
            }
        },
        [props.dot, d3Container.current])

    return (
        <div
            ref={d3Container}
        />
    );
}


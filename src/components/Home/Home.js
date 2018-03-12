import React, {Component} from 'react'
import {connect} from 'react-redux'

import {createIncrement, createDecrement} from '../../redux/count'
import {createRandomize} from '../../redux/random'
import {myConnect} from "../Hoc/Hoc";

const HomeComponent = ({count, random, decrement, increment, randomize, upload}) => (
    <div>
        <div>{upload.length}</div>
        <div>{count}</div>
        <div>{random}</div>
        <button onClick={() => increment(5)}> Increment by 5</button>
        <button onClick={() => increment(3)}> Increment by 3</button>
        <button onClick={() => decrement(4)}> Decrement by 4</button>
        <button onClick={randomize}> Randomize</button>
    </div>
)

const ConnectedHome = connect(
    state => ({
        count: state.count,
        random: state.random,
        upload: state.upload,
    }),
    { //mapDispatchToProps
        increment: createIncrement,
        decrement: createDecrement,
        randomize: createRandomize,
    }
)(HomeComponent)

// const ConnectedHome = myConnect(
//     {
//         count: state.count,
//         random: state.random,
//         upload: state.upload,
//     },
//     {
//         increment: createIncrement,
//         decrement: createDecrement,
//         randomize: createRandomize,
//     }
//     )(HomeComponent);

export const Home = ConnectedHome

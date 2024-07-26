import React from 'react'
function Card(props) {
    let values = []
    for (let i = 0; i <= props.values.length - 1; i++) {
        const val = <div className={'cardValue'}>{props.values[i]}</div>
        values.push(val)
    }
    return <div className={'card ' + props.cardClass} onClick={props.onClick}>{values}</div>
}
export default Card
import React, { PureComponent } from 'react'

class GroupList extends PureComponent {

    render () {
        return (
            <li className = {this.props.currentIndex === this.props.id ? 'GoupOptionMenuCurr' : 'normal'} 
            onClick = { id => this.props.onClick(this.props.id) }>
                { this.props.tableName }
            </li>
        )
    }
}

export default GroupList
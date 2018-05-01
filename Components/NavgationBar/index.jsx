import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggle_option } from './action'
import './NavgationBar.css'

class NavgationBar extends Component {

    on_toggle_option = id => {
        this.props.dispatch(toggle_option(id))
    }

    render () {
        const { tabs } = this.props.optionList
        const { currentIndex } = this.props.optionList
        return (
            <div className="NavgationBar">
                <span className="modiartsLogo"></span>
                <ul className="navList">
                    {
                        tabs.map((item,key) => {
                            return (
                                <li className = { currentIndex === item.id ? 'option active' : 'option' }
                                key = { item.id } data-key = { item.id } onClick = { id => this.on_toggle_option(item.id) } > 
                                    <span></span>
                                    <p> {item.tabName} </p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

NavgationBar = connect(mapStateToProps)(NavgationBar)

export default NavgationBar
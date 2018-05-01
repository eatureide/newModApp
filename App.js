import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './Components/Login/'
import NavgationBar from './Components/NavgationBar'
import AssessmentList from './Components/AssessmentList'
// import Loading from './Components/Loading/index.jsx'
import './reset.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      pageIndex : 0 
    }
  }

  render() {
    // const { isLoading } = this.props
    const { getToken } = this.props
    const currentIndex = this.props.optionList.currentIndex - 1

    const arr = [
      <AssessmentList key = "AssessmentList" />
    ]
    // console.log(isLoading)
    return (
      <div className="App">
        {/* { isLoading === 'FETCH_ING' && <Loading /> } */}
        { Boolean(getToken) ?  [<NavgationBar key="NavgationBar" /> , arr[currentIndex]] : <Login/> }
      </div>
    )
  }
  
}

const mapStateToProps = state => {
  return state
}

App = connect(mapStateToProps)(App)

export default App;

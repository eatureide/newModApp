import { combineReducers } from 'redux'
import getToken from './Components/Login/reducers/getToken.js'
import getOption from './Components/Login/reducers/getOption.js'
import optionList from './Components/NavgationBar/reducers/option_list.js'
import getMenberList from './Components/AssessmentList/reducers/getMenberList.js'
import isLoading from './Components/Loading/Loading.js'
import groupList from './Components/AssessmentList/reducers/groupList.js'
import getOptionid from './Components/Login/reducers/getOptionid.js'
import getEvaluation from './Components/AssessmentList/reducers/getEvaluation.js'

let mod_app = combineReducers({
    getToken ,
    getOption ,
    getOptionid ,
    optionList ,
    getMenberList ,
    isLoading ,
    getEvaluation ,
    groupList
})

export default mod_app
import * as types from './mutation-types'
import axios from 'axios'
import store from '../store'

export default {
  // 处理文章内容状态部分：
  fetchIndexPostsAn ({ commit }) {
    var nextPageNum = store.state.pageNum
    axios.get('http://120.78.165.238:4000/api/posts/?page=' + nextPageNum).then(response=>{
      if (response.data.data.length == 0){
        commit(types.NO_ANY_POSTS) // 显示没有任何文章可以加载了
        commit(types.CHANGE_BTN_VALUE)
      }
      if (nextPageNum == 1){
        // 如果当前页数为第一页，也不去合并数组，直接将第一页的数组赋值
        commit('HIDDEN_INDEX_LOADING')
        store.state.indexPostsArray = response.data.data
      }else{
        commit(types.FETCH_INDEX_POST,response.data.data)
      }
      console.log(response.data.data)
    }).catch(error=>{
      commit('HIDDEN_INDEX_LOADING')
    })
  },
  // 处理标签状态部分：
  fetchCgItemAn ({ commit }) {
    axios.get('http://120.78.165.238:4000/api/catagory/return_all_item').then(response=>{
      commit(types.LOAD_CATAGORY_ITEM,response.data.data)
    }).catch(error=>{
      console.log(error)
    })
  },
  // 处理代码片段状态部分：
  fetchCodeDataAn ({ commit }) {
    var codePageNum = store.state.codePageNum
    axios.get('http://120.78.165.238:4000/api/code?page=' + codePageNum).then(response=> {
      if (response.data.data.length == 0) {
        commit('NO_MORE_CODE_DATA')
      }else{
        store.state.codeDataArray = response.data.data
      }
    }).catch(error=> {
      console.log(error)
    })
  }
}
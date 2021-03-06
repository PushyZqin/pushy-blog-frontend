import * as types from './mutation-types'
import axios from 'axios'
import store from '../store'
import urls from '../config/urls'

export default {
  // 处理文章内容状态部分：
  fetchIndexPostsAn ({ commit }) {
    let pageNum = store.state.pageNum;
    axios.get(urls.post.postList(pageNum)).then(response=>{
      if (response.data.data.length === 0){
        commit(types.NO_ANY_POSTS); // 显示没有任何文章可以加载了
        commit(types.CHANGE_BTN_VALUE)
      }
      if (pageNum === 1){
        store.state.requestedPage.push(1);
        // 如果当前页数为第一页，也不去合并数组，直接将第一页的数组赋值
        commit('HIDDEN_INDEX_LOADING');
        store.state.indexPostsArray = response.data.data
      }else{
        commit(types.FETCH_INDEX_POST,response.data.data)
      }
    }).catch(error=>{
      commit('HIDDEN_INDEX_LOADING')
    })
  },
  // 处理标签状态部分：
  fetchCgItemAn ({ commit }) {
    axios.get(urls.category.cgList).then(response=>{
      commit(types.LOAD_CATAGORY_ITEM,response.data.data)
    }).catch(error=>{
      console.log(error)
    })
  },
  // 处理代码片段状态部分：
  fetchCodeDataAn ({ commit }) {
    let codePageNum = store.state.codePageNum
    axios.get('https://api.pushy.site/code?page=' + codePageNum).then(response=> {
      if (response.data.data.length === 0) {
        commit('NO_MORE_CODE_DATA')
      }else{
        store.state.codeDataArray = response.data.data
      }
    }).catch(error=> {
      console.log(error)
    })
  }
}

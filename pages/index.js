/**
 * Created by andoan on 9/29/17.
 */
import Head from 'next/head'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../redux/CreateStore'
import { bindActionCreators } from 'redux'
import { quizGetRequest, quizGetSuccess, quizGetFailure } from '../redux/QuizRedux'
import fetch from 'isomorphic-fetch'
class Counter extends React.Component {
    static async getInitialProps ({ store, isServer }) {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const statusCode = res.statusCode > 200 ? res.statusCode : false
        const json = await res.json()
        if (statusCode) {
            store.dispatch(quizGetFailure(json))
            return { isServer }
        }
        store.dispatch(quizGetSuccess(json))
        return { isServer }
    }
    componentDidMount () {
        // this.props.fetchQuiz();
    }
    render() {
        return (
            <div>
                <Head>
                    <title>My page title</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div>{ JSON.stringify(this.props) }</div>
                <p>Hello world!</p>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.quiz.get.data,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuiz: bindActionCreators(quizGetRequest, dispatch),
    }
}
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Counter)
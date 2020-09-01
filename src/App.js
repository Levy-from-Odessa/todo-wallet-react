import React from 'react';
import './App.scss';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './store/store'



import Header from './components/Header/Header';

import Home from './routes/Home/Home'
import EditTodoItem from './routes/EditTodoItem/EditTodoItem.jsx'
import BankPage from './routes/BankPage/BankPage';
import StatisticsPage from './routes/StatisticsPage/StatisticsPage'
function App() {
  return (
    
       <Provider store={store}>
        <div className="App">
         
          <Router>
          <Header/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/editTodo/:todoId" component={EditTodoItem} />
              <Route exact path="/bank" component={BankPage} />
              <Route exact path="/statistics" component={StatisticsPage} />
            </Switch>
          </Router>

        </div>

      </Provider>
   
   
  );
}

export default App;

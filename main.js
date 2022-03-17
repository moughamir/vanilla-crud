import './style.css'
import { t9n } from "./constants";
import * as Elm from './components'
import {users} from './lib/'

const UsersTable = function _ut(data){
    return (
      `${Elm.Table(
        Elm.TableHead([...Object.values(t9n.fr.tableHead)])
      )}`
    )
}

const App = function App() {

  return (
        `
        ${Elm.Title('Vanilla CRUD with State Management')}
        ${UsersTable(users)}
        ${Elm.Button({
          className:'btn btn-test',
          onClick:'App.state.openModal = !App.state.openModal',
          value:`Toggle modal ${App.state.openModal === false ? 'not Toggled' : 'Toggled'}!`
        })}
      `
      )

    };

const handler = {
  set:function(obj, prop, value){
    obj[prop] = value
    document.getElementById('app').innerHTML = App()
  }
}

App.state = new Proxy({openModal:false}, handler)

    document.getElementById('app').innerHTML = App()
// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite! ${t9n.fr.status}</h1>
//   ${Button({className:"hello", value:"hello"})}
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
window.App = App

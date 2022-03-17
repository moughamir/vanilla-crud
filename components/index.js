/**
  * @componenet Button
  * @return HTMLElement button
  */
export const Button = function _Button(props) {
  const {className, value, onClick} = props
    return `
      <button
        class="${className}"
        onClick=${props.onClick}
        type="button">
      ${value}
      </button>
    `
  }
/**
  * @componenet TableCell
  * @return HTMLElement td
  */
export const TableCell = function _TCell(props){
    return `<td>${props}</td>`
  }

/**
  * @componenet TableRow
  * @return HTMLElement tr
  */
export const TableRow = function _TRow(props){
    return `<tr>${props}</tr>`
  }

/**
  * @componenet TableHead
  * @return HTMLElement th
  */
export const TableHead = function _THead(props){
  console.log(props.map(e => e))
    return props.map((e) => `<th>${e}</th>`)
  }

/**
  * @componenet Table
  * @return HTMLElement table
  */
export const Table = function _T(props){
  console.warn(props)
    return `<table>${props}</table>`
  }

/**
  * @componenet Title
  * @return HTMLElement h1
  */
export const Title = function _Title(title){
    return `<h1>${title}</h1>`
  }



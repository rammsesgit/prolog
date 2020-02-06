import { useState, useEffect } from 'react'
import { rooms, sha } from '../../public/js/source-pl'

import PrologOutput from './PrologOutput'
import PrologQueries from './PrologQueries'
import CustomEditor from '../editor/CustomEditor'

export default () => {
  const [query, setQuery] = useState('room(X).')
  const [output, setOutput] = useState('')
  const [prologCode, setPrologCode] = useState(sha)

  const [history, setHistory] = useState(['room(stairs).', 'room(bedroom).', 'room(office).'])
  const [historyIndex, setHistoryIndex] = useState(history.length - 1)

  useEffect(() => {
    session.consult(prologCode)
  }, [])

  /**
   * Show all results like if pressed semicolon.
   *
   * @param {Boolean} debug
   */
  const showResults = debug => {
    debug
      ? session.answer(console.log)
      : session.answer(answer => setOutput(pl.format_answer(answer)))
  }

  /**
   * Make a custom query.
   *
   * @param {Element} queryBox
   * @param {String} query
   * @param {Boolean} debug
   */
  const makeQuery = (queryBox, query, debug = false) => {
    queryBox.select() // Select the content of the input.

    if (query === ';') {
      showResults(debug)
    } else {
      query.charAt(query.length - 1) != '.' && alert('Missing dot.')
      handleHistory('update')
      session.query(query)
      showResults(debug)
    }
  }

  /**
   * Handle the two basic actions of the history of queries, update and navigate.
   *
   * @param {String} type
   * @param {Object} payload
   */
  const handleHistory = (type, payload) => {
    if (type === 'update') {
      // Prevent history duplicated.
      if (history[history.length - 1] != query) {
        setHistoryIndex(history.length + 1) // Update the history index.
        setHistory([...history, query]) // Update the history.
      }
    } else if (type === 'navigate') {
      switch (payload.key) {
        case 'ArrowUp':
          if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1)
            setQuery(history[historyIndex - 1])
          }
          return
        case 'ArrowDown':
          if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1)
            setQuery(history[historyIndex + 1])
          }
          return
      }
    }
  }

  /**
   * Set a new consult with new spurce code in Prolog.
   *
   * @param {String} consult
   */
  const newConsult = consult => {
    setPrologCode(consult)
    session.consult(consult)
  }

  /**
   * Handle que keyboard actions in the query box.
   *
   * @param {String} key
   * @param {Element} target
   */
  const handleQueryBox = (key, target) => {
    if (key === 'Enter') {
      makeQuery(target, query)
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      handleHistory('navigate', { key })
    }
  }

  return (
    <div>
      <PrologQueries query={query} handleQueryBox={handleQueryBox} setQuery={setQuery} />
      <PrologOutput output={output} />

      <CustomEditor prologCode={prologCode} newConsult={newConsult} />

      <script src='/js/tau-prolog.js'></script>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { rooms, sha } from '../public/js/source-pl'

export default () => {
  const [query, setQuery] = useState('room(X).')
  const [output, setOutput] = useState('')
  const [prologCode, setPrologCode] = useState(sha)

  const [history, setHistory] = useState(['room(stairs).', 'room(bedroom).', 'room(office).'])
  const [historyIndex, setHistoryIndex] = useState(history.length - 1)

  useEffect(() => {
    session.consult(prologCode)
  }, [])

  useEffect(() => {
    console.log(query)
  })

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
      <div className=' container query-row'>
        <label htmlFor='query'>Query:</label>
        <input
          className='query-box'
          id='query'
          type='text'
          autoFocus
          onKeyUp={e => handleQueryBox(e.key, e.target)}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className='container'>
        <label htmlFor='output'>Output:</label>
        <textarea id='output' readOnly defaultValue={output}></textarea>
      </div>

      <div className='container editor'>
        <small className='editor-title'>Prolog code:</small>
        <textarea
          id='editor'
          defaultValue={prologCode}
          onChange={e => newConsult(e.target.value)}
        ></textarea>
      </div>

      <style jsx>{`
        input,
        textarea {
          font-size: 1rem;
        }

        .query-row {
          padding: 10px;
          justify-content: flex-start;
        }
        .query-box {
          border-radius: 6px;
          padding: 2px 4px;
          margin-left: 5px;
          border: 1px solid gray;
        }

        #output {
          width: calc(100% - 70px);
          border-radius: 8px;
          padding: 2px 4px;
          border: 1px solid gray;
          background-color: #eee;
        }

        .editor.container {
          flex-direction: column;
          margin-top: 20px;
        }
        .editor-title {
          width: 100%;
          padding-left: 5px;
        }
        #editor {
          padding: 10px;
          margin: 5px;
          border-radius: 8px;
          border: 1px solid gray;
          background-color: #1d1d1d;
          color: #eee;

          height: 450px;
          width: 400px;
        }

        @media screen and (max-width: 440px) {
          #editor {
            max-width: 90%;
          }
        }
      `}</style>

      <script src='/js/tau-prolog.js'></script>
    </div>
  )
}

export default ({ query, handleQueryBox, setQuery }) => {
  return (
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

      <style jsx>{`
        .query-row {
          padding: 10px;
          justify-content: flex-start;
        }
        .query-box {
          border-radius: 6px;
          padding: 2px 4px;
          margin-left: 5px;
          border: 1px solid gray;
          font-size: 1rem;
        }
      `}</style>
    </div>
  )
}

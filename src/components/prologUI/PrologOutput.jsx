export default ({ output }) => {
  return (
    <div className='container'>
      <label htmlFor='output'>Output:</label>
      <textarea id='output' readOnly defaultValue={output}></textarea>

      <style jsx>{`
        #output {
          width: calc(100% - 70px);
          border-radius: 8px;
          padding: 2px 4px;
          border: 1px solid gray;
          background-color: #eee;
          font-size: 1rem;
        }
      `}</style>
    </div>
  )
}

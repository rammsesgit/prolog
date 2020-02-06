export default ({ prologCode, newConsult }) => {
  return (
    <div className='container editor'>
      <small className='editor-title'>Prolog code:</small>
      <textarea
        id='editor'
        defaultValue={prologCode}
        onChange={e => newConsult(e.target.value)}
      ></textarea>

      <style jsx>{`
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
    </div>
  )
}

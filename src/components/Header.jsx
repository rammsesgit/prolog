export default () => {
  return (
    <header className='header'>
      <h3>Main libraries</h3>
      <ul>
        <li>
          <a href='http://tau-prolog.org/' target='_blank'>
            tau-prolog
          </a>
        </li>
        <li>
          <a href='https://microsoft.github.io/monaco-editor/' target='_blank'>
            monaco-editor
          </a>
        </li>
      </ul>

      <style jsx>{`
        .header {
          padding: 10px;
          margin-bottom: 20px;
          width: 100vw;
        }
        a {
          color: #29d;
        }
      `}</style>
    </header>
  )
}

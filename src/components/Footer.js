import React from 'react'
import './Footer.css'

export default () => (
  <div>
    <h2 className="taCenter">
      Βρείτε μας στο Instagram: {' '}
      <a href="https://instagram.com/panaccordeon/">@panaccordeon</a>
    </h2>
    <br />
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. Crafted by{' '}
          <a href="https://petrosdolianitis.com/" target="_blank">Petros Dolianitis</a>.
        </span>
      </div>
    </footer>
  </div>
)

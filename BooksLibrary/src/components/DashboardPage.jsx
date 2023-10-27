import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import Book from '../components/Books.jsx'
class MyComponent extends Component {

  handleShowBook = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <Book />
        </React.StrictMode>
    );
  }

  render() {
    return (
      <div>
        <style>
          {`
            #bg {
              position: fixed;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background: #38a8d1;
              background: -moz-linear-gradient(top, #38a8d1 0%, #34bc9a 36%, #34bc9a 57%, #8645f7 100%);
              background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #38a8d1), color-stop(36%, #34bc9a), color-stop(57%, #34bc9a), color-stop(100%, #8645f7));
              background: -webkit-linear-gradient(top, #38a8d1 0%, #34bc9a 36%, #34bc9a 57%, #8645f7 100%);
              background: -o-linear-gradient(top, #38a8d1 0%, #34bc9a 36%, #34bc9a 57%, #8645f7 100%);
              background: -ms-linear-gradient(top, #38a8d1 0%, #34bc9a 36%, #34bc9a 57%, #8645f7 100%);
              background: linear-gradient(to bottom, #38a8d1 0%, #34bc9a 36%, #34bc9a 57%, #8645f7 100%);
              filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#38a8d1', endColorstr='#8645f7', GradientType=0);
            }

            section {
              position: relative;
              width: 640px;
              margin: 50px auto;
            }

            nav {
              width: 100%;
            }

            nav ul li {
              display: inline-block;
              list-style: none;
              width: 160px;
              text-align: center;
              font-family: Helvetica, sans-serif;
              border: 1px dashed rgba(255, 255, 255, 0);
              color: #fff;
              padding: 10px 0 10px 0;
              margin: -1px -5px -1px -1px;
              cursor: pointer;
              transition: all 0.2s;
              -webkit-transition: all 0.2s;
            }

            nav ul li:hover {
              background: rgba(255, 255, 255, 0.1);
            }

            nav ul {
              border: 1px solid #fff;
              position: absolute;
              width: 100%;
              padding: 0;
              z-index: 100;
            }

            nav div {
              position: absolute;
              left: 0;
              top: 16px;
              background: #fff;
              width: 162px;
              height: 40px;
              z-index: 99;
            }

            .active {
              color: rgba(55, 186, 177, 1);
            }
          `}
        </style>
        <div id="bg"></div>
        <section>
          <nav>
            <div></div>
            <ul>
              <li data-xcoord="0px" className="active" onClick={() => this.handleNavClick("0px")}>
                Home
              </li>
              <li data-xcoord="160px" onClick={() => this.handleShowBook()}>
                Books
              </li>
              <li data-xcoord="320px">
                Authors
              </li>
              <li data-xcoord="480px">
                Login
              </li>
            </ul>
          </nav>
        </section>
      </div>
    );
  }
}

export default MyComponent;

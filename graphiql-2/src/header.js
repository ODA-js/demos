import React from 'react';
import LoginFormInline from './login_form_inline';

const Header = ({data, actions}) => {
  var imgUrl="./charidy-logo.png";
  // <img src={imgUrl} alt="App Logo" className="charidy-logo"/>
  return (
    <div className="header-navbar">
      <div className="header__logo">
        <a href="#" className="navbar-brand">
          <div className="brand-logo">

          </div>
        </a>
      </div>

      <div className="header__wrapper">
        <ul className="nav navbar-nav text-center">
          <li>
            <LoginFormInline
              data={data}
              actions={actions}/>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default Header;
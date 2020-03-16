import React from 'react';

function NotFound() {
  return (
    <div className="errorPage">
      <div className="error">404</div>
      <br /><br />
      <span className="info">Page not found</span>
      <img src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif" className="static" alt="404"/>
      
    </div>
  );
}

export default NotFound;

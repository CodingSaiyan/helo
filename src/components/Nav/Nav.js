import React from 'react';

import {withRouter, Link} from 'react-router-dom';

function Nav(props) {
   if(props.location.pathname === '/'){
       return null
   }

       return (
           <div>
           <nav>
                <Link to='/dashboard'><h2>Home</h2></Link>
                <Link to='/new'><h2>New Post</h2></Link>
                <Link to='/'><h2>Logout</h2></Link>
           </nav>

           </div>
       )

}

export default withRouter(Nav)
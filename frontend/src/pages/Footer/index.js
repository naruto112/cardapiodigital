import React from 'react';

import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function Footer(){


    return(
        <footer className="page-footer font-small gray" style={{ backgroundColor: '#555', zIndex: 1 }}>
            <div className="footer-copyright text-center py-3">© 2020 Desenvolvimento by
                <a href="https://mdbootstrap.com/"> DStudium.com</a>
            </div>
        </footer>
    );
}
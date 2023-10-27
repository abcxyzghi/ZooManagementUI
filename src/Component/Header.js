import React, { useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
function Header() {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#000000',
    color: 'white',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoImageStyle = {
    maxWidth: '100px',
    maxHeight: '50px',
    borderRadius: '10px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#ffffff',
    color: 'black',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const LinkToTicket = {
    color: 'black',
  };

  useEffect(() => {
    // Initialize dropdown
    const elems = document.querySelectorAll('.dropdown-trigger');
    window.M.Dropdown.init(elems, { constrainWidth: false });
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <Link to="/App1">
          <img src='name.png' style={logoImageStyle} alt="Logo" />
        </Link>
      </div>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle}><Link style={LinkToTicket} to="/ticket">Buy Ticket</Link></button>
        <a className="dropdown-trigger" href="#!" data-target="dropdown1" style={buttonStyle}>
          Option<i className="material-icons right">arrow_drop_down</i>
        </a>
        <ul id="dropdown1" className="dropdown-content">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
        <button
          style={buttonStyle}
          onClick={() => {
            navigate('/login');
            dispatch(logout());
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;

import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';

const SidebarExpert = (props) => {
  const { current } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav id="sidebar">
      <div className="p-4">
        <div className="d-flex flex-column align-items-center justify-content-start gap-3">
          <Link to={'/expert'} className={`sidebar-item ${current === 'Dashboard' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link to={'/expert/daily-meal'} className={`sidebar-item ${current === 'Daily' ? 'active' : ''}`}>
            Daily Meal
          </Link>
          <Link to={'/expert/sick-meal'} className={`sidebar-item ${current === 'Sick' ? 'active' : ''}`}>
            Sick Meal
          </Link>
          <a
            className="sidebar-item"
            onClick={() => {
              dispatch(logout());
              navigate('/login');
            }}
          >
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default SidebarExpert;

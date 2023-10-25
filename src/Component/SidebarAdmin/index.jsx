import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';

const SidebarAdmin = (props) => {
  const { current } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav id="sidebar">
      <h2 style={{ textAlign: 'center', color: '#333' }}>Welcome Admin!</h2>
      <div className="p-4">
        <div className="d-flex flex-column align-items-center justify-content-start gap-3">
          <Link to={'/admin'} className={`sidebar-item ${current === 'Dashboard' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link to={'/admin/staff-manager'} className={`sidebar-item ${current === 'Staff' ? 'active' : ''}`}>
            Staff Manager
          </Link>
          <Link to={'/admin/cages'} className={`sidebar-item ${current === 'Cages' ? 'active' : ''}`}>
            Cages
          </Link>
          <Link to={'/admin/expert'} className={`sidebar-item ${current === 'Expert' ? 'active' : ''}`}>
            Expert
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

export default SidebarAdmin;

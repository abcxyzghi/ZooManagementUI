import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IMAGE, ROLE, TOKEN_INFO } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import authApi from '../../api/authApi';
import { setAuth } from '../../slices/authSlice';
import { useToast } from '@chakra-ui/react';

const LoginComponent = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignIn = async () => {
    const params = {
      email: email,
      password: password,
    };
    try {
      const response = await authApi.login(params);
      if (response) {
        localStorage.setItem(TOKEN_INFO.accessToken, response.accessToken);
        localStorage.setItem(TOKEN_INFO.refreshToken, response.refreshToken);
        var decoded = jwtDecode(response.accessToken);
        const role = decoded.authorities[0].authority;
        dispatch(setAuth({ isLogin: true }));
        switch (role) {
          case ROLE.ADMIN: {
            navigate('/admin');
            return;
          }
          case ROLE.STAFF: {
            navigate('/staff');
            return;
          }
          case ROLE.USER: {
            navigate('/');
            return;
          }
          case ROLE.EXPERT: {
            navigate('/expert');
            return;
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        status: 'error',
        position: 'top',
        duration: '5000',
        isClosable: true,
        title: 'Đăng nhập',
        description: 'Đăng nhập không thành công',
      });
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundImage: `url(${IMAGE.news1})`, minHeight: '100vh', minWidth: '100vw' }}
    >
      <div className="container h-100 w-100">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Đăng nhập</div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="username">Tên đăng nhập:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Nhập tên đăng nhập"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mật khẩu:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button onClick={handleSignIn} className="btn btn-primary">
                    Đăng nhập
                  </button>
                  <p>
                    Bạn chưa có tài khoản?
                    <Link style={{ color: '#0d6efd' }} to="/register">
                      {' '}
                      Đăng ký ngay
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

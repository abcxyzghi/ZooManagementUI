import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IMAGE, ROLE, TOKEN_INFO } from '../../constants';
import { useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authApi from '../../api/authApi';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../slices/authSlice';

const RegisterComponent = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const password = watch('password', ''); // Lấy giá trị của trường password

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast({
        status: 'warning',
        position: 'top',
        duration: '5000',
        isClosable: true,
        title: 'Đăng ký',
        description: 'Mật khẩu không khớp',
      });
      return;
    }
    const params = {
      email: data.email,
      password: data.password,
      role: ROLE.USER,
    };
    try {
      const response = await authApi.signUp(params);
      if (response) {
        toast({
          title: 'Đăng ký.',
          description: 'Đăng ký thàng công',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
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
      } else {
        toast({
          title: 'Đăng ký.',
          description: 'Đăng ký không thàng công',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      toast({
        title: 'Đăng ký.',
        description: 'Đăng ký không thàng công',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-header">Đăng ký</div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Nhập địa chỉ email"
                      {...register('email')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Nhập mật khẩu"
                      {...register('password')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password-confirm">Mật khẩu xác nhận:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password-confirm"
                      placeholder="Nhập lại mật khẩu"
                      {...register('confirmPassword')}
                    />
                  </div>
                  <p>{errors.confirmPassword?.message}</p>
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Đăng ký
                    </button>
                    <p>
                      Bạn đã có tài khoản?
                      <Link style={{ color: '#0d6efd' }} to="/login">
                        {' '}
                        Đăng nhập ngay
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import staffApi from '../api/staffApi';
import SidebarAdmin from '../Component/SidebarAdmin';
import moment from 'moment';

const API_URL = 'https://zouzoumanagement.xyz/api/v1/staff';

const StaffManager = () => {
  const [staffData, setStaffData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newStaff, setNewStaff] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    startDay: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'STAFF',
  });
  const getAllStaff = async () => {
    try {
      const res = await staffApi.getAllStaff();
      console.log(res);
      setStaffData(res);
    } catch (error) {}
  };

  useEffect(() => {
    getAllStaff();
  }, []);

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        const updatedStaffData = staffData.filter((staff) => staff.id !== id);
        setStaffData(updatedStaffData);
      })
      .catch((error) => {
        console.error('Lỗi khi xóa nhân viên:', error);
      });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleAddClick = () => {
    setAdding(true);
  };

  const handleAddStaff = () => {
    axios
      .post(API_URL, newStaff)
      .then((response) => {
        setStaffData([...staffData, { ...response.data, role: 'STAFF' }]);
        setAdding(false);
        setNewStaff({
          firstName: '',
          lastName: '',
          sex: '',
          startDay: '',
          email: '',
          phoneNumber: '',
          password: '',
          role: 'STAFF',
        });

        // Tải lại trang sau khi thêm thành công
        window.location.reload();
      })
      .catch((error) => {
        console.error('Lỗi khi thêm nhân viên:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({
      ...newStaff,
      [name]: value,
    });
  };

  const handleSaveClick = (id) => {
    const staffToUpdate = staffData.find((staff) => staff.id === id);

    // Lấy giá trị từ state thay vì trực tiếp từ DOM
    const updatedFirstName = newStaff.firstName;
    const updatedLastName = newStaff.lastName;
    const updatedSex = newStaff.sex;
    const updatedStartDay = newStaff.startDay;
    const updatedPhoneNumber = newStaff.phoneNumber;

    axios
      .put(`${API_URL}/${id}`, {
        firstName: updatedFirstName,
        lastName: updatedLastName,
        gender: updatedSex,
        startDay: moment(updatedStartDay).format('MM/DD/YYYY'),
        phoneNumber: updatedPhoneNumber,
      })
      .then(() => {
        const updatedStaffData = staffData.map((staff) => {
          if (staff.id === id) {
            return {
              ...staff,
              firstName: updatedFirstName,
              lastName: updatedLastName,
              sex: updatedSex,
              startDay: updatedStartDay,
              phoneNumber: updatedPhoneNumber,
            };
          }
          return staff;
        });
        setStaffData(updatedStaffData);
        setEditingId(null);
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật nhân viên:', error);
      });
  };

  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Sex</th>
            <th>Start Day</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff) => (
            <tr key={staff.id}>
              <td>
                {editingId === staff.id ? (
                  <input type="text" name="firstName" value={newStaff.firstName} onChange={handleInputChange} />
                ) : (
                  staff.firstName
                )}
              </td>
              <td>
                {editingId === staff.id ? (
                  <input type="text" name="lastName" value={newStaff.lastName} onChange={handleInputChange} />
                ) : (
                  staff.lastName
                )}
              </td>
              <td>
                {editingId === staff.id ? (
                  <input type="text" name="sex" value={newStaff.sex} onChange={handleInputChange} />
                ) : (
                  staff.sex
                )}
              </td>
              <td>
                {editingId === staff.id ? (
                  <input type="date" name="startDay" value={newStaff.startDay} onChange={handleInputChange} />
                ) : (
                  staff.startDay
                )}
              </td>
              <td>{staff.email}</td>
              <td>
                {editingId === staff.id ? (
                  <input type="text" name="phoneNumber" value={newStaff.phoneNumber} onChange={handleInputChange} />
                ) : (
                  staff.phoneNumber
                )}
              </td>
              <td>
                {editingId === staff.id ? (
                  <div className="d-flex gap-2">
                    <button onClick={() => handleSaveClick(staff.id)}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </div>
                ) : (
                  <div className="d-flex gap-2">
                    <button onClick={() => handleEditClick(staff.id)}>Edit</button>
                    <button onClick={() => handleDeleteClick(staff.id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="wrapper" style={{ height: '100vh' }}>
      <div className="row" style={{ height: '100vh' }}>
        <div className="col-2">
          <SidebarAdmin current={'Staff'} />
        </div>
        <div className=" col-10 d-flex justify-content-center" style={{ padding: '0 32px' }}>
          <div className="col-12">
            <div>
              <h1>Staff Manager</h1>
              {adding ? (
                <div>
                  <button onClick={() => setAdding(false)}>Cancel</button>
                  <button onClick={handleAddStaff}>Add</button>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={newStaff.firstName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={newStaff.lastName}
                    onChange={handleInputChange}
                  />
                  <input type="text" placeholder="Sex" name="sex" value={newStaff.sex} onChange={handleInputChange} />
                  <input
                    type="text"
                    placeholder="Start Day"
                    name="startDay"
                    value={newStaff.startDay}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={newStaff.email}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={newStaff.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={newStaff.password}
                    onChange={handleInputChange}
                  />
                </div>
              ) : (
                <>
                  <button onClick={handleAddClick}>Add</button>
                  {renderTable()}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManager;

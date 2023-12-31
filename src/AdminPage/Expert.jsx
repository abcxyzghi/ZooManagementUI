import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarAdmin from '../Component/SidebarAdmin';

const API_URL = 'https://zouzoumanagement.xyz/api/v1/expert';
const initialNewExpert = {
  firstName: '',
  lastName: '',
  sex: '',
  startDay: '',
  email: '',
  phoneNumber: '',
  areaName: '',
  password: '',
};

const ExpertManager = () => {
  const [expertData, setExpertData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newExpert, setNewExpert] = useState(initialNewExpert);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setExpertData(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi tải :', error);
      });
  }, []);

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        const updatedExpertData = expertData.filter((expert) => expert.id !== id);
        setExpertData(updatedExpertData);
      })
      .catch((error) => {
        console.error('Lỗi khi xóa :', error);
      });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleAddClick = () => {
    setAdding(true);
  };

  const handleAddExpert = () => {
    axios
      .post(API_URL, newExpert)
      .then((response) => {
        setExpertData([...expertData, response.data]);
        setAdding(false);
        setNewExpert(initialNewExpert);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Lỗi khi add:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpert({
      ...newExpert,
      [name]: value,
    });
  };

  const handleSaveClick = (id) => {
    const expertToUpdate = expertData.find((expert) => expert.id === id);

    const updatedFirstName = newExpert.firstName;
    const updatedLastName = newExpert.lastName;
    const updatedSex = newExpert.sex;
    const updatedStartDay = newExpert.startDay;
    const updatedEmail = newExpert.email;
    const updatedPhoneNumber = newExpert.phoneNumber;
    const updatedAreaName = newExpert.areaName;
    const updatedPassword = newExpert.password;

    axios
      .put(`${API_URL}/${id}`, {
        firstName: updatedFirstName,
        lastName: updatedLastName,
        sex: updatedSex,
        startDay: updatedStartDay,
        email: updatedEmail,
        phoneNumber: updatedPhoneNumber,
        areaName: updatedAreaName,
        password: updatedPassword,
      })
      .then(() => {
        const updatedExpertData = expertData.map((expert) => {
          if (expert.id === id) {
            return {
              ...expert,
              firstName: updatedFirstName,
              lastName: updatedLastName,
              sex: updatedSex,
              startDay: updatedStartDay,
              email: updatedEmail,
              phoneNumber: updatedPhoneNumber,
              areaName: updatedAreaName,
              password: updatedPassword,
            };
          }
          return expert;
        });
        setExpertData(updatedExpertData);
        setEditingId(null);
      })
      .catch((error) => {
        console.error('Lỗi khi update:', error);
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
            <th>Area Name</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expertData.map((expert) => (
            <tr key={expert.id}>
              <td>
                {expert.id === editingId ? (
                  <input type="text" name="firstName" value={newExpert.firstName} onChange={handleInputChange} />
                ) : (
                  expert.firstName
                )}
              </td>
              <td>
                {expert.id === editingId ? (
                  <input type="text" name="lastName" value={newExpert.lastName} onChange={handleInputChange} />
                ) : (
                  expert.lastName
                )}
              </td>
              <td>
                {expert.id === editingId ? (
                  <input type="text" name="sex" value={newExpert.sex} onChange={handleInputChange} />
                ) : (
                  expert.sex
                )}
              </td>
              <td>
                {expert.id === editingId ? (
                  <input type="text" name="startDay" value={newExpert.startDay} onChange={handleInputChange} />
                ) : (
                  expert.startDay
                )}
              </td>
              <td>
                {expert.id === editingId ? (
                  <input type="text" name="email" value={newExpert.email} onChange={handleInputChange} />
                ) : (
                  expert.email
                )}
              </td>
              <td>
                {expert.id === editingId ? (
                  <input type="text" name="phoneNumber" value={newExpert.phoneNumber} onChange={handleInputChange} />
                ) : (
                  expert.phoneNumber
                )}
              </td>
              <td>
                {expert.id === editingId ? (
                  <input type="text" name="areaName" value={newExpert.areaName} onChange={handleInputChange} />
                ) : (
                  expert.areaName
                )}
              </td>
              <td>
                {expert.id === editingId ? (
                  <input type="text" name="password" value={newExpert.password} onChange={handleInputChange} />
                ) : (
                  expert.password
                )}
              </td>
              <td>
                {expert.id === editingId ? (
                  <>
                    <button onClick={() => handleSaveClick(expert.id)}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(expert.id)}>Edit</button>
                    <button onClick={() => handleDeleteClick(expert.id)}>Delete</button>
                  </>
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
          <SidebarAdmin current={'Expert'} />
        </div>
        <div className=" col-10 d-flex justify-content-center" style={{ padding: '0 32px' }}>
          <div className="col-12">
            <div>
              <h1>Expert Manager</h1>
              {adding ? (
                <div>
                  <button onClick={() => setAdding(false)}>Cancel</button>
                  <button onClick={handleAddExpert}>Add</button>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={newExpert.firstName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={newExpert.lastName}
                    onChange={handleInputChange}
                  />
                  <input type="text" placeholder="Sex" name="sex" value={newExpert.sex} onChange={handleInputChange} />
                  <input
                    type="text"
                    placeholder="Start Day"
                    name="startDay"
                    value={newExpert.startDay}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={newExpert.email}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={newExpert.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Area Name"
                    name="areaName"
                    value={newExpert.areaName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={newExpert.password}
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

export default ExpertManager;

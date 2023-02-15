import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
//Bootstrap and jQuery libraries
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login";
//Adding antd modules and style
import { Button, Modal, Form, Input, Select } from "antd";
const { Option } = Select;

function Register({ spanText }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [role, setRole] = useState("Viewer");
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //popup and form code
  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const handleChange = (value) => {
      console.log(`selected ${value}`);
      setRole(value);
      console.log(role);
    };
    return (
      <Modal
        className="modalStyle"
        open={open}
        title="Sign Up"
        okText="Sign Up"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              //form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        {!submit && (
          <Form
            form={form}
            layout="horizental"
            name="form_in_modal"
            initialValues={{
              modifier: "public",
            }}
          >
            <Form.Item label="Role">
              <Select
                defaultValue={role}
                style={{ width: 200 }}
                name="Role"
                noStyle
                rules={[{ required: true, message: "Role is required" }]}
                onChange={handleChange}
                options={[
                  {
                    label: "Viewer",
                    value: "Viewer",
                  },
                  {
                    label: "Filmmaker",
                    value: "FILM_MAKER",
                  },
                  {
                    label: "Sales Agent",
                    value: "Sales_Agent",
                  },
                  {
                    label: "Distributor",
                    value: "Distributor",
                  },
                  {
                    label: "Film Festival",
                    value: "Film_Festival",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name!",
                },
                {
                  min: 3,
                  message: "First Name must be at least 3 characters long!",
                },
                {
                  max: 30,
                  message: "First Name must be at most 30 characters long!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name!",
                },
                {
                  min: 3,
                  message: "Last Name must be at least 3 characters long!",
                },
                {
                  max: 30,
                  message: "Last Name must be at most 30 characters long!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
                },
                {
                  max: 40,
                  message: "First Name must be at most 40 characters long!",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>

            {role !== "Viewer" && (
              <>
                <Form.Item name="phone" label="Phone Number">
                  <Input />
                </Form.Item>
                <Form.Item name="website" label="Your Website">
                  <Input />
                </Form.Item>
              </>
            )}
          </Form>
        )}
        {error && <div className="error_text">{error}</div>}
        {success && <div className="success_text">{success}</div>}
      </Modal>
    );
  };
  const CollectionsPage = () => {
    const onCreate = (values) => {
      console.log("Received values of form: ", values);
      console.log(role);
      handleSubmit(values);
      //setOpen(false);
    };
    const handleSubmit = async (values) => {
      console.log(
        values.username,
        values.email,
        values.password,
        values.firstName,
        values.lastName,
        values.phone,
        values.website,
        role
      );
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/register`,
          {
            email: values.email,
            username: values.username,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            website: values.website,
            role: role,
          }
        );
        setError("");
        setSuccess(data.message);
        const { message, ...rest } = data;
        setTimeout(() => {
          setSubmit(true);
          callLogin();
          setOpen(false);
        }, 5000);
      } catch (error) {
        console.log(error.response.data.message);
        setSuccess("");
        setError(error.response.data.message);
      }
    };
    const callLogin = () => {
      console.log("calling login");
      return <Login />;
    };
    return (
      <div>
        <span
          onClick={() => {
            setOpen(true);
          }}
        >
          {spanText ? spanText : "SIGN UP"}
        </span>

        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </div>
    );
  };
  return <CollectionsPage />;
}

export default Register;

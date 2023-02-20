import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
//Bootstrap and jQuery libraries
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Adding antd modules and style
import { Modal, Form, Input } from "antd";

function Login({spanText}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //popup and form code
  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="Login"
        okText="Login"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter email!",
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
            ]}
            cla
          >
            <Input type="password" />
          </Form.Item>
        </Form>
        {error && <div className="error_text">{error}</div>}
        {success && <div className="success_text">{success}</div>}
      </Modal>
    );
  };

  const CollectionsPage = () => {
    const onCreate = (values) => {
      console.log("Received values of form: ", values);
      handleSubmit(values);
      setOpen(false);
    };
    const handleSubmit = async (values) => {
      /*     console.log(email, password); */
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
          email: values.email,
          password: values.password,
        });
        setError("");
        setSuccess(data.message);
        const { message, ...rest } = data;
        dispatch({ type: "LOGIN", payload: data });
        Cookies.set("user", JSON.stringify(data));
        console.log(data);
        if (data.role === "FILM_MAKER") {
          navigate("/filmMakerDashboard");
        }
      } catch (error) {
        setSuccess("");
        setError(error.response.data.message);
      }
    };

    return (
      <div>
        <span
          onClick={() => {
            setOpen(true);
          }}
        >
          {spanText ? spanText : "SIGN IN"}
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

export default Login;

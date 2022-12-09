import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
//Bootstrap and jQuery libraries
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Adding antd modules and style
import { Button, Modal, Form, Input } from "antd";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //popup and form code
  const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
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
            name="username"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please enter username!",
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
          >
            <Input type="password" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const CollectionsPage = () => {
    const [visible, setVisible] = useState(false); //

    const onCreate = (values) => {
      console.log("Received values of form: ", values);
      handleSubmit(values);
      setVisible(false);
    };
    const handleSubmit = async (values) => {
      /*     console.log(email, password); */
      try {
        const { data } = await axios.post("http://localhost:8000/users/login", {
          email: values.username,
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
            setVisible(true);
          }}
        >
          Login
        </span>
        <CollectionCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>
    );
  };
  return <CollectionsPage />;
}

export default Login;

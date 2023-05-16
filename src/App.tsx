import { Form, Input, Button } from 'antd';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (values: { username: string; password: string; }) => {
    try {
      const { username, password } = values;

      const formData = new URLSearchParams();
      formData.append('csrf', 'Mdfi9LCoeCL01x7pqpKjHizcWY9TwgLL');
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post(
        'https://0a2c00c5044c70e68156b76e00740003.web-security-academy.net/login',
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'session=WcYNkoQLp84LgwWWLBugBliSxF77ho9F',
            'Cache-Control': 'max-age=0',
            'Sec-Ch-Ua': '"Chromium";v="113", "Not-A.Brand";v="24"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Accept-Language': 'es-419,es;q=0.9'
          },
        }
      );

      if (response.data.includes('Congratulations')) {
        setAlertType('success');
        setAlertMessage('La inyección de SQL fue exitosa');
      } else {
        setAlertType('error');
        setAlertMessage('La inyección de SQL falló');
      }
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Error al enviar la solicitud');
    }
  };

  return (
    <div className="App">
      <div className="App-content">
        <div className="login-container">
          <div className="login-box">
            <h1>Iniciar Sesión</h1>
            <Form onFinish={handleSubmit}>
              <Form.Item
                label="Usuario"
                name="username"
                rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Contraseña"
                name="password"
                rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Iniciar sesión</Button>
              </Form.Item>
            </Form>
            {alertType && (
              <div className={`alert ${alertType}`}>
                <p>{alertMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



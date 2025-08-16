import './Main.css';
import logo from './../assets/aws-logo.svg';
import { useState } from 'react';

export const Main = () => {
  const awsAPIGatewayUrl = import.meta.env.VITE_AWS_API_GATEWAY_URL;
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const callAPIGateway = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && prompt && awsAPIGatewayUrl) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('prompt', prompt);

      fetch(awsAPIGatewayUrl, {
        method: 'POST',
        body: formData,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <form onSubmit={callAPIGateway} className="mx-auto" style={{ maxWidth: '700px' }}>
          {/* Logo centered */}
          <div className="text-center mb-4">
            <img src={logo} alt="AWS Logo" className="img-fluid" style={{ maxWidth: '200px' }} />
          </div>

          {/* Text Input - full width */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control animated-input"
              placeholder="Enter text"
              value={prompt}
              required
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* File Upload + Submit, responsive with grid */}
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-8">
              <input
                type="file"
                className="form-control animated-input"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="col-12 col-md-4 d-grid">
              <button type="submit" className="btn btn-primary">
                AWS IDF
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

.animated-input {
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 0.5rem;
  background-image: linear-gradient(#fff, #fff), linear-gradient(90deg, #ff6ec4, #7873f5, #4ade80);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: all 0.3s ease;
}

.animated-input:focus {
  background-image: linear-gradient(#fff, #fff), linear-gradient(90deg, #ff6ec4, #7873f5, #4ade80);
  animation: borderAnim 2s linear infinite;
  outline: none;
}

@keyframes borderAnim {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}


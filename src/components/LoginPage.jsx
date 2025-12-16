import React, { useState } from 'react';
import './LoginPage.css';

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C10.794 13.56 8.243 14 8 14s-2.794-.44-4.507-2.146C2.56 10.118 2.065 9.479 1.73 9.006z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
    </svg>
);
const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
        <path d="M13.359 11.238l-7.552-7.552A1.4 1.4 0 0 0 5 3.5C2.176 3.5 0 8 0 8s3 5.5 8 5.5a7.012 7.012 0 0 0 3.659-.974l1.968 1.968c.28.28.72.3.978.042.257-.258.237-.698-.041-.978l-1.967-1.968zM8 12.5c-2.906 0-5.36-1.554-6.86-3.8l.254-.367a1.4 1.4 0 0 1 1.637-.63l1.821 1.821a.5.5 0 0 0 .61-.61L4.8 6.643A7.01 7.01 0 0 0 8 3.5c2.906 0 5.36 1.554 6.86 3.8l-.254.367a1.4 1.4 0 0 1-1.637.63l-1.821-1.821a.5.5 0 0 0-.61.61l1.602 1.602a7.012 7.012 0 0 0-3.659.974z"/>
    </svg>
);


const LoginPage = ({ onLoginSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const username = e.target.username.value;
        const password = e.target.password.value;
        
        try {
        
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username, 
                    password: password, 
                    expiresInMins: 30, 
                }),
               
            });

            if (!response.ok) {
                
                const errorData = await response.json(); 
                throw new Error(errorData.message || 'Login failed. Please check your credentials.');
            }

            const data = await response.json();
           
            console.log('Login Successful:', data);
            
           
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('username', data.username); 

           
            onLoginSuccess(data.token);

        } catch (err) {
            console.error('Login Error:', err.message);
            setError(err.message);

        } finally {
            setIsLoading(false);
        }
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className="login-background">
            <div className="login-card">
                <h2>Login Your Account</h2>
                {error && <div className="error-message">{error}</div>} 
                <form onSubmit={handleSubmit}>
                    
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" id="username" name="username" placeholder="Enter your name"defaultValue="emilys"required disabled={isLoading}/>
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-container">
                            <input type={showPassword ? "text" : "password"}  id="password" name="password" placeholder="Enter password" defaultValue="emilyspass"required  disabled={isLoading} />
                            
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                                title={showPassword ? "Hide password" : "Show password"}
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="submit-btn" 
                        disabled={isLoading} 
                    >
                        {isLoading ? 'Logging In...' : 'Submit'}
                    </button>
                </form>
                <p className="note-text">
                    **Test Credentials -
                    **Username: `emilys`** and **Password: `emilyspass`**
                </p>
            </div>
        </div>
    );
}; 

export default LoginPage; 


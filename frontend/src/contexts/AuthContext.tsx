import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface User {
  name : String;
  id: number;
  email: string;
  role: 'ROLE_CANDIDATE' | 'ROLE_EMPLOYER';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });

      const { token: authToken, role, id, name } = response.data;
      
      const userData = {name, id, email, role };
      
      setToken(authToken);
      setUser(userData);
      
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast.success('Login successful!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      await axios.post('http://localhost:8080/auth/register', {
        name,
        email,
        password,
        role,
      });

      toast.success('Registration successful! Please login.');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

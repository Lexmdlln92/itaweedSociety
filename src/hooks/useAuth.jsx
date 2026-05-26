// src/hooks/useAuth.js
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const tryRefreshToken = useCallback(async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (!refreshTokenValue) return false;

      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshTokenValue })
      });

      if (!res.ok) return false;

      const data = await res.json();
      const tokens = data?.data?.tokens || data?.tokens;
      if (tokens?.accessToken) {
        localStorage.setItem('accessToken', tokens.accessToken);
        if (tokens.refreshToken) localStorage.setItem('refreshToken', tokens.refreshToken);
        return true;
      }
      return false;
    } catch (err) {
      console.error('tryRefreshToken error', err);
      return false;
    }
  }, []);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      let token = localStorage.getItem('accessToken');
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return null;
      }

      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        const u = data?.data?.user || data?.user || null;
        setUser(u);
        setIsAuthenticated(!!u);
        if (u) localStorage.setItem('user', JSON.stringify(u));
        setIsLoading(false);
        return u;
      }

      // intentar refresh si 401 o 403
      if (res.status === 401 || res.status === 403) {
        const refreshed = await tryRefreshToken();
        if (refreshed) {
          const token2 = localStorage.getItem('accessToken');
          const res2 = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token2}` }
          });
          if (res2.ok) {
            const data2 = await res2.json();
            const u2 = data2?.data?.user || data2?.user || null;
            setUser(u2);
            setIsAuthenticated(!!u2);
            if (u2) localStorage.setItem('user', JSON.stringify(u2));
            setIsLoading(false);
            return u2;
          }
        }
        // limpiar si sigue fallando
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return null;
      }

      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return null;
    } catch (err) {
      console.error('fetchUser error', err);
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return null;
    }
  }, [tryRefreshToken]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await fetchUser();
    })();
    return () => { mounted = false; };
  }, [fetchUser]);

  const login = useCallback((userData, tokens) => {
    if (tokens?.accessToken) localStorage.setItem('accessToken', tokens.accessToken);
    if (tokens?.refreshToken) localStorage.setItem('refreshToken', tokens.refreshToken);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (refreshTokenValue) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({ refreshToken: refreshTokenValue })
        });
      }
    } catch (err) {
      console.error('logout error', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  /**
   * updateProfile - patch /auth/me
   * changes: object { name?, phone? }
   * devuelve { ok: true, user } o { ok: false, error }
   */
  const updateProfile = useCallback(async (changes = {}) => {
    try {
      let token = localStorage.getItem('accessToken');
      if (!token) {
        const refreshed = await tryRefreshToken();
        if (!refreshed) throw new Error('No autorizado: inicia sesión.');
        token = localStorage.getItem('accessToken');
      }

      const url = `${API_BASE_URL}/auth/me`;

      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(changes)
      });

      if (res.status === 401 || res.status === 403) {
        const refreshed = await tryRefreshToken();
        if (!refreshed) {
          return { ok: false, error: `No autorizado (${res.status}).` };
        }
        const newToken = localStorage.getItem('accessToken');
        const retry = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newToken}`
          },
          body: JSON.stringify(changes)
        });
        if (!retry.ok) {
          let msg = `Error ${retry.status}`;
          try {
            const j = await retry.json();
            msg = j.message || j.error || msg;
          } catch {
            // ignore non-JSON error payload
          }
          return { ok: false, error: msg };
        }
        const dataRetry = await retry.json();
        const updatedUser = dataRetry?.data?.user || dataRetry?.user || null;
        if (updatedUser) {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          setIsAuthenticated(true);
          return { ok: true, user: updatedUser };
        }
        const optimistic = { ...(user || {}), ...changes };
        localStorage.setItem('user', JSON.stringify(optimistic));
        setUser(optimistic);
        setIsAuthenticated(true);
        return { ok: true, user: optimistic };
      }

      if (!res.ok) {
        let msg = `Error ${res.status}`;
        try {
          const j = await res.json();
          msg = j.message || j.error || msg;
        } catch {
          // ignore non-JSON error payload
        }
        return { ok: false, error: msg };
      }

      const data = await res.json();
      const updatedUser = data?.data?.user || data?.user || null;

      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsAuthenticated(true);
        return { ok: true, user: updatedUser };
      }

      // fallback optimista
      const optimistic = { ...(user || {}), ...changes };
      localStorage.setItem('user', JSON.stringify(optimistic));
      setUser(optimistic);
      setIsAuthenticated(true);
      return { ok: true, user: optimistic };
    } catch (err) {
      console.error('updateProfile error', err);
      return { ok: false, error: err.message || 'Error actualizando perfil' };
    }
  }, [tryRefreshToken, user]);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refetch: fetchUser,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

"use client";

import {
  clearToken,
  getSession,
  getUserGameProgress,
} from "@/utils/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface User {
  user_data: UserData | null;
  game_data: GamificationData;
}

interface AuthState {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  setUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: {
      user_data: null,
      game_data: {
        phase: 1,
        level: 0,
        totalScore: 0,
        hasAnswer: true,
      },
    },
    isAuthenticated: false,
    isLoading: true,
  });

  const logout = async () => {
    await clearToken();

    setState({
      user: {
        user_data: null,
        game_data: {
          phase: 0,
          level: 0,
          totalScore: 0,
          hasAnswer: true,
        },
      },
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const setUser = (user: User) => {
    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      isLoading: false,
      user,
    }));
  };

  const {} = useQuery({
    queryKey: ["fetch-user", getCookie("streple_auth_token")],
    enabled: !!getCookie("streple_auth_token"),
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const token = getCookie("streple_auth_token");
      if (!token) return null;
      try {
        const [user, game] = await Promise.all([
          getSession(),
          getUserGameProgress(),
        ]);

        if (user && game)
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isAuthenticated: true,
            user: {
              user_data: user.user_data,
              game_data: {
                phase: Number(game.game_data?.phase.split(" ")[1]) || 1,
                level: Number(game.game_data?.level.split(" ")[1]) || 0,
                totalScore: game.game_data?.totalScore || 0,
                hasAnswer: game.game_data?.hasAnswer || false,
              },
            },
          }));
        else setState((prev) => ({ ...prev, isLoading: false }));

        return null;
      } catch (error) {
        console.error("Auth initialization error:", error);
        await logout();
        return null;
      }
    },
  });

  return (
    <AuthContext.Provider value={{ ...state, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext };

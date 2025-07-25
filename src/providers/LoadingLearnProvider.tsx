import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface LoadingLearnContextType {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingLearnContext = createContext<LoadingLearnContextType | undefined>(
  undefined
);

export const LoadingLearnProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = useCallback(() => setLoading(true), []);
  const hideLoading = useCallback(() => setLoading(false), []);

  return (
    <LoadingLearnContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
    </LoadingLearnContext.Provider>
  );
};

export const useLoadingLearn = () => {
  const context = useContext(LoadingLearnContext);
  if (context === undefined) {
    throw new Error(
      "useLoadingLearn must be used within a LoadingLearnProvider"
    );
  }
  return context;
};

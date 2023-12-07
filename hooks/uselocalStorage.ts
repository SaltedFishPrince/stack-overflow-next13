import React from 'react';

/**
 * 使用本地存储的自定义 Hook
 * @param {string} key - 存储在本地存储中的键名
 * @param {T} [defaultValue] - 可选的默认值
 * @returns {readonly [T | null, (value: T) => void]} - 返回一个只读元组，包含状态和更新状态的函数
 */
export function useLocalStorage<T = any>(key: string): readonly [T | null, (value: T) => void];
export function useLocalStorage<T = any>(key: string, defaultValue: T):readonly [T, (value: T) => void];
export function useLocalStorage<T = any> (key: string, defaultValue?: T):readonly [T | null, (value: T) => void] {
  const [state, setState] = React.useState<T | null>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue)[key] : defaultValue || null;
  });

  const setValue = React.useCallback((value: T) => {
    setState(value);
  }, []);

  React.useEffect(() => {
    if (state === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify({ [key]: state }));
    }
  }, [key, state]);
  const value = React.useMemo(() => [state, setValue] as const, [setValue, state]);
  return value;
}

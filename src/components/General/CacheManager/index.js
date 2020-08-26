const checkType = type => type === 'session' ? sessionStorage : localStorage;

export const getCache = (type = 'session') => {
  const state = {};
  const store = checkType(type);
  Object.keys(store).forEach((key) => {
    const value = store.getItem(key)
    state[key] = (value && (value.includes('[') || value.includes('{')))
      ? JSON.parse(value)
      : value;
  })
  return state;
}

export const addToCache = (key, value, type = 'session') => {
  const store = checkType(type);
  store.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value);
}

export const removeFromCache = (key, type = 'session') => {
  const store = checkType(type);
  store.removeItem(key);
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const customFetch = async (endpoint, options = {}) => {
  /*
  // OLD AUTH IMPLEMENTATION:
  // We used to manually attach the JWT from localStorage to the Authorization header.
  // Replaced with 'credentials: include' to automatically send the HttpOnly cookie.
  */
  options.credentials = 'include';
  
  if (!options.headers) {
    options.headers = {};
  }
  
  const fullUrl = API_URL + endpoint;
  const response = await fetch(fullUrl, options);
  
  // Automatically handle unauthorized (logout user)
  if (response.status === 401 && typeof window !== 'undefined' && !window.location.href.includes('login')) {
    /*
    // OLD AUTH IMPLEMENTATION:
    // localStorage.removeItem('token');
    // We no longer rely on localStorage for token management.
    */
    window.location.href = '/login';
  }
  
  return response;
};

// Authentication
export const loginUser = (data) => customFetch('/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

export const registerUser = (data) => customFetch('/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

export const getMe = () => customFetch('/auth/me');

export const logoutUser = () => customFetch('/auth/logout', {
  method: 'POST'
});

// Financial Plan
export const getFinancialPlanModels = () => customFetch('/financialPlan/models');

export const getCityEstimates = (city) => customFetch(`/cityEstimates?city=${city}`);

export const getFinancialRecommendations = (data) => customFetch('/financialPlan/recommendations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

export const getActivePlan = () => customFetch('/financialPlan');

export const createFinancialPlan = (data) => customFetch('/financialPlan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

export const updateFinancialPlan = (id, data) => customFetch(`/financialPlan/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

// Expenses
/*
Previous implementation:
export const getExpenses = (sortOrder, categoryFilter) => {
  let endpoint = `/expenses?sort=${sortOrder}`;
  if (categoryFilter && categoryFilter !== 'All') {
    endpoint += `&category=${categoryFilter}`;
  }
  return customFetch(endpoint);
};

Changed because: Phase 5 correction to support all missing query params.
*/
export const getExpenses = ({ sort, category, paymentMethod, startDate, endDate, search }) => {
  const params = new URLSearchParams();
  if (sort) params.append('sort', sort);
  if (category && category !== 'All') params.append('category', category);
  if (paymentMethod && paymentMethod !== 'All') params.append('paymentMethod', paymentMethod);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  if (search) params.append('search', search);

  const endpoint = `/expenses${params.toString() ? '?' + params.toString() : ''}`;
  return customFetch(endpoint);
};

export const createExpense = (data) => customFetch('/expenses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

export const updateExpense = (id, data) => customFetch(`/expenses/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

export const deleteExpense = (id) => customFetch(`/expenses/${id}`, {
  method: 'DELETE'
});

// Reports
export const getExpenseReports = ({ startDate, endDate } = {}) => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const endpoint = `/reports/expenses${params.toString() ? '?' + params.toString() : ''}`;
  return customFetch(endpoint);
};

// Goals
export const getGoals = () => customFetch("/goals");

export const getGoalById = (id) => customFetch(`/goals/${id}`);

export const createGoal = (data) => customFetch("/goals", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

export const updateGoal = (id, data) => customFetch(`/goals/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

export const deleteGoal = (id) => customFetch(`/goals/${id}`, {
  method: "DELETE",
});

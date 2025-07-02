// Fetch user info from /api/auth/user/info
export const fetchUserInfo = async () => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const token = jwt?.token || jwt?.Token;
    if (!token) return null;
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/user/info`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const userData = await res.json();
    return userData;
  } catch (err) {
    return null;
  }
};

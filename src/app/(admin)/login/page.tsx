"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/redux/auth.slice";
import { fetchInfo } from "@/redux/info.slice";
const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const checkInfo = async () => {
    const res = await dispatch(fetchInfo() as any);
    // Nếu không có lỗi (không bị 401) thì chuyển vào /admin
    if (!res.error) {
      router.replace("/admin");
    }
  };
  useEffect(() => {
    // Check if already logged in (by token)

    checkInfo();
  }, [router]);

  const handleSubmit = async () => {
    if (username && password) {
      const response = await dispatch(login({ username, passwordHash: password }) as any)
      if (!response.payload) {
        setError("Invalid username or password");
      } else {
        checkInfo()
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            required
          />
        </div>
        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold disabled:opacity-50 cursor-pointer"
          onClick={handleSubmit}
        >
          {"Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const = useState<any>(null);
  const = useState("");
  const = useState("");
  const = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else window.location.reload();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      {/* ہوم ہیڈر */}
      <header className="text-center mb-12">
        <h1 className="text-6xl font-extrabold tracking-tight">Your Name</h1>
        <p className="text-xl mt-4 opacity-80">Web Developer • Next.js • AI Tools</p>
      </header>

      {/* لاگ ان فارم (اگر لاگ ان نہ ہو) */}
      {!user ? (
        <Card className="max-w-md mx-auto bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Login to Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600"
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-gray-600"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button onClick={handleLogin} className="w-full bg-purple-600 hover:bg-purple-700">
              Login
            </Button>
          </CardContent>
        </Card>
      ) : (
        // یوزر/ایڈمن پینل (لاگ ان کے بعد)
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Welcome, {user.email}</h2>
            <Button onClick={handleLogout} variant="outline" className="mt-4 border-purple-500 text-purple-400">
              Logout
            </Button>
          </div>

          {/* پروجیکٹس سیکشن */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>My Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="p-4 bg-gray-700 rounded-lg">E-commerce Site - Next.js + Stripe</li>
                <li className="p-4 bg-gray-700 rounded-lg">AI Chatbot - Vercel + Supabase</li>
                {/* یہاں تم اپنے پروجیکٹس ایڈ کر سکتے ہو */}
              </ul>
            </CardContent>
          </Card>

          {/* کنٹیکٹ */}
          <div className="text-center">
            <p className="text-lg">Hire me: <a href="https://wa.me/923xxxxxxxxx" className="text-purple-400 underline">WhatsApp</a></p>
          </div>
        </div>
      )}
    </div>
  );
}

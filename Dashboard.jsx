import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import ExpenseChart from "../components/charts/ExpenseChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import BudgetProgress from "../components/dashboard/BudgetProgress";
import AIInsights from "../components/dashboard/AIInsights";
import AITips from "../components/dashboard/AITips";

import { getLoggedInUser } from "../services/authService";
import { getDashboardData } from "../services/dashboardService";

function Dashboard() {
  const [user, setUser] = useState(null);

  const [dashboard, setDashboard] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    budget: 0,

  });

  // ===============================
  // LOAD USER
  // ===============================
  useEffect(() => {
    const loggedInUser = getLoggedInUser();

    console.log("Logged-in user:", loggedInUser);

    setUser(loggedInUser);
  }, []);

  // ===============================
  // LOAD DASHBOARD
  // ===============================
  useEffect(() => {
    if (!user?.id) {
      return;
    }

    loadDashboard(user.id);
  }, [user]);

  const loadDashboard = async (userId) => {
    try {
      console.log("Loading dashboard for user ID:", userId);

      const data = await getDashboardData(userId);

      console.log("Dashboard Data:", data);

      setDashboard(data);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">
        Welcome Back, {user?.fullName || "User"} 👋
      </h1>

      {/* ===============================
          SUMMARY CARDS
      =============================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <SummaryCard
          title="Income"
          amount={dashboard.totalIncome}
          color="text-green-600"
        />

        <SummaryCard
          title="Expenses"
          amount={dashboard.totalExpense}
          color="text-red-500"
        />

        <SummaryCard
          title="Balance"
          amount={dashboard.balance}
          color="text-blue-600"
        />

        <SummaryCard
          title="Budget"
          amount={dashboard.budget}
          color="text-purple-600"
        />

      </div>

      {/* ===============================
          EXPENSE CHART
      =============================== */}

      <ExpenseChart />

      {/* ===============================
          RECENT TRANSACTIONS
      =============================== */}

      <RecentTransactions />

      {/* ===============================
          MONTHLY BUDGET
      =============================== */}

      <BudgetProgress />

      {/* ===============================
          AI TIPS
      =============================== */}
      <AIInsights />


      <AITips />

    </MainLayout>
  );
}

export default Dashboard;
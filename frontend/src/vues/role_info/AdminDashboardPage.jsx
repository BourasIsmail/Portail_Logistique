import React, { useEffect, useState, PureComponent } from "react";
import api from "@/utils/api";
import { TrendingUp, Clock, CheckCircle, Package } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dashboard from "@/components/role_info/Dashboard";
import TicketStatus from "@/components/TicketStatus";

import Chart from "@/components/role_info/Chart";
import { useNavigate } from "react-router-dom";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  useEffect(() => {
    return navigate("/md/demandes", { replace: true });
  }, []);

  return null;
}

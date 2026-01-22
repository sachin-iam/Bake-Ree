import { create } from "zustand";

export type HrPermission = string;

export type HrRole = {
  id: string;
  name: string;
  permissions: HrPermission[];
  status: "ACTIVE" | "INACTIVE";
};

export type HrEmployee = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  roleId?: string;
  department?: string;
  store?: string;
  status: "ACTIVE" | "ONBOARDING" | "INACTIVE" | "TERMINATED";
  salaryType: "MONTHLY" | "HOURLY";
  basePay: number;
};

export type HrAttendance = {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: "ON_TIME" | "LATE" | "ABSENT" | "OVERTIME";
};

export type HrShift = {
  id: string;
  employeeId: string;
  start: string;
  end: string;
  role: string;
};

export type HrLeaveRequest = {
  id: string;
  employeeId: string;
  type: "SICK" | "CASUAL" | "PAID" | "UNPAID";
  startDate: string;
  endDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export type HrPayrollRun = {
  id: string;
  periodStart: string;
  periodEnd: string;
  status: "DRAFT" | "APPROVED" | "LOCKED";
  totalEmployees: number;
  grossTotal: number;
};

export type HrPayslip = {
  id: string;
  employeeId: string;
  payrollRunId: string;
  netPay: number;
  status: "DRAFT" | "SENT" | "ACKNOWLEDGED";
};

export type HrPerformanceReview = {
  id: string;
  employeeId: string;
  cycle: string;
  rating: number;
  status: "DRAFT" | "SUBMITTED" | "COMPLETED";
};

export type HrApproval = {
  id: string;
  entityType: string;
  entityId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export type HrDocument = {
  id: string;
  employeeId: string;
  type: string;
  status: "ACTIVE" | "EXPIRED";
};

type HrStore = {
  employees: HrEmployee[];
  roles: HrRole[];
  attendance: HrAttendance[];
  shifts: HrShift[];
  leaveRequests: HrLeaveRequest[];
  payrollRuns: HrPayrollRun[];
  payslips: HrPayslip[];
  performanceReviews: HrPerformanceReview[];
  approvals: HrApproval[];
  documents: HrDocument[];
  filters: {
    search: string;
    status: string;
  };
  setFilter: (key: keyof HrStore["filters"], value: string) => void;
};

export const useHrStore = create<HrStore>((set) => ({
  employees: [
    {
      id: "emp-1",
      name: "Ava Singh",
      email: "ava@bakeree.com",
      roleId: "role-2",
      department: "Kitchen",
      store: "Central",
      status: "ACTIVE",
      salaryType: "MONTHLY",
      basePay: 42000,
    },
  ],
  roles: [
    { id: "role-1", name: "Manager", permissions: ["hr.read", "hr.approve"], status: "ACTIVE" },
    { id: "role-2", name: "Kitchen Lead", permissions: ["hr.attendance.read"], status: "ACTIVE" },
  ],
  attendance: [],
  shifts: [],
  leaveRequests: [],
  payrollRuns: [],
  payslips: [],
  performanceReviews: [],
  approvals: [],
  documents: [],
  filters: {
    search: "",
    status: "All",
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),
}));

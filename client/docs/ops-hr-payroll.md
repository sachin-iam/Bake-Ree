# Ops HR & Payroll Module

## A) Sidebar + Routing Diagram
```text
/ops
 ├─ orders
 ├─ production
 ├─ inventory
 ├─ procurement
 ├─ logistics
 ├─ crm
 ├─ loyalty
 ├─ finance
 ├─ hr  ✅
 │   ├─ employees
 │   ├─ roles
 │   ├─ attendance
 │   ├─ shifts
 │   ├─ leave
 │   ├─ payroll
 │   ├─ payslips
 │   ├─ performance
 │   ├─ documents
 │   ├─ approvals
 │   └─ reports
 └─ analytics
```

## B) HR “Hire-to-Pay” Flow
```text
Employee Created
  ↓
Assign Role + Store + Salary
  ↓
Assign Shifts / Roster
  ↓
Attendance Tracking (Daily)
  ↓
Leave Requests (Optional)
  ↓
Payroll Run (Period)
  ↓
Review + Approve
  ↓
Payslip Generated
  ↓
Reports / Audit
```

## C) Leave Approval Flow
```text
Employee applies leave
  ↓
Manager/HR approves or rejects
  ↓
Update leave balance
  ↓
Reflect in payroll (unpaid/paid)
  ↓
Notification to employee
```

## D) Payroll Calculation (Simplified)
```text
Gross = Base + Allowances + Overtime
Net   = Gross - Deductions - Advances - Unpaid Leave
```

## Backend Architecture (Express + Mongoose)

### Models
- Employee
- Role
- Attendance
- Shift
- LeaveRequest
- PayrollRun
- Payslip
- PerformanceReview
- Approval
- Document

### Relationships
- Employee references Role and Documents.
- Attendance references Employee + date.
- Shift references Employee + date range.
- LeaveRequest references Employee + approver.
- PayrollRun references included Employees + period.
- Payslip references Employee + PayrollRun.
- Approval is polymorphic via `entityType` + `entityId`.

### Core API Endpoints
- `GET/POST /api/hr/employees`
- `GET/PATCH /api/hr/employees/:id`
- `GET/POST /api/hr/roles`
- `GET/PATCH /api/hr/roles/:id`
- `GET/POST /api/hr/attendance`
- `GET/PATCH /api/hr/attendance/:id`
- `GET/POST /api/hr/shifts`
- `GET/PATCH /api/hr/shifts/:id`
- `GET/POST /api/hr/leaves`
- `POST /api/hr/leaves/:id/approve`
- `POST /api/hr/leaves/:id/reject`
- `GET/POST /api/hr/payroll`
- `POST /api/hr/payroll/:id/approve`
- `POST /api/hr/payroll/:id/lock`
- `GET/POST /api/hr/payslips`
- `GET/POST /api/hr/performance`
- `GET/POST /api/hr/approvals`
- `GET/POST /api/hr/documents`

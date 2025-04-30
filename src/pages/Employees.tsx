import React from "react";

const employees = [
  {
    id: 1,
    name: "Ali Valiyev",
    position: "Sotuvchi",
    status: "Faol",
    salary: "3 500 000 UZS",
    salaryStatus: "Berilgan",
    phone: "+998 90 123 45 67",
  },
  {
    id: 2,
    name: "Dilnoza Karimova",
    position: "Kassir",
    status: "Faol emas",
    salary: "2 800 000 UZS",
    salaryStatus: "Berilmagan",
    phone: "+998 91 234 56 78",
  },
  {
    id: 3,
    name: "Sherzod Abdurahmonov",
    position: "Omborchi",
    status: "Faol",
    salary: "3 000 000 UZS",
    salaryStatus: "Berilgan",
    phone: "+998 93 345 67 89",
  },
];

function Employees() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hodimlar ro'yxati</h1>
      <table className="w-full border border-gray-200 text-left">
        <thead className="text-white bg-slate-800">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Ismi</th>
            <th className="p-2 border">Lavozimi</th>
            <th className="p-2 border">Faollik</th>
            <th className="p-2 border">Oyligi</th>
            <th className="p-2 border">Oylik statusi</th>
            <th className="p-2 border">Telefon raqami</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{employee.name}</td>
              <td className="p-2 border">{employee.position}</td>
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    employee.status === "Faol" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {employee.status}
                </span>
              </td>
              <td className="p-2 border">{employee.salary}</td>
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    employee.salaryStatus === "Berilgan"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {employee.salaryStatus}
                </span>
              </td>
              <td className="p-2 border">{employee.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;

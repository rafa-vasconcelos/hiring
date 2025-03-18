const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  getStudentDetail,
  addNewStudent,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const { name, status } = req.query;
  const students = await getAllStudents({ name, status });
  res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const studentData = req.body;
  const message = await addNewStudent(studentData);
  res.status(201).json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const { id: studentId } = req.params;
  const updatedData = req.body;
  const message = await updateStudent({ ...updatedData, studentId });
  res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await getStudentDetail(id);
  res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id: studentId } = req.params;
  const { status } = req.body;
  const { id: reviewerId } = req.user;
  const message = await setStudentStatus({
    userId: studentId,
    reviewerId,
    status,
  });
  res.json(message);
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};

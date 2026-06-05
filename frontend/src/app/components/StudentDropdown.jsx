function StudentDropdown({ students = [], onSelect }) {
  return (
    <select
      className="
        border
        p-2
        rounded
        w-full
      "
      onChange={(e) => {
        if (onSelect) {
          onSelect(e.target.value);
        }
      }}
      defaultValue=""
    >
      <option value="" disabled>
        Select Student
      </option>

      {students.map((student) => (
        <option key={student._id} value={student._id}>
          {student.name}
        </option>
      ))}
    </select>
  );
}

export default StudentDropdown;
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ReportPDF({ student }) {
  const reportRef = useRef();

  const downloadPDF = async () => {
    const input = reportRef.current;

    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 2, // better quality
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();

      const imgProps = pdf.getImageProperties(imgData);

      const pdfHeight =
        (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`${student?.name || "student"}_report.pdf`);
    } catch (error) {
      console.log("PDF Error:", error);
      alert("Failed to generate PDF");
    }
  };

  const marks = student?.marks || {
    internalTest1: 0,
    internalTest2: 0,
    halfYearly: 0,
    annual: 0,
  };

  const total =
    Number(marks.internalTest1 || 0) +
    Number(marks.internalTest2 || 0) +
    Number(marks.halfYearly || 0) +
    Number(marks.annual || 0);

  const percentage =
    total > 0 ? (total / 400) * 100 : 0;

  return (
    <div className="space-y-4">

      {/* REPORT AREA */}
      <div
        ref={reportRef}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">
          Student Performance Report
        </h1>

        <div className="space-y-2">
          <p><b>Name:</b> {student?.name}</p>
          <p><b>Roll Number:</b> {student?.rollNumber}</p>
          <p><b>Class:</b> {student?.class}</p>
          <p><b>Section:</b> {student?.section}</p>
        </div>

        <hr className="my-4" />

        <h2 className="font-semibold mb-2">Marks</h2>

        <p>Internal Test 1: {marks.internalTest1}</p>
        <p>Internal Test 2: {marks.internalTest2}</p>
        <p>Half Yearly: {marks.halfYearly}</p>
        <p>Annual: {marks.annual}</p>

        <hr className="my-4" />

        <p className="font-bold">Total: {total} / 400</p>

        <p className="font-bold">
          Percentage: {percentage.toFixed(2)}%
        </p>

        <p className="mt-2">
          Status:{" "}
          <span
            className={
              percentage >= 40
                ? "text-green-600 font-bold"
                : "text-red-600 font-bold"
            }
          >
            {percentage >= 40 ? "PASS" : "FAIL"}
          </span>
        </p>
      </div>

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={downloadPDF}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
      >
        Download PDF
      </button>
    </div>
  );
}

export default ReportPDF;
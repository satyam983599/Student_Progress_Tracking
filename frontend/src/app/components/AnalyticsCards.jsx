import {
  Users,
  FileText,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

function AnalyticsCards({
  totalStudents = 0,
  examsConducted = 0,
  averagePercentage = 0,
  needsAttention = 0,
  loading = false,
}) {
  const analyticsData = [
    {
      title: "Total Students",
      value: loading ? "..." : totalStudents,
      growth: "+12%",
      icon: Users,
      bg: "bg-blue-500",
    },
    {
      title: "Exams Conducted",
      value: loading ? "..." : examsConducted,
      growth: "+2",
      icon: FileText,
      bg: "bg-green-500",
    },
    {
      title: "Average Percentage",
      value: loading ? "..." : `${averagePercentage}%`,
      growth: "+5.2%",
      icon: TrendingUp,
      bg: "bg-violet-500",
    },
    {
      title: "Needs Attention",
      value: loading ? "..." : needsAttention,
      growth: "-4",
      icon: AlertTriangle,
      bg: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {analyticsData.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-sm
              border
              border-gray-100
              hover:shadow-xl
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >
            <div className="flex justify-between items-start">

              {/* LEFT CONTENT */}
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold text-gray-800 mt-3">
                  {card.value}
                </h2>

                <div className="mt-4">
                  <span
                    className={`
                      text-sm
                      font-semibold
                      px-3
                      py-1
                      rounded-full
                      ${
                        card.growth.startsWith("-")
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }
                    `}
                  >
                    {card.growth}
                  </span>
                </div>
              </div>

              {/* ICON */}
              <div
                className={`
                  ${card.bg}
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  shadow-lg
                `}
              >
                <Icon size={30} className="text-white" />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AnalyticsCards;
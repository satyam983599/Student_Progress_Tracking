import Layout from "../components/Layout";
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Trophy,
} from "lucide-react";

function AboutUs() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">

        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">

          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
            alt="School"
            className="w-full h-[450px] object-cover"
          />

          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">

            <div className="text-center text-white px-4">

              <h1 className="text-4xl md:text-6xl font-bold">
                ABC PUBLIC SCHOOL
              </h1>

              <p className="mt-4 text-lg md:text-2xl">
                Excellence In Education Since 2005
              </p>

            </div>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-3xl p-6 shadow-xl text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <Users
              size={40}
              className="mx-auto text-blue-600"
            />

            <h2 className="text-4xl font-bold mt-4">
              2500+
            </h2>

            <p className="text-gray-500 mt-2">
              Students
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <BookOpen
              size={40}
              className="mx-auto text-green-600"
            />

            <h2 className="text-4xl font-bold mt-4">
              120+
            </h2>

            <p className="text-gray-500 mt-2">
              Teachers
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <Award
              size={40}
              className="mx-auto text-yellow-500"
            />

            <h2 className="text-4xl font-bold mt-4">
              98%
            </h2>

            <p className="text-gray-500 mt-2">
              Board Results
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <GraduationCap
              size={40}
              className="mx-auto text-violet-600"
            />

            <h2 className="text-4xl font-bold mt-4">
              20+
            </h2>

            <p className="text-gray-500 mt-2">
              Years Legacy
            </p>

          </div>

        </div>

        {/* PRINCIPAL MESSAGE */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">

          <h2 className="text-3xl font-bold mb-8">
            Principal's Message
          </h2>

          <div className="grid md:grid-cols-3 gap-8 items-center">

            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
              alt="Principal"
              className="rounded-3xl w-full"
            />

            <div className="md:col-span-2">

              <p className="text-lg text-gray-600 leading-8">
                Welcome to ABC Public School.
                We are committed to providing
                quality education, developing
                leadership skills and nurturing
                creativity among students.

                Our mission is to create
                responsible citizens equipped
                with knowledge, values and
                confidence to face future
                challenges.
              </p>

              <h3 className="font-bold text-2xl mt-6">
                Dr. Rajesh Kumar
              </h3>

              <p className="text-gray-500">
                Principal
              </p>

            </div>

          </div>

        </div>

        {/* FACILITIES */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">

          <h2 className="text-3xl font-bold mb-8">
            School Facilities
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              "📚 Smart Library",
              "💻 Computer Lab",
              "🧪 Science Laboratory",
              "⚽ Sports Complex",
              "🎨 Art Room",
              "🎵 Music Room",
              "🚌 School Transport",
              "🏥 Medical Room",
            ].map((facility, index) => (
              <div
                key={index}
                className="
                  bg-gray-50
                  rounded-2xl
                  p-5
                  text-center
                  font-medium
                  hover:bg-violet-50
                  hover:shadow-lg
                  transition
                "
              >
                {facility}
              </div>
            ))}

          </div>

        </div>

        {/* ACHIEVEMENTS */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-3xl p-8 shadow-xl">

          <div className="flex items-center gap-3 mb-6">

            <Trophy size={35} />

            <h2 className="text-3xl font-bold">
              Achievements
            </h2>

          </div>

          <ul className="space-y-4 text-lg">

            <li>
              🏆 State Level Science Competition Winner
            </li>

            <li>
              🏆 Best School Award 2024
            </li>

            <li>
              🏆 98% Board Examination Result
            </li>

            <li>
              🏆 National Sports Championship Participation
            </li>

          </ul>

        </div>

        {/* GALLERY */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">

          <h2 className="text-3xl font-bold mb-8">
            School Gallery
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
              alt=""
              className="rounded-3xl h-64 object-cover w-full hover:scale-105 transition duration-300"
            />

            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
              alt=""
              className="rounded-3xl h-64 object-cover w-full hover:scale-105 transition duration-300"
            />

            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350"
              alt=""
              className="rounded-3xl h-64 object-cover w-full hover:scale-105 transition duration-300"
            />

          </div>

        </div>

        {/* CONTACT */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">

          <h2 className="text-3xl font-bold mb-8">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="flex items-center gap-3">
              <Phone className="text-green-600" />
              <span>+91 9876543210</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" />
              <span>info@abcschool.com</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-red-600" />
              <span>Ranchi, Jharkhand, India</span>
            </div>

          </div>

        </div>

        {/* GOOGLE MAP */}
        <div className="bg-white rounded-3xl p-5 shadow-xl">

          <iframe
            title="School Location"
            width="100%"
            height="450"
            className="rounded-3xl"
            loading="lazy"
            src="https://maps.google.com/maps?q=Ranchi&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />

        </div>

      </div>
    </Layout>
  );
}

export default AboutUs;
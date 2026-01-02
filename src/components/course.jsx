
import { react } from "react";
import { useLocation } from "react-router-dom";
import BackendCourseComponent from "../courseComponent/CourseListComponet";
import { Outlet } from "react-router-dom";
export default function Course() {
  const location = useLocation();
  const goTo = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
    setmenu(false);
  };
  return (
    <>
      <div className="overflow-y-auto hide-scrollbar overflow-x-hidden">
        <div className="h-180 md:h-150 lg:h-175 flex flex-col justify-between">
          <div className="">
            <div className="h-20 p-3 flex justify-center">
              <div className=" w-70 h-full">
                {/* <h1 className="text-5xl select-none font-serif font-bold cursor-default flex justify-center">
                  Course
                </h1> */}
              </div>
            </div>

            <main className={`w-full hide-scrollbar ${location.pathname == "home/subject/Subjectdata" ? "overflow-y-hidden" : "overflow-y-auto"} overflow-x-hidden lg:overflow-x-hidden`}>
              <Outlet />
            </main>

          </div>
        </div>
      </div>
    </>
  );
}

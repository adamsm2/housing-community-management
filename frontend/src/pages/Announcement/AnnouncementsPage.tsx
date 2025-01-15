import { useEffect, useState } from "react";
import UserApi from "@/api/user.ts";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState<CreateAnnouncementRequest[]>([]);

  useEffect(() => {
    UserApi.getAnnouncements()
      .then(data => {
        setAnnouncements(data);
      });
  }, []);

  return (
    <div className="mt-52 flex flex-col gap-5">
      {announcements.map(announcement => (
        <div className="relative cursor-pointer" key={announcement.title}>
          <div
            className="relative p-6 bg-bkg border-2 border-textContent rounded-lg hover:scale-105 transition duration-500 flex flex-col">
            <div className="flex-row items-center">
              <h3 className="my-2 text-lg font-bold text-textTitle">{announcement.title}</h3>
            </div>
            <p className="text-textContent">
              {announcement.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementsPage;
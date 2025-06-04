import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { getUserNames } from "@/services/userService";

const ProfileInitials: React.FC = () => {
  const [initials, setInitials] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [dateJoined, setDateJoined] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchNames = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const names = await getUserNames(user);
        if (names) {
          setInitials(
            `${names.firstName?.[0] || ""}${names.lastName?.[0] || ""}`
          );
          setFullName(
            `${names.firstName || ""} ${names.lastName || ""}`.trim()
          );
        }
        // Get date joined from user metadata
        if (user.metadata?.creationTime) {
          const date = new Date(user.metadata.creationTime);
          setDateJoined(date.toLocaleDateString());
        }
      }
    };
    fetchNames();
  }, []);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-700 text-lg font-bold text-gray-700 dark:text-white">
        {initials}
      </div>
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs rounded shadow-lg px-3 py-2 whitespace-nowrap">
          <div>{fullName || "User"}</div>
          {dateJoined && (
            <div className="text-gray-500 dark:text-gray-400">
              Joined: {dateJoined}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileInitials;

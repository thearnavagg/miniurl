import { Avatar, AvatarFallback, AvatarImage } from "@/component/ui/avatar";

const UserAvatar = ({ user }) => {
  const userName = user?.user_metadata?.name || "CN";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <Avatar>
      <AvatarImage src={user?.user_metadata?.profile_pic} />
      <AvatarFallback className="bg-[#88ff33]">{firstLetter}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

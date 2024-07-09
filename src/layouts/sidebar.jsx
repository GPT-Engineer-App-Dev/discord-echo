import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Hash, Users } from "lucide-react";

const Layout = () => {
  const [selectedServer, setSelectedServer] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(0);

  const servers = [
    { id: 0, name: "General", icon: "G" },
    { id: 1, name: "Gaming", icon: "🎮" },
    { id: 2, name: "Music", icon: "🎵" },
  ];

  const channels = [
    { id: 0, name: "general" },
    { id: 1, name: "random" },
    { id: 2, name: "announcements" },
  ];

  const members = [
    { id: 0, name: "John Doe", status: "online" },
    { id: 1, name: "Jane Smith", status: "idle" },
    { id: 2, name: "Bob Johnson", status: "offline" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4 space-y-4">
        {servers.map((server) => (
          <Tooltip key={server.id}>
            <TooltipTrigger asChild>
              <Button
                variant={selectedServer === server.id ? "secondary" : "ghost"}
                className="w-12 h-12 rounded-full"
                onClick={() => setSelectedServer(server.id)}
              >
                {server.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{server.name}</TooltipContent>
          </Tooltip>
        ))}
        <Button variant="outline" className="w-12 h-12 rounded-full">
          <Plus className="w-6 h-6" />
        </Button>
        <div className="mt-auto">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Server Channels List */}
      <div className="w-60 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Server Name</h2>
        <Button variant="outline" className="w-full mb-4">
          <Plus className="w-4 h-4 mr-2" /> Create Channel
        </Button>
        <ScrollArea className="h-[calc(100vh-150px)]">
          {channels.map((channel) => (
            <Button
              key={channel.id}
              variant={selectedChannel === channel.id ? "secondary" : "ghost"}
              className="w-full justify-start mb-1"
              onClick={() => setSelectedChannel(channel.id)}
            >
              <Hash className="w-4 h-4 mr-2" /> {channel.name}
            </Button>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-700 text-white p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            <Hash className="inline w-5 h-5 mr-2" />
            {channels[selectedChannel].name}
          </h3>
          <Button variant="ghost">
            <Users className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1 bg-gray-600 p-4 overflow-y-auto">
          {/* Chat messages will go here */}
        </div>
        <div className="bg-gray-700 p-4">
          <Input placeholder="Type a message..." className="bg-gray-600 text-white" />
        </div>
      </div>

      {/* Channel Members List */}
      <div className="w-60 bg-gray-800 text-white p-4">
        <h3 className="text-lg font-semibold mb-4">Members</h3>
        <ScrollArea className="h-[calc(100vh-100px)]">
          {members.map((member) => (
            <div key={member.id} className="flex items-center mb-2">
              <Avatar className="w-8 h-8 mr-2">
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <span>{member.name}</span>
              <span className={`ml-auto w-2 h-2 rounded-full ${
                member.status === 'online' ? 'bg-green-500' :
                member.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}></span>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Layout;
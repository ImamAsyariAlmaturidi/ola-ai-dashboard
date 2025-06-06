"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Trash2, Plus } from "lucide-react";
import Link from "next/link";

interface AIAgent {
  id: string;
  name: string;
  type: string;
  avatar: string;
  initials: string;
}

export default function AIAgentsOverview() {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: "1",
      name: "CekatAI AI",
      type: "Customer Service AI",
      avatar: "",
      initials: "CA",
    },
  ]);

  const handleDeleteAgent = (agentId: string) => {
    setAgents(agents.filter((agent) => agent.id !== agentId));
  };

  const handleCreateNew = () => {
    // Navigate to configuration page or create new agent
    console.log("Create new agent");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Agents</h1>
          <div className="max-w-3xl mx-auto space-y-2">
            <p className="text-gray-600 text-lg">
              Ini adalah halaman di mana Anda dapat mengunjungi AI yang telah
              Anda buat sebelumnya.
            </p>
            <p className="text-gray-600 text-lg">
              Jangan ragu untuk membuat perubahan dan membuat chatbot sebanyak
              yang Anda inginkan kapan saja.
            </p>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Existing Agents */}
          {agents.map((agent) => (
            <Card
              key={agent.id}
              className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-200"
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  {/* Agent Avatar */}
                  <div className="flex justify-center">
                    <Avatar className="h-20 w-20 bg-gray-500">
                      <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-500 text-white text-xl font-semibold">
                        {agent.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Agent Info */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {agent.name}
                    </h3>
                    <p className="text-gray-600">{agent.type}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center pt-4">
                    <Link href="/config">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleDeleteAgent(agent.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Create New Agent Card */}
          <Card className="border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <CardContent className="p-6 h-full flex items-center justify-center">
              <button
                onClick={handleCreateNew}
                className="text-center space-y-4 w-full h-full flex flex-col items-center justify-center min-h-[200px]"
              >
                {/* Plus Icon */}
                <div className="relative">
                  <div className="h-20 w-20 bg-blue-500 rounded-full flex items-center justify-center">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                  {/* Orange dot overlay */}
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-orange-400 rounded-full"></div>
                </div>

                {/* Create New Text */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Create New
                  </h3>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

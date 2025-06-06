"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  BookOpen,
  Zap,
  Clock,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function AIAgentConfig() {
  const [agentName, setAgentName] = useState("Clara CekatAI Agent");
  const [lastTrained, setLastTrained] = useState("15:40");
  const [agentBehavior, setAgentBehavior] =
    useState(`Ini adalah Prompt AI yang akan mengatur gaya bicara dan identitas AI nya.

Kamu adalah Customer Service untuk bisnis bernama CekatAI nama anda adalah Clara. Tugas-mu memberi informasi yang jelas, singkat, dan membantu. Gaya bicara-mu sopan, seperti anak GenZ, semi-formal. Kamu tidak boleh menjawab pertanyaan yang tidak berkaitan dengan CekatAI. Pakai emoji yang banyak untuk berekspresi

Jika ada orang yang chat untuk pertama kali, tanyakan nama bisnis dia apa dan bidang apa. Lalu setelah itu, setiap ada pertanyaan jawab singkatt saja..

cari kesempatan ajaklah untuk jika mereka ingin google meet untuk demo sebentar, supaya bisa langsung kasih lihat kapabilitas Cekat..
Cara mengajak client meeting: yukk kak kita google meet untuk aku bantu set up sekalian demo, kakak bisa kapan? Jika hanya dijawab hari, tanyakan jam berapa? Jika client mengatjak meet, tanyakan kakak bisa kapan?`);

  const [welcomeMessage, setWelcomeMessage] = useState(
    `Halo! Selamat datang di CekatAI. Saya asisten AI yang akan menjawab semua pertanyaan-mu tentang CekatAI.`
  );

  const [transferConditions, setTransferConditions] = useState(
    `Jika customer sudah memberi nama dan bisnis dan confirm google meet, transfer ke agent`
  );

  const [stopAfterHandoff, setStopAfterHandoff] = useState(false);

  const maxBehaviorChars = 15000;
  const maxWelcomeChars = 5000;
  const maxTransferChars = 750;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Agents
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                  C
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {agentName}
                </h1>
                <p className="text-gray-500">Description</p>
                <p className="text-sm text-gray-400">
                  Last Trained: {lastTrained}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-100 text-gray-600">
                  👤
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-600">{agentName}</span>
              <Button variant="ghost" size="sm">
                🔄
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="knowledge"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Knowledge Sources
              </TabsTrigger>
              <TabsTrigger
                value="integrations"
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Integrations
              </TabsTrigger>
              <TabsTrigger
                value="followups"
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                Followups
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                  {/* AI Agent Behavior */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-medium text-purple-600">
                        AI Agent Behavior
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        Ini adalah Prompt AI yang akan mengatur gaya bicara dan
                        identitas AI nya.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          value={agentBehavior}
                          onChange={(e) => setAgentBehavior(e.target.value)}
                          className="min-h-[300px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                          placeholder="Describe your AI agent's behavior and personality..."
                        />
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span></span>
                          <span>
                            {agentBehavior.length}/{maxBehaviorChars}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Welcome Message */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-medium text-purple-600 flex items-center gap-2">
                        Welcome Message
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        Pesan pertama yang akan dikirim AI kepada user.
                      </p>
                      <Button
                        variant="link"
                        className="text-blue-500 p-0 h-auto text-sm"
                      >
                        Upload gambar untuk Welcome Message
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          value={welcomeMessage}
                          onChange={(e) => setWelcomeMessage(e.target.value)}
                          className="min-h-[100px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                          placeholder="Enter welcome message..."
                        />
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-green-600 text-xs">✓</span>
                            </div>
                          </div>
                          <span>
                            {welcomeMessage.length}/{maxWelcomeChars}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Agent Transfer Conditions */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-medium text-purple-600">
                        Agent Transfer Conditions
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        Tentukan kondisi yang akan memicu AI untuk mentransfer
                        chat ke agen manusia. Status chat akan menjadi{" "}
                        <span className="text-red-500">Pending</span> dan akan
                        muncul di tab Chat{" "}
                        <span className="text-blue-500">Assigned</span>
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Textarea
                            value={transferConditions}
                            onChange={(e) =>
                              setTransferConditions(e.target.value)
                            }
                            className="min-h-[120px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                            placeholder="Define conditions for transferring to human agent..."
                          />
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span></span>
                            <span>
                              {transferConditions.length}/{maxTransferChars}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label
                                htmlFor="stop-handoff"
                                className="text-sm font-medium"
                              >
                                Stop AI after Handoff
                              </Label>
                              <p className="text-xs text-gray-500">
                                Hentikan AI mengirim pesan setelah status chat
                                berubah menjadi Pending.
                              </p>
                            </div>
                            <Switch
                              id="stop-handoff"
                              checked={stopAfterHandoff}
                              onCheckedChange={setStopAfterHandoff}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Chat Preview */}
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-sm sticky top-8 max-h-[calc(100vh-6rem)]">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              👤
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {agentName}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          🔄
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col h-full">
                      {/* Chat Messages */}
                      <div className="flex-1 space-y-3 overflow-y-auto max-h-[400px] pr-2">
                        <div className="bg-blue-500 text-white p-3 rounded-lg text-sm">
                          halo
                        </div>

                        <div className="bg-gray-100 p-3 rounded-lg text-sm">
                          <p>
                            Halo! Selamat datang di CekatAI. Saya asisten AI
                            yang akan menjawab semua pertanyaan-mu tentang
                            CekatAI.
                          </p>
                          <p className="mt-2">
                            Boleh tau, kaka nama bisnisnya apa dan bergerak di
                            bidang apa kak? 😊
                          </p>
                          <div className="text-xs text-gray-500 mt-2">
                            AI credits used: 1
                          </div>
                        </div>

                        <div className="bg-blue-500 text-white p-3 rounded-lg text-sm">
                          apa itu cekat ai
                        </div>

                        <div className="bg-gray-100 p-3 rounded-lg text-sm">
                          <p>Siap! Clara bantu jelasin yaa</p>
                          <p className="mt-2">
                            CekatAI adalah AI chat agent yang bisa membantu
                            bisnis kakak menjawab chat dan jualan 24/7.
                          </p>
                          <p className="mt-2">
                            Dengan Cekat.AI, bisnis bisa menghemat biaya CS
                            hingga 80% dan meningkatkan penjualan hingga 3x
                            lipat! 🚀
                          </p>
                        </div>
                      </div>

                      {/* Chat Input */}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type your message..."
                            className="flex-1"
                          />
                          <Button size="sm">➤</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="knowledge">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    Knowledge Sources configuration coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <Zap className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    Integrations configuration coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="followups">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    Followups configuration coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusIcon, Settings2Icon, ActivityIcon, BellIcon, MailIcon, ClockIcon } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function Component() {
  const [applets, setApplets] = useState([
    { id: 1, name: "Weather alert", trigger: "Weather changes", action: "Send notification", lastRun: "2 hours ago" },
    { id: 2, name: "New email notification", trigger: "New email received", action: "Send notification", lastRun: "1 day ago" },
    { id: 3, name: "Daily reminder", trigger: "Specific time of day", action: "Send email", lastRun: "Just now" },
  ])

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, applet: "Weather alert", action: "Notification sent", time: "2 hours ago" },
    { id: 2, applet: "Daily reminder", action: "Email sent", time: "Just now" },
    { id: 3, applet: "New email notification", action: "Notification sent", time: "1 day ago" },
  ])

  const [newApplet, setNewApplet] = useState({ name: '', trigger: '', action: '' })

  const handleNewAppletChange = (field, value) => {
    setNewApplet({ ...newApplet, [field]: value })
  }

  const handleNewAppletSave = () => {
    if (newApplet.name && newApplet.trigger && newApplet.action) {
      setApplets([...applets, { ...newApplet, id: Date.now(), lastRun: "Never" }])
      setNewApplet({ name: '', trigger: '', action: '' })
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">My Applets</h1>
      
      <Tabs defaultValue="applets" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="applets" className="data-[state=active]:bg-gray-700">My Applets</TabsTrigger>
          <TabsTrigger value="create" className="data-[state=active]:bg-gray-700">Create New Applet</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-gray-700">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applets">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {applets.map(applet => (
              <Card key={applet.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-100">{applet.name}</CardTitle>
                  <CardDescription className="text-gray-400">Last run: {applet.lastRun}</CardDescription>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p><strong>If This:</strong> {applet.trigger}</p>
                  <p><strong>Then That:</strong> {applet.action}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="bg-gray-700 text-gray-100 hover:bg-gray-600">View</Button>
                  <Button variant="outline" className="bg-gray-700 text-gray-100 hover:bg-gray-600">
                    <Settings2Icon className="w-4 h-4 mr-2" /> Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="create">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Create New Applet</CardTitle>
              <CardDescription className="text-gray-400">Set up a new automated task</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="applet-name" className="text-gray-200">Applet Name</Label>
                <Input
                  id="applet-name"
                  value={newApplet.name}
                  onChange={(e) => handleNewAppletChange('name', e.target.value)}
                  placeholder="Enter Applet name"
                  className="bg-gray-700 text-gray-100 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="trigger" className="text-gray-200">If This</Label>
                <Select onValueChange={(value) => handleNewAppletChange('trigger', value)}>
                  <SelectTrigger id="trigger" className="bg-gray-700 text-gray-100 border-gray-600">
                    <SelectValue placeholder="Select a trigger" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                    <SelectItem value="Weather changes">Weather changes</SelectItem>
                    <SelectItem value="New email received">New email received</SelectItem>
                    <SelectItem value="Specific time of day">Specific time of day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="action" className="text-gray-200">Then That</Label>
                <Select onValueChange={(value) => handleNewAppletChange('action', value)}>
                  <SelectTrigger id="action" className="bg-gray-700 text-gray-100 border-gray-600">
                    <SelectValue placeholder="Select an action" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                    <SelectItem value="Send notification">Send notification</SelectItem>
                    <SelectItem value="Send email">Send email</SelectItem>
                    <SelectItem value="Trigger webhook">Trigger webhook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNewAppletSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <PlusIcon className="w-4 h-4 mr-2" /> Create Applet
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">Latest actions performed by your Applets</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivity.map(activity => (
                  <li key={activity.id} className="flex items-center space-x-4">
                    <ActivityIcon className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="font-medium text-gray-200">{activity.applet}</p>
                      <p className="text-sm text-gray-400">{activity.action} - {activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
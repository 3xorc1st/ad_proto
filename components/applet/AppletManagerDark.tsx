'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { PlusIcon, Trash2Icon } from 'lucide-react'

export default function Component() {
  const [applets, setApplets] = useState([
    { id: 1, name: "Weather alert", active: true },
    { id: 2, name: "New email notification", active: false },
  ])
  const [newApplet, setNewApplet] = useState({ name: '', trigger: '', action: '', condition: '' })

  const handleAppletToggle = (id) => {
    setApplets(applets.map(applet => 
      applet.id === id ? { ...applet, active: !applet.active } : applet
    ))
  }

  const handleAppletDelete = (id) => {
    setApplets(applets.filter(applet => applet.id !== id))
  }

  const handleNewAppletChange = (field, value) => {
    setNewApplet({ ...newApplet, [field]: value })
  }

  const handleNewAppletSave = () => {
    if (newApplet.name && newApplet.trigger && newApplet.action) {
      setApplets([...applets, { ...newApplet, id: Date.now(), active: true }])
      setNewApplet({ name: '', trigger: '', action: '', condition: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-100">Manage Your Applets</h1>
        
        {/* Existing Applets List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Your Applets</h2>
          <div className="space-y-4">
            {applets.map(applet => (
              <div key={applet.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Switch
                    checked={applet.active}
                    onCheckedChange={() => handleAppletToggle(applet.id)}
                    className="data-[state=checked]:bg-green-500"
                  />
                  <span className="font-medium text-gray-200">{applet.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleAppletDelete(applet.id)} className="hover:bg-gray-700">
                  <Trash2Icon className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Create New Applet Form */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Create New Applet</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="applet-name" className="text-gray-300">Applet Name</Label>
              <Input
                id="applet-name"
                value={newApplet.name}
                onChange={(e) => handleNewAppletChange('name', e.target.value)}
                placeholder="Enter Applet name"
                className="bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="trigger" className="text-gray-300">If This</Label>
              <Select onValueChange={(value) => handleNewAppletChange('trigger', value)}>
                <SelectTrigger id="trigger" className="bg-gray-700 text-gray-100 border-gray-600">
                  <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                  <SelectItem value="weather">Weather changes</SelectItem>
                  <SelectItem value="email">New email received</SelectItem>
                  <SelectItem value="time">Specific time of day</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="action" className="text-gray-300">Then That</Label>
              <Select onValueChange={(value) => handleNewAppletChange('action', value)}>
                <SelectTrigger id="action" className="bg-gray-700 text-gray-100 border-gray-600">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                  <SelectItem value="notification">Send notification</SelectItem>
                  <SelectItem value="email">Send email</SelectItem>
                  <SelectItem value="webhook">Trigger webhook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="condition" className="text-gray-300">Condition (Optional)</Label>
              <Input
                id="condition"
                value={newApplet.condition}
                onChange={(e) => handleNewAppletChange('condition', e.target.value)}
                placeholder="Enter condition"
                className="bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500"
              />
            </div>
            <Button onClick={handleNewAppletSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <PlusIcon className="mr-2 h-4 w-4" /> Create Applet
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { format, isSameDay, addMonths, subMonths } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Info, Repeat, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AvailabilityHeader } from "./availability-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Types for our off days
type OffDayType = "full-day" | "specific-hours" | "recurring"
type RecurringPattern = "weekly" | "monthly" | "yearly"

interface OffDay {
  id: string
  date: Date
  type: OffDayType
  title: string
  description?: string
  startTime?: string
  endTime?: string
  recurring?: {
    pattern: RecurringPattern
    day?: number // day of week (0-6) or day of month (1-31)
    month?: number // month of year (0-11)
  }
}

export default function AvailabilityCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [month, setMonth] = useState<Date>(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [offDays, setOffDays] = useState<OffDay[]>([
    {
      id: "1",
      date: new Date(2025, 3, 21), // April 21, 2025
      type: "full-day",
      title: "Store Closed",
      description: "Annual maintenance day",
    },
    {
      id: "2",
      date: new Date(2025, 3, 25), // April 25, 2025
      type: "specific-hours",
      title: "Late Opening",
      description: "Staff training",
      startTime: "14:00",
      endTime: "18:00",
    },
    {
      id: "3",
      date: new Date(2025, 0, 1), // Recurring yearly on Jan 1
      type: "recurring",
      title: "New Year's Day",
      description: "Closed for New Year's Day",
      recurring: {
        pattern: "yearly",
        day: 1,
        month: 0,
      },
    },
    {
      id: "4",
      date: new Date(2025, 3, 7), // Recurring weekly on Sunday
      type: "recurring",
      title: "Sunday Closing",
      description: "Closed every Sunday",
      recurring: {
        pattern: "weekly",
        day: 0, // Sunday
      },
    },
  ])

  const [newOffDay, setNewOffDay] = useState<Partial<OffDay>>({
    type: "full-day",
    title: "",
    description: "",
  })

  const [isAddingOffDay, setIsAddingOffDay] = useState(false)

  // Function to check if a date is an off day
  const isOffDay = (day: Date) => {
    return offDays.some((offDay) => {
      // Check for exact date match
      if (isSameDay(day, offDay.date)) {
        return true
      }

      // Check for recurring patterns
      if (offDay.type === "recurring" && offDay.recurring) {
        const { pattern, day: recurringDay, month: recurringMonth } = offDay.recurring

        if (pattern === "weekly" && day.getDay() === recurringDay) {
          return true
        }

        if (pattern === "monthly" && day.getDate() === recurringDay) {
          return true
        }

        if (pattern === "yearly" && day.getDate() === recurringDay && day.getMonth() === recurringMonth) {
          return true
        }
      }

      return false
    })
  }

  // Function to get off day details for a specific date
  const getOffDayDetails = (day: Date) => {
    return offDays.filter((offDay) => {
      // Check for exact date match
      if (isSameDay(day, offDay.date)) {
        return true
      }

      // Check for recurring patterns
      if (offDay.type === "recurring" && offDay.recurring) {
        const { pattern, day: recurringDay, month: recurringMonth } = offDay.recurring

        if (pattern === "weekly" && day.getDay() === recurringDay) {
          return true
        }

        if (pattern === "monthly" && day.getDate() === recurringDay) {
          return true
        }

        if (pattern === "yearly" && day.getDate() === recurringDay && day.getMonth() === recurringMonth) {
          return true
        }
      }

      return false
    })
  }

  // Function to handle adding a new off day
  const handleAddOffDay = () => {
    if (!selectedDay || !newOffDay.title) return

    const id = `off-day-${Date.now()}`

    const offDayToAdd: OffDay = {
      id,
      date: selectedDay,
      type: newOffDay.type as OffDayType,
      title: newOffDay.title,
      description: newOffDay.description,
    }

    if (newOffDay.type === "specific-hours") {
      offDayToAdd.startTime = newOffDay.startTime
      offDayToAdd.endTime = newOffDay.endTime
    }

    if (newOffDay.type === "recurring") {
      offDayToAdd.recurring = {
        pattern: (newOffDay.recurring?.pattern || "weekly") as RecurringPattern,
        day:
          newOffDay.type === "recurring" && newOffDay.recurring?.pattern === "weekly"
            ? selectedDay.getDay()
            : selectedDay.getDate(),
        month: selectedDay.getMonth(),
      }
    }

    setOffDays([...offDays, offDayToAdd])
    setIsAddingOffDay(false)
    setNewOffDay({
      type: "full-day",
      title: "",
      description: "",
    })
  }

  // Function to handle removing an off day
  const handleRemoveOffDay = (id: string) => {
    setOffDays(offDays.filter((offDay) => offDay.id !== id))
  }

  // Function to navigate to previous month
  const previousMonth = () => {
    setMonth(subMonths(month, 1))
  }

  // Function to navigate to next month
  const nextMonth = () => {
    setMonth(addMonths(month, 1))
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <AvailabilityHeader />

      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Availability Calendar</h1>
        <p className="text-muted-foreground">Manage your store's operating days and hours</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left sidebar with calendar */}
        <Card className="md:col-span-1 h-full">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Choose a date to view or set availability</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-3 py-2 w-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-medium">{format(month, "MMMM yyyy")}</h2>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <style jsx global>{`
                .rdp-cell {
                  text-align: center;
                  padding: 0;
                  height: 36px;
                }
                .rdp-day {
                  width: 36px;
                  height: 36px;
                  font-size: 14px;
                  font-weight: 500;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .rdp-day_today {
                  font-weight: bold;
                  color: #000;
                }
                .rdp-day[aria-selected="true"] {
                  background-color: hsl(var(--primary));
                  color: hsl(var(--primary-foreground));
                }
                .rdp-head_cell {
                  font-weight: 500;
                  font-size: 12px;
                  color: hsl(var(--muted-foreground));
                }
                .rdp-table {
                  width: 100%;
                }
              `}</style>

              <Calendar
                mode="single"
                selected={selectedDay || undefined}
                onSelect={(day) => {
                  setSelectedDay(day)
                  setIsAddingOffDay(false)
                }}
                month={month}
                onMonthChange={setMonth}
                className="w-full border rounded-md"
                modifiers={{
                  offDay: (day) => isOffDay(day),
                }}
                modifiersClassNames={{
                  offDay: "bg-red-100 text-red-600 font-medium",
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Off Day</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (selectedDay) {
                  setIsAddingOffDay(true)
                }
              }}
              disabled={!selectedDay}
            >
              Mark as Off Day
            </Button>
          </CardFooter>
        </Card>

        {/* Right side with details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedDay ? `${format(selectedDay, "EEEE, MMMM d, yyyy")}` : "Availability Details"}
            </CardTitle>
            <CardDescription>
              {selectedDay
                ? isOffDay(selectedDay)
                  ? "This day is marked as unavailable"
                  : "This day is available for orders"
                : "Select a date to view or edit availability"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDay ? (
              <>
                {isAddingOffDay ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="off-day-type">Type of Unavailability</Label>
                      <RadioGroup
                        defaultValue="full-day"
                        value={newOffDay.type as string}
                        onValueChange={(value) => setNewOffDay({ ...newOffDay, type: value as OffDayType })}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="full-day" id="full-day" />
                          <Label htmlFor="full-day">Full Day Off</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="specific-hours" id="specific-hours" />
                          <Label htmlFor="specific-hours">Specific Hours</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="recurring" id="recurring" />
                          <Label htmlFor="recurring">Recurring</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="off-day-title">Title</Label>
                      <Input
                        id="off-day-title"
                        placeholder="E.g., Store Closed, Holiday, etc."
                        value={newOffDay.title}
                        onChange={(e) => setNewOffDay({ ...newOffDay, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="off-day-description">Description (Optional)</Label>
                      <Textarea
                        id="off-day-description"
                        placeholder="Add details about why the store is unavailable"
                        value={newOffDay.description || ""}
                        onChange={(e) => setNewOffDay({ ...newOffDay, description: e.target.value })}
                      />
                    </div>

                    {newOffDay.type === "specific-hours" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-time">Start Time</Label>
                          <Input
                            id="start-time"
                            type="time"
                            value={newOffDay.startTime || ""}
                            onChange={(e) => setNewOffDay({ ...newOffDay, startTime: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-time">End Time</Label>
                          <Input
                            id="end-time"
                            type="time"
                            value={newOffDay.endTime || ""}
                            onChange={(e) => setNewOffDay({ ...newOffDay, endTime: e.target.value })}
                          />
                        </div>
                      </div>
                    )}

                    {newOffDay.type === "recurring" && (
                      <div className="space-y-2">
                        <Label htmlFor="recurring-pattern">Recurring Pattern</Label>
                        <Select
                          value={newOffDay.recurring?.pattern || "weekly"}
                          onValueChange={(value) =>
                            setNewOffDay({
                              ...newOffDay,
                              recurring: {
                                ...newOffDay.recurring,
                                pattern: value as RecurringPattern,
                              },
                            })
                          }
                        >
                          <SelectTrigger id="recurring-pattern">
                            <SelectValue placeholder="Select pattern" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly (Every {format(selectedDay, "EEEE")})</SelectItem>
                            <SelectItem value="monthly">Monthly (Every {format(selectedDay, "do")})</SelectItem>
                            <SelectItem value="yearly">Yearly (Every {format(selectedDay, "MMMM d")})</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" onClick={() => setIsAddingOffDay(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddOffDay} disabled={!newOffDay.title}>
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {isOffDay(selectedDay) ? (
                      <div className="space-y-4">
                        {getOffDayDetails(selectedDay).map((offDay) => (
                          <div key={offDay.id} className="rounded-lg border p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{offDay.title}</h3>
                                  <Badge variant={offDay.type === "recurring" ? "outline" : "secondary"}>
                                    {offDay.type === "full-day" && "Full Day"}
                                    {offDay.type === "specific-hours" && "Specific Hours"}
                                    {offDay.type === "recurring" && "Recurring"}
                                  </Badge>
                                </div>

                                {offDay.description && (
                                  <p className="mt-1 text-sm text-muted-foreground">{offDay.description}</p>
                                )}

                                {offDay.type === "specific-hours" && (
                                  <div className="mt-2 flex items-center gap-1 text-sm">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {offDay.startTime} - {offDay.endTime}
                                    </span>
                                  </div>
                                )}

                                {offDay.type === "recurring" && offDay.recurring && (
                                  <div className="mt-2 flex items-center gap-1 text-sm">
                                    <Repeat className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {offDay.recurring.pattern === "weekly" && `Every ${format(offDay.date, "EEEE")}`}
                                      {offDay.recurring.pattern === "monthly" &&
                                        `Every ${format(offDay.date, "do")} of the month`}
                                      {offDay.recurring.pattern === "yearly" &&
                                        `Every ${format(offDay.date, "MMMM d")}`}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <Button variant="ghost" size="icon" onClick={() => handleRemoveOffDay(offDay.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="rounded-full bg-green-100 p-3">
                          <CalendarIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">Available for Orders</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          This day is currently available for taking orders.
                        </p>
                        <Button className="mt-4" onClick={() => setIsAddingOffDay(true)}>
                          Mark as Off Day
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground/60" />
                <h3 className="mt-4 text-lg font-medium">No Date Selected</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select a date from the calendar to view or edit availability.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Off Days List */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Off Days</CardTitle>
          <CardDescription>View and manage all your scheduled off days</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="recurring">Recurring</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {offDays.filter((offDay) => offDay.type !== "recurring" && offDay.date > new Date()).length > 0 ? (
                <div className="space-y-4">
                  {offDays
                    .filter((offDay) => offDay.type !== "recurring" && offDay.date > new Date())
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((offDay) => (
                      <div key={offDay.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                            {offDay.type === "full-day" ? (
                              <CalendarIcon className="h-5 w-5" />
                            ) : (
                              <Clock className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{offDay.title}</h3>
                              <Badge variant="outline">
                                {offDay.type === "full-day" ? "Full Day" : "Specific Hours"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {format(offDay.date, "EEEE, MMMM d, yyyy")}
                              {offDay.type === "specific-hours" && ` (${offDay.startTime} - ${offDay.endTime})`}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveOffDay(offDay.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Info className="h-10 w-10 text-muted-foreground/60" />
                  <h3 className="mt-4 text-lg font-medium">No Upcoming Off Days</h3>
                  <p className="mt-1 text-sm text-muted-foreground">You don't have any upcoming off days scheduled.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recurring">
              {offDays.filter((offDay) => offDay.type === "recurring").length > 0 ? (
                <div className="space-y-4">
                  {offDays
                    .filter((offDay) => offDay.type === "recurring")
                    .map((offDay) => (
                      <div key={offDay.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                            <Repeat className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{offDay.title}</h3>
                              <Badge>Recurring</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {offDay.recurring?.pattern === "weekly" && `Every ${format(offDay.date, "EEEE")}`}
                              {offDay.recurring?.pattern === "monthly" &&
                                `Every ${format(offDay.date, "do")} of the month`}
                              {offDay.recurring?.pattern === "yearly" && `Every ${format(offDay.date, "MMMM d")}`}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveOffDay(offDay.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Repeat className="h-10 w-10 text-muted-foreground/60" />
                  <h3 className="mt-4 text-lg font-medium">No Recurring Off Days</h3>
                  <p className="mt-1 text-sm text-muted-foreground">You don't have any recurring off days set up.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {offDays.filter((offDay) => offDay.type !== "recurring" && offDay.date <= new Date()).length > 0 ? (
                <div className="space-y-4">
                  {offDays
                    .filter((offDay) => offDay.type !== "recurring" && offDay.date <= new Date())
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .map((offDay) => (
                      <div
                        key={offDay.id}
                        className="flex items-center justify-between rounded-lg border p-4 opacity-70"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                            {offDay.type === "full-day" ? (
                              <CalendarIcon className="h-5 w-5" />
                            ) : (
                              <Clock className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{offDay.title}</h3>
                              <Badge variant="outline">
                                {offDay.type === "full-day" ? "Full Day" : "Specific Hours"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {format(offDay.date, "EEEE, MMMM d, yyyy")}
                              {offDay.type === "specific-hours" && ` (${offDay.startTime} - ${offDay.endTime})`}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveOffDay(offDay.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CalendarIcon className="h-10 w-10 text-muted-foreground/60" />
                  <h3 className="mt-4 text-lg font-medium">No Past Off Days</h3>
                  <p className="mt-1 text-sm text-muted-foreground">You don't have any past off days.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Business Hours Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Regular Business Hours</CardTitle>
          <CardDescription>Set your standard operating hours for each day of the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <BusinessHourRow day="Monday" isOpen={true} openTime="09:00" closeTime="20:00" />
            <BusinessHourRow day="Tuesday" isOpen={true} openTime="09:00" closeTime="20:00" />
            <BusinessHourRow day="Wednesday" isOpen={true} openTime="09:00" closeTime="20:00" />
            <BusinessHourRow day="Thursday" isOpen={true} openTime="09:00" closeTime="20:00" />
            <BusinessHourRow day="Friday" isOpen={true} openTime="09:00" closeTime="20:00" />
            <BusinessHourRow day="Saturday" isOpen={true} openTime="10:00" closeTime="21:00" />
            <BusinessHourRow day="Sunday" isOpen={false} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Save Business Hours</Button>
        </CardFooter>
      </Card>

      {/* Holiday Templates */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Holiday Templates</CardTitle>
            <CardDescription>Quickly apply common holidays to your calendar</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Apply Holidays</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Apply Holiday Templates</DialogTitle>
                <DialogDescription>Select holiday templates to apply to your calendar</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="new-years" className="rounded border-gray-300" />
                  <Label htmlFor="new-years">New Year's Day (January 1)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="christmas" className="rounded border-gray-300" />
                  <Label htmlFor="christmas">Christmas (December 25)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="diwali" className="rounded border-gray-300" />
                  <Label htmlFor="diwali">Diwali (Varies by year)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="independence" className="rounded border-gray-300" />
                  <Label htmlFor="independence">Independence Day (August 15)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="republic" className="rounded border-gray-300" />
                  <Label htmlFor="republic">Republic Day (January 26)</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="button">Apply Selected</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">National Holidays</h3>
                    <p className="text-sm text-muted-foreground">Major national holidays for India</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Regional Festivals</h3>
                    <p className="text-sm text-muted-foreground">Local festivals and celebrations</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Maintenance Days</h3>
                    <p className="text-sm text-muted-foreground">Scheduled maintenance and inventory days</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Component for business hour row
function BusinessHourRow({ day, isOpen, openTime, closeTime }) {
  const [open, setOpen] = useState(isOpen)
  const [startTime, setStartTime] = useState(openTime)
  const [endTime, setEndTime] = useState(closeTime)

  return (
    <div className="flex items-center justify-between">
      <div className="w-32">
        <span className="font-medium">{day}</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={open} onCheckedChange={setOpen} id={`${day.toLowerCase()}-switch`} />
        <Label htmlFor={`${day.toLowerCase()}-switch`}>{open ? "Open" : "Closed"}</Label>
      </div>
      {open && (
        <div className="flex items-center gap-2">
          <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-32" />
          <span>to</span>
          <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-32" />
        </div>
      )}
      {!open && <div className="flex-1 text-right text-muted-foreground">Closed all day</div>}
    </div>
  )
}

'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { PlusCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Header } from '@/components/header';
import { CreateEventSheet } from '@/components/create-event-sheet';
import type { Event } from '@/lib/types';
import { mockEvents as initialEvents } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleEventCreated = (newEventData: Omit<Event, 'id' | 'guests'>) => {
    const newEvent: Event = {
      ...newEventData,
      id: `evt-${Date.now()}`,
      guests: [], // Start with an empty guest list
    };
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
    setIsSheetOpen(false);
  };

  const getRsvpCount = (event: Event) => {
    const attending = event.guests.filter((g) => g.status === 'Attending').length;
    return attending;
  };

  const getRsvpStatus = (event: Event) => {
    const attending = getRsvpCount(event);
    const total = event.guests.length;
    if (total === 0) return { text: 'No guests', variant: 'secondary' as const };
    const percentage = (attending / total) * 100;
    if (percentage > 70)
      return { text: 'High turnout', variant: 'default' as const };
    if (percentage > 40)
      return { text: 'Good turnout', variant: 'secondary' as const };
    return { text: 'Low turnout', variant: 'outline' as const };
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Your Events
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" onClick={() => setIsSheetOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-20">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no events
              </h3>
              <p className="text-sm text-muted-foreground">
                Create an event to send out invitations.
              </p>
              <Button className="mt-4" onClick={() => setIsSheetOpen(true)}>
                Create Event
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card
                key={event.id}
                className="flex flex-col transition-shadow duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="truncate">{event.name}</CardTitle>
                  <CardDescription>
                    {format(new Date(event.date), 'PPP')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    <span>
                      {getRsvpCount(event)} of {event.guests.length} guests
                      attending
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Badge variant={getRsvpStatus(event).variant}>
                    {getRsvpStatus(event).variant === 'default' ? '🎉' : ''}{' '}
                    {getRsvpStatus(event).text}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      <CreateEventSheet
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
}

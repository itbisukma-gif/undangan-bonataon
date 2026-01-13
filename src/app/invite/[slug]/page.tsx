'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getPlaceholderImage } from '@/lib/placeholder-images';

// In a real app, you'd fetch this data based on the slug
const mockInvitation = {
  eventName: 'Annual Tech Summit 2024',
  eventDate: 'October 26, 2024',
  eventTime: '9:00 AM - 5:00 PM',
  location: 'Silicon Valley Conference Center',
  host: {
    name: 'CorpConnect',
  },
  guestName: 'Valued Guest',
  design: getPlaceholderImage('invitation-background'),
};

function InvitationCard() {
  const { eventName, eventDate, eventTime, location, host, guestName, design } =
    mockInvitation;
  return (
    <Card className="w-full max-w-md overflow-hidden shadow-2xl">
      <div className="relative h-64 w-full">
        <Image
          src={design.imageUrl}
          alt={eventName}
          fill
          className="object-cover"
          data-ai-hint={design.imageHint}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4 text-center">
          <p className="font-medium text-primary-foreground/80">
            You are invited to
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary-foreground drop-shadow-md">
            {eventName}
          </h1>
        </div>
      </div>
      <CardContent className="space-y-6 p-6">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Hello, {guestName},</p>
          <p className="mt-1 text-lg">
            You're invited to join us for an exclusive event.
          </p>
        </div>

        <Separator />

        <div className="space-y-4 text-foreground">
          <div className="flex items-start gap-4">
            <Calendar className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">{eventDate}</p>
              <p className="text-sm text-muted-foreground">{eventTime}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">{location}</p>
              <p className="text-sm text-muted-foreground">
                Find us on the map for directions
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <Button size="lg" className="w-full">
            Will Attend
          </Button>
          <Button size="lg" variant="outline" className="w-full">
            Cannot Attend
          </Button>
        </div>
      </CardContent>
      <div className="flex items-center justify-center gap-2 bg-muted/50 p-4 text-sm text-muted-foreground">
        <Avatar className="h-6 w-6">
          <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span>Hosted by {host.name}</span>
      </div>
    </Card>
  );
}

export default function InvitationPage({
  params,
}: {
  params: { slug: string };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { eventName, guestName, design } = mockInvitation;

  if (!isOpen) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
        <Image
          src={design.imageUrl}
          alt={eventName}
          fill
          className="object-cover"
          data-ai-hint={design.imageHint}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center text-center text-primary-foreground">
          <p className="text-xl font-medium">Anda diundang ke</p>
          <h1 className="my-4 text-5xl font-bold tracking-tight drop-shadow-lg">
            {eventName}
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <p className="mt-2 text-2xl font-semibold">{guestName}</p>
          <Button
            size="lg"
            className="mt-8 animate-pulse"
            onClick={() => setIsOpen(true)}
          >
            Buka Undangan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <InvitationCard />
    </div>
  );
}

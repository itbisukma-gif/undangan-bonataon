'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { DesignGenerator } from './design-generator';
import type { Event, DesignDraft } from '@/lib/types';

const eventSchema = z.object({
  name: z.string().min(3, 'Event name must be at least 3 characters long'),
  date: z.date({ required_error: 'A date for the event is required.' }),
  location: z.string().min(3, 'Location is required'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  preferences: z
    .string()
    .min(10, 'Design preferences must be at least 10 characters long'),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface CreateEventSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onEventCreated: (event: Omit<Event, 'id' | 'guests'>) => void;
}

export function CreateEventSheet({
  isOpen,
  setIsOpen,
  onEventCreated,
}: CreateEventSheetProps) {
  const [step, setStep] = useState(1);
  const [selectedDesign, setSelectedDesign] = useState<DesignDraft | null>(null);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: '',
      location: '',
      description: '',
      preferences: '',
    },
  });

  const onSubmitStep1 = () => {
    setStep(2);
  };

  const handleCreateEvent = () => {
    if (!selectedDesign) {
      // In a real app, you would show a toast message.
      console.error('Please select a design');
      return;
    }
    const values = form.getValues();
    onEventCreated({ ...values, design: selectedDesign, date: values.date! });
    form.reset();
    setSelectedDesign(null);
    setStep(1);
  };

  const eventDetailsForAI = `Event Name: ${form.watch('name')}, Date: ${
    form.watch('date') ? format(form.watch('date'), 'PPP') : ''
  }, Location: ${form.watch('location')}. Description: ${form.watch(
    'description'
  )}`;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Create New Event</SheetTitle>
          <SheetDescription>
            {step === 1
              ? 'Fill in the details for your new event.'
              : 'Let our AI assistant help you with the design.'}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="flex-grow space-y-8 overflow-y-auto p-1">
            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Annual Tech Summit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Grand Hyatt Ballroom"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us more about the event"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div>
                <FormField
                  control={form.control}
                  name="preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Design Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Modern and sleek, with a touch of gold', 'Vibrant and playful for a summer party'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DesignGenerator
                  eventDetails={eventDetailsForAI}
                  userPreferences={form.watch('preferences')}
                  selectedDesign={selectedDesign}
                  onSelectDesign={setSelectedDesign}
                  isPreferenceValid={
                    form.getFieldState('preferences').invalid === false
                  }
                />
              </div>
            )}
          </form>
        </Form>

        <SheetFooter>
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          {step === 1 && (
            <Button onClick={form.handleSubmit(onSubmitStep1)}>Next</Button>
          )}
          {step === 2 && (
            <Button onClick={handleCreateEvent} disabled={!selectedDesign}>
              Create Event
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

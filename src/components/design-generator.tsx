'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { generateDesignDrafts } from '@/ai/flows/generate-design-drafts';
import type { DesignDraft } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getPlaceholderImage } from '@/lib/placeholder-images';

interface DesignGeneratorProps {
  eventDetails: string;
  userPreferences: string;
  selectedDesign: DesignDraft | null;
  onSelectDesign: (design: DesignDraft) => void;
  isPreferenceValid: boolean;
}

export function DesignGenerator({
  eventDetails,
  userPreferences,
  selectedDesign,
  onSelectDesign,
  isPreferenceValid,
}: DesignGeneratorProps) {
  const [drafts, setDrafts] = useState<DesignDraft[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateDesigns = async () => {
    if (!isPreferenceValid) {
      toast({
        title: 'Missing Preferences',
        description: 'Please describe your design preferences.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setDrafts([]);
    try {
      const result = await generateDesignDrafts({
        eventDetails,
        userPreferences,
      });

      const aiPlaceholders = [
        'ai-design-1-portrait',
        'ai-design-2-landscape',
        'ai-design-3-portrait',
      ];
      const aiDrafts = result.designDrafts.slice(0, 3).map((d, i) => {
        const placeholder = getPlaceholderImage(aiPlaceholders[i]);
        return {
          description: d.description,
          imageUrl: placeholder.imageUrl,
          imageHint: placeholder.imageHint,
        };
      });
      setDrafts(aiDrafts);
    } catch (error) {
      console.error('Failed to generate designs:', error);
      toast({
        title: 'Generation Failed',
        description:
          'Something went wrong while generating designs. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <Button onClick={handleGenerateDesigns} disabled={isLoading || !isPreferenceValid}>
        <Sparkles className="mr-2 h-4 w-4" />
        {isLoading ? 'Generating...' : 'Generate Designs'}
      </Button>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      )}

      {drafts.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {drafts.map((draft, index) => (
            <Card
              key={index}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md hover:shadow-accent/50',
                selectedDesign?.imageUrl === draft.imageUrl
                  ? 'ring-2 ring-accent'
                  : ''
              )}
              onClick={() => onSelectDesign(draft)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[9/16]">
                  <Image
                    src={draft.imageUrl}
                    alt={draft.description}
                    fill
                    className="rounded-t-lg object-cover"
                    data-ai-hint={draft.imageHint}
                  />
                </div>
                <p className="p-3 text-sm text-muted-foreground">
                  {draft.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

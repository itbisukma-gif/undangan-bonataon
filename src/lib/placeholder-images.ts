import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const placeholderImages: ImagePlaceholder[] = data.placeholderImages;

export const getPlaceholderImage = (id: string): ImagePlaceholder => {
    const image = placeholderImages.find(img => img.id === id);
    if (!image) {
        console.warn(`Placeholder image with id "${id}" not found.`);
        return {
            id: 'fallback',
            description: 'Fallback image',
            imageUrl: 'https://picsum.photos/seed/fallback/600/400',
            imageHint: 'abstract'
        };
    }
    return image;
};

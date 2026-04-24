import {z} from "zod";

const requiredString = (fieldName: string) =>
    z.string({error: `${fieldName} is required`}).min(1, {message: `${fieldName} is required`})

export const activitySchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    date: z.coerce.date({
        message: 'Date is required'
    }),
    category: requiredString('Category'),
    location: z.object({
        venue: requiredString('Venue'),
        city: z.string().optional(),
        latitude: z.number(),
        longitude: z.number(),
    })
})

export type ActivitySchema = z.infer<typeof activitySchema>;
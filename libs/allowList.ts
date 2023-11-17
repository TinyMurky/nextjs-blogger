import { Category } from "@prisma/client"

// 按下publish後可以publish的種類
export const allowPublishedToCategory: Category[] = [Category.insight, Category.tech]

// edit publish delete btn
export  const allowedNonLoginEditCategory: Category[] = [ Category.playground ]
export  const allowedNonLoginDeleteCategory: Category[] = [ Category.playground ]
export const allowedPublishCategory: Category[] = [ Category.edit ]

// posts component
export const allowedNewPostCategory: Category[] = [ Category.edit, Category.playground ]
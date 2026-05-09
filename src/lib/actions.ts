'use server';

import prisma from './prisma';
import { revalidatePath } from 'next/cache';

export async function createLesson(formData: {
  title: string;
  description?: string;
  category: string;
  tags: string;
  code: string;
}) {
  const lesson = await prisma.lesson.create({
    data: {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags,
      code: formData.code,
    },
  });

  revalidatePath('/');
  return lesson;
}

export async function getLessons() {
  return await prisma.lesson.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getLessonById(id: string) {
  return await prisma.lesson.findUnique({
    where: { id },
  });
}

export async function updateLesson(id: string, formData: {
  title: string;
  description?: string;
  category: string;
  tags: string;
  code: string;
}) {
  const lesson = await prisma.lesson.update({
    where: { id },
    data: {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags,
      code: formData.code,
    },
  });

  revalidatePath('/');
  revalidatePath(`/lesson/${id}`);
  return lesson;
}

export async function deleteLesson(id: string) {
  await prisma.lesson.delete({
    where: { id },
  });

  revalidatePath('/');
}

// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade', // ou 'slide_from_right'
      }}
    />
  );
}

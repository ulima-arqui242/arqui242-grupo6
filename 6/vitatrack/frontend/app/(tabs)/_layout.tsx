import { Tabs } from 'expo-router';
import React, {useEffect, useState} from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import pruebaApi from "@/api/pruebaApi";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
      const loadPrueba : () => Promise<void> = async () : Promise<void> => {
          const result : any = await pruebaApi.prueba();
          console.log(result.message);
      }

      loadPrueba();
  }, [])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

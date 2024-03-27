'use client'

import React, { useState } from 'react';
import HomeLayout from '@/layouts/Home'
import { InputField } from '@/components/common/Input';

export default function HomePage() {
  const [value, setValue] = useState('')
  const handleInput = (newValue: string) => {
    setValue(newValue)
  }
  return (
      <div className='bg-background h-full w-full min-h-screen'>
        <HomeLayout>
          <div className='flex'>
            <InputField 
              placeholder='test'
              disabled={false}
              type={'password'}
              onValueChange={handleInput}
            />
            <p>{value}</p>
          </div>
        </HomeLayout>
      </div>
  );
}

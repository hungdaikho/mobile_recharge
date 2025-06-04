import SubHeader from '@/components/layout/sub.header'
import React from 'react'
import GoldNumbersList from './packages'

type Props = {}

const page = (props: Props) => {
  return (
    <>
        <SubHeader height='150px'  content="Gold Numbers" />
        <GoldNumbersList />
    </>
  )
}

export default page